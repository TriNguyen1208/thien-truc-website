import { useEffect, useState } from 'react'
import {useLayout} from '@/layouts/LayoutContext'
import EditBanner from '@/components/EditBanner'
import useProducts from '@/hooks/useProducts'
import Loading from '@/components/Loading'
import Notification from '@/components/Notification'
const ProductPageContent = () => {
    //------------------API------------------
    const {data: productPage, isLoading: isLoadingProductPage} = useProducts.getProductPage()
    const { mutate: updateBanner, isPending: isLoadingUpdateProductPage } = useProducts.updateProductPage.banner();
    const { mutate: updateVisibility, isPending: isPendingUpdateVisibility} = useProducts.updateProductPage.visibility();

    //--------------Nút isVisibility--------------
    //Check isVisible
    const [isVisible, setIsVisible] = useState(null);
    useEffect(() => {
        if(isLoadingProductPage) return
        setIsVisible(productPage.is_visible);
    }, [productPage, isLoadingProductPage]);
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
            title: "Nội dung Trang sản phẩm",
            description: "Quản lý nội dung hiển thị trên trang sản phẩm",
            hasButton: false,
            buttonToggle: {
                currentState: isVisible,
                handleToggle: handleToggle
            }
        }
    )},[isVisible])
    //Lưu banner
    const handleSave = (data)=>{
        setValuesBanner(data)
        setOpenNotification(true)
    }
    //Prop cho banner
    const bannerProps = {
        title: "Banner Trang sản phẩm",
        description: "Chỉnh sửa tiêu đề và mô tả banner", 
        listInput: [
            {
                name: "title",
                label: "Tiêu đề Banner",
                placeholder: "Vd: Sản phẩm của chúng tôi...",
                contentCurrent: productPage?.banner_title ?? "",
                isRequire: true,
                maxLength: 200,
                rows: 1
            },
            {
                name: "description",
                label: "Mô tả Banner",
                placeholder: "Vd: Sản phẩm của chúng tôi...",
                contentCurrent: productPage?.banner_description ?? "",
                isRequire: true,
                maxLength: 700,
                rows: 3
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
    if(isLoadingProductPage || isLoadingUpdateProductPage || isPendingUpdateVisibility){
        return(<Loading/>)
    }
    return (
        <div>
        <EditBanner {...bannerProps}/>
        <Notification {...notificationProps}/>
        </div>
    )
}

export default ProductPageContent