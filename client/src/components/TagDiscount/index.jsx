import React from 'react'

const TagDiscount = ({percent = null}) => {
    if(percent == null){
        return <></>
    }
    return (
        <div className='bg-[#ff5959] font-semibold text-xl px-2'>
            <span className='text-white'>-{percent}%</span>
        </div>
    )
}

export default TagDiscount