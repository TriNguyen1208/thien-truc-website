import { useEffect, useState } from 'react'
import {useLayout} from '@/layouts/LayoutContext'
import EditBanner from '@/components/EditBanner'
import useNews from '@/hooks/useNews'
import Loading from '@/components/Loading'
import Notification from '@/components/Notification'

const NewsPageContent = () => {
    //------------------API------------------
    const { data: newsPage, isLoading: isLoadingNewsPage} = useNews.getNewsPage()
    const { mutate: updateNewsPage, isPending } = useNews.updateNewsPage.banner();
    const { mutate: updateVisibility, isPending: isPendingUpdateVisibility} = useNews.updateNewsPage.visibility();

    //--------------Nút isVisibility--------------
    //Check isVisible
    const [isVisible, setIsVisible] = useState(null);
    useEffect(() => {
        if(isLoadingNewsPage) return
        setIsVisible(newsPage.is_visible);
    }, [newsPage, isLoadingNewsPage]);

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
    useEffect(() => {
        setLayoutProps({
            title: "Nội dung Trang tin tức",
            description: "Quản lý nội dung hiển thị trên trang tin tức",
            hasButton: false,
            buttonToggle: {
                currentState: isVisible,
                handleToggle: handleToggle
            }
        })
    },[isVisible])
    //Luu banner
    const handleSave = (data) => {
        setValuesBanner(data);
        setOpenNotification(true);
    }
    //Prop cho banner
    const bannerProps = {
        title: "Banner Trang tin tức",
        description: "Chỉnh sửa tiêu đề và mô tả banner", 
        listInput: [
            {
                name: "title",
                label: "Tiêu đề Banner",
                placeholder: "Vd: Tin tức công ty...",
                contentCurrent: newsPage?.banner_title ?? "",
                isRequire: true,
                maxLength: 100,
                rows: 1
            },
            {
                name: "description",
                label: "Mô tả Banner",
                placeholder: "Vd: Tin tức của chúng tôi...",
                contentCurrent: newsPage?.banner_description ?? "",
                isRequire: true,
                maxLength: 300,
                rows: 3
            }
        ],
        saveButton: handleSave
    }

    //------------------Thông báo-------------------
    //useState mo thong bao xac nhan
    const [openNotification, setOpenNotification] = useState(false)
    //Nhan nut huy thong bao xac nhan
    const handleCancleNotification = ()=>{
        setOpenNotification(false)
    }
    //Nhan nut xac nhan updatePage
    const handleConfirmNotification =()=>{
        setOpenNotification(false)
        updateNewsPage(valuesBanner);
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
    
    if(isLoadingNewsPage || isPending || isPendingUpdateVisibility){
        return(<Loading/>)
    }
    return (
        <div>
            <EditBanner {...bannerProps}/>
            <Notification {...notificationProps}/>
        </div>
    )
}

export default NewsPageContent