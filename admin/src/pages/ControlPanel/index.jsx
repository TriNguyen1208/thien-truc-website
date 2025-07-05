import React from 'react'
import Button from '../../components/Button'
import {PlusSquareFilled} from '@ant-design/icons'
import FeatureCard from '../../components/FeatureCard'
import {CloseCircleFilled} from '@ant-design/icons'
const ControlPanel = () => {
  const props ={
    Icon :PlusSquareFilled ,
    text: "Cập nhật",
    colorText: "#ffffff",
    colorBackground: "#000000",
    handleButton : ()=>{console.log("Hi")}
  }
  return (
 
    
      <div className='w-[352px] h-[98px]'>
        <FeatureCard title={"500+"} description={"Dự án hoàn thành"} buttonDelete={ <Button {...props} />} buttonEdit={  <Button {...props} />}/>
      </div>
  
  )

}

export default ControlPanel