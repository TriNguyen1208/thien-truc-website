import { useEffect } from 'react'
import {useLayout} from '@/layouts/LayoutContext'
import EditBanner from '@/components/EdditBanner'
const ProductPageContent = () => {

  const {setLayoutProps} = useLayout()

    useEffect(()=>{
    setLayoutProps({
      title: "Nội dung Trang sản phẩm",
      description: "Quản lý nội dung hiển thị trên trang sản phẩm",
      hasButton: false,
    })
  },[])
  const bannerProps = {
      title: "Banner Trang sản phẩm",
      description: "Chỉnh sửa tiêu đề và mô tả banner", 
      listInput,
      saveButton
  }
  return (
    <div>
      <EditBanner/>

    </div>
  )
}

export default ProductPageContent