import {useEffect} from 'react'
import {useLayout} from '@/layouts/LayoutContext'
import useProducts from '@/hooks/useProducts'
import EditBanner from '@/components/EditBanner'
import Loading from '@/components/Loading'
import { useState } from 'react';
import Notification from '@/components/Notification'

const PricePageContent = () => {
    //------------------API------------------
    const {data: pricePage, isLoading: isLoadingPricePage} = useProducts.getPricePage()
    const { mutate: updateBanner, isPending: isPendingUpdateBanner } = useProducts.updatePricePage.banner();
    const { mutate: updateVisibility, isPending: isPendingUpdateVisibility} = useProducts.updatePricePage.visibility();

    //--------------Nút isVisibility--------------
    //Check isVisible
    const [isVisible, setIsVisible] = useState(null);
    useEffect(() => {
        if(isLoadingPricePage) return
        setIsVisible(pricePage.is_visible);
    }, [pricePage, isLoadingPricePage]);
    //Xu ly nut isVisible
    function handleToggle(checked){
        setIsVisible(checked);
        updateVisibility({visibility: checked});
    }

    //----------------Banner-------------
    //Use state luu trang thai cua form Banner
    const [valuesBanner, setValuesBanner] = useState(null)
    //Set layout cho banner
    const {setLayoutProps} = useLayout()
    useEffect(()=>{
        setLayoutProps({
            title: "Nội dung Trang bảng giá",
            description: "Quản lý nội dung hiển thị trên trang bảng giá",
            hasButton: false,
            buttonToggle: {
                currentState: isVisible,
                handleToggle: handleToggle
            }
        })
    },[isVisible])
    //Luu banner
    const handleSave = (data)=>{
        setValuesBanner(data)
        setOpenNotification(true)
    }
    //Prop cho banner
    const bannerProps = {
        title: "Banner Trang bảng giá",
        description: "Chỉnh sửa tiêu đề và mô tả banner", 
        listInput: [
            {
                name: "title",
                label: "Tiêu đề Banner",
                placeholder: "Vd: Sản phẩm của chúng tôi...",
                contentCurrent: pricePage?.banner_title ?? "",
                isRequire: true,
                rows: 1,
                maxLength: 200
            },
            {
                name: "description",
                label: "Mô tả Banner",
                placeholder: "Vd: Sản phẩm của chúng tôi...",
                contentCurrent: pricePage?.banner_description ?? "",
                isRequire: true,
                rows: 3,
                maxLength: 700

            }
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

    if(isLoadingPricePage || isPendingUpdateBanner || isPendingUpdateVisibility ){
        return(<Loading/>)
    }
    return (
        <div>
            <EditBanner {...bannerProps}/>
            <Notification {...notificationProps}/>
        </div>
    )
}

export default PricePageContent