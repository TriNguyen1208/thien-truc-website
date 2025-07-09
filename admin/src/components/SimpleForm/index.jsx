import { useState, useMemo } from "react";
import { Modal } from 'antd';
const SimpleForm = ({ data, config }) => {
    const [focusedFields, setFocusedFields] = useState({});
    const defaultField = {
        type: 'text',
        name: '',
        placeholder: '',
        label: '',
        value: '',
        isRequired: false,
        width: 12,
    }
    const defaultConfig = {
        title: "Tạo loại sản phẩm mới",
        description: "Thêm loại sản phẩm mới với màu sắc đại diện",
        widthModal: 600,
    }
    const initialValues = useMemo(() => {
        const result = {};
        data.forEach(field => {
            const { name, value } = field;
            result[name] = value !== undefined ? value : '';
        });
        return result;
    }, [data]);
    const [formData, setFormData] = useState(initialValues);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
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
        let type = item.type || defaultField.type;
        let value = formData[nameColumn] || defaultField.value;
        const maxLength = item.maxLength || Infinity;
        const isInvalid = maxLength !== undefined && value.length >= maxLength;
        const isFocused = focusedFields[nameColumn] || false;
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

        return <
            input {...commonProps}
            type={type}
            value={value}
            placeholder={item.placeholder || defaultField.placeholder}
            maxLength={item.maxLength || undefined}
        />;
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
                                            <label htmlFor={nameColumn} className="block font-[700] mb-2">
                                                {item.label || defaultField.label}
                                                {item.isRequired && <span className="text-red-500 ml-1">*</span>}
                                            </label>
                                        )}
                                        {renderInput(item, index)}
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex justify-end mt-[20px]">
                            <button
                                type="button"
                                onClick={() => {
                                    console.log('Huy button');
                                    setFormData(initialValues);
                                    config.setIsModalOpenSimple(false)
                                }}
                                className="mt-4 px-4 py-2 border border-gray-300 rounded-md mr-[10px]"
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                className="mt-4 px-4 py-2 bg-neutral-900  text-white rounded  hover:bg-neutral-800 cursor-pointer"
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
export default SimpleForm


