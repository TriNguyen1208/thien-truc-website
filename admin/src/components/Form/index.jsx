import { useState, useRef  } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import {Input } from 'antd';
import { Upload, Link, Plus, Trash2 } from 'lucide-react';
const Form = () => {
    const [formData, setFormData] = useState({
    name: 'iPhone 15 Pro Max',
    category: 'Điện thoại',
    price: '29990000',
    warranty: '12',
    isUsed: false,
    description: 'Đây là mô tả của sản phẩm iPhone 15 Pro Max',
    specifications: [''],
    features: [''],
    imageLink: '',
    uploadedImage: null
  });
    const [numberInput, setNumberInput] = useState(1);
      const dynamicRefs = useRef([]);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
            // Lấy mảng giá trị từ các input động
    const dynamicValues = dynamicRefs.current
      .slice(0, numberInput)
      .map(ref => ref?.value || "");

    console.log("Các giá trị động:", dynamicValues);
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        console.log(name, value);
        setFormData((prev) => (
            {
                ...prev,
                [name]: value
            }
        ))
    }
  const addDynamicFields = () => {
  setFormData(prev => ({
    ...prev,
    specifications: [...(prev.specifications || []), { name: '', value: '' }]
  }));
};

const handleAddInput = () => {
  setNumberInput(prev => prev + 1)
}
const handleDynamicFieldsChange = (index, key, value) => {
  setFormData(prev => {
    const specs = [...(prev.specifications || [])];
    if (!specs[index]) specs[index] = { name: '', value: '' }; // tạo nếu chưa có
    specs[index][key] = value;
    return { ...prev, specifications: specs };
  });
};


return (
        <div className="container-fluid">
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                        <label htmlFor="userName" className="block"> Ten dang nhap <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="userName"
                            id="userName"
                            className="px-2 py-[3px] block border border-gray-300 w-full rounded-[5px]"
                            placeholder="VD: minhtri2607"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-span-6">
                        <label htmlFor="password" className="block"> Mật khẩu</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="px-2 py-1 block border border-gray-300 w-full rounded-[5px]"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-span-12">
                        <label htmlFor ="description" className="block"> Mo ta</label>
                        <textarea
                            name="description"
                            id="description"
                            rows={6}
                            className="px-2 py-1 block border border-gray-300 w-full rounded-[5px]"
                            placeholder="VD: minhtri2607"
                            onChange={handleChange}
                            maxLength={50}
                        />
                        <div>{formData.description?.length ?? 0} / {50}</div>
                    </div>
                      <div className="col-span-6">
                        <label htmlFor="facebook" className="block"> Facebook</label>
                        <input
                            type="url"
                            name="facebook"
                            id="facebook"
                            className="px-2 py-[3px] block border border-gray-300 w-full rounded-[5px]"
                            placeholder="VD: minhtri2607"
                            onChange={handleChange}
                        />
                      </div >
                      <div className="col-span-4">
                        <label htmlFor="fruit">Chọn loại trái cây:</label>
                        <select 
                            id="fruit" 
                            name="fruit" 
                            className="border border-gray-300 col-span-6 text-center py-1 w-full rounded-[5px]"
                            onChange={handleChange}
                        >
                          <option value="apple">Táo</option>
                          <option value="banana">Chuối</option>
                          <option value="orange">Cam</option>
                        </select> 
                      </div>
                      <div className="col-span-3">
                        <input 
                          value= "oke"
                          type="checkbox"
                          id = 'trung-bay'
                          name = 'trung-bay'
                          onChange={handleChange}
                          />
                        <label >Trung bay</label>
                      </div>
                      {/* <div className="col-span-12">
                         <label className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 cursor-pointer flex items-center justify-center gap-2">
                         <Upload size={18} />
                         Upload ảnh
                         <input
                         type="file"
                                multiple
                                accept="image/*"
                                onChange={handleChange}
                                className="hidden"
                                />
                                </label>
                                </div> */}
                      <div className="col-span-10">
                        {[...Array(numberInput)].map((_, index) => {
                          return(
                            <input
                            key={index}
                            type="text"
                            placeholder={`Input ${index + 1}`}
                            className="block mb-2"
                            ref={el => (dynamicRefs.current[index] = el)}
                            />
                            
                          )
                        })}
                      </div>
                      <button className="col-span-2" onClick={handleAddInput}>Them</button>
          {/* Thông số kỹ thuật */}
   <div>
     <label className="block text-sm font-medium text-gray-700 mb-2">
       Thông số kỹ thuật
     </label>
     {(formData.specifications || []).map((spec, index) => (
       <div key={index} className="flex gap-2 mb-2">
    <input
      type="text"
      value={spec.name}
      onChange={(e) => handleDynamicFieldsChange(index, 'name', e.target.value)}
      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="Tên thông số"
      />
    <input
      type="text"
      value={spec.value}
      onChange={(e) => handleDynamicFieldsChange(index, 'value', e.target.value)}
      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="Nội dung thông số"
    />
    <button
      type="button"
      onClick={addDynamicFields}
      className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md hover:bg-gray-100"
    >
      <Plus size={16} />
    </button>
  </div>
))}

   </div>

                </div>
                <button>Gui</button>
            </form>
        </div>
    )
  }
  export default Form;
  
  
  // ========== FORM KHO =============== 
  

// import React, { useState } from 'react';
// import { X, Plus, Upload } from 'lucide-react';

// export default function Form() {
//   const [formData, setFormData] = useState({
//     name: 'iPhone 15 Pro Max',
//     category: 'Điện thoại',
//     price: '29990000',
//     warranty: '12',
//     isUsed: false,
//     description: 'Đây là mô tả của sản phẩm iPhone 15 Pro Max',
//     specifications: [''],
//     features: [''],
//     imageLink: '',
//     uploadedImage: null
//   });

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleDynamicFieldsChange = (index, value) => {
//     const newSpecs = [...formData.specifications];
//     newSpecs[index] = value;
//     setFormData(prev => ({ ...prev, specifications: newSpecs }));
//   };

//   const addDynamicFields = () => {
//     setFormData(prev => ({
//       ...prev,
//       specifications: [...prev.specifications, '']
//     }));
//   };

//   const handleFeatureChange = (index, value) => {
//     const newFeatures = [...formData.features];
//     newFeatures[index] = value;
//     setFormData(prev => ({ ...prev, features: newFeatures }));
//   };

//   const addFeature = () => {
//     setFormData(prev => ({
//       ...prev,
//       features: [...prev.features, '']
//     }));
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setFormData(prev => ({
//         ...prev,
//         uploadedImage: imageUrl,
//         imageLink: '' // Clear link khi upload file
//       }));
//     }
//   };

//   const removeImage = () => {
//     setFormData(prev => ({
//       ...prev,
//       uploadedImage: null,
//       imageLink: ''
//     }));
//   };

//   const handleImageLinkChange = (e) => {
//     const { value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       imageLink: value,
//       uploadedImage: null // Clear uploaded image khi nhập link
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//     alert('Cập nhật sản phẩm thành công!');
//   };

//   const handleCancel = () => {
//     alert('Hủy cập nhật sản phẩm');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200">
//           <div>
//             <h1 className="text-xl font-semibold text-gray-900">Cập nhật sản phẩm</h1>
//             <p className="text-sm text-gray-500 mt-1">Chỉnh sửa thông tin sản phẩm</p>
//           </div>
//           <button className="p-2 hover:bg-gray-100 rounded-full">
//             <X size={20} className="text-gray-500" />
//           </button>
//         </div>

//         {/* Form */}
//         <div className="p-6 space-y-6">
//           {/* Tên sản phẩm */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Tên sản phẩm <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               required
//             />
//           </div>

//           {/* Loại sản phẩm và Giá */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Loại sản phẩm <span className="text-red-500">*</span>
//               </label>
//               <div className="flex">
//                 <select
//                   name="category"
//                   value={formData.category}
//                   onChange={handleInputChange}
//                   className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="Điện thoại">Điện thoại</option>
//                   <option value="Laptop">Laptop</option>
//                   <option value="Tablet">Tablet</option>
//                   <option value="Phụ kiện">Phụ kiện</option>
//                 </select>
//                 <button
//                   type="button"
//                   onClick={addDynamicFields}
//                   className="px-3 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-100"
//                 >
//                   <Plus size={16} />
//                 </button>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Giá (VND)
//               </label>
//               <input
//                 type="text"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//           </div>

//           {/* Thời gian bảo hành */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Thời gian bảo hành (tháng)
//             </label>
//             <input
//               type="number"
//               name="warranty"
//               value={formData.warranty}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>

//           {/* Checkbox trúng bảy ở trạng chú */}
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               name="isUsed"
//               checked={formData.isUsed}
//               onChange={handleInputChange}
//               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//             />
//             <label className="ml-2 text-sm text-gray-700">
//               Trúng bảy ở trạng chú
//             </label>
//           </div>

//           {/* Mô tả */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Mô tả
//             </label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               rows={4}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="Đây là mô tả của sản phẩm iPhone 15 Pro Max"
//             />
//           </div>

//           {/* Thông số kỹ thuật */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Thông số kỹ thuật
//             </label>
//             {formData.specifications.map((spec, index) => (
//               <div key={index} className="flex gap-2 mb-2">
//                 <input
//                   type="text"
//                   value={spec}
//                   onChange={(e) => handleDynamicFieldsChange(index, e.target.value)}
//                   className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Tên thông số"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Nội dung thông số"
//                   className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 <button
//                   type="button"
//                   onClick={addDynamicFields}
//                   className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md hover:bg-gray-100"
//                 >
//                   <Plus size={16} />
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* Đặc điểm */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Đặc điểm
//             </label>
//             {formData.features.map((feature, index) => (
//               <div key={index} className="flex gap-2 mb-2">
//                 <input
//                   type="text"
//                   value={feature}
//                   onChange={(e) => handleFeatureChange(index, e.target.value)}
//                   className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Nội dung tích vào ô bên phải nếu muốn in đặc điểm nổi bật"
//                 />
//                 <button
//                   type="button"
//                   onClick={addFeature}
//                   className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md hover:bg-gray-100"
//                 >
//                   <Plus size={16} />
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* Ảnh đại diện */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Ảnh đại diện
//             </label>
            
//             {/* Input nhập link ảnh */}
//             <div className="flex gap-2 mb-3">
//               <input
//                 type="text"
//                 name="imageLink"
//                 value={formData.imageLink}
//                 onChange={handleImageLinkChange}
//                 className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                 placeholder="Nhập link ảnh"
//               />
//               <label className="relative cursor-pointer">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFileUpload}
//                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                 />
//                 <div className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors inline-flex items-center gap-2 text-sm">
//                   <Upload size={16} />
//                   Upload ảnh
//                 </div>
//               </label>
//             </div>

//             {/* Hiển thị ảnh */}
//             {(formData.imageLink || formData.uploadedImage) && (
//               <div className="mb-3">
//                 <div className="relative inline-block">
//                   <img
//                     src={formData.uploadedImage || formData.imageLink}
//                     alt="Preview ảnh sản phẩm"
//                     className="w-32 h-32 object-cover rounded-md border border-gray-300"
//                     onError={(e) => {
//                       e.target.style.display = 'none';
//                     }}
//                   />
//                   <button
//                     type="button"
//                     onClick={removeImage}
//                     className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
//                   >
//                     ×
//                   </button>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-1">
//                   {formData.uploadedImage ? 'Ảnh đã upload' : 'Ảnh từ link'}
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="flex justify-end gap-3 p-6 bg-gray-50 border-t border-gray-200">
//           <button
//             type="button"
//             onClick={handleCancel}
//             className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
//           >
//             Hủy
//           </button>
//           <button
//             type="submit"
//             onClick={handleSubmit}
//             className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
//           >
//             Cập nhật
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }