import React from 'react'
import EditBanner from '../../components/EditBanner'
import { useLayout } from "@/layouts/LayoutContext"
import { useEffect } from "react"
import DynamicForm from '../../components/DynamicForm'
import SearchBar from '../../components/Search'
import { useState } from 'react';
import { Button, Modal } from 'antd';
import useProjects from '../../hooks/useProjects';
import ColorBlock from '../../components/ColorBlock';
import Table from "../../components/Table"
import { DeleteIcon, EditIcon, UploadIcon } from "../../components/Icon"
import { CancelPopup } from '../../components/Popup'
import ProductImageCell from '../../components/ProductImageCell'
const Product = () => {
  const [isModalOpenAddProduct, setIsModalOpenAddProduct] = useState(false);
  const [isModalOpenEditProduct, setIsModalOpenEditProduct] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);

  const dataProductCategories = [
    { value: 'Chọn loại sản phẩm', label: 'Chọn loại sản phẩm' },
    { value: 'Iphone', label: 'IPhone' },
    { value: 'Apple', label: 'Apple' },

  ]
  const dataAddProduct = [
    { name: 'productName', label: 'Tên sản phẩm', type: 'text', width: 12, isRequired: true },
    { name: 'productCategories', label: 'Loại sản phẩm', type: 'select', width: 6, isRequired: false, options: dataProductCategories },
    { name: 'price', label: 'Giá (VND)', type: 'text', width: 6, isRequired: false, placeholder: "Nhập giá trị số (VD: 500.000)" },
    { name: 'warranty', label: 'Thời gian bảo hàng (tháng)', type: 'text', width: 12, isRequired: false, placeholder: 'Nhập giá trị số (VD: 12)' },
    { name: 'description', label: 'Mô tả', type: 'textarea', width: 12, isRequired: false },
    { type: 'dynamicFields', name: 'technicalDetails', label: 'Thông số kỹ thuật', isRequired: false, isSingleColumn: false, placeholder: ["Tên thông số", "Nội dung thông số"], width: 12 },
    { type: 'dynamicFields', name: 'characteristic', label: 'Đặc điểm', isRequired: false, isSingleColumn: true, placeholder: "Nội dung (tick vào ô bên phải nếu muốn là đặc điểm nổi bật)", width: 12, isCheckbox: true },
    { name: 'avatarImage', label: 'Ảnh đại diện', type: 'image_upload', width: 12, isRequired: false },
    { name: 'isDisplayHomePage', label: 'Trưng bày ở trang chủ', type: 'checkbox', width: 12 }
  ]
  const dataEditProduct = [
    { name: 'productName', label: 'Tên sản phẩm', type: 'text', width: 12, isRequired: true, value: "12 tháng" },
    { name: 'productCategories', label: 'Loại sản phẩm', type: 'select', width: 6, isRequired: false, options: dataProductCategories, value: "IPhone" },
    { name: 'price', label: 'Giá (VND)', type: 'text', width: 6, isRequired: false, placeholder: "Nhập giá trị số (VD: 500.000)", value: "30000" },
    { name: 'warranty', label: 'Thời gian bảo hàng (tháng)', type: 'text', width: 12, isRequired: false, placeholder: 'Nhập giá trị số (VD: 12)', value: "12" },
    { name: 'description', label: 'Mô tả', type: 'textarea', width: 12, isRequired: false, value: "Day la mo ta ngan gon nhat" },
    { type: 'dynamicFields', name: 'technicalDetails', label: 'Thông số kỹ thuật', isRequired: false, isSingleColumn: false, placeholder: ["Tên thông số", "Nội dung thông số"], width: 12, value: { "Toi la": "ABC", "Mot la ai": "Hai ba ra" } },
    { type: 'dynamicFields', name: 'characteristic', label: 'Đặc điểm', isRequired: false, isSingleColumn: true, placeholder: "Nội dung (tick vào ô bên phải nếu muốn là đặc điểm nổi bật)", width: 12, isCheckbox: true, value: [{ value: 'To la ABC', isCheckbox: true }] },
    { name: 'avatarImage', label: 'Ảnh đại diện', type: 'image_upload', width: 12, isRequired: false, value: "URL" },
    { name: 'isDisplayHomePage', label: 'Trưng bày ở trang chủ', type: 'checkbox', width: 12, value: true }
  ]
  const handleSubmitButtonAddProduct = (valueForm) => {
    console.log('Day la button submit', valueForm)
    setIsModalOpenAddProduct(false)
  }
  const handleCancelButtonAddProduct = () => {
    console.log('Day la button cancle')
    setIsModalOpenAddProduct(false)
  }
  const handleSubmitButtonEditProduct = (valueForm) => {
    console.log('Day la button submit', valueForm)
    setIsModalOpenEditProduct(false)
  }
  const handleCancelButtonEditProduct = () => {
    console.log('Day la button cancle')
    setIsModalOpenEditProduct(false)
  }
  const configAddProduct = {
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
  const configEditProduct = {
    title: "Thêm sản phẩm mới",
    description: "Điền thông tin để thêm sản phẩm mới",
    contentCancelButton: "Hủy",
    contentSubmitButton: "Thêm mới",
    widthModal: 800,
    isModalOpen: isModalOpenEditProduct,
    handleSubmitButton: handleSubmitButtonEditProduct,
    handleCancelButton: handleCancelButtonEditProduct,
    setIsModalOpen: setIsModalOpenEditProduct,
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
    hasButtonCategory: true,
    hasButtonDisplay: true,
    categories: categories,
    displays: displays,
    currentCategory: categories[0],
    currentDisplay: displays[0],
    placeholder: "Tìm kiếm theo tên sản phẩm hoặc mã sản phẩm",
    handleEnter: handleEnter,
    onSearch: handleSearch,
    handleSearchSuggestion: handleSearchSuggestion, //co 3 tham so la query, category = null, display = null,
  }
  const columns = ["Mã SP","Hình ảnh","Tên sản phẩm","Giá","Bảo hành","Trưng bày","Thao tác"]
  const dataTable = [
    [{ type: "text", content: "1" }, { type: "component", component: <ProductImageCell imageUrl="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center" productName="iPhone 15 Pro Max"></ProductImageCell> }, { type: "text", content: "Iphone 16 pro max" }, { type: "text", content: "3" }, { type: "text", content: "12 tháng" }, { type: "component", component: <div className='ml-[30px]'>      <input type="checkbox" className="w-5 h-5 accent-black" />    </div> }, { type: "array-components", components: [<button className="px-3 py-2 border  border-gray-300 rounded-md cursor-pointer" onClick={() => setIsModalOpenEditProduct(true)}    >      <EditIcon />    </button>, <button className="px-3 py-2 border  border-gray-300 rounded-md cursor-pointer" onClick={() => setOpenCancel(true)}    >      <DeleteIcon />    </button>,] }],
    [{ type: "text", content: "1" }, { type: "component", component: <ProductImageCell imageUrl="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center" productName="iPhone 15 Pro Max"></ProductImageCell> }, { type: "text", content: "Iphone 16 pro max" }, { type: "text", content: "3" }, { type: "text", content: "12 tháng" }, { type: "component", component: <div className='ml-[30px]'>      <input type="checkbox" className="w-5 h-5 accent-black" />    </div> }, { type: "array-components", components: [<button className="px-3 py-2 border  border-gray-300 rounded-md cursor-pointer" onClick={() => setIsModalOpenEditProduct(true)}    >      <EditIcon />    </button>, <button className="px-3 py-2 border  border-gray-300 rounded-md cursor-pointer" onClick={() => setOpenCancel(true)}    >      <DeleteIcon />    </button>,] }],
    [{ type: "text", content: "1" }, { type: "component", component: <ProductImageCell productName="iPhone 15 Pro Max"></ProductImageCell> }, { type: "text", content: "Iphone 16 pro max" }, { type: "text", content: "3" }, { type: "text", content: "12 (tháng)" }, { type: "component", component: <div className='ml-[30px]'>      <input type="checkbox" className="w-5 h-5 accent-black" />    </div> }, { type: "array-components", components: [<button className="px-3 py-2 border  border-gray-300 rounded-md cursor-pointer" onClick={() => setIsModalOpenEditProduct(true)}    >      <EditIcon />    </button>, <button className="px-3 py-2 border  border-gray-300 rounded-md cursor-pointer">      <DeleteIcon />    </button>,] }],
    [{ type: "text", content: "1" }, { type: "component", component: <ProductImageCell productName="iPhone 15 Pro Max"></ProductImageCell> }, { type: "text", content: "Iphone 16 pro max" }, { type: "text", content: "3" }, { type: "text", content: "12 tháng" }, { type: "component", component: <div className='ml-[30px]'>      <input type="checkbox" className="w-5 h-5 accent-black" />    </div> }, { type: "array-components", components: [<button className="px-3 py-2 border  border-gray-300 rounded-md cursor-pointer" onClick={() => setIsModalOpenEditProduct(true)}    >      <EditIcon />    </button>, <button className="px-3 py-2 border  border-gray-300 rounded-md cursor-pointer">      <DeleteIcon />    </button>,] }]
  ]
  return (
    <>
      <div className="bg-white px-6 py-6 rounded-lg shadow-sm border border-gray-200  mb-[25px]">
        <SearchBar data={dataSearch} />
      </div>
      <div className="bg-white px-6 py-6 rounded-lg shadow-sm border border-gray-200  mb-[25px]">
        <div className='text-[30px] font-[600] mb-[5px]'>
          Điện thoại
        </div>
        <div className='text-gray-600 mb-[30px]'>
          4 sản phẩm
        </div>
        <Table columns={columns} data={dataTable} isSetting={false} />

      </div>
      <DynamicForm data={dataEditProduct} config={configEditProduct} />
      <DynamicForm data={dataAddProduct} config={configAddProduct} />
      <CancelPopup 
        open={openCancel} 
        setOpen={setOpenCancel} 
        notification="Xác nhận xóa"
        subTitle = "Bạn có chắc chắc muốn xóa sản phẩm này ? "
        buttonAction2 = {() => {console.log("123"); setOpenCancel(false)}}
      />
    </>
  )
}

export default Product

/*
    configAddHighlightNews: {
      title: "Thêm tin tức nổi bật",
      description: "Điền thông tin thành tựu nổi bật của công ty",
      contentCancelButton: "Hủy",
      contentSubmitButton: "Thêm mới",
      widthModal: 550,
      isModalOpenSimple: isModalOpenAddHighlightNews,
      handleSubmitButton: handleSubmitButtonAddHighlightNews,
      handleCancelButton: handleCancelButtonAddHighlightNews,
      setIsModalOpenSimple: setIsModalOpenAddHighlightNews,
      dataSearchBar: {
        hasButtonCategory: true,
        categories: ["Tất cả danh mục", "Điện thoại", "Sản phẩm"],
        currentCategory: "Tất cả danh mục",
        placeholder: "Nhập mã hoặc tên tin tức",
        handleEnter: (id) => {
          console.log("Kết quả chọn:", id);
        },
        onSearch: (query, category, display) => {
          console.log(query, category, display)
        },
        handleSearchSuggestion: (query) => {
          return useProjects.getSearchSuggestions(query);
        }

      }
    },
*/