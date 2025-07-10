import React from 'react'
import EditBanner from "../../components/EditBanner"
import FeatureCard from '../../components/FeatureCard';
import Button from '@/components/Button'
import { AddIcon, EditIcon, DeleteIcon } from '../../components/Icon';
import SimpleForm from '../../components/SimpleForm'
import { useState, useEffect } from 'react';
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
  const [isModalOpenAddHighlightFeature, setIsModalOpenAddHighlightFeature] = useState(false);
  const [isModalOpenEditHighlightFeature, setIsModalOpenEditHighlightFeature] = useState(false);
  
  const [dataEditHighlightFeature, setDataEditHighlightFeature] = useState([
    { name: 'figures', label: 'Số liệu', type: 'text', width: 12, isRequired: false, placeholder: "VD: 100+" },
    { name: 'achievementName', label: 'Tên thành tựu', type: 'text', width: 12, isRequired: false, placeholder: "VD: dự án hoàn thành" },
  ]);

  const handleSubmitButtonAddHighlightFeature = (valueForm) => {
    console.log('Day la button submit', valueForm)
    setIsModalOpenAddHighlightFeature(false)
  }
  const handleCancelButtonAddHighlightFeature = () => {
    console.log('Day la button cancle')
    setIsModalOpenAddHighlightFeature(false)
  }
  const handleSubmitButtonEditHighlightFeature = (valueForm) => {
    console.log('Day la button submit', valueForm)
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
    arrayFeatureCard: [
      { title: "500+", description: "Dự án hoàn thành" },
      { title: "10+", description: "Năm kinh nghiệm" },
      { title: "1000+", description: "Khách hàng tin tưởng" },
      { title: "500+", description: "Dự án hoàn thành" },
    ],
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
  }
  const handleEditButton = (item) => {

    const updatedForm = [
      { ...dataEditHighlightFeature[0], value: item.title },
      { ...dataEditHighlightFeature[1], value: item.description }
    ];
    setDataEditHighlightFeature(updatedForm);
    setIsModalOpenEditHighlightFeature(true);
    console.log(dataEditHighlightFeature);
  }
  const handleDeleteButton = (item) => {
    console.log(item);
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
            <button type="submit" className='w-[170px]' onClick={() => setIsModalOpenAddHighlightFeature(true)}> <Button {...configHighlightFeature.propsAddButton} /></button>
          </div>
        </div>
        <div className='grid grid-cols-12 gap-6'>
          {(configHighlightFeature.arrayFeatureCard || []).map((item, index) =>
            <div className='col-span-4' key={index}>
              <FeatureCard
                {...item}
                buttonEdit={
                  <button onClick={() => handleEditButton(item)}>
                    <EditIcon />
                  </button>
                }
                buttonDelete={
                  <button onClick={() => handleDeleteButton(item)}>
                    <DeleteIcon />
                  </button>
                }
              />
            </div>)}

        </div>
      </div>
      <SimpleForm data={configHighlightFeature.dataAddHighlightFeature} config={configHighlightFeature.configAddHighlightFeature} />
      <SimpleForm data={dataEditHighlightFeature} config={configHighlightFeature.configEditHighlightFeature} />
    </>
  );
}

export default HomePageContent