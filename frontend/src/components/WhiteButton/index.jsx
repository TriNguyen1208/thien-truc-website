import React from 'react'

const WhiteButton = ({content, handleClick}) => {
  return (
    <button 
        className='py-4 px-8 bg-white m-3 rounded-[6px] font-bold text-[var(--dark-green)]
                   hover:bg-[var(--green-bg)] hover:text-white transition-colors ease-out duration-300 cursor-pointer'
        onClick={handleClick}
    >{content}</button>
  )
}

export default WhiteButton