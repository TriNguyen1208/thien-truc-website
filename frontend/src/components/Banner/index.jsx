import React from 'react'
import WhiteButton from '@/components/WhiteButton'
import SearchBar from '@/components/Search';
// const Banner = ({data, colorBackground = 'var(--', colorText = "#ffffff", hasButton = null, contentButton, handleButton}) => {
const Banner = ({data}) =>{
    const {
        title,
        description,
        colorBackground = "var(--gradient-banner)",
        colorText = "#ffffff",
        hasButton = false,
        contentButton = "",
        handleButton = null,
        categories = null,
        contentPlaceholder = null
    } = data
    return (
        <div
            style={{ background: colorBackground, color: colorText }}
            className='flex flex-col pt-18 pb-15 px-4 items-center'
        >
            <div className='flex flex-col gap-5 items-center'>
                <h1 className='text-5xl font-semibold text-center'>{title}</h1>
                <div className='max-w-3xl text-center'>
                    <p className='font-normal leading-[28px]'>{description}</p> 
                </div>
                <div className='mt-3 px-20 w-full text-center'>
                    {hasButton ? (
                        <WhiteButton content={contentButton} handleClick={handleButton}/>
                    ) : ( 
                        <SearchBar categories={categories} contentPlaceholder={contentPlaceholder}/>
                    )
                    }
                </div>
            </div>
            
        </div>
    )
}

export default Banner