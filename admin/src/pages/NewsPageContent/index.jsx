import { useEffect, useState } from 'react'
import {useLayout} from '@/layouts/LayoutContext'
import EditBanner from '@/components/EditBanner'
import useNews from '@/hooks/useNews'
import { toast } from 'react-toastify';
import Loading from '@/components/Loading'
import Notification from '@/components/Notification'

const NewsPageContent = () => {

  const {setLayoutProps} = useLayout()
  const [isVisible, setIsVisible] = useState(null);

  const {data: NewsPage, isLoading: isLoadingNewsPage} = useNews.getNewsPage()
  const { mutate: updateNewsPage, isPending } = useNews.patchNewsPage();
  const { mutate: updateVisibility, isPending: isPendingUpdateVisibility} = useNews.updateVisibility();
  
  const [valuesBanner, setValuesBanner] = useState(null)
  const [openNotification, setOpenNotification] = useState(false)

  useEffect(()=>{
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
  useEffect(() => {
    if(isLoadingNewsPage) return
    setIsVisible(NewsPage.is_visible);
  }, [NewsPage, isLoadingNewsPage]);
  
  if(isLoadingNewsPage || isPending || isPendingUpdateVisibility)
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
       updateNewsPage(valuesBanner);
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
      title: "Banner Trang tin tức",
      description: "Chỉnh sửa tiêu đề và mô tả banner", 
      listInput: [{
        name: "title",
        label: "Tiêu đề Banner",
        placeholder: "Vd: Tin tức công ty...",
        contentCurrent: NewsPage.banner_title ,
        isRequire: true,
        maxLength: 100,
        rows: 1
      },
      {
        name: "description",
        label: "Mô tả Banner",
        placeholder: "Vd: Tin tức của chúng tôi...",
        contentCurrent: NewsPage.banner_description,
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

export default NewsPageContent