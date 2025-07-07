import React from 'react'
import Card from '@/components/Card'
import {PlayCircleOutlined} from '@ant-design/icons'
const ControlPanel = () => {
  return (
    <div className='w-[369px] h-[128px]'>
      <Card title = {"Tổng tin tức"} description = {"Bài viết"} quanlity = {50} quanCategory = {"4 loai"}  icon = {<PlayCircleOutlined />} />
    </div>
  )
}

export default ControlPanel