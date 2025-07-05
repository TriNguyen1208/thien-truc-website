import React from 'react'
import FeatureCard from '../../components/FeatureCard'
import {CloseCircleFilled} from '@ant-design/icons'
const ControlPanel = () => {
  return (
    <div className='w-[352px] h-[98px]'>
      <FeatureCard title={"500+"} description={"Dự án hoàn thành"} buttonDelete={<CloseCircleFilled />} buttonEdit={ <CloseCircleFilled />}/>
    </div>
  )
}

export default ControlPanel