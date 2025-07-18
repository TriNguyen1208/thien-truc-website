import {useEffect} from 'react'
import {useLayout} from '@/layouts/LayoutContext'
import useProducts from '@/hooks/useProducts'
import EditBanner from '@/components/EditBanner'
import { toast } from 'react-toastify';
import Loading from '@/components/Loading'
const PricePageContent = () => {
  const {setLayoutProps} = useLayout()
  const {data: pricePage, isLoading: isLoadingPricePage} = useProducts.getPricePage()
  const { mutate: updatePricePage, isPending } = useProducts.patchPricePage();
    useEffect(()=>{
    setLayoutProps({
      title: "Nội dung Trang bảng giá",
      description: "Quản lý nội dung hiển thị trên trang bảng giá",
      hasButton: false,
    })
  },[])
  if(isLoadingPricePage)
  {
    return(<Loading/>)
  }
  
   const handleSave = (data)=>{
      updatePricePage(data, 
   {
      onSuccess: (success)=> { toast.success(success ? success.message: "Lưu thành công!")},
      onError:(error)=>{toast.error(error ?  error.message: "Lưu thất bại!") }
    });
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
    </div>
  )
}

export default PricePageContent