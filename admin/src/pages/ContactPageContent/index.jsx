import EditBanner from '../../components/EditBanner'
import { useLayout } from "@/layouts/LayoutContext"
import { useEffect } from "react"
const ContactPageContent = () => {
  const { setLayoutProps } = useLayout()
  useEffect(() => {
    setLayoutProps({
      title: "Nội dung Trang liên hệ",
      description: "Quản lý nội dung hiển trị trên trang liên hệ",
      hasButton: false,
    })
  }, []);
  const configAboutUsBanner = {
    title: "Banner Trang liên hệ",
    description: "Chỉnh sửa tiêu đề và mô tả banner",
    listInput: [
      { label: 'Tiêu đề banner', placeholder: 'Nhập nội dung banner...', contentCurrent: 'Thiên trúc được thành lập vào năm 2025', isRequire: true },
      { label: 'Mô tả banner', placeholder: 'Nhập nội dung mô tả...', contentCurrent: 'Thiên trúc được thành lập vào năm 2025', isRequire: true },
    ],
    handleSave: (values) => {
      console.log('Giá trị đã lưu:', values);
      // Gửi dữ liệu lên server hoặc cập nhật state
    }
  }
  return (
    <>
      <EditBanner
        title={configAboutUsBanner.title}
        description={configAboutUsBanner.description}
        listInput={configAboutUsBanner.listInput}
        saveButton={configAboutUsBanner.handleSave}
      />
    </>
  )
}
export default ContactPageContent