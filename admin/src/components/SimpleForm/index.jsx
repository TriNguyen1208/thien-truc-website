import { useState, useMemo, useEffect, useRef } from "react";
import { Modal } from 'antd';
import { ChromePicker } from "react-color";

const SimpleForm = ({ data, config }) => {
    const [focusedFields, setFocusedFields] = useState({});
    const defaultField = {
        type: 'text',
        name: '',
        placeholder: '',
        label: '',
        value: '',
        isRequired: false,
         limitRowDynamicFields: undefined,
        width: 12,
    }
    const defaultConfig = {
        title: "Tạo loại sản phẩm mới",
        description: "Thêm loại sản phẩm mới với màu sắc đại diện",
        widthModal: 600,
        contentCancelButton: "Hủy",
        contentSubmitButton: "Tạo loại",
    }
    const initialValues = useMemo(() => {
        const result = {};
        data.forEach(field => {
            const { name, type, value } = field;
            if (type === 'checkbox') {
                result[name] = value !== undefined ? value : false;
            }
            else {

                result[name] = value !== undefined ? value : '';
            }
        });
        return result;
    }, [data]);
    const [formData, setFormData] = useState(initialValues);
    useEffect(() => {
        setFormData(initialValues);
    }, [initialValues]);
    const handleSubmit = (e) => {
        e.preventDefault();
        config.handleSubmitButton(formData);
        setFormData(initialValues);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;
        setFormData((prev) => ({
            ...prev,
            [name]: newValue
        }))
    }
    const renderInput = (item) => {
        let nameColumn = item.name || defaultField.name;
        let value = formData[nameColumn] || defaultField.value;
        const isFocused = focusedFields[nameColumn] || false;
        if (item.customInput) {
            const CustomComponent = item.customInput;
            return (
                <CustomComponent
                    value={value}
                    onChange={(e) => handleChange({ target: { name: nameColumn, value: e?.target?.value ?? e } })}
                    onFocus={() => setFocusedFields(prev => ({ ...prev, [nameColumn]: true }))}
                    onBlur={() => setFocusedFields(prev => ({ ...prev, [nameColumn]: false }))}
                />
            );
        }

        let type = item.type || defaultField.type;
        const maxLength = item.maxLength || Infinity;
        const isInvalid = maxLength !== undefined && value.length >= maxLength;
        const commonProps = {
            name: nameColumn,
            id: nameColumn,
            value,
            onChange: handleChange,
            onFocus: () => setFocusedFields(prev => ({ ...prev, [nameColumn]: true })),
            onBlur: () => setFocusedFields(prev => ({ ...prev, [nameColumn]: false })),

            required: item.isRequired || defaultField.isRequired,
            maxLength: maxLength || undefined,
            style: {
                padding: '8px 12px',
                display: 'block',
                width: '100%',
                borderRadius: '5px',
                outline: 'none',
                border: isInvalid
                    ? '1px solid red'
                    : isFocused
                        ? '1px solid black'
                        : '1px solid #D1D5DB'
            }
        };
        const [showPicker, setShowPicker] = useState(false);
        const wrapperRef = useRef(null);
        switch (type) {
           case 'color':

            useEffect(() => {
                const handleClickOutside = (event) => {
                    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                        setShowPicker(false);
                    }
                };

                document.addEventListener('mousedown', handleClickOutside);
                return () => {
                    document.removeEventListener('mousedown', handleClickOutside);
                };
            }, []);

            return (
                <div className="relative inline-block" ref={wrapperRef}>
                    <div
                        className="flex items-center border border-gray-300 rounded px-2 pr-53 py-2 cursor-pointer"
                        onClick={() => setShowPicker(true)}
                        // style={{backgroundColor: value}}
                        >
                        <div
                            style={{
                                width: '32px',  
                                height: '32px',
                                backgroundColor: value,
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                marginRight: '8px'
                            }}
                        />
                        <input
                            {...commonProps}
                            type="text"
                            value={value}
                            className=" font-normal w-full outline-none bg-transparent"
                            style={{ width: '100px', cursor: 'pointer' }}   
                        />
                    </div>

                    {showPicker && (
                        <div className="absolute z-50 mt-2">
                            <ChromePicker
                                color={value}
                                onChangeComplete={(color) => {
                                    setFormData((prev) => ({
                                        ...prev,
                                        [nameColumn]: color.hex
                                    }));
                                }}
                                disableAlpha={true}
                            />
                        </div>
                    )}
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
                open={config?.isModalOpenSimple || false}
                footer={null}
                width={config?.widthModal || defaultConfig.widthModal}
                onCancel={() => config.setIsModalOpenSimple(false)}
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
                                    setFormData(initialValues);
                                    config.setIsModalOpenSimple(false)
                                }}
                                className="mt-4 px-4 py-2 border border-gray-300 rounded-md mr-[10px]"
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
export default SimpleForm


