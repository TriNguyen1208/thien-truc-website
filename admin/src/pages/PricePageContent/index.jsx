import {useEffect} from 'react'
import {useLayout} from '@/layouts/LayoutContext'
import useProducts from '@/hooks/useProducts'
import EditBanner from '@/components/EditBanner'
const PricePageContent = () => {
  const {setLayoutProps} = useLayout()
 const {data: pricePage, isLoading: isLoadingPricePage} = useProducts.getPricePage()
    useEffect(()=>{
    setLayoutProps({
      title: "Nội dung Trang bảng giá",
      description: "Quản lý nội dung hiển thị trên trang bảng giá",
      hasButton: false,
    })
  },[])
  if(isLoadingPricePage)
  {
    return(<div> Dang load</div>)
  }
  
  const handleSave = (data)=>{
    console.log(data)
  }
  const bannerProps = {
      title: "Banner Trang bảng giá",
      description: "Chỉnh sửa tiêu đề và mô tả banner", 
      listInput: [{
        label: "Tiêu đề Banner",
        placeholder: "Vd: Sản phẩm của chúng tôi...",
        contentCurrent: pricePage.banner_title ,
        isRequire: true
      },
      {
        label: "Mô tả Banner",
        placeholder: "Vd: Sản phẩm của chúng tôi...",
        contentCurrent: pricePage.banner_description,
        isRequire: true
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