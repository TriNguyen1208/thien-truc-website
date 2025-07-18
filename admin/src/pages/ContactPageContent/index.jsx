import EditBanner from '../../components/EditBanner'
import { useLayout } from "@/layouts/LayoutContext"
import { useEffect } from "react"
import useContact from '../../hooks/useContact';
import Loading from '@/components/Loading'
const ContactPageContent = () => {
  const { setLayoutProps } = useLayout()
  useEffect(() => {
    setLayoutProps({
      title: "Nội dung Trang liên hệ",
      description: "Quản lý nội dung hiển trị trên trang liên hệ",
      hasButton: false,
    })
  }, []);
  function renameKeysByNames(obj, newKeys) {
    const originalKeys = Object.keys(obj); // Lấy thứ tự key gốc
    const result = {};

    newKeys.forEach((newKey, index) => {
      const oldKey = originalKeys[index];
      result[newKey] = obj[oldKey];
    });

    return result;
  }
  const { data: bannerData, isLoading: isLoadingBanner } = useContact.getContactPage();
  const { mutate: updateBanner, isLoading: isLoadingUpdateBanner } = useContact.updateContactPage.updateBanner();
  if (isLoadingBanner || isLoadingUpdateBanner) {
    return (
     <Loading/>
    )
  }
  console.log(bannerData, isLoadingBanner);
  const configAboutUsBanner = {
    title: "Banner Trang liên hệ",
    description: "Chỉnh sửa tiêu đề và mô tả banner",
    listInput: [
      { label: 'Tiêu đề banner', placeholder: 'Nhập nội dung banner...', contentCurrent: bannerData.banner_title, isRequire: true },
      { label: 'Mô tả banner', placeholder: 'Nhập nội dung mô tả...', contentCurrent: bannerData.banner_description, isRequire: true },
    ],
    handleSave: (values) => {
      const newValues = renameKeysByNames(values, ["title", "description"]);
      console.log('Giá trị đã lưu:', newValues);
      updateBanner(newValues);
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