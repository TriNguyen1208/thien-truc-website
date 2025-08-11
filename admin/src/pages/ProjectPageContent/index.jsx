import {useState, useEffect } from 'react'
import {useLayout} from '@/layouts/LayoutContext'
import EditBanner from '@/components/EditBanner'
import useProjects from '@/hooks/useProjects'
import Loading from '@/components/Loading'
import Notification from '@/components/Notification'
const ProjectPageContent = () => {

  const {setLayoutProps} = useLayout()
  const [isVisible, setIsVisible] = useState(null);
  const [valuesBanner, setValuesBanner] = useState(null)
  const [openNotification, setOpenNotification] = useState(false)
  const {data: projectPage, isLoading: isLoadingProjectPage, isFetching: isFetchingProjectPage} = useProjects.getProjectPage()
  const { mutate: updateProjectPage, isPending: isPendingProjectPage } = useProjects.patchProjectPage();
  const { mutate: updateVisibility, isPending: isPendingUpdateVisibility} = useProjects.updateVisibility();

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
  useEffect(() => {
    if(isLoadingProjectPage) return
    setIsVisible(projectPage.is_visible);
  }, [projectPage, isLoadingProjectPage]);
  if(isLoadingProjectPage || isPendingProjectPage || isFetchingProjectPage || isPendingUpdateVisibility)
  {
    return(<Loading/>)
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
       updateProjectPage(valuesBanner);
  }
  const handleSave = (data)=>{
    setValuesBanner(data)
   setOpenNotification(true)
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
  const bannerProps = {
      title: "Banner Trang dự án",
      description: "Chỉnh sửa tiêu đề và mô tả banner", 
      listInput: [{
        name: "title",
        label: "Tiêu đề Banner",
        placeholder: "Vd: Dự án của chúng tôi...",
        contentCurrent: projectPage.banner_title ,
        isRequire: true,
        maxLength: 100,
        rows: 1
      },
      {
        name:"description",
        label: "Mô tả Banner",
        placeholder: "Vd: Dự án của chúng tôi...",
        contentCurrent: projectPage.banner_description,
        isRequire: true,
        maxLength: 300,
        rows: 3
      }
    ],
      saveButton: handleSave
  }
  return (
    <div>
      <EditBanner {...bannerProps}/>
      <Notification {...notificationProps}/>
    </div>
  )
}

export default ProjectPageContent