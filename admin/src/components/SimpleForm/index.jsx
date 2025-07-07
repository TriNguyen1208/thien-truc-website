import { useState, useMemo } from "react";
import { Button, Modal } from 'antd';
const SimpleForm = ({ data, config}) => {
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
        const finalData = { ...formData };
        config.handleSubmitButton(finalData);
        setFormData(initialValues);
    }
    const handleChange = (e) => {
        const { name, value} = e.target;
        let newValue = value;
        console.log(name, value);
        setFormData((prev) => ({
            ...prev,
            [name]: newValue
        }))
    }
    const renderInput = (item) => {
        let nameColumn = item.name || defaultField.name;
        let type = item.type || defaultField.type;
        let value = formData[nameColumn] || defaultField.value;
        const commonProps = {
            name: nameColumn,
            id: nameColumn,
            onChange: handleChange,
            required: item.isRequired || defaultField.isRequired,
            className: "px-4 py-2 block border border-gray-300 w-full rounded-[5px]",
        };
        
        return <input {...commonProps} type={type} value={value} placeholder={item.placeholder || defaultField.placeholder} />;
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
                                    <div key={index} className={`col-span-${item.width || defaultField.width}`}>
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
                                onClick={config.handleCancelButton}
                                className="mt-4 px-4 py-2 border border-gray-300 rounded-md mr-[10px]"
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
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
export default SimpleForm