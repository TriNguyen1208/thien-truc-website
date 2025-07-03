import React from 'react'

const BackButton = ({data}) => {
    const {
        content,
        handleClick
    } = data
    if(content == null || handleClick == null){
        return <></>
    }
    return (
        <button 
            className='inline-block max-w-max py-1 px-2 rounded-[6px] text-sm text-[#059669] cursor-pointer'
            onClick={handleClick}
        >	&#11013; {content}</button>
    )
}

export default BackButton