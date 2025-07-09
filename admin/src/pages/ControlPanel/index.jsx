import Card from '../../components/Card'
import {UserIcon, PhoneIcon, BoxIcon, ProjectIcon, NewsIcon, PulseIcon, ActivityIcon} from '../../components/Icon'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import {useLayout} from '../../layouts/LayoutContext'
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
              <div className='text-[#71717A] text-[13px] font-regular '> {data.implementer} </div>
        </div>
        <div className='absolute top-[12px] right-[12px] text-[#71717A] text-[13px] font-regular '>{data.time}</div>
    </div>
  )
}
const ControlPanel = () => {
  const {setLayoutProps} = useLayout()
  const navigate = useNavigate()
  useEffect(()=>{
    setLayoutProps({
      title: "Bảng điều khiển",
      description: "Chào mừng bạn đến với trang quản trị",
      hasButton: false,
    })
  })
  
  const members = {
    title: "Nhân sự",
    cards: [{
      title: "Manager",
      description: "Tổng số manager", 
      quanlity: 12,
      icon: <UserIcon/>,
      handleClick: ()=>{navigate("/quan-ly-manager")}
    },
    {
      title: "Đội ngũ liên lạc",
      description: "Nhân viên liên lạc", 
      quanlity: 5,
      icon: <PhoneIcon/> ,
      handleClick: ()=>{navigate("/doi-ngu-lien-lac")}

    }
  ]
  }
  const contents = {
    title: "Nội dung",
    cards: [{
      title: "Sản phẩm",
      description: "Tổng số sản phẩm", 
      quanlity: 156,
      quanCategory: "5 loại",
      icon: <BoxIcon/>,
      handleClick: ()=>{navigate("/quan-ly-san-pham")}

    },
    {
      title: "Dự án",
      description: "Tổng số dự án", 
      quanlity: 28,
      quanCategory: "3 khu vực",
      icon: <ProjectIcon/> ,
      handleClick: ()=>{navigate("/quan-ly-du-an")}


    },
    {
      title: "Bài báo",
      description: "Tổng số bài báo", 
      quanlity:45,
      quanCategory: "5 loại",
      icon: <NewsIcon/> ,
      handleClick: ()=>{navigate("/quan-ly-tin-tuc")}


    }
  ]
  }
  const recentActivities = [
    {
      content: "Thêm sản phẩm mới 'iPhone 15 Pro Max'",
      implementer: "Thực hiện bởi: admin@company.com",
      time: "10:45PM"
    },
     {
      content: "Thêm sản phẩm mới 'iPhone 15 Pro Max'",
      implementer: "Thực hiện bởi: admin@company.com",
      time: "10:45PM"
    },
     {
      content: "Thêm sản phẩm mới 'iPhone 15 Pro Max'",
      implementer: "Thực hiện bởi: admin@company.com",
      time: "10:45PM"
    },
     {
      content: "Thêm sản phẩm mới 'iPhone 15 Pro Max'",
      implementer: "Thực hiện bởi: admin@company.com",
      time: "10:45PM"
    },
  ]
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
        recentActivities.map((activity, index)=>{
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