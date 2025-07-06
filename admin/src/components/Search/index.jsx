import React, { useEffect, useMemo, useRef, useState } from 'react'

const SearchIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#9CA3AF" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 14L11.1333 11.1333" stroke="#9CA3AF" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)
const FilterIcon = () => (
    <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_1724_13026)">
        <path d="M14.6666 2H1.33325L6.66659 8.30667V12.6667L9.33325 14V8.30667L14.6666 2Z" stroke="#09090B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <defs>
        <clipPath id="clip0_1724_13026">
        <rect width="16" height="16" fill="white"/>
        </clipPath>
        </defs>
    </svg>
)
const OpenIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.5">
        <path d="M4 6L8 10L12 6" stroke="#09090B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
    </svg>

)
const SearchBar = ({data}) => {
    //prop
    const {
        hasButton,
        placeholder,
        handleEnter,
        onSearch,
        categories = null,
        displays = null,
        handleSearchSuggestion //co 3 tham so la query, category = null, display = null
    } = data;
    //using useState
    const [query, setQuery] = useState("");
    const [isFocus, setIsFocus] = useState(false);
    const [showSuggestions, setShowSuggestion] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState(0);
    const [displaySuggestion, setDisplaySuggestion] = useState([]);
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [dropdownOpenCategory, setDropDownOpenCategory] = useState(false);
    const [dropdownOpenDisplay, setDropDownOpenDisplay] = useState(false);
    const [category, setCategory] = useState(categories?.[0] ?? null);
    const [display, setDisplay] = useState(displays?.[0] ?? null);

    //using useRef
    const wrapperRef = useRef(null);

    //Xu ly truncate
    const truncateCategories = useMemo(()=>{
        if(!categories){
            return;
        }
        return categories.map((category)=>{
            if(Array.from(category).length >= 20){
                return category.slice(0, 20) + '...';
            }
            return category
        });
    }, []);
    const truncateDisplays = useMemo(()=>{
        if(!displays){
            return;
        }
        return displays.map((display)=>{
            if(Array.from(display).length >= 20){
                return display.slice(0, 17) + "...";
            }
            return display;
        })
    }, [])

    //function
    //debounced query 100ms
    useEffect(()=> {
        const timeout = setTimeout(() => {
            setDebouncedQuery(query);
        }, 100);
        return () => clearTimeout(timeout);
    }, [query]);

    //Call API khi debounced query
    // const {data: suggestions = [], isLoading} = handleSearchSuggestion(
    //     debouncedQuery,
    //     category != null ? (category == categories[0] ? '' : category) : null,
    //     display != null ? (display == displays[0] ? '' : display) : null,
    // );
    const suggestions = [
    {
        "query": "Ủy ban nhân dân xã Ka Đơn",
        "id": 12,
        "img": null
    },
    {
        "query": "Ban QLDA Đầu tư Xây dựng quận Hoàn Kiếm",
        "id": 2,
        "img": null
    },
    {
        "query": "Học viện Cán bộ Tp. HCM",
        "id": 16,
        "img": null
    },
    {
        "query": "Liên đoàn Lao động quận Bình Thạnh - TP.HCM",
        "id": 14,
        "img": null
    },
    {
        "query": "Ngân hàng Vietcombank Chi nhánh Thăng Long",
        "id": 7,
        "img": null
    }];
    //Cap nhat displaySuggestion
    const stableSuggestion = useMemo(()=>{
        return Array.isArray(suggestions) ? suggestions : [];
    }, [JSON.stringify(suggestions)])

    //cap nhat displaySuggestion
    useEffect(()=> {
        setHighlightIndex(0);
        if(!query.trim()){ //khong viet chu nao
            setDisplaySuggestion([]);
            return;
        }
        setDisplaySuggestion([
            { id: 'input', query: query },
            ...stableSuggestion,
        ])
    }, [query, stableSuggestion])
    //Dong dropdown khi click ben ngoai
    useEffect(()=>{
        const handleClickOutside = (e) => {
            if(wrapperRef.current && !wrapperRef.current.contains(e.target)){
                if(hasButton){
                    setDropDownOpenCategory(false);
                    setDropDownOpenDisplay(false);
                }
                setIsFocus(false);
                setShowSuggestion(false);
            }
        }   
        document.addEventListener('mousedown', handleClickOutside); //lang nghe du kien click chuot
        return () => document.removeEventListener('mousedown', handleClickOutside); //go bo su kien event listener. Tranh lap lai nhieu lan
    })
    const handleSearch = (query = "", category = null, display = null) => {
        if(onSearch){
            onSearch(query, category, display);
        }
        setShowSuggestion(false);
    }
    return (
        <div className='rounded-sm bg-amber-300'>
            <div ref={wrapperRef} className={`flex flex-row gap-5 justify-between w-full rounded-md h-10 bg-red-500`}>
                <div className={`relative flex flex-row items-center rounded-sm gap-3 px-4 w-full bg-green-500 ${hasButton ? "" : "flex-1"} ${isFocus ? "border border-gray-500" : ""}`}>
                    <SearchIcon/>
                    <input
                        type='text'
                        placeholder={placeholder || "Nhập từ khóa tìm kiếm..."}
                        className={`w-full text-gray-700 focus:outline-none focus:text-gray-700`}
                        value={query}
                        onFocus={() =>{
                            setIsFocus(true),
                            setShowSuggestion(true);
                        }}
                        onChange={(e) => {
                            setQuery(e.target.value),
                            setShowSuggestion(true);
                        }}
                        onKeyDown={(e) => {
                            if(e.key == "ArrowDown"){
                                e.preventDefault(); //ngan khong cuon trang
                                setHighlightIndex((curr) => Math.min(curr + 1, displaySuggestion.length - 1))
                            }
                            else if(e.key == "ArrowUp"){
                                e.preventDefault();
                                setHighlightIndex((curr) => Math.max(curr - 1, 0));
                            } else if(e.key == "Enter"){
                                const item = displaySuggestion[highlightIndex];
                                if(item){
                                    if(item.id == 'input'){
                                        handleSearch(item.query, category, display)
                                    }else{
                                        handleEnter(item.id);
                                    }
                                }else{
                                    handleSearch(item.query, category, display)
                                }
                            }
                        }}
                    />
                    {/* Hien thi goi y */}
                    { 
                        showSuggestions && debouncedQuery && (
                            <ul className='absolute z-10 left-0 py-2 mt-67 w-full bg-red-700 shadow-md max-h-64 overflow-y-auto'>
                                {displaySuggestion.map((item, index) => (
                                    <li
                                        key={index}
                                        className={`py-2 cursor-pointer text-sm text-bold text-gray-700 text-left px-4 flex gap-3 items-center ${index == highlightIndex ? 'bg-gray-100': ''}`}
                                        onMouseEnter={() => {
                                            setHighlightIndex(index);
                                        }}
                                        onClick={()=>{
                                            if(item.id == 'input'){
                                                handleSearch(item.query, category, display)
                                            }else{
                                                handleEnter(item.id);
                                            }
                                        }}
                                    >
                                        {
                                            item.id == 'input' ? 
                                            (
                                                <>
                                                    <SearchIcon/>
                                                    {query}
                                                </>
                                            ): 
                                            (
                                                <>
                                                    <img src={item.img} className='h-5 w-5'/>
                                                    {item.query}
                                                </>
                                            )
                                        }
                                    </li>
                                ))}
                                {
                                    // isLoading && (
                                    //     <li key="loading" className="py-2 px-4 text-sm text-gray-500">
                                    //         Đang tải...
                                    //     </li>
                                    // )
                                }
                            </ul>
                        )
                    }
                </div>
                {
                    hasButton && (
                        <div className='flex flex-row gap-5 justify-between'>
                            <div className='relative h-full rounded-sm flex flex-row'>
                                <button
                                    className='rounded-sm w-44 h-full pl-[16px] pr-[17px] text-bold text-gray-700 hover:bg-gray-100 flex items-center justify-center gap-1 bg-[#F9FAFB] cursor-pointer'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setDropDownOpenCategory(!dropdownOpenCategory);
                                    }}
                                >
                                    <FilterIcon/>
                                    <span>{truncateCategories[categories.indexOf(category)]}</span>
                                    <OpenIcon/>
                                </button>
                                {
                                    dropdownOpenCategory && (
                                        <ul className="absolute z-10 left-0 py-2 mt-12 w-full bg-white rounded-md shadow-md max-h-[160px] overflow-y-auto"
                                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                        >
                                            {categories.map((item, index) => (
                                                <li
                                                    key={index}
                                                    className='py-2 px-3 hover:bg-red-500 cursor-pointer text-sm text-center text-bold text-gray-700'
                                                    onClick={(e)=> {
                                                        e.preventDefault();
                                                        setCategory(item);
                                                        setDropDownOpenCategory(false);
                                                        handleSearch(undefined, item, display)
                                                    }}
                                                >
                                                    <span className='break-words'>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) 
                                }
                            </div>
                            <div className='relative h-full rounded-sm flex flex-row'>
                                <button
                                    className='rounded-sm w-55 h-full pl-[16px] pr-[17px] text-bold text-gray-700 hover:bg-gray-100 flex items-center justify-center gap-1 bg-[#F9FAFB] cursor-pointer'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setDropDownOpenDisplay(!dropdownOpenDisplay);
                                    }}
                                >
                                    <FilterIcon/>
                                    <span>{truncateDisplays[displays.indexOf(display)]}</span>
                                    <OpenIcon/>
                                </button>
                                {
                                    dropdownOpenDisplay && (
                                        <ul className="absolute z-10 left-0 py-2 mt-12 w-full bg-white rounded-md shadow-md max-h-[160px] overflow-y-auto"
                                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                        >
                                            {displays.map((item, index) => (
                                                <li
                                                    key={index}
                                                    className='py-2 px-3 hover:bg-red-500 cursor-pointer text-sm text-center text-bold text-gray-700'
                                                    onClick={(e)=> {
                                                        e.preventDefault();
                                                        setDisplay(item);
                                                        setDropDownOpenDisplay(false);
                                                        handleSearch(undefined, category, item)
                                                    }}
                                                >
                                                    <span className='break-words'>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) 
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default SearchBar