import React, { useEffect } from 'react'
import { useLayout } from '../../layouts/layoutcontext'
import CustomButton from '@/components/ButtonLayout'
import {SaveIcon} from "@/components/Icon"
import DynamicForm from "@/components/DynamicForm"
import EditBanner from '../../components/EditBanner'
import useRecruitment from '../../hooks/useRecruitment'

import { SuccessPopup, CancelPopup } from "../../components/Popup";
const RecruitmentPageContent = () => {
  const {setLayoutProps} = useLayout();
  const patchRecruitment = useRecruitment.patch();
  useEffect(()=>{
    setLayoutProps({
      title: "Nội dung Trang tuyển dụng",
      description: "Quản lý nội dung hiển thị trên trang tuyển dụng",
    })
  }, [])

  const handleButtonBanner = (result) => {
    const data = {
      banner_title: result["Tiêu đề Banner"],
      banner_description: result["Mô tả Banner"]
    }
    patchRecruitment.mutate(data);
    //Gửi API lên backend
  }
  const handleButtonCulture = (result) => {
    const data = {
      culture_content: result["Nội dung văn hóa công ty"]
    }
    patchRecruitment.mutate(data);
  }

  const {data: recruitment, isLoading: isLoadingRecruitment} = useRecruitment.getRecruitmentPage();
  if(isLoadingRecruitment){
    return <></>
  }
  const propsBanner = {
    title: "Nội dung Trang tuyển dụng",
    description: "Quản lý nội dung hiển thị trên trang tuyển dụng",
    listInput: [
      {
        label: "Tiêu đề Banner",
        placeholder: "Nhập tiêu đề tuyển dụng",
        contentCurrent: recruitment.banner_title,
        isRequire: true,
        rows: 1,
        maxLength: 100
      },
      {
        label: "Mô tả Banner",
        placeholder: "Nhập mô tả Banner",
        contentCurrent: recruitment.banner_description,
        isRequire: true,
        rows: 3,
        maxLength: 200
      }
    ],
    saveButton: handleButtonBanner
  }
  const propsCulture = {
    title: "Văn hóa của chúng tôi",
    description: "Đoạn văn có thể xuống dòng",
    listInput: [
      {
        label: "Nội dung văn hóa công ty",
        placeholder: "Nhập tiêu đề tuyển dụng",
        contentCurrent: recruitment.culture_content,
        isRequire: true,
        rows: 6,
      },
    ],
    saveButton: handleButtonCulture
  }
  return (
    <>
      <div className='flex flex-col gap-5'>
        <EditBanner {...propsBanner}/>
        <EditBanner {...propsCulture}/>
      </div>
    </>
    
    
  )
}

export default RecruitmentPageContent