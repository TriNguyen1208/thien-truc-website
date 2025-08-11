import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'

const BackButton = ({content}) => {
    const navigate = useNavigate();
    if(content == null){
        return <></>
    }
    return (
        <div onClick={() => navigate(-1)} className="flex flex-row sm:px-0 px-2 w-full h-[20px] my-[15px] gap-[10px] leading-none items-center text-[#14532D] font-medium cursor-pointer">
            <ArrowLeftOutlined />
            <span>{content}</span>
        </div>
    )
}

export default BackButton