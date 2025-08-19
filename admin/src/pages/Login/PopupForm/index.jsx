import React, { useEffect, useRef, useState } from 'react';
import ButtonLayout from "@/components/ButtonLayout";

const PopupForm = ({
  title,
  description,
  fields,
  onSubmit,
  submitLabel = "Xác nhận",
  icon: Icon,
  extraAction = null,
  onExtraAction
}) => {
  const formRefs = useRef([]);
  const [formData, setFormData] = useState({});
  const [focusStates, setFocusStates] = useState({});

  useEffect(() => {
    const initialFormData = fields.reduce((acc, field) => {
      acc[field.name] = field.defaultValue || '';
      if (field.type === 'passwordToggle') {
        acc[`${field.name}_visible`] = false;
      }
      return acc;
    }, {});
    setFormData(initialFormData);

    const initialFocus = fields.reduce((acc, field) => {
      acc[field.name] = false;
      return acc;
    }, {});
    setFocusStates(initialFocus);
  }, [fields]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      formRefs.current.forEach((ref, index) => {
        if (ref && !ref.contains(e.target)) {
          setFocusStates((prev) => ({ ...prev, [fields[index].name]: false }));
        }
      });
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [fields]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleExtraAction = (e) => {
    e.preventDefault();
    onExtraAction && onExtraAction();
  };

  return (
    <div 
      className='w-screen h-screen flex justify-center items-center'
      style={{
        background: 'linear-gradient(to right, #eff6ff, #e0e7ff)',
      }}
    >
      <div className="flex flex-col rounded-[8px] border border-[#e5e7eb] shadow-sm bg-white px-1 pb-10">
        <div className="flex flex-col p-6 text-center">
          <div className="flex flex-col p-6 text-center">
            {Icon && <div className="pb-4 flex justify-center"><Icon /></div>}
            <div className='pt-1'>
              <h3 className='font-bold text-2xl'>{title}</h3>
            </div>
            <div className='pt-1'>
              <p className='text-[#71717A]'>{description}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {fields.map((field, index) => (
              <div key={field.name} ref={el => formRefs.current[index] = el} className="flex flex-col gap-3 pt-1">
                {field.label && (
                  <label htmlFor={field.name} className="text-left text-sm text-[#09090b] font-medium">
                    {field.label}
                  </label>
                )}
                <div className={`flex flex-row px-3 gap-4 border border-[#e4e4e7] ${focusStates[field.name] ? "border-gray-300 outline-none" : ""} h-10 rounded-md`}>
                  {field.icon && <span className="flex items-center">{field.icon}</span>}
                  <input
                    id={field.name}
                    type={
                      field.type === 'passwordToggle'
                        ? (formData[`${field.name}_visible`] ? "text" : "password")
                        : field.type
                    }
                    className="w-full outline-none text-sm"
                    placeholder={field.placeholder}
                    value={formData[field.name] || ''}
                    onFocus={() => setFocusStates((prev) => ({ ...prev, [field.name]: true }))}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                  />
                  {field.type === 'passwordToggle' && (
                    <span
                      className="flex items-center cursor-pointer"
                      onClick={() =>
                        handleChange(`${field.name}_visible`, !formData[`${field.name}_visible`])
                      }
                    >
                      {formData[`${field.name}_visible`] ? field.eyeOffIcon : field.eyeIcon}
                    </span>
                  )}
                </div>

                {/* Nút phụ (extraAction) chỉ hiển thị 1 lần sau trường cuối cùng nếu có */}
                {index === fields.length - 1 && extraAction && (
                  <button
                    type='button'
                    onClick={handleExtraAction}
                    className="mt-1 text-sm text-gray-400 hover:underline cursor-pointer self-end"
                  >
                    {extraAction}
                  </button>
                )}
              </div>
            ))}

            <div className="mt-2"></div>
            <ButtonLayout
              paddingX={16}
              backgroundColor="#18181B"
              height={40}
              htmlType="submit"
            >
              {submitLabel}
            </ButtonLayout>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PopupForm;
