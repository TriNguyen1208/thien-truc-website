import { useEffect } from 'react'
import {useLayout} from '@/layouts/LayoutContext'
import EditBanner from '@/components/EditBanner'
import useProjects from '@/hooks/useProjects'
import { toast } from 'react-toastify';

const ProjectPageContent = () => {

  const {setLayoutProps} = useLayout()
  const {data: projectPage, isLoading: isLoadingProjectPage} = useProjects.getProjectPage()
  const { mutate: updateProjectPage, isPending } = useProjects.patchProjectPage();
    useEffect(()=>{
    setLayoutProps({
      title: "Nội dung Trang dự án",
      description: "Quản lý nội dung hiển thị trên trang dự án",
      hasButton: false,
    })
  },[])
  if(isLoadingProjectPage)
  {
    return(<div> Dang load</div>)
  }
  
  const handleSave = (data)=>{
    updateProjectPage({
          "title": data['Tiêu đề Banner'],
          "description": data['Mô tả Banner']
    }, 
    {
      onSuccess: () => toast.success("Cập nhật thành công"),
      onError: () => toast.error("Cập nhật thất bại"),
    }
);
  }
  const bannerProps = {
      title: "Banner Trang dự án",
      description: "Chỉnh sửa tiêu đề và mô tả banner", 
      listInput: [{
        label: "Tiêu đề Banner",
        placeholder: "Vd: Dự án của chúng tôi...",
        contentCurrent: projectPage.banner_title ,
        isRequire: true,
        maxLength: 200,
        rows: 1
      },
      {
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