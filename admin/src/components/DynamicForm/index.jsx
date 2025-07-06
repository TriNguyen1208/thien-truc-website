import { useState, useMemo, useRef } from "react";
import { Button, Modal } from 'antd';
const DynamicForm = ({ data, config }) => {
    const fileInputRef = useRef();
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
        options: [{ value: "", label: "" }],
    }
    const defaultConfig = {
        title: "",
        description: "",
        widthModal: 800,
    }
    const [urlInput, setUrlInput] = useState('');
    const initialValues = useMemo(() => {
        const result = {};
        data.forEach(field => {
            const { name, type, value, isSingleColumn, options } = field;

            if (type === 'dynamicFields') {
                if (value !== undefined) {
                    result[name] = isSingleColumn
                        ? [...value] // mảng đơn
                        : Object.entries(value).map(([k, v]) => ({ name: k, value: v }));
                } else {
                    result[name] = isSingleColumn ? [''] : [{ name: '', value: '' }];
                }
            } else if (type === 'checkbox') {
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
        return result;
    }, [data]);

    const [formData, setFormData] = useState(initialValues);

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalData = { ...formData };
        Object.keys(finalData).forEach(key => {
            const field = data.find(f => f.name === key);
            if (field?.type === 'dynamicFields') {
                if (field.isSingleColumn) {
                    // Trường hợp single column - trả về mảng các giá trị
                    finalData[key] = (finalData[key] || [])
                        .filter(spec => spec && spec.trim() !== '');
                } else {
                    // Trường hợp 2 cột - trả về object với key-value
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
    }

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        let newValue = value;
        if (type === 'checkbox') {
            newValue = checked;
        } else if (type === 'file') {
            newValue = files[0];
        }
        console.log(name, value);
        setFormData((prev) => ({
            ...prev,
            [name]: newValue
        }))
    }

    const handleDynamicFieldsChange = (fieldName, index, keyOrValue, value, isSingle = false) => {
        setFormData((prev) => {
            const specs = [...(prev[fieldName] || [])];
            if (isSingle) {
                specs[index] = value;
            } else {
                if (!specs[index]) specs[index] = { name: '', value: '' };
                specs[index][keyOrValue] = value;
            }
            return { ...prev, [fieldName]: specs };
        });
    };
    const handleImageUpload = (fieldName, file) => {
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFormData((prev) => ({
                ...prev,
                [fieldName]: imageUrl
            }));
        }
    };

    const handleImageUrl = (fieldName, url) => {
        if (url && url.trim()) {
            setFormData((prev) => ({
                ...prev,
                [fieldName]: url.trim()
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
        setFormData((prev) => ({
            ...prev,
            [fieldName]: [...(prev[fieldName] || []), isSingle ? '' : { name: '', value: '' }],
        }));
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
        let value = formData[nameColumn] || defaultField.value;
        const commonProps = {
            name: nameColumn,
            id: nameColumn,
            onChange: handleChange,
            required: item.isRequired || defaultField.isRequired,
            className: "px-2 py-1 block border border-gray-300 w-full rounded-[5px]",
        };

        switch (type) {
            case 'textarea':
                return (
                    <textarea
                        {...commonProps}
                        value={value}
                        rows={item.numberRows || defaultField.numberRows}
                        placeholder={item.placeholder || defaultField.placeholder}
                    />
                );
            case 'select':
                return (
                    <select {...commonProps} value={value}>
                        {(item.options || defaultField.options).map((opt, idx) => (
                            <option key={idx} value={opt.value} className="text-center">{opt.label}</option>
                        ))}
                    </select>
                );
            case 'checkbox':
                return (
                    <input
                        {...commonProps}
                        type="checkbox"
                        checked={!!formData[nameColumn]}
                        className="mr-2"
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
                        <div className="flex  gap-2 w-full items-stretch">
                            <input
                                type="url"
                                value={urlInput}
                                onChange={(e) => setUrlInput(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        if (!image) {
                                            handleImageUrl(nameColumn, urlInput);
                                            setUrlInput('');
                                        }
                                    }
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
                                className="h-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-300"
                            >
                                Upload ảnh
                            </button>
                        </div>


                        {/* Image Preview */}
                        {image && (
                            <div className="text-xs text-gray-700 break-all relative border border-gray-200 rounded-md p-2">
                                URL: {image}
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
                return (
                    <div>
                        {specs.map((entry, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                {!isSingle && (
                                    <input
                                        type="text"
                                        value={entry.name || ''}
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
                                    value={isSingle ? entry : entry.value || ''}
                                    onChange={(e) =>
                                        handleDynamicFieldsChange(
                                            nameColumn,
                                            index,
                                            isSingle ? null : 'value',
                                            e.target.value,
                                            isSingle
                                        )
                                    }
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md "
                                    placeholder={isSingle ? item.placeholder || defaultField.placeholder : item.placeholder?.[1] ?? defaultField.placeholder}
                                />
                                <button
                                    type="button"
                                    onClick={() => addDynamicFields(nameColumn, isSingle)}
                                    className="px-3 py-2  border  border-gray-300 rounded-md "
                                >
                                    +
                                </button>
                                {specs.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeDynamicFields(nameColumn, index)}
                                        className="px-3 py-2 border  border-gray-300 rounded-md "
                                    >
                                        −
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                );
            }
            default:
                return <input {...commonProps} type={type} value={value} placeholder={item.placeholder || defaultField.placeholder} />;
        }
    }

    return (
        <>
            <Modal
                closable={true}
                open={config?.isModalOpen || false}
                footer={null}
                width={config?.widthModal || defaultConfig.widthModal}
                onCancel={() => config.setIsModalOpen(false)}
            >
                <div className="container-fluid p-6">
                    <div className="font-[700] text-[25px] mb-[5px]">{config?.title || defaultConfig.title}</div>
                    <div className="text-gray-800 mb-[30px]">{config?.description || defaultConfig.description}</div>
                    <form >
                        <div className="grid grid-cols-12 gap-4">
                            {data.map((item, index) => {
                                const nameColumn = item.name || defaultField.name;
                                return (
                                    <div key={index} className={`col-span-${item.width || defaultField.width}`}>
                                        {item.type !== 'checkbox' && (
                                            <label htmlFor={nameColumn} className="block font-[700] mb-2">
                                                {item.label || defaultField.label}
                                                {item.isRequired && <span className="text-red-500 ml-1">*</span>}
                                            </label>
                                        )}
                                        {renderInput(item, index)}
                                        {item.type === 'checkbox' && (
                                            <label htmlFor={nameColumn} className="ml-2">
                                                {item.label}
                                            </label>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                onClick={config.handleCancelButton}
                                className="mt-4 px-4 py-2 border border-gray-300 rounded-md mr-[10px]"
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default DynamicForm
/*
import React from 'react'
import DynamicForm from '../../components/DynamicForm'
import { useState } from 'react';
import { Button, Modal } from 'antd';
const Manager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const data = [
    { name: 'username', label: 'Tên đăng nhập', type: 'text', width: 6, isRequired: false, placeholder: "VD: 123", value: "123" },
    { name: 'password', label: 'Mat khau', type: 'password', width: 6, isRequired: true },
    { name: 'fullName', label: 'Họ Tên', type: 'text', width: 12, isRequired: false, placeholder: "VD: Đỗ Nguyễn Minh Trí" },
    { name: 'description', label: 'Mô tả', type: 'textarea', width: 12, isRequired: true, placeholder: "VD: Đỗ Nguyễn Minh Trí", numberRows: 5 },
    {
      name: 'role', label: 'Chức vụ', type: 'select', width: 6, isRequired: true,
      options: [
        { value: "male", label: "Nam" },
        { value: "female", label: "Nữ" },
      ],
      value: 'male'
    },
    { name: 'agree', label: 'Đồng ý điều khoản', type: 'checkbox', width: 12 },
    {
      type: 'dynamicFields',
      name: 'technicalDetailsdfsf',
      label: 'Thông số kỹ thuậtdfdsf',
      isRequired: true,
      isSingleColumn: false,

      width: 6,
    },
    {
      type: 'dynamicFields',
      name: 'technicalDetails',
      label: 'Thông số kỹ thuật',
      isRequired: true,
      isSingleColumn: false,
      value: {
        "CPU": 'Intel i5',
        "RAM": '8GB',
      },
      placeholder: ["VD: 1", "VD: 2"],
      width: 12,
    },
    {
      type: 'dynamicFields',
      name: '123',
      label: 'Thông số',
      isRequired: true,
      isSingleColumn: true,
      placeholder: "VD: Toi la",
      width: 6,
    },
    { name: 'Trine123', label: 'Mô tả', type: 'image_upload', width: 12, isRequired: true, placeholder: "VD: Đỗ Nguyễn Minh Trí", numberRows: 5 },
  ]
  const handleSubmitButton = (valueForm) => {
    console.log('Day la button submit', valueForm)
    setIsModalOpen(false)
  }
  const handleCancelButton = () => {
    console.log('Day la button cancle')
    setIsModalOpen(false)
  }
  const config = {
    title: "123",
    description: "456",
    widthModal: 800,
    isModalOpen,
    handleSubmitButton,
    handleCancelButton,
    setIsModalOpen

  }
  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Open Modal
      </Button>
      <DynamicForm data={data} config={config} />
    </>
  )
}

export default Manager
*/