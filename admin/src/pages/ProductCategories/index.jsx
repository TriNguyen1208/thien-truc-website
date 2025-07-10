import React from 'react'
import EditBanner from '../../components/EditBanner'
import { useLayout } from "@/layouts/LayoutContext"
import { useEffect } from "react"
import SimpleForm from '../../components/SimpleForm'
import SearchBar from '../../components/Search'
import { useState } from 'react';
import { Button, Modal } from 'antd';
import useProjects from '../../hooks/useProjects';
import ColorBlock from '../../components/ColorBlock';
import Table from "../../components/Table"
import { DeleteIcon, EditIcon, SettingIcon } from "../../components/Icon"
import { CancelPopup } from '../../components/Popup'
import Setting from '../../components/Setting';
const ProductPageContent = () => {
  const [isModalOpenAddProductCategories, setIsModalOpenAddProductCategories] = useState(false);
  const [isModalOpenEditProductCategories, setIsModalOpenEditProductCategories] = useState(false);
  const [isModalOpenSetting, setIsModalOpenSetting] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const contentSetting = {
    title: `Quản lý danh sách dự án thuộc loại "Miền Bắc"`,
    description: `Chọn các dự án muốn thêm hoặc xóa khỏi loại "Miền Bắc"`,
    type: "dự án",
    category: "Miền Bắc",
    header: [
      "Mã dự án",
      "Tên dự án",
      "Khu vực",
    ]
  };
  const dataAddProductCategories = [
    { name: 'productNameCategories', label: 'Tên loại sản phẩm', type: 'text', width: 12, isRequired: true },
  ]
  const dataEditProductCategories = [
    { name: 'productNameCategories', label: 'Tên loại sản phẩm', type: 'text', width: 12, isRequired: true, value: "Điện thoại" },
  ]
  const handleSubmitButtonAddProductCategories = (valueForm) => {
    console.log('Day la button submit', valueForm)
    setIsModalOpenAddProductCategories(false)
  }
  const handleCancelButtonAddProductCategories = () => {
    console.log('Day la button cancle')
    setIsModalOpenAddProductCategories(false)
  }
  const handleSubmitButtonEditProductCategories = (valueForm) => {
    console.log('Day la button submit', valueForm)
    setIsModalOpenEditProductCategories(false)
  }
  const handleCancelButtonEditProductCategories = () => {
    console.log('Day la button cancle')
    setIsModalOpenEditProductCategories(false)
  }
  const configAddProductCategories = {
    title: "Tạo loại sản phẩm mới",
    description: "Thêm loại sản phẩm mới",
    contentCancelButton: "Hủy",
    contentSubmitButton: "Thêm mới",
    widthModal: 550,
    isModalOpenSimple: isModalOpenAddProductCategories,
    handleSubmitButton: handleSubmitButtonAddProductCategories,
    handleCancelButton: handleCancelButtonAddProductCategories,
    setIsModalOpenSimple: setIsModalOpenAddProductCategories,
  };
  const configEditProductCategories = {
    title: "Tạo loại sản phẩm mới",
    description: "Thêm loại sản phẩm mới",
    contentCancelButton: "Hủy",
    contentSubmitButton: "Thêm mới",
    widthModal: 550,
    isModalOpenSimple: isModalOpenEditProductCategories,
    handleSubmitButton: handleSubmitButtonEditProductCategories,
    handleCancelButton: handleCancelButtonEditProductCategories,
    setIsModalOpenSimple: setIsModalOpenEditProductCategories,
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
        setIsModalOpenAddProductCategories(true);
      }
    })
  }, []);
  const handleEnter = (id) => {
    console.log(id);
  }
  const categories = ["Tất cả danh mục", "Điện thoại", "Máy tính", "Phụ kiện"];
  const displays = ["Tất cả trạng thái", "Đang hoạt động", "Ngừng kinh doanh"];
  const handleSearch = (query, category, display) => {
    console.log(query, category, display)
  }
  const handleSearchSuggestion = (query) => {
    return useProjects.getSearchSuggestions(query);
  }
  const dataSearch = {
    hasButtonCategory: false,
    hasButtonDisplay: false,
    categories: categories,
    displays: displays,
    currentCategory: categories[0],
    currentDisplay: displays[0],
    placeholder: "Tìm kiếm theo tên sản phẩm hoặc mã sản phẩm",
    handleEnter: handleEnter,
    onSearch: handleSearch,
    handleSearchSuggestion: handleSearchSuggestion, //co 3 tham so la query, category = null, display = null,
  }
  const columns = [
    "Số TT",
    "Tên loại sản phẩm",
    "Số lượng",
    "Thao tác",
  ]
  const dataTable = [
    [
      {
        type: "text",
        content: "1"
      },

      {
        type: "text",
        content: "Iphone 16 pro max"
      },
      {
        type: "text",
        content: "3"
      },
      {
        type: "array-components",
        components: [
          <button
            className="px-3 py-2 border  border-gray-300 rounded-md cursor-pointer"
            onClick={() =>  setIsModalOpenSetting(true)}
          >
            <SettingIcon />
          </button>,
          <button
            className="px-3 py-2 border  border-gray-300 rounded-md cursor-pointer"
            onClick={() => setIsModalOpenEditProductCategories(true)}
          >
            <EditIcon />
          </button>,
          <button
            className="px-3 py-2 border  border-gray-300 rounded-md cursor-pointer"
            onClick={() => setOpenCancel(true)}
          >
            <DeleteIcon />
          </button>,
        ]
      }
    ],
    [
      {
        type: "text",
        content: "1"
      },

      {
        type: "text",
        content: "Iphone 16 pro max"
      },
      {
        type: "text",
        content: "3"
      },
      {
        type: "array-components",
        components: [
          <button
            className="px-3 py-2 border  border-gray-300 rounded-md cursor-pointer"
            onClick={() => {
              setIsModalOpenSetting(true);

            }}
          >
            <SettingIcon />
          </button>,
          <button
            className="px-3 py-2 border  border-gray-300 rounded-md cursor-pointer"
            onClick={() => setIsModalOpenEditProductCategories(true)}
          >
            <EditIcon />
          </button>,
          <button
            className="px-3 py-2 border  border-gray-300 rounded-md cursor-pointer"
            onClick={() => setOpenCancel(true)}
          >
            <DeleteIcon />
          </button>,
        ]
      }
    ],
    [
      {
        type: "text",
        content: "1"
      },

      {
        type: "text",
        content: "Iphone 16 pro max"
      },
      {
        type: "text",
        content: "3"
      },

      {
        type: "array-components",
        components: [
          <button
            className="px-3 py-2 border  border-gray-300 rounded-md cursor-pointer"
            onClick={() => setIsModalOpenEditProductCategories(true)}
          >
            <SettingIcon />
          </button>,
          <button
            className="px-3 py-2 border  border-gray-300 rounded-md cursor-pointer"
            onClick={() => setIsModalOpenEditProductCategories(true)}
          >
            <EditIcon />
          </button>,
          <button className="px-3 py-2 border  border-gray-300 rounded-md cursor-pointer">
            <DeleteIcon />
          </button>,
        ]
      }
    ],
    [
      {
        type: "text",
        content: "1"
      },
      {
        type: "text",
        content: "Iphone 16 pro max"
      },
      {
        type: "text",
        content: "3"
      },
      {
        type: "array-components",
        components: [
          <button
            className="px-3 py-2 border  border-gray-300 rounded-md cursor-pointer"
            onClick={() => setIsModalOpenEditProductCategories(true)}
          >
            <SettingIcon />
          </button>,
          <button
            className="px-3 py-2 border  border-gray-300 rounded-md cursor-pointer"
            onClick={() => setIsModalOpenEditProductCategories(true)}
          >
            <EditIcon />
          </button>,
          <button className="px-3 py-2 border  border-gray-300 rounded-md cursor-pointer">
            <DeleteIcon />
          </button>,
        ]
      }
    ]
  ]
  return (
    <>
      <div className="bg-white px-6 py-6 rounded-lg shadow-sm border border-gray-200  mb-[25px]">
        <SearchBar data={dataSearch} />
      </div>
      <div className="bg-white px-6 py-6 rounded-lg shadow-sm border border-gray-200  mb-[25px]">
        <div className='text-[30px] font-[600] mb-[5px]'>
          Danh sách loại sản phẩm
        </div>
        <div className='text-gray-600 mb-[30px]'>
          Tổng cộng 3 loại sản phẩm
        </div>
        <Table columns={columns} data={dataTable} isSetting={false} />

      </div>
      <SimpleForm data={dataEditProductCategories} config={configEditProductCategories} />
      <SimpleForm data={dataAddProductCategories} config={configAddProductCategories} />
      <CancelPopup
        open={openCancel}
        setOpen={setOpenCancel}
        notification="Xác nhận xóa"
        subTitle="Bạn có chắc chắc muốn xóa loại sản phẩm này ? "
        buttonAction2={() => { console.log("123"); setOpenCancel(false) }}
      />
      <Setting
        isOpen={isModalOpenSetting}
        onClose={() => setIsModalOpenSetting(false)}
        content={contentSetting}
        useData={useProjects.projects}
        useDataSuggestion={useProjects}
        useDataCategories={useProjects.project_regions}
      />
    </>
  )
}

export default ProductPageContent