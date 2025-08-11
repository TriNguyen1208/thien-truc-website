import React from 'react'
import { useLayout } from "@/layouts/LayoutContext"
import { useEffect } from "react"
import EditBanner from "../../components/EditBanner"
import CardList from "../../components/CardList"
import { AddIcon, EditIcon, SubtractIcon, ArrowDownIcon, ArrowUpIcon, SaveIcon, DeleteIcon } from '../../components/Icon';
import DynamicForm from '../../components/DynamicForm'
import { useState } from 'react';
import Button from '@/components/Button'
import useAboutUs from '../../hooks/useAboutUs';
import Notification from '@/components/Notification'
import Loading from '@/components/Loading'
const AboutUsPageContent = () => {
  const { setLayoutProps } = useLayout();
  const [isVisible, setIsVisible] = useState(null);
 
  const [isModalOpenAddDutyAndResponsibility, setIsModalOpenAddDutyAndResponsibility] = useState(false);
  const [isModalOpenEditDutyAndResponsibility, setIsModalOpenEditDutyAndResponsibility] = useState(false);
  const [isOpenCancelDutyAndResponsibility, setIsOpenCancelDutyAndResponsibility] = useState(false);
  const [dataEditDutyAndResponsibility, setDataEditDutyAndResponsibility] = useState([
    { name: 'title', label: 'Tên nhiệm vụ', type: 'text', width: 12, isRequired: true, placeholder: "VD: lắp đặt thiết bị", maxLength: 50  },
    { name: 'description', label: 'Mô tả', type: 'textarea', width: 12, isRequired: false, numberRows: 4, maxLength: 200  },
    { type: 'dynamicFields', name: 'details', label: 'Danh sách mô tả chi tiết (tối đa 5 dòng)', isRequired: false, isSingleColumn: true, width: 12, isCheckbox: false, limitRowDynamicFields: 5 },
  ]);


  const [isModalOpenAddWhyChooseUs, setIsModalOpenAddWhyChooseUs] = useState(false);
  const [isModalOpenEditWhyChooseUs, setIsModalOpenEditWhyChooseUs] = useState(false);
  const [isOpenCancelWhyChooseUs, setIsOpenCancelWhyChooseUs] = useState(false);
  const [dataEditWhyChooseUs, setDataEditWhyChooseUs] = useState([
    { name: 'title', label: 'Tên nhiệm vụ', type: 'text', width: 12, isRequired: true, placeholder: "VD: lắp đặt thiết bị", maxLength: 50  },
    { name: 'description', label: 'Mô tả', type: 'textarea', width: 12, isRequired: false, numberRows: 4, maxLength: 200 },
    { type: 'dynamicFields', name: 'details', label: 'Danh sách mô tả chi tiết (tối đa 5 dòng)', isRequired: false, isSingleColumn: true, width: 12, isCheckbox: false, limitRowDynamicFields: 5 },
  ]);
  const [dataCurrent, setDataCurrent] = useState(null);

  const { data: aboutUsPageData, isLoading: isLoadingAboutUsPageData, isFetching: isFetchingAboutUsPageData} = useAboutUs.getAboutUsPage();
  const { mutate: updateBanner, isPending: isPendingUpdateBanner } = useAboutUs.updateAboutUsPage.updateBanner();
  const { mutate: updateOurStory, isPending: isPendingUpdateOurStory } = useAboutUs.updateAboutUsPage.updateOurStory();
  const { mutate: updateVisibility, isPending: isPendingUpdateVisibility} = useAboutUs.updateAboutUsPage.updateVisibility();

  const { data: dutyAndResponsibilityData, isLoading: isLoadingDutyAndResponsibility } = useAboutUs.company_services.getAll();
  const { mutate: updateDutyAndResponsibility, isPending: isPendingUpdateDutyAndResponsibility } = useAboutUs.company_services.updateOne();
  const { mutate: createDutyAndResponsibility, isPending: isPendingCreateDutyAndResponsibility } = useAboutUs.company_services.createOne();
  const { mutate: deleteDutyAndResponsibility, isPending: isPendingDeleteDutyAndResponsibility } = useAboutUs.company_services.deleteOne();


  const { data: whyChooseUsData, isLoading: isLoadingWhyChooseUs } = useAboutUs.why_choose_us.getAll();
  const { mutate: updateWhyChooseUs, isPending: isPendingUpdateWhyChooseUs } = useAboutUs.why_choose_us.updateOne();
  const { mutate: createWhyChooseUs, isPending: isPendingCreateWhyChooseUs } = useAboutUs.why_choose_us.createOne();
  const { mutate: deleteWhyChooseUs, isPending: isPendingDeleteWhyChooseUs } = useAboutUs.why_choose_us.deleteOne();

  const [bannerNotification, setBannerNotification] = useState(false)
  const [valuesBanner, setValuesBanner] = useState(null)
  const [storyNotification, setStoryNotification] = useState(false)
  const [valuesStory, setValuesStory] = useState(null)

  useEffect(() => {
    if(isLoadingAboutUsPageData) return
    setIsVisible(aboutUsPageData.is_visible);
  }, [aboutUsPageData, isLoadingAboutUsPageData]);

   useEffect(() => {
    setLayoutProps({
      title: "Nội dung Trang về chúng tôi",
      description: "Quản lý nội dung hiển trị trên trang về chúng tôi",
      hasButton: false,
      buttonToggle: {
        currentState: isVisible,
        handleToggle: handleToggle
      }
    })
  }, [isVisible]);

  if (isLoadingDutyAndResponsibility || isPendingCreateDutyAndResponsibility || isPendingUpdateDutyAndResponsibility || isPendingDeleteDutyAndResponsibility
    || isPendingCreateWhyChooseUs || isPendingDeleteWhyChooseUs || isPendingUpdateWhyChooseUs || isLoadingWhyChooseUs
    || isLoadingAboutUsPageData || isPendingUpdateBanner || isPendingUpdateOurStory || isFetchingAboutUsPageData || isPendingUpdateVisibility
  ) {
    return (
      <Loading/>
    )
  }
  function handleToggle(checked){
    setIsVisible(checked);
    updateVisibility({visibility: checked});
  }
  const handleCancleBanner= ()=>{
    setBannerNotification(false)
  }
  const handleConfirmBanner= ()=>{
    updateBanner(valuesBanner);
    setBannerNotification(false)
  }
  const configAboutUsBanner = {
    title: "Banner trang về chúng tôi",
    description: "Chỉnh sửa tiêu đề và mô tả banner",
    listInput: [
      { name: "title", label: 'Tiêu đề banner', placeholder: 'Nhập nội dung tiêu đề...', contentCurrent: aboutUsPageData.banner_title , isRequire: true, rows: 1, maxLength: 100 },
      { name: "description", label: 'Mô tả banner', placeholder: 'Nhập nội dung mô tả...', contentCurrent: aboutUsPageData.banner_description, isRequire: true, rows: 3, maxLength: 300},

    ],
     notificationProps:{
         open: bannerNotification, 
         setOpen: setBannerNotification, 
         notification: "Xác nhận lưu thay đổi!", 
         subTitle:"Bạn có chắc chắn muốn lưu thay đổi.", 
         buttonLabel1:"Hủy", 
         buttonAction1: handleCancleBanner, 
         buttonLabel2: "Xác nhận", 
         buttonAction2: handleConfirmBanner
        },
    handleSave: (values) => {
      setValuesBanner(values)
      setBannerNotification(true)
     
    }
  }
 const handleCancleStory= ()=>{
    setStoryNotification(false)
  }
  const handleConfirmStory= ()=>{
    updateOurStory(valuesStory);
    setStoryNotification(false)
  }
  const configOutStoryBanner = {
    title: "Câu chuyện của chúng tôi",
    description: "Chỉnh sửa tiêu đề và mô tả banner",
    listInput: [
      { name: "our_story_content", label: 'Nội dung câu chuyện', placeholder: 'Nhập nội dung câu chuyện...', contentCurrent: aboutUsPageData.our_story_content, isRequire: true, rows: 5 },

    ],
     notificationProps:{
         open: storyNotification, 
         setOpen: setBannerNotification, 
         notification: "Xác nhận lưu thay đổi!", 
         subTitle:"Bạn có chắc chắn muốn lưu thay đổi.", 
         buttonLabel1:"Hủy", 
         buttonAction1: handleCancleStory, 
         buttonLabel2: "Xác nhận", 
         buttonAction2: handleConfirmStory
        },
    handleSave: (values) => {
      setValuesStory(values)
      setStoryNotification(true)
    }
  }




  // ================= DUTY AND RESPONSIBILITY =================== 

  const handleSubmitButtonAddDutyAndResponsibility = (valueForm) => {
    createDutyAndResponsibility(valueForm);
    setIsModalOpenAddDutyAndResponsibility(false)
  }
  const handleCancelButtonAddDutyAndResponsibility = () => {
    setIsModalOpenAddDutyAndResponsibility(false)
  }
  const handleSubmitButtonEditDutyAndResponsibility = (valueForm) => {
    updateDutyAndResponsibility({
      id: dataCurrent.id,
      data: valueForm,
    })
    setIsModalOpenEditDutyAndResponsibility(false)
  }
  const handleCancelButtonEditDutyAndResponsibility = () => {
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
      { name: 'title', label: 'Tên nhiệm vụ', type: 'text', width: 12, isRequired: true, placeholder: "VD: lắp đặt thiết bị", maxLength: 50 },
      { name: 'description', label: 'Mô tả', type: 'textarea', width: 12, isRequired: false, numberRows: 4,  maxLength: 200 },
      { type: 'dynamicFields', name: 'details', label: 'Danh sách mô tả chi tiết (tối đa 5 dòng)', isRequired: false, isSingleColumn: true, width: 12, isCheckbox: false, limitRowDynamicFields: 5 },
    ],
    card: dutyAndResponsibilityData,
    handleEditButton: (item) => {

      const updatedForm = [
        { ...dataEditDutyAndResponsibility[0], value: item.title },
        { ...dataEditDutyAndResponsibility[1], value: item.description },
        { ...dataEditDutyAndResponsibility[2], value: item.details }
      ];
      setDataEditDutyAndResponsibility(updatedForm);
      setIsModalOpenEditDutyAndResponsibility(true);
      setDataCurrent(item);
    },
    handleDeleteButton: (item) => {
      setIsOpenCancelDutyAndResponsibility(true);
      setDataCurrent(item);
    },
    cancelPopub: {
      open: isOpenCancelDutyAndResponsibility,
      setOpen: setIsOpenCancelDutyAndResponsibility,
      notification: "Xác nhận xóa",
      subTitle: "Bạn có chắc chắn muốn xóa thông số nổi bật này ? ",
      buttonAction1:()=>{
           setIsOpenCancelDutyAndResponsibility(false);
      },
      buttonAction2: () => {
        if (dataCurrent) {
          deleteDutyAndResponsibility(dataCurrent.id);
          setIsOpenCancelDutyAndResponsibility(false);
        }
      },
    }

  }

  // ================= WHY ABOUT US =================== 



  const handleSubmitButtonAddWhyChooseUs = (valueForm) => {
    createWhyChooseUs(valueForm);
    setIsModalOpenAddWhyChooseUs(false)
  }
  const handleCancelButtonAddWhyChooseUs = () => {
    setIsModalOpenAddWhyChooseUs(false)
  }
  const handleSubmitButtonEditWhyChooseUs = (valueForm) => {
    updateWhyChooseUs({
      id: dataCurrent.id,
      data: valueForm,
    })
    setIsModalOpenEditWhyChooseUs(false)
  }
  const handleCancelButtonEditWhyChooseUs = () => {
    setIsModalOpenEditWhyChooseUs(false)
  }

  const configWhyChooseUs = {
    title: "\"Tại sao chọn Thiên Trúc\"",
    description: "Quản lý các lợi thế cạnh tranh của công ty",
    propsAddButton: {
      Icon: AddIcon,
      text: "Thêm nhiệm vụ",
      colorText: "#ffffff",
      colorBackground: "#000000",
      padding: 8,
    },

    configAddWhyChooseUs: {
      title: "Thêm nhiệm vụ mới",
      description: "Điền thông tin nhiệm vụ và mô tả chi tiết (tối đa 5 dòng)",
      contentCancelButton: "Hủy",
      contentSubmitButton: "Thêm mới",
      widthModal: 650,
      isModalOpen: isModalOpenAddWhyChooseUs,
      handleSubmitButton: handleSubmitButtonAddWhyChooseUs,
      handleCancelButton: handleCancelButtonAddWhyChooseUs,
      setIsModalOpen: setIsModalOpenAddWhyChooseUs,
    },
    configEditWhyChooseUs: {
      title: "Chỉnh sửa nhiệm vụ",
      description: "Điền thông tin nhiệm vụ và mô tả chi tiết (tối đa 5 dòng)",
      contentCancelButton: "Hủy",
      contentSubmitButton: "Cập nhật",
      widthModal: 650,
      isModalOpen: isModalOpenEditWhyChooseUs,
      handleSubmitButton: handleSubmitButtonEditWhyChooseUs,
      handleCancelButton: handleCancelButtonEditWhyChooseUs,
      setIsModalOpen: setIsModalOpenEditWhyChooseUs,
    },
    dataAddWhyChooseUs: [
      { name: 'title', label: 'Tên nhiệm vụ', type: 'text', width: 12, isRequired: true, placeholder: "VD: lắp đặt thiết bị", maxLength: 50  },
      { name: 'description', label: 'Mô tả', type: 'textarea', width: 12, isRequired: false, numberRows: 4, maxLength: 200  },
      { type: 'dynamicFields', name: 'details', label: 'Danh sách mô tả chi tiết (tối đa 5 dòng)', isRequired: false, isSingleColumn: true, width: 12, isCheckbox: false, limitRowDynamicFields: 5 },
    ],
    card: whyChooseUsData,

    handleEditButton: (item) => {

      const updatedForm = [
        { ...dataEditWhyChooseUs[0], value: item.title },
        { ...dataEditWhyChooseUs[1], value: item.description },
        { ...dataEditWhyChooseUs[2], value: item.details }
      ];
      setDataEditWhyChooseUs(updatedForm);
      setIsModalOpenEditWhyChooseUs(true);
      setDataCurrent(item);
    },
    handleDeleteButton: (item) => {
      setIsOpenCancelWhyChooseUs(true);
      setDataCurrent(item);
    },
    cancelPopub: {
      open: isOpenCancelWhyChooseUs,
      setOpen: setIsOpenCancelWhyChooseUs,
      notification: "Xác nhận xóa",
      subTitle: "Bạn có chắc chắn muốn xóa thông số nổi bật này ? ",
      buttonAction1:()=>{
        setIsOpenCancelWhyChooseUs(false);
      },
      buttonAction2: () => {
        if (dataCurrent) {
          deleteWhyChooseUs(dataCurrent.id);
          setIsOpenCancelWhyChooseUs(false);
        }
      },
    }
  }

  return (
    <>
      <div className='mb-[40px]'>

        <EditBanner
          title={configAboutUsBanner.title}
          description={configAboutUsBanner.description}
          listInput={configAboutUsBanner.listInput}
          saveButton={configAboutUsBanner.handleSave}
        />
      </div>
      <EditBanner
        title={configOutStoryBanner.title}
        description={configOutStoryBanner.description}
        listInput={configOutStoryBanner.listInput}
        saveButton={configOutStoryBanner.handleSave}
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
          <div className='h-40[px] '>
            <button type="submit" className='' onClick={() => setIsModalOpenAddDutyAndResponsibility(true)}> <Button {...configDutyAndResponsibility.propsAddButton} /></button>
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
                    <button onClick={() => configDutyAndResponsibility.handleDeleteButton(item)}>
                      <DeleteIcon />
                    </button>
                  }

                />
              </div>
            )
          })}
        </div>

      </div>
      <DynamicForm data={configDutyAndResponsibility.dataAddDutyAndResponsibility} config={configDutyAndResponsibility.configAddDutyAndResponsibility} />
      <DynamicForm data={dataEditDutyAndResponsibility} config={configDutyAndResponsibility.configEditDutyAndResponsibility} />

      <div className="flex flex-col p-[24px] bg-white w-full h-full border border-[#E5E7EB] rounded-[8px] gap-[20px] mt-[40px]">
        <div className='flex items-center justify-between'>
          <div>
            <div className="mb-[4px]">
              <h1 className="text-[24px] text-black font-semibold">
                {configWhyChooseUs.title}
              </h1>
            </div>
            <div className="mb-[24px]">
              <p className="text-[14px] text-[#71717A] font-regular">
                {configWhyChooseUs.description}
              </p>
            </div>
          </div>
          <div className=' h-40[px] '>
            <button type="submit" className='' onClick={() => setIsModalOpenAddWhyChooseUs(true)}> <Button {...configWhyChooseUs.propsAddButton} /></button>
          </div>
        </div>
        <div className='grid grid-cols-12 gap-6'>
          {(configWhyChooseUs.card || []).map((item, index) => {
            return (
              <div className='col-span-6' key={index}>
                <CardList
                  {...item}
                  buttonEdit={
                    <button onClick={() => configWhyChooseUs.handleEditButton(item)}>
                      <EditIcon />
                    </button>
                  }
                  buttonDelete={
                    <button onClick={() => configWhyChooseUs.handleDeleteButton(item)}>
                      <DeleteIcon />
                    </button>
                  }

                />
              </div>
            )
          })}
        </div>

      </div>
      <DynamicForm data={configWhyChooseUs.dataAddWhyChooseUs} config={configWhyChooseUs.configAddWhyChooseUs} />
      <DynamicForm data={dataEditWhyChooseUs} config={configWhyChooseUs.configEditWhyChooseUs} />
      <Notification
        open={configDutyAndResponsibility.cancelPopub.open}
        setOpen={configDutyAndResponsibility.cancelPopub.setOpen}
        notification={configDutyAndResponsibility.cancelPopub.notification}
        subTitle={configDutyAndResponsibility.cancelPopub.subTitle}
        buttonAction1 = {configDutyAndResponsibility.cancelPopub.buttonAction1}
        buttonAction2={configDutyAndResponsibility.cancelPopub.buttonAction2}
      />
      <Notification
        open={configWhyChooseUs.cancelPopub.open}
        setOpen={configWhyChooseUs.cancelPopub.setOpen}
        notification={configWhyChooseUs.cancelPopub.notification}
        subTitle={configWhyChooseUs.cancelPopub.subTitle}
        buttonAction1 = {configWhyChooseUs.cancelPopub.buttonAction1}
        buttonAction2={configWhyChooseUs.cancelPopub.buttonAction2}
      />
      <Notification {...configAboutUsBanner.notificationProps} />
      <Notification {...configOutStoryBanner.notificationProps} />
    </>
  )
}

export default AboutUsPageContent