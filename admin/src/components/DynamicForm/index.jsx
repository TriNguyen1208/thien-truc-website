import { useState, useMemo, useRef, useEffect } from "react";
import { Modal } from 'antd';
import SimpleForm from "../SimpleForm"
import { DeleteIcon, EyeIcon, EyeOffIcon, UploadIcon } from "../Icon/index";
const DynamicForm = ({ data, config }) => {
    const fileInputRef = useRef();
    const [visible, setVisible] = useState(false);
    const [focusedFields, setFocusedFields] = useState({});
    const defaultField = {
        type: 'text',
        name: '',
        placeholder: '',
        label: '',
        value: '',
        isRequired: false,
        width: 12,
        numberRows: 2,
        isSingleColumn: false,
        limitRowDynamicFields: undefined,
        options: [{ value: "", label: "" }],
        maxLength: Infinity,
    }
    const defaultConfig = {
        title: "",
        description: "",
        widthModal: 800,
        contentCancelButton: 'Hủy',
        contentSubmitButton: 'Tạo mới'
    }
    const [urlInput, setUrlInput] = useState('');
    const initialValues = useMemo(() => {
        const result = {};
        data.forEach(field => {
            const { name, type, value, isSingleColumn, options } = field;
            if (type === 'dynamicFields') {
                if (isSingleColumn) {
                    if (field.isCheckbox) {
                        result[name] =
                            Array.isArray(value) && value.length > 0
                                ? value.map(item => ({
                                    value: item.value || '',
                                    isCheckbox: !!item.isCheckbox
                                }))
                                : [{ value: '', isCheckbox: false }];
                    } else {
                        result[name] =
                            Array.isArray(value) && value.length > 0
                                ? value.map(v => v || '')
                                : [''];
                    }
                } else {
                    result[name] =
                        value && typeof value === 'object' && Object.keys(value).length > 0
                            ? Object.entries(value).map(([k, v]) => ({ name: k, value: v }))
                            : [{ name: '', value: '' }];
                }

            }
            else if (type === 'checkbox') {
                result[name] = value !== undefined ? value : false;
            } else if (type === 'select') {
                result[name] = value !== undefined ? value : options?.[0]?.value || '';
            } else if (type === 'image_upload') {
                result[name] = value !== undefined ? value : "";
            }
            else {
                result[name] = value !== undefined ? value : '';
            }
        });
        if (result.img != null) {
            setUrlInput(result.img);
        }
        return result;
    }, [data]);

    const [formData, setFormData] = useState(initialValues);
    useEffect(() => {
        setFormData(initialValues);
    }, [initialValues]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalData = { ...formData };

        Object.keys(finalData).forEach(key => {
            const field = data.find(f => f.name === key);

            if (field?.type === 'dynamicFields') {
                if (field.isSingleColumn) {
                    if (field.isCheckbox) {
                        finalData[key] = (finalData[key] || [])
                            .filter(spec => spec.value && spec.value.trim() !== '')
                            .map(spec => ({
                                value: spec.value.trim(),
                                isCheckbox: !!spec.isCheckbox
                            }));
                    } else {
                        finalData[key] = (finalData[key] || [])
                            .filter(v => typeof v === 'string' && v.trim() !== '')
                            .map(v => v.trim());
                    }
                } else {
                    finalData[key] = (finalData[key] || [])
                        .filter(spec => spec.name && spec.value)
                        .reduce((obj, spec) => {
                            obj[spec.name] = spec.value;
                            return obj;
                        }, {});
                }
            }
        });

        config.handleSubmitButton(finalData);
        setFormData(initialValues);
    };


    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        const field = data.find(f => f.name === name); // Tìm field đang thao tác
        let newValue = value;
        if (type === 'checkbox') {
            newValue = checked;
        } else if (type === 'file') {
            newValue = files[0];
        }
        // ✅ Nếu trường chỉ cho nhập số
        if (field?.isOnlyNumber && !/^\d*$/.test(newValue)) {
            return; // không setState nếu nhập không phải số
        }

        setFormData((prev) => ({
            ...prev,
            [name]: newValue
        }))
    }

    const handleDynamicFieldsChange = (fieldName, index, keyOrValue, value, isSingle = false, isCheckbox = false) => {
        setFormData((prev) => {
            const field = data.find(item => item.name === fieldName);
            const limitCheckbox = field?.limitCheckbox || Infinity;

            const specs = [...(prev[fieldName] || [])];

            if (isSingle && isCheckbox && keyOrValue === 'isCheckbox') {
                const checkedCount = specs.filter((item, i) => i !== index && item.isCheckbox).length;

                if (value === true && checkedCount >= limitCheckbox) {
                    return prev; // Không cho phép chọn quá số lượng tối đa
                }
            }

            if (isSingle) {
                if (isCheckbox) {
                    if (!specs[index] || typeof specs[index] !== 'object') {
                        specs[index] = { value: '', isCheckbox: false };
                    }
                    specs[index][keyOrValue] = value;
                } else {
                    specs[index] = value;
                }
            } else {
                if (!specs[index]) specs[index] = { name: '', value: '' };
                specs[index][keyOrValue] = value;
            }

            return { ...prev, [fieldName]: specs };
        });
    };

    const handleImageUpload = (fieldName, file) => {
        if (file) {
            setFormData((prev) => ({
                ...prev,
                [fieldName]: file
            }));
        }
    };
    const removeImage = (fieldName) => {
        setFormData((prev) => {
            if (prev[fieldName]?.startsWith?.('blob:')) {
                URL.revokeObjectURL(prev[fieldName]);
            }
            return { ...prev, [fieldName]: '' };
        });
    };

    const addDynamicFields = (fieldName, isSingle = false) => {
        setFormData((prev) => {
            const current = prev[fieldName] || [];
            const field = data.find(item => item.name === fieldName);
            const limit = field?.limitRowDynamicFields || Infinity;

            if (current.length >= limit) return prev;

            const isCheckbox = field?.isCheckbox || false;
            let newEntry;

            if (isSingle) {
                newEntry = isCheckbox ? { value: '', isCheckbox: false } : '';
            } else {
                newEntry = { name: '', value: '' };
            }

            return {
                ...prev,
                [fieldName]: [...current, newEntry],
            };
        });
    };


    const removeDynamicFields = (fieldName, index) => {
        setFormData((prev) => {
            const specs = [...(prev[fieldName] || [])];
            specs.splice(index, 1);
            return { ...prev, [fieldName]: specs };
        });
    };

    const renderInput = (item) => {
        let nameColumn = item.name || defaultField.name;
        let type = item.type || defaultField.type;
        let value = formData[nameColumn] == 0 || formData[nameColumn] ? formData[nameColumn] : defaultField.value;
        const maxLength = item.maxLength || Infinity;
        const isInvalid = maxLength !== undefined && value.length >= maxLength;
        const isFocused = focusedFields[nameColumn] || false;
        const commonProps = {
            name: nameColumn,
            id: nameColumn,
            value: value,
            onChange: handleChange,
            onFocus: () => setFocusedFields(prev => ({ ...prev, [nameColumn]: true })),
            onBlur: () => setFocusedFields(prev => ({ ...prev, [nameColumn]: false })),

            required: item.isRequired || defaultField.isRequired,
            maxLength: maxLength || undefined,
            disabled: item.isReadOnly || false,

            style: {
                backgroundColor: item.isReadOnly ? '#f3f4f6' : 'white',
                padding: '8px 12px',
                display: 'block',
                width: '100%',
                borderRadius: '5px',
                outline: 'none',
                cursor: item.isReadOnly ? 'not-allowed' : 'text',
                border: isInvalid
                    ? '1px solid red'
                    : isFocused
                        ? '1px solid black'
                        : '1px solid #D1D5DB'
            }
        };
        switch (type) {

            case 'textarea':
                return (
                    <textarea
                        {...commonProps}
                        value={value}
                        rows={item.numberRows || defaultField.numberRows}
                        placeholder={item.placeholder || defaultField.placeholder}
                        maxLength={item.maxLength || undefined}
                    />
                );
            case 'select':

                return (
                    <div className="flex gap-2 mb-2">
                        <select
                            {...commonProps}
                            value={value}

                            className="flex-1 border border-gray-300 rounded-[5px]"
                        >
                            {(item.options || defaultField.options).map((opt, idx) => (
                                <option key={idx} value={opt.value} className="text-center">{opt.label}</option>
                            ))}

                        </select>
                    </div>

                );
            case 'checkbox':
                return (
                    <input
                        {...commonProps}
                        type="checkbox"
                        checked={!!formData[nameColumn]}
                        style={{
                            display: 'inline-block',
                            marginRight: '0.5rem' // tương đương với Tailwind `mr-2`
                        }}
                        className="accent-black"
                    />
                );
            case 'file':
                return (
                    <input
                        {...commonProps}
                        type="file"
                        className="block w-full border border-gray-300"
                    />
                );
            case 'image_upload': {
                const image = formData[nameColumn];
                return (
                    <div className="space-y-4">
                        {/* URL Input */}
                        <div className="flex gap-2 w-full items-stretch">
                            <input
                                type="url"
                                value={urlInput}
                                onChange={(e) => {
                                    setUrlInput(e.target.value)
                                    setFormData((prev) => ({
                                        ...prev,
                                        img: e.target.value
                                    }));
                                }}
                                placeholder="Nhập link ảnh"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md w-full"
                            />
                            {/* File Upload */}
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={(e) => {
                                    if (e.target.files[0] && !image) {
                                        handleImageUpload(nameColumn, e.target.files[0]);
                                        e.target.value = '';
                                    }
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current.click()}
                                disabled={!!image}
                                className="flex h-full px-4 py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 disabled:bg-gray-300 cursor-pointer"

                            >
                                <div>
                                    <UploadIcon />
                                </div>
                                <div className="ml-[15px]">
                                    Upload ảnh
                                </div>
                            </button>
                        </div>


                        {/* Image Preview */}
                        {image?.name && (
                            <div className="text-xs text-gray-700 break-all relative border border-gray-200 rounded-md p-2">
                                URL: {image.name}
                                <button
                                    type="button"
                                    onClick={() => removeImage(nameColumn)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                >
                                    ×
                                </button>
                            </div>
                        )}

                    </div>
                );
            }
            case 'dynamicFields': {
                const specs = formData[nameColumn] || [];
                const isSingle = item.isSingleColumn;
                const field = data.find(item => item.name === nameColumn);
                const limit = field?.limitRowDynamicFields || Infinity;

                return (
                    <div>
                        {specs.map((entry, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                {!isSingle && (

                                    <input
                                        type="text"
                                        value={entry.name || ''}
                                        required={item.isRequired || defaultField.isRequired}
                                        onChange={(e) =>
                                            handleDynamicFieldsChange(
                                                nameColumn,
                                                index,
                                                'name',
                                                e.target.value,
                                                false
                                            )
                                        }
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                                        placeholder={item.placeholder?.[0] ?? defaultField.placeholder}
                                    />

                                )}
                                <input
                                    type="text"
                                    value={
                                        isSingle
                                            ? (item.isCheckbox
                                                ? entry.value || ''     // ✅ Truy cập đúng value trong object
                                                : entry || '')          // Nếu không checkbox thì là string
                                            : entry.value || ''
                                    }
                                    required={item.isRequired || defaultField.isRequired}
                                    onChange={(e) =>
                                        handleDynamicFieldsChange(
                                            nameColumn,
                                            index,
                                            item.isCheckbox || !isSingle ? 'value' : index, // ✅ Sửa chỗ này
                                            e.target.value,
                                            isSingle,
                                            item.isCheckbox
                                        )
                                    }
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                                    placeholder={isSingle ? item.placeholder : item.placeholder?.[1] || defaultField.placeholder}

                                />

                                {item.isCheckbox && (

                                    <input
                                        type="checkbox"
                                        checked={typeof entry === 'object' && entry !== null ? entry.isCheckbox : false}
                                        onChange={(e) =>
                                            handleDynamicFieldsChange(
                                                nameColumn,
                                                index,
                                                'isCheckbox',
                                                e.target.checked,
                                                isSingle,
                                                true
                                            )
                                        }
                                        className="accent-black"
                                    />
                                )}

                                {specs.length < limit && (
                                    <button
                                        type="button"
                                        onClick={() => addDynamicFields(nameColumn, isSingle)}
                                        className="px-3 py-2  border  border-gray-300 rounded-md cursor-pointer"
                                    >
                                        +
                                    </button>
                                )}

                                {specs.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeDynamicFields(nameColumn, index)}
                                        className="px-3 py-2 border  border-gray-300 rounded-md cursor-pointer"
                                    >
                                        <DeleteIcon />
                                    </button>
                                )}
                            </div>
                        ))}


                    </div>
                );
            }

            case 'password': {


                return (
                    <div className="relative">
                        <input
                            {...commonProps}
                            type={visible ? 'text' : 'password'}
                            value={value}
                            placeholder={item.placeholder || defaultField.placeholder}
                        />
                        <span
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                            onClick={() => setVisible(!visible)}
                        >
                            {visible ? <EyeOffIcon /> : <EyeIcon />}
                        </span>
                    </div>
                );
            }
            default:
                return <input
                    {...commonProps}
                    type={type}
                    value={value}
                    placeholder={item.placeholder || defaultField.placeholder}
                    maxLength={item.maxLength || undefined}
                />;
        }
    }

    return (
        <>
            <Modal
                closable={true}
                open={config?.isModalOpen || false}
                footer={null}
                width={config?.widthModal || defaultConfig.widthModal}
                onCancel={() => {
                    setFormData(initialValues);
                    config.setIsModalOpen(false);
                }}
            >
                <div className="container-fluid p-6">
                    <div className="font-[700] text-[25px] mb-[5px]">{config?.title || defaultConfig.title}</div>
                    <div className="text-gray-800 mb-[30px]">{config?.description || defaultConfig.description}</div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-12 gap-4">
                            {data.map((item, index) => {

                                const nameColumn = item.name || defaultField.name;
                                return (
                                    <div key={index} style={{ gridColumn: `span ${item.width}` }}>

                                        {item.type !== 'checkbox' && (
                                            <>
                                                <label htmlFor={nameColumn} className="block font-[700] mb-2">
                                                    {item.label || defaultField.label}
                                                    {item.isRequired && <span className="text-red-500 ml-1">*</span>}
                                                </label>
                                                {renderInput(item, index)}
                                            </>
                                        )}
                                        {item.type === 'checkbox' && (
                                            <>
                                                <div className="flex items-center">

                                                    {renderInput(item, index)}
                                                    <label htmlFor={nameColumn} className="ml-2">
                                                        {item.label}
                                                    </label>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex justify-end mt-[20px]">
                            <button
                                type="button"
                                onClick={() => {
                                    config.setIsModalOpen(false);
                                    setFormData(initialValues);
                                }}
                                className="mt-4 px-4 py-2 border border-gray-300 rounded-md mr-[10px] cursor-pointer"
                            >
                                {config.contentCancelButton || defaultConfig.contentCancelButton}
                            </button>
                            <button
                                type="submit"
                                className="mt-4 px-4 py-2 bg-neutral-900  text-white rounded  hover:bg-neutral-800 cursor-pointer"
                            >
                                {config.contentSubmitButton || defaultConfig.contentSubmitButton}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

        </>
    )
}

export default DynamicForm





