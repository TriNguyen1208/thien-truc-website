import { useEffect, useState } from 'react'
import {useLayout} from '@/layouts/LayoutContext'
import EditBanner from '@/components/EditBanner'
import useProducts from '@/hooks/useProducts'
import { toast } from 'react-toastify';
import Loading from '@/components/Loading'
import Notification from '@/components/Notification'
const ProductPageContent = () => {

  const {setLayoutProps} = useLayout()
  const [isVisible, setIsVisible] = useState(null);
  const {data: productPage, isLoading: isLoadingProductPage} = useProducts.getProductPage()
  const { mutate: updateProductPage, isPending: isLoadingUpdateProductPage } = useProducts.patchProductPage();
  const { mutate: updateVisibility, isPending: isPendingUpdateVisibility} = useProducts.updateProductVisibility();

  const [valuesBanner, setValuesBanner] = useState(null)
  const [openNotification, setOpenNotification] = useState(false)
  useEffect(()=>{
    setLayoutProps({
      title: "Nội dung Trang sản phẩm",
      description: "Quản lý nội dung hiển thị trên trang sản phẩm",
      hasButton: false,
      buttonToggle: {
        currentState: isVisible,
        handleToggle: handleToggle
      }
    })
  },[isVisible])
  useEffect(() => {
    if(isLoadingProductPage) return
    setIsVisible(productPage.is_visible);
  }, [productPage, isLoadingProductPage]);
  if(isLoadingProductPage || isLoadingUpdateProductPage || isPendingUpdateVisibility)
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
       updateProductPage(valuesBanner, 
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
     notification: "Xác nhận lưu thay đổi!", 
     subTitle:"Bạn có chắc chắn muốn lưu thay đổi.", 
     buttonLabel1:"Hủy", 
     buttonAction1:handleCancleNotification, 
     buttonLabel2: "Xác nhận", 
     buttonAction2: handleConfirmNotification
  }
  const bannerProps = {
      title: "Banner Trang sản phẩm",
      description: "Chỉnh sửa tiêu đề và mô tả banner", 
      listInput: [{
        name: "title",
        label: "Tiêu đề Banner",
        placeholder: "Vd: Sản phẩm của chúng tôi...",
        contentCurrent: productPage.banner_title ,
        isRequire: true,
        maxLength: 200,
        rows: 1
      },
      {
        name: "description",
        label: "Mô tả Banner",
        placeholder: "Vd: Sản phẩm của chúng tôi...",
        contentCurrent: productPage.banner_description,
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

export default ProductPageContent