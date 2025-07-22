import { useEffect } from 'react'
import {useLayout} from '@/layouts/LayoutContext'
import EditBanner from '@/components/EditBanner'
import useProjects from '@/hooks/useProjects'
import { toast } from 'react-toastify';
import Loading from '@/components/Loading'
const ProjectPageContent = () => {

  const {setLayoutProps} = useLayout()
  useEffect(()=>{
    setLayoutProps({
      title: "Nội dung Trang dự án",
      description: "Quản lý nội dung hiển thị trên trang dự án",
      hasButton: false,
    })
  },[])
  const {data: projectPage, isLoading: isLoadingProjectPage, isFetching: isFetchingProjectPage} = useProjects.getProjectPage()
  const { mutate: updateProjectPage, isPending: isPendingProjectPage } = useProjects.patchProjectPage();
  if(isLoadingProjectPage || isPendingProjectPage || isFetchingProjectPage)
  {
    return(<Loading/>)
  }
  console.log("Gia tri lay ve:", projectPage);
  const handleSave = (data)=>{
    console.log("Gia tri data gui len: ", data);
    updateProjectPage(data)
  }
  const bannerProps = {
      title: "Banner Trang dự án",
      description: "Chỉnh sửa tiêu đề và mô tả banner", 
      listInput: [{
        name: "title",
        label: "Tiêu đề Banner",
        placeholder: "Vd: Dự án của chúng tôi...",
        contentCurrent: projectPage.banner_title ,
        isRequire: true,
        maxLength: 200,
        rows: 1
      },
      {
        name:"description",
        label: "Mô tả Banner",
        placeholder: "Vd: Dự án của chúng tôi...",
        contentCurrent: projectPage.banner_description,
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

export default ProjectPageContent