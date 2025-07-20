import Card from '@/components/Card'
import {UserIcon, PhoneIcon, BoxIcon, ProjectIcon, NewsIcon, PulseIcon, ActivityIcon} from '@/components/Icon'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import {useLayout} from '@/layouts/LayoutContext'
import Loading from '@/components/Loading'
import useProjects from '@/hooks/useProjects'
import useProducts from '@/hooks/useProducts'
import useNews from '@/hooks/useNews'
import useAdmin from '@/hooks/useAdmin'
import useContact from '@/hooks/useContact'

function DisplayCards ({data})
{
    return(<div className='flex flex-col'>
      <h1 className='text-black text-[20px] font-semibold my-[24px]'> { data.title } </h1>
      <div className='flex flex-row gap-[24px]'>
          {
            data.cards.map((card, index)=>{
              return(<div key={index} className='w-[370px] h-[130px] '>
                  <Card {...card}/>
              </div>)
            })
          }
      </div>
    </div>)
}
function ItemActivity({data})
{
  return(
    <div className='w-full h-full relative border border-white hover:bg-[#F9FAFB] hover:border hover:border-[#F9FAFB] hover:rounded-[8px] px-[30px] py-[12px]'> 
        <div className='absolute left-[12px] top-[16px]'><ActivityIcon/></div>
        <div className='flex flex-col'>
              <div className='font-medium text-black text-[14px]'> {data.content} </div>
              <div className='text-[#71717A] text-[13px] font-regular '> Thực hiện bởi: {data.username} - {data.fullname} </div>
        </div>
        <div className='absolute top-[12px] right-[12px] text-[#71717A] text-[13px] font-regular '>{data.time} - {data.date}</div>
    </div>
  )
}
const ControlPanel = () => {

  const { data: quantityProject, isLoading: isLoadingQuantityProject} = useProjects.getQuantity()
  const { data: quantityProduct, isLoading: isLoadingQuantityProduct} = useProducts.getQuantity()
  const { data: quantityNews, isLoading: isLoadingQuantityNews} = useNews.getQuantity()
  const { data: quantityAdmin, isLoading: isLoadingQuantityAdmin} = useAdmin.getQuantity()
  const { data: quantityContact, isLoading: isLoadingQuantityContact} = useContact.getQuantity()
  const { data: activityLogs, isLoading: isLoadingActivity} = useAdmin.getActivityLogs()
  const {setLayoutProps} = useLayout()
  const navigate = useNavigate()


  useEffect(()=>{
    setLayoutProps({
      title: "Bảng điều khiển",
      description: "Chào mừng bạn đến với trang quản trị",
      hasButton: false,
    })
  },[])


  if(isLoadingQuantityProject || isLoadingQuantityProduct || isLoadingQuantityNews || isLoadingQuantityAdmin || isLoadingQuantityContact || isLoadingActivity)
    {
      return(<Loading/>)
    }
  
  const members = {
    title: "Nhân sự",
    cards: [{
      title: "Manager",
      description: "Tổng số manager", 
      quanlity: quantityAdmin.manager_count,
      icon: <UserIcon/>,
      handleClick: ()=>{navigate("/quan-ly-manager")}
    },
    {
      title: "Đội ngũ liên lạc",
      description: "Nhân viên liên lạc", 
      quanlity: quantityContact.agent_count,
      icon: <PhoneIcon/> ,
      handleClick: ()=>{navigate("/doi-ngu-lien-lac")}

    }
  ]
  }
  
  const contents = {
    title: "Nội dung",
    cards: [
      {
      title: "Sản phẩm",
      description: "Tổng số sản phẩm", 
      quanlity: quantityProduct.product_count,
      quanCategory: `${quantityProduct.categories_count} loại`,
      icon: <BoxIcon/>,
      handleClick: ()=>{navigate("/quan-ly-san-pham")}

    },
    {
      title: "Dự án",
      description: "Tổng số dự án", 
      quanlity: quantityProject.project_count,
      quanCategory: `${quantityProject.regions_count} khu vực`,
      icon: <ProjectIcon/> ,
      handleClick: ()=>{navigate("/quan-ly-du-an")}
    },
    {
      title: "Tin tức",
      description: "Tổng số tin tức", 
      quanlity: quantityNews.news_count,
      quanCategory: `${quantityNews.categories_count} loại`,
      icon: <NewsIcon/> ,
      handleClick: ()=>{navigate("/quan-ly-tin-tuc")}


    }
  ]
  }
  
  return(
  <div className='p-[12px]'>
    <DisplayCards data={members}/>
    <DisplayCards data={contents}/>
    <div className='bg-white my-[24px] p-[24px] border border-white rounded-[8px]'>
      <div className='flex flex-row gap-[4px]  items-center mb-[24px] px-[12px]'>
        <PulseIcon/>
        <h1 className='text-[24px] font-semibold text-black  px-[12px]'>
        Hoạt động gần đây
      </h1>
      </div>
        <div className='gap-[4px]'>
          {
        activityLogs.map((activity, index)=>{
          return(<div key={index}>
            <ItemActivity data={activity}/>
          </div>)
        })
        }
        </div>
    </div>
  </div>
    
  )
}

export default ControlPanel