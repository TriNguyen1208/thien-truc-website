import React from 'react'
import EditBanner from '../../components/EditBanner'
import { useLayout } from "@/layouts/LayoutContext"
import { useEffect } from "react"
import DynamicForm from '../../components/DynamicForm'
import { useState } from 'react';
import { Button, Modal } from 'antd';
const Product = () => {
  const [isModalOpenAddProduct, setIsModalOpenAddProduct] = useState(false);
  const dataProductCategories = [
    { value: 'Chọn loại sản phẩm', label: 'Chọn loại sản phẩm' },
    { value: 'Iphone', label: 'IPhone' },
    { value: 'Apple', label: 'Apple' },

  ]
  const data = [
    { name: 'productName', label: 'Tên sản phẩm', type: 'text', width: 12, isRequired: true },
    { name: 'productCategories', label: 'Loại sản phẩm', type: 'select', width: 6, isRequired: false, options: dataProductCategories},
    { name: 'price', label: 'Giá (VND)', type: 'text', width: 6, isRequired: false, placeholder: "Nhập giá trị số (VD: 500.000)" },
    { name: 'warranty', label: 'Thời gian bảo hàng (tháng)', type: 'text', width: 12, isRequired: false, placeholder: 'Nhập giá trị số (VD: 12)' },
    { name: 'description', label: 'Mô tả', type: 'textarea', width: 12, isRequired: false },
    { type: 'dynamicFields', name: 'technicalDetails', label: 'Thông số kỹ thuật', isRequired: false, isSingleColumn: false, placeholder: ["Tên thông số", "Nội dung thông số"], width: 12},
    { type: 'dynamicFields', name: 'characteristic', label: 'Đặc điểm', isRequired: false, isSingleColumn: true, placeholder: "Nội dung (tick vào ô bên phải nếu muốn là đặc điểm nổi bật)", width: 12, isCheckbox: true},
    { name: 'avatarImage', label: 'Ảnh đại diện', type: 'image_upload', width: 12, isRequired: false},
    { name: 'isDisplayHomePage', label: 'Trưng bày ở trang chủ', type: 'checkbox', width: 12, }
  ]
  const handleSubmitButtonAddProduct = (valueForm) => {
    console.log('Day la button submit', valueForm)
    setIsModalOpenAddProduct(false)
  }
  const handleCancelButtonAddProduct = () => {
    console.log('Day la button cancle')
    setIsModalOpenAddProduct(false)
  }
  const config = {
    title: "Thêm sản phẩm mới",
    description: "Điền thông tin để thêm sản phẩm mới",
    contentCancelButton: "Hủy",
    contentSubmitButton: "Thêm mới",
    widthModal: 800,
    isModalOpen: isModalOpenAddProduct,
    handleSubmitButton: handleSubmitButtonAddProduct,
    handleCancelButton: handleCancelButtonAddProduct,
    setIsModalOpen: setIsModalOpenAddProduct,
  };
  const { setLayoutProps } = useLayout()
  useEffect(() => {
    setLayoutProps({
      title: "Quản lý sản phẩm",
      description: "Quản lý danh sách sản phẩm",
      hasButton: true,
      buttonLabel: "Thêm sản phẩm",
      buttonAction: () => {
        console.log("Open button")
        setIsModalOpenAddProduct(true);
      }
    })
  }, []);
  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 overflow-x-hidden">
        Content
        <Button type="primary" onClick={() => setIsModalOpenAddProduct(true)}>
          Open Modal
        </Button>
        <DynamicForm data={data} config={config} />
      </div>
    </>
  )
}

export default Product