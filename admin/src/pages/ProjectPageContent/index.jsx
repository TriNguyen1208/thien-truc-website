import {useState, useEffect } from 'react'
import {useLayout} from '@/layouts/LayoutContext'
import EditBanner from '@/components/EditBanner'
import useProjects from '@/hooks/useProjects'
import Loading from '@/components/Loading'
import Notification from '@/components/Notification'

const ProjectPageContent = () => {
    //------------------API------------------
    const {data: projectPage, isLoading: isLoadingProjectPage} = useProjects.getProjectPage()
    const { mutate: updateBanner, isPending: isPendingUpdateBanner } = useProjects.updateProjectPage.banner();
    const { mutate: updateVisibility, isPending: isPendingUpdateVisibility} = useProjects.updateProjectPage.visibility();

    //--------------Nút isVisibility--------------
    //Check isVisible
    const [isVisible, setIsVisible] = useState(null);
    useEffect(() => {
        if(isLoadingProjectPage) return
        setIsVisible(projectPage.is_visible);
    }, [projectPage, isLoadingProjectPage]);
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
            title: "Nội dung Trang dự án",
            description: "Quản lý nội dung hiển thị trên trang dự án",
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
        title: "Banner Trang dự án",
        description: "Chỉnh sửa tiêu đề và mô tả banner", 
        listInput: [
            {
                name: "title",
                label: "Tiêu đề Banner",
                placeholder: "Vd: Dự án của chúng tôi...",
                contentCurrent: projectPage?.banner_title ?? "",
                isRequire: true,
                maxLength: 100,
                rows: 1
            },
            {
                name:"description",
                label: "Mô tả Banner",
                placeholder: "Vd: Dự án của chúng tôi...",
                contentCurrent: projectPage?.banner_description ?? "",
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
    if(isLoadingProjectPage || isPendingUpdateBanner || isPendingUpdateVisibility){
        return(<Loading/>)
    }
    return (
        <div>
            <EditBanner {...bannerProps}/>
            <Notification {...notificationProps}/>
        </div>
    )
}

export default ProjectPageContent