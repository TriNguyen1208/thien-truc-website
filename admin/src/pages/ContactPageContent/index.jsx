import EditBanner from '../../components/EditBanner'
import { useLayout } from "@/layouts/LayoutContext"
import { useEffect, useState } from 'react'
import useContact from '../../hooks/useContact';
import Loading from '@/components/Loading'
import Notification from '@/components/Notification'
const ContactPageContent = () => {
  const { setLayoutProps } = useLayout()
  const [isVisible, setIsVisible] = useState(null);
  
  const { data: bannerData, isLoading: isLoadingBanner, isFetching: isFetchingBanner } = useContact.getContactPage();
  const { mutate: updateBanner, isPendingUpdateBanner: isPendingUpdateBanner } = useContact.updateContactPage.updateBanner();
  const { mutate: updateVisibility, isPending: isPendingUpdateVisibility} = useContact.updateContactPage.updateVisibility();
  
  const [valuesBanner, setValuesBanner] = useState(null)
  const [openNotification, setOpenNotification] = useState(false)
  useEffect(() => {
    setLayoutProps({
      title: "Nội dung Trang liên hệ",
      description: "Quản lý nội dung hiển trị trên trang liên hệ",
      hasButton: false,
      buttonToggle: {
        currentState: isVisible,
        handleToggle: handleToggle
      }
    })
  }, [isVisible]);

  useEffect(() => {
      if(isLoadingBanner) return
      setIsVisible(bannerData.is_visible);
    }, [bannerData, isLoadingBanner]);

  if (isLoadingBanner || isPendingUpdateBanner || isFetchingBanner || isPendingUpdateVisibility) {
    return (
     <Loading/>
    )
  }
  function handleToggle(checked){
    setIsVisible(checked);
    updateVisibility({visibility: checked});
  }
    const handleCancleNotification = ()=>{
      setOpenNotification(false)
    }
    const handleConfirmNotification =()=>{
     
      setOpenNotification(false)
         updateBanner(valuesBanner);
    }
    
    const notificationProps = {
      open: openNotification, 
       setOpen: setOpenNotification, 
       notification: "Xác nhận lưu thay đổi!", 
       subTitle:"Bạn có chắc chắn muốn lưu thay đổi.", 
       buttonLabel1:"Hủy", 
       buttonAction1:handleCancleNotification, 
       buttonLabel2: "Xác nhận", 
       buttonAction2: handleConfirmNotification
    }
  const configAboutUsBanner = {
    title: "Banner Trang liên hệ",
    description: "Chỉnh sửa tiêu đề và mô tả banner",
    listInput: [
      { name: "title", label: 'Tiêu đề banner', placeholder: 'Nhập nội dung banner...', contentCurrent: bannerData.banner_title, isRequire: true, rows: 1, maxLength: 100 },
      { name: "description", label: 'Mô tả banner', placeholder: 'Nhập nội dung mô tả...', contentCurrent: bannerData.banner_description, isRequire: true, rows: 3, maxLength: 300},
    ],
    handleSave: (values) => {
      setValuesBanner(values)
     setOpenNotification(true)
      // Gửi dữ liệu lên server hoặc cập nhật state
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
      <Notification {...notificationProps}/>
    </>
  )
}
export default ContactPageContent