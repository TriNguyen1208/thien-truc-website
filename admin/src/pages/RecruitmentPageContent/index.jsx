import React, { useEffect } from 'react'
import { useLayout } from '../../layouts/layoutcontext'
import CustomButton from '@/components/ButtonLayout'
import {SaveIcon} from "@/components/Icon"
import DynamicForm from "@/components/DynamicForm"
import EditBanner from '../../components/EditBanner'
import useRecruitment from '../../hooks/useRecruitment'
import { useState } from 'react'
import { message } from 'antd';
import { SuccessPopup, CancelPopup } from "../../components/Popup";
const RecruitmentPageContent = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [openErrorPopup, setOpenErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {setLayoutProps} = useLayout();
  const patchRecruitment = useRecruitment.patch({
    onSuccess: (res) => {
      setPopupMessage(res.message || 'Cập nhật thành công!');
      setOpenPopup(true);
    },
    onError: (err) => {
      const msg = err?.response?.data?.message || 'Cập nhật thất bại!';
      setErrorMessage(msg);
      setOpenErrorPopup(true);
    }
  });
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
    return <></>
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
      <SuccessPopup
        open={openPopup}
        setOpen={setOpenPopup}
        notification={popupMessage}
        subTitle="Cảm ơn bạn đã gửi"
        buttonLabel1="Thoát"
        buttonLabel2="Tiếp tục chỉnh sửa"
      />

      <CancelPopup
        open={openErrorPopup}
        setOpen={setOpenErrorPopup}
        notification={errorMessage}
        subTitle="Vui lòng thử lại hoặc liên hệ quản trị viên"
        buttonLabel1="Đóng"
        buttonLabel2="Thử lại"
      />
      <div className='flex flex-col gap-5'>
        <EditBanner {...propsBanner}/>
        <EditBanner {...propsCulture}/>
      </div>
    </>
    
    
  )
}

export default RecruitmentPageContent