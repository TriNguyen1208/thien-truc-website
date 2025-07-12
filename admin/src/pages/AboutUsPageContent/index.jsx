import React from 'react'
import { useLayout } from "@/layouts/LayoutContext"
import { useEffect } from "react"
import EditBanner from "../../components/EditBanner"
import CardList from "../../components/CardList"
import { AddIcon, EditIcon, SubtractIcon, ArrowDownIcon, ArrowUpIcon, SaveIcon, DeleteIcon } from '../../components/Icon';
import DynamicForm from '../../components/DynamicForm'
import { useState } from 'react';
import Button from '@/components/Button'
const AboutUsPageContent = () => {
  const { setLayoutProps } = useLayout()
  useEffect(() => {
    setLayoutProps({
      title: "Nội dung Trang về chúng tôi",
      description: "Quản lý nội dung hiển trị trên trang về chúng tôi",
      hasButton: false,
    })
  }, []);
  const configAboutUsBanner = {
    title: "Câu chuyện của chúng tôi",
    description: "Chỉnh sửa tiêu đề và mô tả banner",
    listInput: [
      { label: 'Nội dung câu chuyện', placeholder: 'Nhập nội dung câu chuyện...', contentCurrent: 'Thiên trúc được thành lập vào năm 2025', isRequire: true },
    ],
    handleSave: (values) => {
      console.log('Giá trị đã lưu:', values);
      // Gửi dữ liệu lên server hoặc cập nhật state
    }
  }

  // ================= DUTY AND RESPONSIBILITY =================== 

  const [isModalOpenAddDutyAndResponsibility, setIsModalOpenAddDutyAndResponsibility] = useState(false);
  const [isModalOpenEditDutyAndResponsibility, setIsModalOpenEditDutyAndResponsibility] = useState(false);
  const [dataEditDutyAndResponsibility, setDataEditDutyAndResponsibility] = useState([
    { name: 'dutyName', label: 'Tên nhiệm vụ', type: 'text', width: 12, isRequired: true, placeholder: "VD: lắp đặt thiết bị" },
    { name: 'description', label: 'Mô tả', type: 'textarea', width: 12, isRequired: false, numberRows: 4 },
    { type: 'dynamicFields', name: 'listDetailDescription', label: 'Danh sách mô tả chi tiết (tối đa 5 dòng)', isRequired: false, isSingleColumn: true, width: 12, isCheckbox: false, limitRowDynamicFields: 5 },
  ]);
  const handleSubmitButtonAddDutyAndResponsibility = (valueForm) => {
    console.log('Day la button submit', valueForm)
    setIsModalOpenAddDutyAndResponsibility(false)
  }
  const handleCancelButtonAddDutyAndResponsibility = () => {
    console.log('Day la button cancle')
    setIsModalOpenAddDutyAndResponsibility(false)
  }
  const handleSubmitButtonEditDutyAndResponsibility = (valueForm) => {
    console.log('Day la button submit', valueForm)
    setIsModalOpenEditDutyAndResponsibility(false)
  }
  const handleCancelButtonEditDutyAndResponsibility = () => {
    console.log('Day la button cancle')
    setIsModalOpenEditDutyAndResponsibility(false)
  }

  const configDutyAndResponsibility = {
    title: "Danh sách nhiệm vụ và trách nhiệm",
    description: "Quản lý các nhiệm vụ chính của công ty",
    propsAddButton: {
      Icon: AddIcon,
      text: "Thêm nhiệm vụ",
      colorText: "#ffffff",
      colorBackground: "#000000",
      padding: 8,
    },
    propsSaveButton: {
      Icon: SaveIcon,
      text: "Lưu danh sách",
      colorText: "#ffffff",
      colorBackground: "#000000",
      padding: 9,
    },
    configAddDutyAndResponsibility: {
      title: "Thêm nhiệm vụ mới",
      description: "Điền thông tin nhiệm vụ và mô tả chí tiết (tối đa 5 dòng)",
      contentCancelButton: "Hủy",
      contentSubmitButton: "Thêm mới",
      widthModal: 650,
      isModalOpen: isModalOpenAddDutyAndResponsibility,
      handleSubmitButton: handleSubmitButtonAddDutyAndResponsibility,
      handleCancelButton: handleCancelButtonAddDutyAndResponsibility,
      setIsModalOpen: setIsModalOpenAddDutyAndResponsibility,
    },
    configEditDutyAndResponsibility: {
      title: "Chỉnh sửa nhiệm vụ",
      description: "Điền thông tin nhiệm vụ và mô tả chi tiết (tối đa 5 dòng)",
      contentCancelButton: "Hủy",
      contentSubmitButton: "Cập nhật",
      widthModal: 650,
      isModalOpen: isModalOpenEditDutyAndResponsibility,
      handleSubmitButton: handleSubmitButtonEditDutyAndResponsibility,
      handleCancelButton: handleCancelButtonEditDutyAndResponsibility,
      setIsModalOpen: setIsModalOpenEditDutyAndResponsibility,
    },
    dataAddDutyAndResponsibility: [
      { name: 'dutyName', label: 'Tên nhiệm vụ', type: 'text', width: 12, isRequired: true, placeholder: "VD: lắp đặt thiết bị" },
      { name: 'description', label: 'Mô tả', type: 'textarea', width: 12, isRequired: false, numberRows: 4 },
      { type: 'dynamicFields', name: 'listDetailDescription', label: 'Danh sách mô tả chi tiết (tối đa 5 dòng)', isRequired: false, isSingleColumn: true, width: 12, isCheckbox: false, limitRowDynamicFields: 5 },
    ],
    card: [
      {
        title: "Lắp đặt thiết bị",
        description: "Cung cấp dịch vụ ",
        listDetailDescription: ["Khảo sát và tư vấn miễn phí", "Lắp đặt tiêu chuẩn quốc tế", "123", "456", "789"]
      },
      {
        title: "Bảo trì hệ thống",
        description: "Dịch vụ bảo trì và vận hành hệ thống",
        listDetailDescription: ["Khảo sát và tư vấn miễn phí", "Lắp đặt tiêu chuẩn quốc tế"]
      },
    ],
    handleEditButton: (item) => {

      const updatedForm = [
        { ...dataEditDutyAndResponsibility[0], value: item.title },
        { ...dataEditDutyAndResponsibility[1], value: item.description },
        { ...dataEditDutyAndResponsibility[2], value: item.listDetailDescription }
      ];
      setDataEditDutyAndResponsibility(updatedForm);
      setIsModalOpenEditDutyAndResponsibility(true);
      console.log(dataEditDutyAndResponsibility);
    }
  }

  // ================= WHY ABOUT US =================== 
  const [isModalOpenAddWhyAboutUs, setIsModalOpenAddWhyAboutUs] = useState(false);
  const [isModalOpenEditWhyAboutUs, setIsModalOpenEditWhyAboutUs] = useState(false);
  const [dataEditWhyAboutUs, setDataEditWhyAboutUs] = useState([
    { name: 'dutyName', label: 'Tên nhiệm vụ', type: 'text', width: 12, isRequired: true, placeholder: "VD: lắp đặt thiết bị" },
    { name: 'description', label: 'Mô tả', type: 'textarea', width: 12, isRequired: false, numberRows: 4 },
    { type: 'dynamicFields', name: 'listDetailDescription', label: 'Danh sách mô tả chi tiết (tối đa 5 dòng)', isRequired: false, isSingleColumn: true, width: 12, isCheckbox: false, limitRowDynamicFields: 5 },
  ]);
  const handleSubmitButtonAddWhyAboutUs = (valueForm) => {
    console.log('Day la button submit', valueForm)
    setIsModalOpenAddWhyAboutUs(false)
  }
  const handleCancelButtonAddWhyAboutUs = () => {
    console.log('Day la button cancle')
    setIsModalOpenAddWhyAboutUs(false)
  }
  const handleSubmitButtonEditWhyAboutUs = (valueForm) => {
    console.log('Day la button submit', valueForm)
    setIsModalOpenEditWhyAboutUs(false)
  }
  const handleCancelButtonEditWhyAboutUs = () => {
    console.log('Day la button cancle')
    setIsModalOpenEditWhyAboutUs(false)
  }

  const configWhyAboutUs = {
    title: "\"Tại sao chọn Thiên Trúc\"",
    description: "Quản lý các lợi thế cạnh tranh của công ty",
    propsAddButton: {
      Icon: AddIcon,
      text: "Thêm nhiệm vụ",
      colorText: "#ffffff",
      colorBackground: "#000000",
      padding: 8,
    },
    propsSaveButton: {
      Icon: SaveIcon,
      text: "Lưu danh sách",
      colorText: "#ffffff",
      colorBackground: "#000000",
      padding: 9,
    },
    configAddWhyAboutUs: {
      title: "Thêm nhiệm vụ mới",
      description: "Điền thông tin nhiệm vụ và mô tả chí tiết (tối đa 5 dòng)",
      contentCancelButton: "Hủy",
      contentSubmitButton: "Thêm mới",
      widthModal: 650,
      isModalOpen: isModalOpenAddWhyAboutUs,
      handleSubmitButton: handleSubmitButtonAddWhyAboutUs,
      handleCancelButton: handleCancelButtonAddWhyAboutUs,
      setIsModalOpen: setIsModalOpenAddWhyAboutUs,
    },
    configEditWhyAboutUs: {
      title: "Chỉnh sửa nhiệm vụ",
      description: "Điền thông tin nhiệm vụ và mô tả chi tiết (tối đa 5 dòng)",
      contentCancelButton: "Hủy",
      contentSubmitButton: "Cập nhật",
      widthModal: 650,
      isModalOpen: isModalOpenEditWhyAboutUs,
      handleSubmitButton: handleSubmitButtonEditWhyAboutUs,
      handleCancelButton: handleCancelButtonEditWhyAboutUs,
      setIsModalOpen: setIsModalOpenEditWhyAboutUs,
    },
    dataAddWhyAboutUs: [
      { name: 'dutyName', label: 'Tên nhiệm vụ', type: 'text', width: 12, isRequired: true, placeholder: "VD: lắp đặt thiết bị" },
      { name: 'description', label: 'Mô tả', type: 'textarea', width: 12, isRequired: false, numberRows: 4 },
      { type: 'dynamicFields', name: 'listDetailDescription', label: 'Danh sách mô tả chi tiết (tối đa 5 dòng)', isRequired: false, isSingleColumn: true, width: 12, isCheckbox: false, limitRowDynamicFields: 5 },
    ],
    card: [
      {
        title: "Lắp đặt thiết bị",
        description: "Cung cấp dịch vụ ",
        listDetailDescription: ["Khảo sát và tư vấn miễn phí", "Lắp đặt tiêu chuẩn quốc tế", "123", "456", "789"]
      },
      {
        title: "Bảo trì hệ thống",
        description: "Dịch vụ bảo trì và vận hành hệ thống",
        listDetailDescription: ["Khảo sát và tư vấn miễn phí", "Lắp đặt tiêu chuẩn quốc tế"]
      },
    ],
    handleEditButton: (item) => {

      const updatedForm = [
        { ...dataEditWhyAboutUs[0], value: item.title },
        { ...dataEditWhyAboutUs[1], value: item.description },
        { ...dataEditWhyAboutUs[2], value: item.listDetailDescription }
      ];
      setDataEditWhyAboutUs(updatedForm);
      setIsModalOpenEditWhyAboutUs(true);
      console.log(dataEditWhyAboutUs);
    }
  }

  return (
    <>
      <EditBanner
        title={configAboutUsBanner.title}
        description={configAboutUsBanner.description}
        listInput={configAboutUsBanner.listInput}
        saveButton={configAboutUsBanner.handleSave}
      />
      <div className="flex flex-col p-[24px] bg-white w-full h-full border border-[#E5E7EB] rounded-[8px] gap-[20px] mt-[40px]">
        <div className='flex items-center justify-between'>
          <div>
            <div className="mb-[4px]">
              <h1 className="text-[24px] text-black font-semibold">
                {configDutyAndResponsibility.title}
              </h1>
            </div>
            <div className="mb-[24px]">
              <p className="text-[14px] text-[#71717A] font-regular">
                {configDutyAndResponsibility.description}
              </p>
            </div>
          </div>
          <div className='w-[160px] h-40[px] '>
            <button type="submit" className='w-[170px]' onClick={() => setIsModalOpenAddDutyAndResponsibility(true)}> <Button {...configDutyAndResponsibility.propsAddButton} /></button>
          </div>
        </div>
        <div className='grid grid-cols-12 gap-6'>
          {(configDutyAndResponsibility.card || []).map((item, index) => {
            return (
              <div className='col-span-6' key={index}>
                <CardList
                  {...item}
                  buttonEdit={
                    <button onClick={() => configDutyAndResponsibility.handleEditButton(item)}>
                      <EditIcon />
                    </button>
                  }
                  buttonDelete={
                    <button onClick={() => console.log("Delete")}>
                      <DeleteIcon />
                    </button>
                  }

                />
              </div>
            )
          })}
        </div>
        <div className='w-[145px] h-[40px]'>
          <button type="submit" className='w-[160px]' onClick={() => console.log("Luu danh sách")}> <Button {...configDutyAndResponsibility.propsSaveButton} /></button>
        </div>
      </div>
      <DynamicForm data={configDutyAndResponsibility.dataAddDutyAndResponsibility} config={configDutyAndResponsibility.configAddDutyAndResponsibility} />
      <DynamicForm data={dataEditDutyAndResponsibility} config={configDutyAndResponsibility.configEditDutyAndResponsibility} />

      <div className="flex flex-col p-[24px] bg-white w-full h-full border border-[#E5E7EB] rounded-[8px] gap-[20px] mt-[40px]">
        <div className='flex items-center justify-between'>
          <div>
            <div className="mb-[4px]">
              <h1 className="text-[24px] text-black font-semibold">
                {configWhyAboutUs.title}
              </h1>
            </div>
            <div className="mb-[24px]">
              <p className="text-[14px] text-[#71717A] font-regular">
                {configWhyAboutUs.description}
              </p>
            </div>
          </div>
          <div className='w-[160px] h-40[px] '>
            <button type="submit" className='w-[170px]' onClick={() => setIsModalOpenAddWhyAboutUs(true)}> <Button {...configWhyAboutUs.propsAddButton} /></button>
          </div>
        </div>
        <div className='grid grid-cols-12 gap-6'>
          {(configWhyAboutUs.card || []).map((item, index) => {
            return (
              <div className='col-span-6' key={index}>
                <CardList
                  {...item}
                  buttonEdit={
                    <button onClick={() => configWhyAboutUs.handleEditButton(item)}>
                      <EditIcon />
                    </button>
                  }
                  buttonDelete={
                    <button onClick={() => console.log("Delete")}>
                      <DeleteIcon />
                    </button>
                  }

                />
              </div>
            )
          })}
        </div>
        <div className='w-[145px] h-[40px]'>
          <button type="submit" className='w-[160px]' onClick={() => console.log("Luu danh sách")}> <Button {...configWhyAboutUs.propsSaveButton} /></button>
        </div>
      </div>
      <DynamicForm data={configWhyAboutUs.dataAddWhyAboutUs} config={configWhyAboutUs.configAddWhyAboutUs} />
      <DynamicForm data={dataEditWhyAboutUs} config={configWhyAboutUs.configEditWhyAboutUs} />
    </>
  )
}

export default AboutUsPageContent