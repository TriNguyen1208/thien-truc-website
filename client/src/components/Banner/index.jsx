import React from 'react'
import WhiteButton from '@/components/WhiteButton'
import SearchBar from '@/components/Search';

const Banner = ({data}) =>{
    const {
        title = "Tiêu đề mặc định",
        description = "Thông tin mặc định",
        colorBackground = "var(--gradient-banner)",
        colorText = "#ffffff",
        hasButton = false,
        hasSearch = false,
        contentButton = null,
        handleButton = null,
        categories = null,
        contentPlaceholder = null,
        currentQuery = null,
        currentCategory = null,
        handleSearchSuggestion = null,
        handleEnter = null,
        scrollTargetRef=null
    } = data || {}
    return (
        <div
            style={{ background: colorBackground, color: colorText }}
            className='flex flex-col pt-18 pb-15 w-full items-center'
        >
            <div className='flex flex-col gap-3 items-center w-full px-4 sm:px-6 lg:px-8 mx-auto'>
                <div className='flex flex-col gap-3 w-full max-w-4xl mx-auto text-center'>
                    <h1 className='text-4xl md:text-5xl font-bold break-word leading-15'>{title}</h1>
                    <p className='text-lg md:text-xl font-normal leading-[28px] break-word'>{description}</p>
                </div>
                <div ref={scrollTargetRef} className='mt-3 w-full text-center'>
                    {hasButton ? (
                        <WhiteButton
                            data={{
                                content: contentButton,
                                handleClick: handleButton
                            }}
                        />
                    ) : <></>}
                    {hasSearch ? ( 
                        // <SearchBar categories={categories} contentPlaceholder={contentPlaceholder} onSearch={handleButton}/>
                        <SearchBar 
                            data={{
                                categories: categories,
                                contentPlaceholder: contentPlaceholder,
                                currentQuery: currentQuery,
                                currentCategory: currentCategory,
                                onSearch: handleButton,
                                handleSearchSuggestion: handleSearchSuggestion,
                                handleEnter: handleEnter
                            }}
                        />
                    ): <></>}
                </div>
            </div>
        </div>
    )
}

export default Banner