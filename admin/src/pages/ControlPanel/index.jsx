import React from 'react'
import EditBanner from '../../components/EditBanner'
import Button from '../../components/Button'
import {PlusSquareFilled} from '@ant-design/icons'
import FeatureCard from '../../components/FeatureCard'
import {LeftCircleOutlined} from '@ant-design/icons'
const ControlPanel = () => {
    const prop2 ={
     Icon :LeftCircleOutlined  ,
  
    colorText:"#000000" ,
    colorBackground:  "#ffffff" ,
    handleButton : ()=>{console.log("Hi")}
  }
 const props={
    title: "Banner Trang Chủ",
    description : "Chỉnh sửa tiêu đề và mô tả trang chủ",
    listInput: [{label: "Tiêu đề Banner", placeholder : "Vui lòng nhập nội dung tiêu đề", contentCurrent: "Thiên Trúc là một cái gì đó"}
      ,
      {label: "Mô tả Banner", placeholder : "Vui lòng nhập nội dung mô tả"}
    ]
 }
  return (
    <div className='w-[1136px] h-fit'>
       <div className='w-[352px] h-[98px]'>
       <div className='w-[100px] h-[36px]'>
         <Button {...props} />
       </div>
        <FeatureCard title={"500+"} description={"Dự án hoàn thành"} buttonDelete={ <Button {...props} />} buttonEdit={  <Button {...props} />}/>
      </div>
      <EditBanner {...props} />
    </div>)



  }

export default ControlPanel