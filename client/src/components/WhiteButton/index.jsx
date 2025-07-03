import React from 'react'

const WhiteButton = ({data}) => {
  const {
    content,
    handleClick
  } = data
  if(content == null || handleClick == null){
    return <></>
  }
  return (
    <button 
        className='inline-block max-w-max py-4 px-8 bg-white rounded-[6px] font-bold text-[var(--dark-green)]
                   hover:bg-[var(--green-bg)] hover:text-white transition-colors ease-out duration-300 cursor-pointer'
        onClick={handleClick}
    >{content}</button>
  )
}

export default WhiteButton