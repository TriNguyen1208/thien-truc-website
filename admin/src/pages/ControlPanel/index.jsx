import React from 'react'
import Button from '../../components/Button'
import {PlusSquareFilled} from '@ant-design/icons'
import FeatureCard from '../../components/FeatureCard'
import {LeftCircleOutlined} from '@ant-design/icons'
const ControlPanel = () => {
  const props ={
     Icon :LeftCircleOutlined  ,
  
    colorText:"#000000" ,
    colorBackground:  "#ffffff" ,
    handleButton : ()=>{console.log("Hi")}
  }
  return (
 
    
      <div className='w-[352px] h-[98px]'>
       <div className='w-[100px] h-[36px]'>
         <Button {...props} />
       </div>
        <FeatureCard title={"500+"} description={"Dự án hoàn thành"} buttonDelete={ <Button {...props} />} buttonEdit={  <Button {...props} />}/>
      </div>
  
  )

}

export default ControlPanel