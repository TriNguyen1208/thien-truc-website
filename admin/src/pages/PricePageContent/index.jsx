import React from 'react'
import { useLayout } from '../layouts/layoutContext'
const PricePageContent = () => {
  const {setLayoutProps} = useLayout()
 const {data: productPage, isLoading: isLoadingProductPage} = useProducts.getProductPage()
    useEffect(()=>{
    setLayoutProps({
      title: "Nội dung Trang bảng giá",
      description: "Quản lý nội dung hiển thị trên trang bảng giá",
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
      title: "Banner Trang bảng giá",
      description: "Chỉnh sửa tiêu đề và mô tả banner", 
      listInput: [{
        label: "Tiêu đề Banner",
        placeholder: "Vd: Sản phẩm của chúng tôi...",
        contentCurrent: productPage.banner_title ,
        isRequire: true
      },
      {
        label: "Mô tả Banner",
        placeholder: "Vd: Sản phẩm của chúng tôi...",
        contentCurrent: productPage.banner_description,
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