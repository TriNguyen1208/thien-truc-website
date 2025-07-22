import React, { useEffect, useState} from 'react'
import { useLayout } from '../../layouts/layoutcontext'
import CustomButton from '@/components/ButtonLayout'
import {SaveIcon} from "@/components/Icon"
import DynamicForm from "@/components/DynamicForm"
import EditBanner from '../../components/EditBanner'
import useRecruitment from '../../hooks/useRecruitment'
import Loading from '@/components/Loading'
import Notification from '@/components/Notification'
const RecruitmentPageContent = () => {
  const {setLayoutProps} = useLayout();
  const {mutate: updateRecruitment, isPending: isPendingRecruitment} = useRecruitment.patch();
  const [saveOpenBanner, setSaveOpenBanner] = useState(false);
  const [saveOpenCulture, setSaveOpenCulture] = useState(false);
  const [banner, setBanner] = useState('');
  const [culture, setCulture] = useState('');
  useEffect(()=>{
    setLayoutProps({
      title: "Nội dung Trang tuyển dụng",
      description: "Quản lý nội dung hiển thị trên trang tuyển dụng",
    })
  }, [])

  const handleButtonBanner = () => {
    updateRecruitment(banner)
    setSaveOpenBanner(false);
    //Gửi API lên backend
  }
  const handleButtonCulture = () => {
    updateRecruitment(culture)
    setSaveOpenCulture(false);
  }
  const saveBannerPopupData = {
    open: saveOpenBanner,
    setOpen: setSaveOpenBanner,
    notification: 'Bạn có chắc chắn muốn lưu banner của trang tuyển dụng này?',
    subTitle: 'Hành động này sẽ không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?',
    buttonLabel1: 'Hủy',
    buttonAction1: ()=>{setSaveOpenBanner(false)},
    buttonLabel2: 'Lưu',
    buttonAction2: handleButtonBanner
  };
  const saveCulturePopupData = {
    open: saveOpenCulture,
    setOpen: setSaveOpenCulture,
    notification: 'Bạn có chắc chắn muốn lưu văn hóa của trang tuyển dụng này?',
    subTitle: 'Hành động này sẽ không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?',
    buttonLabel1: 'Hủy',
    buttonAction1: ()=>{setSaveOpenCulture(false)},
    buttonLabel2: 'Lưu',
    buttonAction2: handleButtonCulture
  };
  const {data: recruitment, isLoading: isLoadingRecruitment} = useRecruitment.getRecruitmentPage();
  if(isLoadingRecruitment || isPendingRecruitment){
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
    saveButton: (result) => {
      setBanner(result);
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
        contentCurrent: recruitment.culture_content,
        isRequire: true,
        rows: 6,
      },
    ],
    saveButton: (result) => {
      setCulture(result);
      setSaveOpenCulture(true);
    }
  }
  return (
    <>
      <div className='flex flex-col gap-5'>
        <EditBanner {...propsBanner}/>
        <EditBanner {...propsCulture}/>
      </div>
      <Notification {...saveBannerPopupData}/>
      <Notification {...saveCulturePopupData}/>
    </>
    
    
  )
}

export default RecruitmentPageContent