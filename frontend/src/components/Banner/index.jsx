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
            className={``}
        >
            <p>{title}</p>
            <p>{description}</p>
            {hasButton ? (
                <WhiteButton content={contentButton} handleClick={handleButton}/>
             ) : ( 
                <SearchBar categories={categories} contentPlaceholder={contentPlaceholder}/>
             )
            }
        </div>
    )
}

export default Banner