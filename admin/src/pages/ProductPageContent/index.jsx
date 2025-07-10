import { useEffect } from 'react'
import {useLayout} from '@/layouts/LayoutContext'
import EditBanner from '@/components/EditBanner'
import useProducts from '@/hooks/useProducts'

const ProductPageContent = () => {

  const {setLayoutProps} = useLayout()
  const {data: productPage, isLoading: isLoadingProductPage} = useProducts.getProductPage()
    useEffect(()=>{
    setLayoutProps({
      title: "Nội dung Trang sản phẩm",
      description: "Quản lý nội dung hiển thị trên trang sản phẩm",
      hasButton: false,
    })
  },[])
  if(isLoadingProductPage)
  {
    return(<div> Dang load</div>)
  }
  
  const handleSave = (data)=>{
    console.log(data)
  }
  const bannerProps = {
      title: "Banner Trang sản phẩm",
      description: "Chỉnh sửa tiêu đề và mô tả banner", 
      listInput: [{
        label: "Tiêu đề Banner",
        placeholder: "Vd: Sản phẩm của chúng tôi...",
        contentCurrent: productPage.banner_title ,
        isRequire: true,
        maxLength: 200,
        rows: 1
      },
      {
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
    </div>
  )
}

export default ProductPageContent