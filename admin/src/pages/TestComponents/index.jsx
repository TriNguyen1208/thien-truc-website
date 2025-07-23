import React, { useRef, useState } from 'react';
import SearchBar from '../../components/Search';
import Setting from '../../components/Setting';
import LabelAssign from '../../components/LabelAssgin';
import useProjects from '../../hooks/useProjects';
import ColorBlock from '../../components/ColorBlock'
import { Button } from 'antd';
import Table from "../../components/Table"
const TestComponents = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const content = {
        title: `Quản lý danh sách dự án thuộc loại "Miền Bắc"`,
        description: `Chọn các dự án muốn thêm hoặc xóa khỏi loại "Miền Bắc"`,
        type: "dự án",
        category: "Miền Bắc",
        header: [
            "Mã dự án",
            "Tên dự án",
            "Khu vực",
        ]
    };
    const searchSettingRef = useRef({
      query: "",
      category: "Tất cả loại",
      display: "Tất cả trạng thái"
    })
    return (
        <Setting
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            content={content}
            useData={useProjects.projects}
            useDataSuggestion={useProjects}
            useDataCategories={useProjects.project_regions}
            searchSettingRef={searchSettingRef}
        />
    );

    // const columns = [
    //     "STT",
    //     "Tên loại sản phẩm",
    //     "Màu sắc",
    //     "Số lượng sản phẩm",
    //     "Sản phẩm",
    //     "Thao tác"
    // ]
    // const data = [
    //     [
    //         {
    //             type: "text",
    //             content: "1"
    //         },
    //         {
    //             type: "text",
    //             content: "Điện thoại"
    //         },
    //         {
    //             type: "component",
    //             component: <ColorBlock color="#3b82f6"/>
    //         },
    //         {
    //             type: "text",
    //             content: "3"
    //         },
    //         {
    //             type: "text",
    //             content: "Iphone 15 pro maxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxxxx"
    //         },
    //         {
    //             type: "array-components",
    //             components: [
    //                 <Button/>,
    //                 <Button/>,
    //                 <Button/>
    //             ]
    //         }
    //     ],
    //     [
    //         {
    //             type: "text",
    //             content: "1"
    //         },
    //         {
    //             type: "text",
    //             content: "Điện thoại"
    //         },
    //         {
    //             type: "component",
    //             component: <ColorBlock color="#3b82f6"/>
    //         },
    //         {
    //             type: "text",
    //             content: "3"
    //         },
    //         {
    //             type: "text",
    //             content: "Iphone 15 pro max"
    //         },
    //         {
    //             type: "array-components",
    //             components: [
    //                 <Button/>,
    //                 <Button/>,
    //                 <Button/>
    //             ]
    //         }
    //     ],
    //     [
    //         {
    //             type: "text",
    //             content: "1"
    //         },
    //         {
    //             type: "text",
    //             content: "Điện thoại"
    //         },
    //         {
    //             type: "component",
    //             component: <ColorBlock color="#3b82f6"/>
    //         },
    //         {
    //             type: "text",
    //             content: "3"
    //         },
    //         {
    //             type: "text",
    //             content: "Iphone 15 pro max"
    //         },
    //         {
    //             type: "array-components",
    //             components: [
    //                 <Button/>,
    //                 <Button/>,
    //                 <Button/>
    //             ]
    //         }
    //     ],
    //     [
    //         {
    //             type: "text",
    //             content: "1"
    //         },
    //         {
    //             type: "text",
    //             content: "Điện thoại"
    //         },
    //         {
    //             type: "component",
    //             component: <ColorBlock color="#3b82f6"/>
    //         },
    //         {
    //             type: "text",
    //             content: "3"
    //         },
    //         {
    //             type: "text",
    //             content: "Iphone 15 pro max"
    //         },
    //         {
    //             type: "array-components",
    //             components: [
    //                 <Button/>,
    //                 <Button/>,
    //                 <Button/>
    //             ]
    //         }
    //     ]
    // ]
    // const width = [
    //   "5%",
    //   "20%",
    //   "5%",
    //   "20%",
    //   "30%",
    //   "20%",
    // ]
    // return <Table columns={columns} data={data} isSetting={false} width={width}/>

    // const handleEnter = (id) => {
    //     console.log(id);
    // }
    // const handleSearch = (query) => {
    //     console.log(query)
    // }
    // const handleSearchSuggestion = (query) => {
    //     return useProjects.getSearchSuggestions(query);
    // }
    // const data = {
    //     hasButton: false,
    //     placeholder: "Tìm kiếm theo tên loại sản phẩm",
    //     handleEnter: handleEnter,
    //     onSearch: handleSearch,
    //     handleSearchSuggestion: handleSearchSuggestion, //co 3 tham so la query, category = null, display = null,
    //     currentQuery: ""
    // }
    // return <SearchBar data={data}/>
};

export default TestComponents;



/*
========== COMPONENT FORM ================= 
import React from 'react'
import DynamicForm from '../../components/DynamicForm'
import { useState } from 'react';
import { Button, Modal } from 'antd';
import DefaultLayout from '../../layouts/DefaultLayout';
const Manager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const data = [
    { name: 'productName', label: 'Tên sản phẩm', type: 'text', width: 12 },
    { name: 'password', label: 'Mat khau', type: 'password', width: 12},
    { name: 'fullName', label: 'Họ Tên', type: 'text', width: 12, isRequired: false, placeholder: "VD: Đỗ Nguyễn Minh Trí" },
    { name: 'description', label: 'Mô tả', type: 'textarea', width: 12, isRequired: true, placeholder: "VD: Đỗ Nguyễn Minh Trí", numberRows: 5, maxLength: 10},
    {
      name: 'categoriesProduct', label: 'Chức vụ', type: 'select', width: 6, isRequired: true,
      options: [
        { value: "Chọn loại sản phẩm", label: "Chọn loại sản phẩm" },
        { value: "Iphone", label: "IPhone" },
        { value: "Apple", label: "Apple" },
        { value: "Macbook", label: "Macbook" },
        { value: "Computer", label: "Computer" },
      ],
      value: 'Iphone',
    },
    { name: 'agree', label: 'Đồng ý điều khoản', type: 'checkbox', width: 12 },
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
  const config = {
    title: "Thêm sản phẩm mới",
    description: "Điền thông tin để thêm sản phẩm mới",
    widthModal: 800,
    contentCancelButton: "Huỷ",
    contentSubmitButton: "Tạo mới sản phẩm",
    isModalOpen,
    handleSubmitButton,
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