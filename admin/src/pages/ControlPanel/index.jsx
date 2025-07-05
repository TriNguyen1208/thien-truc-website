import React from 'react'
import Button from '../../components/Button'
import {PlusSquareFilled} from '@ant-design/icons'
const ControlPanel = () => {
  const props ={
    Icon :PlusSquareFilled ,
    text: "Cập nhật",
    colorText: "#ffffff",
    colorBackground: "#000000",
    handleButton : ()=>{console.log("Hi")}
  }
  return (
    <div className='w-[141px] h-[40px]'>
      <Button {...props} />
    </div>
  )
}

export default ControlPanel