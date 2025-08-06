import React, { useEffect, useMemo, useRef, useState } from 'react'
import { SearchIcon, FilterIcon, OpenIcon } from '../Icon';
import LazyLoad from '@/components/LazyLoad';
const SearchBar = ({data}) => {
    //prop
    const {
        hasButtonCategory = false,
        hasButtonDisplay = false,
        placeholder,
        handleEnter,
        onSearch,
        categories = null,
        displays = null,
        handleSearchSuggestion, //co 3 tham so la query, category = null, display = null,
        currentQuery = "",
        currentCategory,
        currentDisplay,
        displayMap = null
    } = data;
    //using useState
    const [query, setQuery] = useState(currentQuery);
    const [isFocus, setIsFocus] = useState(false);
    const [showSuggestions, setShowSuggestion] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState(0);
    const [displaySuggestion, setDisplaySuggestion] = useState([]);
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [dropdownOpenCategory, setDropDownOpenCategory] = useState(false);
    const [dropdownOpenDisplay, setDropDownOpenDisplay] = useState(false);
    const [category, setCategory] = useState(categories?.[0] ?? null);
    const [display, setDisplay] = useState(displays?.[0] ?? null);
    // //Giữ trạng thái của category
    useEffect(() => {
        if (categories && categories.length > 0) {
            setCategory(currentCategory);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //Giữ trạng thái của query
    useEffect(() => {
        setQuery(currentQuery)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //Giữ trạng thái của 
    useEffect(() => {
        if (displays && displays.length > 0) {
            setDisplay(currentDisplay);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //using useRef
    const wrapperRef = useRef(null);
    //function
    //debounced query 100ms
    useEffect(()=> {
        const timeout = setTimeout(() => {
            setDebouncedQuery(query);
        }, 100);
        return () => clearTimeout(timeout);
    }, [query]);

    //Call API khi debounced query
    const {data: suggestions = [], isLoading} = handleSearchSuggestion(
        debouncedQuery,
        category != null ? (category == categories[0] ? '' : category) : null, 
        (displayMap !== null || display == null || display === displays[0])
            ? null
            : ((display === "Đã xuất bản" || display === "Trưng bày") ? true : false)
    );
    //Cap nhat displaySuggestion
    const stableSuggestion = useMemo(()=>{
        // return Array.isArray(suggestions) ? suggestions : [];
        if (!Array.isArray(suggestions)) return [];
        if (displayMap != null){
            return suggestions.filter((item) => {
                const displayVal = displayMap.get(item.id) || "Chưa gán";
                if (display === "Tất cả trạng thái") return true;
                return display == displayVal
            })
        };
        return suggestions;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[JSON.stringify(suggestions), displayMap, display]);

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
                if(hasButtonCategory){
                    setDropDownOpenCategory(false);
                }
                if(hasButtonDisplay){
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
    const handlePressEnter = (item) => {
        handleEnter(item);
        setShowSuggestion(false);
    }
    return (
            <div ref={wrapperRef} className={`flex flex-row gap-4 justify-between w-full rounded-md h-10`}>
                <div className={`relative flex flex-row items-center rounded-md gap-3 px-4 w-full bg-[#F9FAFB] border border-gray-200 ${(hasButtonCategory || hasButtonDisplay) ? "" : "flex-1"} ${isFocus ? "border border-gray-300" : ""}`}>
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
                                        handlePressEnter(item);
                                    }
                                }else{
                                    handleSearch(item?.query ?? "", category, display)
                                }
                            }
                        }}
                    />
                    {/* Hien thi goi y */}
                    { 
                        showSuggestions && debouncedQuery && (
                            <ul className='absolute z-20 left-0 top-full w-full bg-white shadow-md max-h-64 overflow-y-auto border border-gray-300'>
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
                                                handlePressEnter(item);
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
                                                    <LazyLoad
                                                        height={200}
                                                        offset={100}
                                                        throttle={100}
                                                        once
                                                        scrollContainer='.scroll-wrapper'
                                                        placeholder={
                                                            <div className="bg-gray-200 w-full h-full" />
                                                        }
                                                        style={{width: '20px', height: '20px'}}
                                                    >
                                                        <img src={item.img} className='h-5 w-5'/>
                                                    </LazyLoad>
                                                    {item.query}
                                                </>
                                            )
                                        }
                                    </li>
                                ))}
                                {
                                    isLoading && (
                                        <li key="loading" className="py-2 px-4 text-sm text-gray-500">
                                            Đang tải...
                                        </li>
                                    )
                                }
                            </ul>
                        )
                    }
                </div>
                {
                    // hasButton && (
                        <div className='flex flex-row gap-4 justify-between'>
                            {hasButtonCategory && (<div className='relative h-full rounded-sm flex flex-row'>
                                <button
                                    className='rounded-sm w-48 h-full px-[13px] py-[9px] text-gray-700 hover:bg-gray-100 flex gap-1 items-center justify-between bg-[#F9FAFB] cursor-pointer border border-gray-200'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setDropDownOpenCategory(!dropdownOpenCategory);
                                    }}
                                >
                                    <FilterIcon/>
                                    <span className='line-clamp-1 max-w-[120px]'>{category}</span>
                                    <OpenIcon/>
                                </button>
                                {
                                    dropdownOpenCategory && (
                                        <ul className="absolute z-10 left-0 py-2 mt-12 w-full bg-[#F9FAFB] rounded-md shadow-md max-h-[160px] overflow-y-auto"
                                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                        >
                                            {categories.map((item, index) => (
                                                <li
                                                    key={index}
                                                    className='py-2 px-3 hover:bg-gray-100 cursor-pointer text-sm text-center text-gray-700'
                                                    onClick={(e)=> {
                                                        e.preventDefault();
                                                        setCategory(item);
                                                        setDropDownOpenCategory(false);
                                                        handleSearch(query, item, display)
                                                    }}
                                                >
                                                    <span className='break-words'>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) 
                                }
                            </div>)}
                            {hasButtonDisplay && (<div className='relative h-full rounded-sm flex flex-row'>
                                <button
                                    className='rounded-sm w-48 h-full px-[13px] py-[9px] text-gray-700 hover:bg-gray-100 flex gap-1 items-center justify-between bg-[#F9FAFB] cursor-pointer border border-gray-200'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setDropDownOpenDisplay(!dropdownOpenDisplay);
                                    }}
                                >
                                    <FilterIcon/>
                                    <span className='line-clamp-1'>{display}</span>
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
                                                    className='py-2 px-3 hover:bg-gray-100 cursor-pointer text-sm text-center text-gray-700'
                                                    onClick={(e)=> {
                                                        e.preventDefault();
                                                        setDisplay(item);
                                                        setDropDownOpenDisplay(false);
                                                        handleSearch(query, category, item)
                                                    }}
                                                >
                                                    <span className='break-words'>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) 
                                }
                            </div>)}
                        </div>
                    // )
                }
            </div>
    )
}

export default SearchBar