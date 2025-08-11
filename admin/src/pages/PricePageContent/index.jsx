import {useEffect} from 'react'
import {useLayout} from '@/layouts/LayoutContext'
import useProducts from '@/hooks/useProducts'
import EditBanner from '@/components/EditBanner'
import { toast } from 'react-toastify';
import Loading from '@/components/Loading'
import { useState } from 'react';
import Notification from '@/components/Notification'
const PricePageContent = () => {
  const {setLayoutProps} = useLayout()
  const [isVisible, setIsVisible] = useState(null);

  const {data: pricePage, isLoading: isLoadingPricePage} = useProducts.getPricePage()
  const { mutate: updatePricePage, isPending: isLoadingUpdatePricePage } = useProducts.patchPricePage();
  const { mutate: updateVisibility, isPending: isPendingUpdateVisibility} = useProducts.updatePriceVisibility();
  
  const [valuesBanner, setValuesBanner] = useState(null)
  const [openNotification, setOpenNotification] = useState(false)
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
  useEffect(() => {
      if(isLoadingPricePage) return
      setIsVisible(pricePage.is_visible);
    }, [pricePage, isLoadingPricePage]);
  if(isLoadingPricePage || isLoadingUpdatePricePage || isPendingUpdateVisibility)
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
    updatePricePage(valuesBanner, 
   {
      onSuccess: (success)=> { toast.success(success ? success.message: "Lưu thành công!")},
      onError:(error)=>{toast.error(error ?  error.message: "Lưu thất bại!") }
    });
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
      title: "Banner Trang bảng giá",
      description: "Chỉnh sửa tiêu đề và mô tả banner", 
      listInput: [{
        name: "title",
        label: "Tiêu đề Banner",
        placeholder: "Vd: Sản phẩm của chúng tôi...",
        contentCurrent: pricePage.banner_title ,
        isRequire: true,
        rows: 1,
        maxLength: 200
      },
      {
        name: "description",
        label: "Mô tả Banner",
        placeholder: "Vd: Sản phẩm của chúng tôi...",
        contentCurrent: pricePage.banner_description,
        isRequire: true,
        rows: 3,
        maxLength: 700

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

export default PricePageContent