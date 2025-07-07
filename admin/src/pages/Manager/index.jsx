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
      limitRowDynamicFields: 5,
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