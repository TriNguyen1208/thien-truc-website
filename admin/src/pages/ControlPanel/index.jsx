<<<<<<< HEAD
import DefaultLayout from '../../layouts/DefaultLayout'
import Card from '../../components/Card'
import {UserIcon, PhoneIcon, BoxIcon, ProjectIcon, NewsIcon} from '../../components/Icon'
import { useEffect } from 'react'
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
    <div className='w-full h-full relative border border-white hover:bg-[#F9FAFB] hover:border hover:border-[#F9FAFB] hover:rounded-[8px] p-[12px]'>
        <div className='absolute'></div>
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
      handleClick: ()=>{console.log("member")}
    },
    {
      title: "Đội ngũ liên lạc",
      description: "Nhân viên liên lạc", 
      quanlity: 5,
      icon: <PhoneIcon/> ,
      handleClick: ()=>{console.log("Contact Team")}

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
      handleClick: ()=>{console.log("Product")}

    },
    {
      title: "Dự án",
      description: "Tổng số dự án", 
      quanlity: 28,
      quanCategory: "3 khu vực",
      icon: <ProjectIcon/> ,
      handleClick: ()=>{console.log("Project")}

    },
    {
      title: "Bài báo",
      description: "Tổng số bài báo", 
      quanlity:45,
      quanCategory: "5 loại",
      icon: <NewsIcon/> ,
      handleClick: ()=>{console.log("Paper")}

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
  <div className=''>
    <DisplayCards data={members}/>
    <DisplayCards data={contents}/>
    <div>
      <h1 className='text-[24px] font-semibold text-black my-[24px] px-[12px]'>
        Hoạt động gần đây
      </h1>
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
=======
import React from 'react'
import Card from '@/components/Card'
import { PlayCircleOutlined } from '@ant-design/icons'
import EditBanner from '../../components/EditBanner'
import Button from '../../components/Button'
import FeatureCard from '../../components/FeatureCard'
import { LeftCircleOutlined } from '@ant-design/icons'

const ControlPanel = () => {
  const prop2 = {
    Icon: LeftCircleOutlined,

    colorText: "#000000",
    colorBackground: "#ffffff",
    handleButton: () => { console.log("Hi") }
  }
  const props = {
    title: "Banner Trang Chủ",
    description: "Chỉnh sửa tiêu đề và mô tả trang chủ",
    listInput: [{ label: "Tiêu đề Banner", placeholder: "Vui lòng nhập nội dung tiêu đề", contentCurrent: "Thiên Trúc là một cái gì đó" }
      ,
    { label: "Mô tả Banner", placeholder: "Vui lòng nhập nội dung mô tả" },
    { label: "Mô tả Banner", placeholder: "Vui lòng nhập nội dung mô tả" }

    ],
    saveButton: (arr) => { console.log(arr) },
  }
  return (
    <>
      <div>Day la noi dung trang ControlPanel</div>
      <div className='w-[1136px] h-fit '>

        <div className='w-[352px] h-[98px] my-[50px]'>
          <div className='w-[100px] h-[36px]'>
            <Button {...props} />
          </div>
          <FeatureCard title={"500+"} description={"Dự án hoàn thành"} buttonDelete={<Button {...prop2} />} buttonEdit={<Button {...prop2} />} />
        </div >

        <EditBanner {...props} />
      </div>
    </>
  )
}
// <div>Day la noi dung trang ControlPanel</div>
// <Form />
// )
// }
>>>>>>> 05cca1db363b97cfeabf881d341801d1779e5b3d

export default ControlPanel