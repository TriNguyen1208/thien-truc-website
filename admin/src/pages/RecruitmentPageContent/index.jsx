import React, { useEffect } from 'react'
import { useLayout } from '../../layouts/layoutcontext'
import CustomButton from '@/components/ButtonLayout'
import {SaveIcon} from "@/components/Icon"
import DynamicForm from "@/components/DynamicForm"
import EditBanner from '../../components/EditBanner'
import useRecruitment from '../../hooks/useRecruitment'
import Loading from '@/components/Loading'
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
    patchRecruitment.mutate(result);
    //Gửi API lên backend
  }
  const handleButtonCulture = (result) => {
    patchRecruitment.mutate(result);
  }

  const {data: recruitment, isLoading: isLoadingRecruitment} = useRecruitment.getRecruitmentPage();
  if(isLoadingRecruitment){
    return <Loading/>
  }
  const propsBanner = {
    title: "Nội dung Trang tuyển dụng",
    description: "Quản lý nội dung hiển thị trên trang tuyển dụng",
    listInput: [
      {
        name: "banner_title",
        label: "Tiêu đề Banner",
        placeholder: "Nhập tiêu đề tuyển dụng",
        contentCurrent: recruitment.banner_title,
        isRequire: true,
        rows: 1,
        maxLength: 100
      },
      {
        name:"banner_description",
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
        name: "culture_content",
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