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
        hasSearch = false,
        contentButton = null,
        handleButton = null,
        categories = null,
        contentPlaceholder = null
    } = data
    return (
        <div
            style={{ background: colorBackground, color: colorText }}
            className='flex flex-col pt-18 pb-15 w-screen items-center'
        >
            <div className='flex flex-col gap-3 items-center'>
                <div className='flex flex-col gap-5 w-full'>
                    <div className='flex flex-col gap-3 w-3xl mx-auto text-center'>
                        <h1 className='text-5xl font-semibold break-words leading-15'>{title}</h1>
                        <p className='font-normal leading-[28px] break-words'>{description}</p>
                    </div>
                </div>
                <div className='mt-3 px-20 w-full text-center'>
                    {hasButton ? (
                        <WhiteButton content={contentButton} handleClick={handleButton}/>
                    ) : <></>}
                    {hasSearch ? ( 
                        <SearchBar categories={categories} contentPlaceholder={contentPlaceholder}/>
                    ): <></>}
                </div>
            </div>

        </div>
    )
}

export default Banner