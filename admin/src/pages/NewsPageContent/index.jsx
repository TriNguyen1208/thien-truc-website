import { useEffect } from 'react'
import {useLayout} from '@/layouts/LayoutContext'
import EditBanner from '@/components/EditBanner'
import useNews from '@/hooks/useNews'
import { toast } from 'react-toastify';

const NewsPageContent = () => {

  const {setLayoutProps} = useLayout()
  const {data: NewsPage, isLoading: isLoadingNewsPage} = useNews.getNewsPage()
  const { mutate: updateNewsPage, isPending } = useNews.patchNewsPage();
  

    useEffect(()=>{
    setLayoutProps({
      title: "Nội dung Trang tin tức",
      description: "Quản lý nội dung hiển thị trên trang tin tức",
      hasButton: false,
    })
  },[])
  if(isLoadingNewsPage)
  {
    return(<div> Dang load</div>)
  }
  
  const handleSave = (data)=>{
    updateNewsPage(data, 
    {
      onSuccess: () => toast.success("Cập nhật thành công"),
      onError: () => toast.error("Cập nhật thất bại"),
    }
);
  }
  const bannerProps = {
      title: "Banner Trang tin tức",
      description: "Chỉnh sửa tiêu đề và mô tả banner", 
      listInput: [{
        name: "title",
        label: "Tiêu đề Banner",
        placeholder: "Vd: Tin tức công ty...",
        contentCurrent: NewsPage.banner_title ,
        isRequire: true,
        maxLength: 200,
        rows: 1
      },
      {
        name: "description",
        label: "Mô tả Banner",
        placeholder: "Vd: Tin tức của chúng tôi...",
        contentCurrent: NewsPage.banner_description,
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

export default NewsPageContent