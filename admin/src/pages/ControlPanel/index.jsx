import React from 'react'
import EditBanner from '../../components/EditBanner'
const ControlPanel = () => {
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

      <EditBanner {...props} />
    </div>
  )
}

export default ControlPanel