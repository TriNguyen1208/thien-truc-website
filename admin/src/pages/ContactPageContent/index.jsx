import EditBanner from '../../components/EditBanner'
import {useLayout} from "@/layouts/LayoutContext"
import {useEffect} from "react"
const ContactPageContent = () => {
  const {setLayoutProps} = useLayout()
  useEffect(() => {
    setLayoutProps({
      title: "Nội dung Trang liên hệ",
      description: "Quản lí nội dung hiển trị trên trang liên hệ",
    })
  })
  const props = {
    title: "Banner Trang liên hệ",
    description: "Chỉnh sửa tiêu đề và mô tả trang chủ",
    listInput: [
    { label: "Tiêu đề Banner", placeholder: "Vui lòng nhập nội dung tiêu đề", contentCurrent: "Thiên Trúc là một cái gì đó" },
    { label: "Mô tả Banner", placeholder: "Vui lòng nhập nội dung mô tả" },
    ],
    saveButton: (arr) => { console.log(arr) },
  }
  return (
    <>
      <div className='w-full h-fit '>
        <EditBanner {...props} />
      </div>
    </>
  )
}
export default ContactPageContent