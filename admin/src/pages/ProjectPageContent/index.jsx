import {useState, useEffect } from 'react'
import {useLayout} from '@/layouts/LayoutContext'
import EditBanner from '@/components/EditBanner'
import useProjects from '@/hooks/useProjects'
import { toast } from 'react-toastify';
import Loading from '@/components/Loading'
import Notification from '@/components/Notification'
const ProjectPageContent = () => {

  const {setLayoutProps} = useLayout()
  const {data: projectPage, isLoading: isLoadingProjectPage} = useProjects.getProjectPage()
  const { mutate: updateProjectPage, isPending } = useProjects.patchProjectPage();
  const [valuesBanner, setValuesBanner] = useState(null)
  const [openNotification, setOpenNotification] = useState(false)
    useEffect(()=>{
    setLayoutProps({
      title: "Nội dung Trang dự án",
      description: "Quản lý nội dung hiển thị trên trang dự án",
      hasButton: false,
    })
  },[])
  if(isLoadingProjectPage)
  {
    return(<Loading/>)
  }
  const handleCancleNotification = ()=>{
    setOpenNotification(false)
  }
  const handleConfirmNotification =()=>{
    
    setOpenNotification(false)
       updateProjectPage(valuesBanner, 
   {
      onSuccess: (success)=> { toast.success(success ? success.message: "Lưu thành công!")},
      onError:(error)=>{toast.error(error ?  error.message: "Lưu thất bại!") }
    }
);
  }
  const handleSave = (data)=>{
    setValuesBanner(data)
   setOpenNotification(true)
  }
  const notificationProps = {
    open: openNotification, 
     setOpen: setOpenNotification, 
     notification: "Xác nhận lưu thây đổi!", 
     subTitle:"Bạn có chắc chắn muốn lưu thây đổi.", 
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
        maxLength: 200,
        rows: 1
      },
      {
        name:"description",
        label: "Mô tả Banner",
        placeholder: "Vd: Dự án của chúng tôi...",
        contentCurrent: projectPage.banner_description,
        isRequire: true,
        maxLength: 700,
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