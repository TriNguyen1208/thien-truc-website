import React, { useEffect, useState} from 'react'
import { useLayout } from '../../layouts/LayoutContext'
import CustomButton from '@/components/ButtonLayout'
import {SaveIcon} from "@/components/Icon"
import DynamicForm from "@/components/DynamicForm"
import EditBanner from '../../components/EditBanner'
import useRecruitment from '../../hooks/useRecruitment'
import Loading from '@/components/Loading'
import Notification from '@/components/Notification'
import { CancelPopup } from "../../components/Popup";
import { useRef } from 'react'
import { UploadIcon } from '../../components/Icon'
import Button from '@/components/Button'
import changeToFormData from '../../utils/changeToFormData'
import UploadImage from '@/components/UploadImage'

const RecruitmentPageContent = () => {
  const {setLayoutProps} = useLayout();
  const [isVisible, setIsVisible] = useState(null);
  const {mutate: updateRecruitment, isPending: isPendingRecruitment} = useRecruitment.patch();
  const { mutate: updateVisibility, isPending: isPendingUpdateVisibility} = useRecruitment.updateVisibility();

  const {data: recruitment, isLoading: isLoadingRecruitment, isFetching: isFetchingRecruitment} = useRecruitment.getRecruitmentPage();
  const [saveOpenBanner, setSaveOpenBanner] = useState(false);
  const [saveOpenCulture, setSaveOpenCulture] = useState(false);
  const [saveOpenImage, setSaveOpenImage] = useState(false);
  const [form, setForm] = useState(null);
  const [initialForm, setInitialForm] = useState(null);
  useEffect(()=>{
    setLayoutProps({
      title: "Nội dung Trang tuyển dụng",
      description: "Quản lý nội dung hiển thị trên trang tuyển dụng",
      hasButton: false,
      buttonToggle: {
        currentState: isVisible,
        handleToggle: handleToggle,
      }
    })
  }, [isVisible])
  useEffect(() => {
    if(isLoadingRecruitment) return
    setIsVisible(recruitment.is_visible);
  }, [recruitment, isLoadingRecruitment]);
  function handleToggle(checked){
    setIsVisible(checked);
    updateVisibility({visibility: checked});
  }
  useEffect(() => {
    if(isLoadingRecruitment || isFetchingRecruitment || isPendingUpdateVisibility){
      return;
    }
    const initialForm = {
      banner_title: recruitment?.banner_title ?? "",
      banner_description: recruitment?.banner_description ?? "",
      culture_content: recruitment?.culture_content ?? "",
      culture_img_1: recruitment?.culture_img_1 ?? "",
      culture_img_2: recruitment?.culture_img_2 ?? "",
      culture_img_3: recruitment?.culture_img_3 ?? "",
      culture_img_4: recruitment?.culture_img_4 ?? "",
    }
    setForm(initialForm);
    setInitialForm(initialForm);
  }, [isLoadingRecruitment, isFetchingRecruitment])

  const handleButtonBanner = () => {
    const formData = changeToFormData(form);
    updateRecruitment(formData)
    setSaveOpenBanner(false);
    //Gửi API lên backend
  }
  const handleButtonCulture = () => {
    const formData = changeToFormData(form);
    updateRecruitment(formData)
    setSaveOpenCulture(false);
  }
  const handleButtonImage = () => {
    const formData = changeToFormData(form);
    for(const [_, value] of formData.entries()){
      if(value == ''){
        alert("Chưa nhập dữ liệu bắt buộc");
        return;
      }
    }
    updateRecruitment(formData);
    setSaveOpenImage(false);
  }
  const saveBannerPopupData = {
    open: saveOpenBanner,
    setOpen: setSaveOpenBanner,
    notification: 'Xác nhận lưu thay đổi!',
    subTitle: 'Bạn có chắc chắn muốn lưu thay đổi.',
    buttonLabel1: 'Hủy',
    buttonAction1: ()=>{setSaveOpenBanner(false)},
    buttonLabel2: 'Lưu',
    buttonAction2: handleButtonBanner
  };
  const saveCulturePopupData = {
    open: saveOpenCulture,
    setOpen: setSaveOpenCulture,
    notification: 'Xác nhận lưu thay đổi!',
    subTitle: 'Bạn có chắc chắn muốn lưu thay đổi.',
    buttonLabel1: 'Hủy',
    buttonAction1: ()=>{setSaveOpenCulture(false)},
    buttonLabel2: 'Lưu',
    buttonAction2: handleButtonCulture
  };
  const saveImage = {
    open: saveOpenImage,
    setOpen: setSaveOpenImage,
    notification: 'Xác nhận lưu thay đổi!',
    subTitle: 'Bạn có chắc chắn muốn lưu thay đổi.',
    buttonLabel1: 'Hủy',
    buttonAction1: ()=>{setSaveOpenImage(false)},
    buttonLabel2: 'Lưu',
    buttonAction2: handleButtonImage
  };
  const propsBanner = {
      title: "Nội dung Trang tuyển dụng",
      description: "Quản lý nội dung hiển thị trên trang tuyển dụng",
      listInput: [
        {
          name: "banner_title",
          label: "Tiêu đề Banner",
          placeholder: "Nhập tiêu đề tuyển dụng",
          contentCurrent: recruitment?.banner_title ?? "",
          isRequire: true,
          rows: 1,
          maxLength: 100
        },
        {
          name:"banner_description",
          label: "Mô tả Banner",
          placeholder: "Nhập mô tả Banner",
          contentCurrent: recruitment?.banner_description ?? "",
          isRequire: true,
          rows: 3,
          maxLength: 300
        }
      ],
      saveButton: (result) => {
        setForm((prev) => ({...prev, ...result}));
        setSaveOpenBanner(true);
      }
  }
  const propsCulture = {
    title: "Văn hóa của chúng tôi",
    description: "Đoạn văn có thể xuống dòng",
    listInput: [
      {
        name: "culture_content",
        label: "Nội dung văn hóa công ty",
        placeholder: "Nhập tiêu đề tuyển dụng",
        contentCurrent: recruitment?.culture_content ?? "",
        isRequire: true,
        rows: 6,
      },
    ],
    saveButton: (result) => {
      setForm((prev) => ({...prev, ...result}));
      setSaveOpenCulture(true);
    }
  }
  if(isLoadingRecruitment || isPendingRecruitment || isFetchingRecruitment){
    return <Loading/>
  }
  const propsButton ={
      Icon: SaveIcon,
      text: "Lưu thay đổi",
      colorText: "#ffffff",
      colorBackground: "#000000",
      padding : 10,
  }
  return (
    <>
      <div className='flex flex-col gap-5'>
        <EditBanner {...propsBanner}/>
        <EditBanner {...propsCulture}/>
        <form onSubmit={(e) => {e.preventDefault(); setSaveOpenImage(true)}} className='flex flex-col p-[24px] bg-white w-full h-full border border-[#E5E7EB] rounded-[8px]'>
          <div className="flex flex-col mb-[16px]">
            <label className="mb-[8px] font-medium">Ảnh văn hóa công ty <span className='text-red-500 ml-1'>*</span></label>
            <div className='grid grid-cols-2 gap-3'>
              <UploadImage form={form} setForm={setForm} initialForm={initialForm} keyImage="culture_img_1"/>
              <UploadImage form={form} setForm={setForm} initialForm={initialForm} keyImage="culture_img_2"/>
              <UploadImage form={form} setForm={setForm} initialForm={initialForm} keyImage="culture_img_3"/>
              <UploadImage form={form} setForm={setForm} initialForm={initialForm} keyImage="culture_img_4"/>
            </div>
          </div>
          <div className='h-40[px]'>
              <button type='submit'> <Button {...propsButton}/></button>
          </div>                
        </form>
      </div>
      <Notification {...saveBannerPopupData}/>
      <Notification {...saveCulturePopupData}/>
      <Notification {...saveImage}/>
    </>
    
    
  )
}

export default RecruitmentPageContent
