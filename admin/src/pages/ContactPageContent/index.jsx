import EditBanner from '../../components/EditBanner'
import { useLayout } from "@/layouts/LayoutContext"
import { useEffect } from "react"
import useContact from '../../hooks/useContact';
const ContactPageContent = () => {
  const { setLayoutProps } = useLayout()
  useEffect(() => {
    setLayoutProps({
      title: "Nội dung Trang liên hệ",
      description: "Quản lý nội dung hiển trị trên trang liên hệ",
      hasButton: false,
    })
  }, []);

  const { data: bannerData, isLoading: isLoadingBanner } = useContact.getContactPage();
  const { mutate: updateBanner, isPendingUpdateBanner: isPendingUpdateBanner } = useContact.updateContactPage.updateBanner();
  if (isLoadingBanner || isPendingUpdateBanner) {
    return (
      <>
        is loading..
      </>
    )
  }
  const configAboutUsBanner = {
    title: "Banner Trang liên hệ",
    description: "Chỉnh sửa tiêu đề và mô tả banner",
    listInput: [
      { name: "title", label: 'Tiêu đề banner', placeholder: 'Nhập nội dung banner...', contentCurrent: bannerData.banner_title, isRequire: true, rows: 1, maxLength: 100 },
      { name: "description", label: 'Mô tả banner', placeholder: 'Nhập nội dung mô tả...', contentCurrent: bannerData.banner_description, isRequire: true, rows: 3, maxLength: 300},
    ],
    handleSave: (values) => {
      updateBanner(values);
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