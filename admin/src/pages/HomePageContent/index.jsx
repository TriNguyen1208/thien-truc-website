import React, { useEffect } from 'react'
import EditBanner from "../../components/EditBanner"
import FeatureCard from '../../components/FeatureCard';
import Button from '@/components/Button'
import { AddIcon, EditIcon, SubtractIcon, ArrowDownIcon, ArrowUpIcon, SaveIcon } from '../../components/Icon';
import SimpleForm from '../../components/SimpleForm'
import { useState } from 'react';
import { CancelPopup } from '../../components/Popup'
import useProjects from '../../hooks/useProjects';
import Table from "../../components/Table"
import SearchBar from '../../components/Search'
import ProductImageCell from '../../components/ProductImageCell'
import useHome from '../../hooks/useHome';
const HomePageContent = () => {


  // ============= BANNER TRANG CHU ===================== 
  const configHomePage = {
    title: "Banner Trang chủ",
    description: "Chỉnh sửa tiêu đề và mô tả banner",
    listInput: [
      { label: 'Tiêu đề Banner', placeholder: 'Nhập tiêu đề...', contentCurrent: 'Chào mừng đến với thiên trúc', isRequire: true },
      { label: 'Mô tả Banner', placeholder: 'Nhập mô tả...', contentCurrent: 'Đối tác tin cậy trong lĩnh vực công nghệ và giải pháp thông minh', isRequire: true },
    ],
    handleSave: (values) => {
      console.log('Giá trị đã lưu:', values);
      // Gửi dữ liệu lên server hoặc cập nhật state
    }
  }


  // ============= BANNER ABOUT US  ===================== 
  const configAboutUs = {
    title: "Giới thiệu về công ty Thiên Trúc",
    description: "Đoạn văn và ảnh đại diện công ty",
    listInput: [
      { label: 'Nội dung giới thiệu', placeholder: 'Nhập tiêu đề...', contentCurrent: 'Công ty thiên trúc là đơn vị hàng đầu trong gì đó...', isRequire: true },
      { label: 'Ảnh đại diện (URL)', placeholder: 'Nhập url...', contentCurrent: 'https://minhtridepzai.com', isRequire: false },
    ],
    handleSave: (values) => {
      console.log('Giá trị đã lưu:', values);
      // Gửi dữ liệu lên server hoặc cập nhật state
    }
  }


  // ===================== HIGHLIGHT FEATURE =================== 
  const limitHighlightFeature = 3
  const [isModalOpenAddHighlightFeature, setIsModalOpenAddHighlightFeature] = useState(false);
  const [isModalOpenEditHighlightFeature, setIsModalOpenEditHighlightFeature] = useState(false);
  const [isOpenCancelHighlightFeature, setIsOpenCancelHighlightFeature] = useState(false);
  const [idCurrentEditHighlightFeature, setIdCurrentEditHighlightFeature] = useState(null);


  const [isModalOpenAddHighlightNews, setIsModalOpenAddHighlightNews] = useState(false);


  const { mutate: updateHighlightFeature, isLoading: isLoadingUpdateHighlightFeature } = useHome.highlight_stats_about_us.updateOne();
  const { mutate: createHighlightFeature, isLoading: isLoadingCreateHighlightFeature } = useHome.highlight_stats_about_us.createOne();
  const { mutate: deleteHighlightFeature, isLoading: isLoadingDeleteHighlightFeature } = useHome.highlight_stats_about_us.deleteOne();

  const [dataEditHighlightFeature, setDataEditHighlightFeature] = useState([
    { name: 'figures', label: 'Số liệu', type: 'text', width: 12, isRequired: false, placeholder: "VD: 100+" },
    { name: 'achievementName', label: 'Tên thành tựu', type: 'text', width: 12, isRequired: false, placeholder: "VD: dự án hoàn thành" },
  ]);

  const { data: highlightFeatureData, isLoading: isLoadingHighlightFeature } = useHome.highlight_stats_about_us.getAll();

  if (isLoadingHighlightFeature) {
    return (
      <>
        is loading....
      </>
    )
  }
 
  console.log(highlightFeatureData);
  const handleSubmitButtonAddHighlightFeature = (valueForm) => {
    console.log('Day la button submit', valueForm)
    createHighlightFeature(valueForm);
    setIsModalOpenAddHighlightFeature(false)
  }
  const handleCancelButtonAddHighlightFeature = () => {
    console.log('Day la button cancle')
    setIsModalOpenAddHighlightFeature(false)
  }
  const handleSubmitButtonEditHighlightFeature = (valueForm) => {
    console.log('Day la button submit', valueForm)
    updateHighlightFeature({
      id: idCurrentEditHighlightFeature,
      data: valueForm,
    })
    setIsModalOpenEditHighlightFeature(false)
  }
  const handleCancelButtonEditHighlightFeature = () => {
    console.log('Day la button cancle')
    setIsModalOpenEditHighlightFeature(false)
  }
  const configHighlightFeature = {
    title: "Thông số nổi bật của công ty",
    description: "Tối đa 3 thành tựu nổi bật",
    propsAddButton: {
      Icon: AddIcon,
      text: "Thêm thông số",
      colorText: "#ffffff",
      colorBackground: "#000000",
      padding: 8,
    },
    propsSaveButton: {
      Icon: SaveIcon,
      text: "Lưu thông số ",
      colorText: "#ffffff",
      colorBackground: "#000000",
      padding: 8,
    },
    arrayFeatureCard: highlightFeatureData,
    configAddHighlightFeature: {
      title: "Thêm thông số mới",
      description: "Điền thông tin thành tựu nổi bật của công ty",
      contentCancelButton: "Hủy",
      contentSubmitButton: "Thêm mới",
      widthModal: 550,
      isModalOpenSimple: isModalOpenAddHighlightFeature,
      handleSubmitButton: handleSubmitButtonAddHighlightFeature,
      handleCancelButton: handleCancelButtonAddHighlightFeature,
      setIsModalOpenSimple: setIsModalOpenAddHighlightFeature,
    },
    dataAddHighlightFeature: [
      { name: 'figures', label: 'Số liệu', type: 'text', width: 12, isRequired: false, placeholder: "VD: 100+" },
      { name: 'achievementName', label: 'Tên thành tựu', type: 'text', width: 12, isRequired: false, placeholder: "VD: dự án hoàn thành" },
    ],
    configEditHighlightFeature: {
      title: "Chỉnh sửa thông số",
      description: "Điền thông tin thành tựu nổi bật của công ty",
      contentCancelButton: "Hủy",
      contentSubmitButton: "Cập nhật",
      widthModal: 550,
      isModalOpenSimple: isModalOpenEditHighlightFeature,
      handleSubmitButton: handleSubmitButtonEditHighlightFeature,
      handleCancelButton: handleCancelButtonEditHighlightFeature,
      setIsModalOpenSimple: setIsModalOpenEditHighlightFeature,
    },
    cancelPopub: {
      open: isOpenCancelHighlightFeature,
      setOpen: setIsOpenCancelHighlightFeature,
      notification: "Xác nhận xóa",
      subTitle: "Bạn có chắc chắn muốn xóa thông số nổi bật này ? ",
      buttonAction2: () => { setIsOpenCancelHighlightFeature(false) },
    }
  }
  const handleEditButton = (item) => {

    const updatedForm = [
      { ...dataEditHighlightFeature[0], value: item.number_text },
      { ...dataEditHighlightFeature[1], value: item.label }
    ];
    setDataEditHighlightFeature(updatedForm);
    setIsModalOpenEditHighlightFeature(true);
    setIdCurrentEditHighlightFeature(item.id);
    console.log(dataEditHighlightFeature);
  }
  const handleDeleteButton = (item) => {
    setIsOpenCancelHighlightFeature(true);
    console.log(item);
  }

  // ===================== HIGHLIGHT NEWS =================== 

  const handleSubmitButtonAddHighlightNews = (valueForm) => {
    console.log('Day la button submit', valueForm)
    setIsModalOpenAddHighlightNews(false)
  }
  const handleCancelButtonAddHighlightNews = () => {
    console.log('Day la button cancle')
    setIsModalOpenAddHighlightNews(false)
  }
  const configHighlightNews = {
    title: "Danh sách tin tức nổi bật",
    description: "4 tin tức",
    propsAddButton: {
      Icon: AddIcon,
      text: "Thêm tin tức",
      colorText: "#ffffff",
      colorBackground: "#000000",
      padding: 8,

    },
    propsSaveButton: {
      Icon: SaveIcon,
      text: "Lưu tin tức nổi bật",
      colorText: "#ffffff",
      colorBackground: "#000000",
      padding: 9,
    },
    configAddHighlightNews: {
      title: "Thêm tin tức nổi bật",
      description: "Điền thông tin thành tựu nổi bật của công ty",
      contentCancelButton: "Hủy",
      contentSubmitButton: "Thêm mới",
      widthModal: 700,
      isModalOpenSimple: isModalOpenAddHighlightNews,
      handleSubmitButton: handleSubmitButtonAddHighlightNews,
      handleCancelButton: handleCancelButtonAddHighlightNews,
      setIsModalOpenSimple: setIsModalOpenAddHighlightNews,
    },
    dataAddHighlightNews: [
      {
        name: 'search',
        label: 'Tìm kiếm sản phẩm',
        width: 12,
        customInput: ({ value }) => (
          <SearchBar
            data={{
              hasButtonCategory: true,
              categories: ["Tất cả danh mục", "Điện thoại", "Sản phẩm"],
              currentCategory: "Tất cả danh mục",
              placeholder: "Tìm kiếm...",
              currentQuery: value,
              handleEnter: (id) => {
                console.log("Kết quả chọn:", id);
              },
              onSearch: (query, category, display) => {
                console.log(query, category, display)
              },
              handleSearchSuggestion: (query) => {
                return useProjects.getSearchSuggestions(query);
              }
            }}
          />
        )
      },
      { name: 'putOnTop', label: 'Đặt lên đầu', type: 'checkbox', width: 12 }
    ],
    table: {
      columns: ["Thứ tự", "Mã tin tức", "Ảnh", "Tiêu đề", "Loại tin tức", "Ngày xuất bản", "Thao tác"],
      data: [
        [
          {
            type: "component", component: <div className='flex flex-col gap-2'>
              <button className='px-3  border border-gray-300 rounded-sm w-[50px]'><ArrowUpIcon className="text-gray-300" /></button>
              <button className='px-3  border border-gray-300 rounded-sm w-[50px]'><ArrowDownIcon className="text-gray-300" /></button>
            </div>
          },
          { type: "text", content: "1" },
          { type: "component", component: <ProductImageCell imageUrl="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center" productName="iPhone 15 Pro Max"></ProductImageCell> },
          { type: "text", content: "Ra mắt sản phẩm Iphone 15 promax" },
          { type: "text", content: "Công ty" },
          { type: "text", content: "15/01/2024" },
          {
            type: "array-components", components: [
              <button className="px-3 py-2 border  border-gray-300 rounded-md cursor-pointer" onClick={() => console.log("123")}    >      <EditIcon />    </button>,
              <button className="px-2 py-2 border  border-gray-300 rounded-md cursor-pointer">      <SubtractIcon />    </button>,
            ]
          }],
        [
          {
            type: "component", component: <div className='flex flex-col gap-2'>
              <button className='px-3  border border-gray-300 rounded-sm w-[50px]'><ArrowUpIcon className="text-gray-300" /></button>
              <button className='px-3  border border-gray-300 rounded-sm w-[50px]'><ArrowDownIcon className="text-gray-300" /></button>
            </div>
          },
          { type: "text", content: "1" },
          { type: "component", component: <ProductImageCell imageUrl="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center" productName="iPhone 15 Pro Max"></ProductImageCell> },
          { type: "text", content: "Ra mắt sản phẩm Iphone 15 promax" },
          { type: "text", content: "Công ty" },
          { type: "text", content: "15/01/2024" },
          {
            type: "array-components", components: [
              <button className="px-3 py-2 border  border-gray-300 rounded-md cursor-pointer" onClick={() => console.log("123")}    >      <EditIcon />    </button>,
              <button className="px-2 py-2 border  border-gray-300 rounded-md cursor-pointer">      <SubtractIcon />    </button>,
            ]
          }]
      ]
    }

  }

  return (
    <>
      <EditBanner
        title={configHomePage.title}
        description={configHomePage.description}
        listInput={configHomePage.listInput}
        saveButton={configHomePage.handleSave}
      />
      <div className='mt-[40px]'></div>
      <EditBanner
        title={configAboutUs.title}
        description={configAboutUs.description}
        listInput={configAboutUs.listInput}
        saveButton={configAboutUs.handleSave}
      />
      <div className="flex flex-col p-[24px] bg-white w-full h-full border border-[#E5E7EB] rounded-[8px] mt-[40px]">
        <div className='flex items-center justify-between'>
          <div>
            <div className="mb-[4px]">
              <h1 className="text-[24px] text-black font-semibold">
                {configHighlightFeature.title}
              </h1>
            </div>
            <div className="mb-[24px]">
              <p className="text-[14px] text-[#71717A] font-regular">
                {configHighlightFeature.description}
              </p>
            </div>
          </div>
          <div className='w-[160px] h-40[px]'>
            <button type="submit"
              className='w-[170px]'
              onClick={() => setIsModalOpenAddHighlightFeature(true)}
              disabled={configHighlightFeature.arrayFeatureCard.length >= limitHighlightFeature}> <Button {...configHighlightFeature.propsAddButton} /></button>
          </div>
        </div>
        <div className='grid grid-cols-12 gap-6 mb-[25px]'>
          {(configHighlightFeature.arrayFeatureCard || []).map((item, index) =>
            <div className='col-span-4' key={index}>
              <FeatureCard
                title={item.number_text}
                description={item.label}
                buttonEdit={
                  <button onClick={() => handleEditButton(item)}>
                    <EditIcon />
                  </button>
                }
                buttonDelete={
                  <button onClick={() => handleDeleteButton(item)}>
                    <SubtractIcon />
                  </button>
                }
              />
            </div>)}

        </div>
        <div className='w-[160px] h-40[px]'>
            <button type="submit"
              className='w-[170px]'
              onClick={() => setIsModalOpenAddHighlightFeature(true)}
              disabled={configHighlightFeature.arrayFeatureCard.length >= limitHighlightFeature}> <Button {...configHighlightFeature.propsAddButton} /></button>
          </div>
      </div>
      <div className="flex flex-col p-[24px] bg-white w-full h-full border border-[#E5E7EB] rounded-[8px] mt-[40px]">
        <div className='flex items-center justify-between mb-[30px]'>
          <div>
            <div className="mb-[4px]">
              <h1 className="text-[24px] text-black font-semibold">
                {configHighlightNews.title}
              </h1>
            </div>
            <div className="mb-[24px]">
              <p className="text-[14px] text-[#71717A] font-regular">
                {configHighlightNews.description}
              </p>
            </div>
          </div>
          <div className='w-[160px] h-[40px]'>
            <button type="submit" className='w-[155px]' onClick={() => setIsModalOpenAddHighlightNews(true)}> <Button {...configHighlightNews.propsAddButton} /></button>
          </div>

        </div>
        <div className='mb-[30px]'>
          <Table columns={configHighlightNews.table.columns} data={configHighlightNews.table.data} isSetting={false} />
        </div>
        <div className='mb-[30px]'>
          Thời gian chuyển giữa các tin tức
          <input type='number' />
        </div>
        <div className='w-[145px] h-[40px]'>
          <button type="submit" className='w-[190px]' onClick={() => console.log("Luu tin tuc noi bat")}> <Button {...configHighlightNews.propsSaveButton} /></button>
        </div>
      </div>
      <SimpleForm data={configHighlightFeature.dataAddHighlightFeature} config={configHighlightFeature.configAddHighlightFeature} />
      <SimpleForm data={dataEditHighlightFeature} config={configHighlightFeature.configEditHighlightFeature} />
      <SimpleForm data={configHighlightNews.dataAddHighlightNews} config={configHighlightNews.configAddHighlightNews} />
      <CancelPopup
        open={configHighlightFeature.cancelPopub.open}
        setOpen={configHighlightFeature.cancelPopub.setOpen}
        notification={configHighlightFeature.cancelPopub.notification}
        subTitle={configHighlightFeature.cancelPopub.subTitle}
        buttonAction2={configHighlightFeature.cancelPopub.buttonAction2}
      />
    </>
  );
}

export default HomePageContent