import EditBanner from '../../components/EditBanner'
import { useLayout } from "@/layouts/LayoutContext"
import { useEffect, useState } from 'react'
import useContact from '../../hooks/useContact';
import Loading from '@/components/Loading'
import Notification from '@/components/Notification'
const ContactPageContent = () => {
    //------------------API------------------
    const { data: contactPage, isLoading: isLoadingContactPage, isFetching: isFetchingContactPage } = useContact.getContactPage();
    const { mutate: updateBanner, isPendingUpdateBanner: isPendingUpdateBanner } = useContact.updateContactPage.updateBanner();
    const { mutate: updateVisibility, isPending: isPendingUpdateVisibility} = useContact.updateContactPage.updateVisibility();
    
    //--------------Nút isVisibility--------------
    //Check isVisible
    const [isVisible, setIsVisible] = useState(null);
    useEffect(() => {
        if(isLoadingContactPage) return
        setIsVisible(contactPage.is_visible);
    }, [contactPage, isLoadingContactPage]);
    //Xu ly nut isVisible
    function handleToggle(checked){
        setIsVisible(checked);
        updateVisibility({visibility: checked});
    }

    //----------------Banner-------------
    //Use state luu trang thai cua form Banner
    const [valuesBanner, setValuesBanner] = useState(null)
    //Set layout cho banner
    const { setLayoutProps } = useLayout()
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
    //Luu banner
    const handleSave = (data) => {
        setValuesBanner(data);
        setOpenNotification(true);
    }
    //Prop cho banner
    const bannerProps = {
        title: "Banner Trang liên hệ",
        description: "Chỉnh sửa tiêu đề và mô tả banner",
        listInput: 
        [
            { 
                name: "title", 
                label: 'Tiêu đề banner', 
                placeholder: 'Nhập nội dung banner...', 
                contentCurrent: contactPage?.banner_title ?? "", 
                isRequire: true, 
                rows: 1, 
                maxLength: 100 
            },
            { 
                name: "description", 
                label: 'Mô tả banner', 
                placeholder: 'Nhập nội dung mô tả...', 
                contentCurrent: contactPage?.banner_description ?? "", 
                isRequire: true, 
                rows: 3, 
                maxLength: 300
            },
        ],
        saveButton: handleSave
    }

    //------------------Thông báo-------------------
    //useState mo thong bao xac nhan
    const [openNotification, setOpenNotification] = useState(false)
    //Nhan nut huy thong bao xac nhan
    const handleCancleNotification = () => {
        setOpenNotification(false)
    }
    //Nhan nut xac nhan updatePage
    const handleConfirmNotification = () => {
        setOpenNotification(false)
        updateBanner(valuesBanner);
    }
    //Prop cho thong bao
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
    if (isLoadingContactPage || isPendingUpdateBanner || isFetchingContactPage || isPendingUpdateVisibility) {
        return (
            <Loading/>
        )
    }

    return (
        <>
            <EditBanner {...bannerProps}/>
            <Notification {...notificationProps}/>
        </>
    )
}
export default ContactPageContent