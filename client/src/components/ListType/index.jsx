import React from 'react'
import { useEffect } from 'react';
import { useState, useRef, useMemo } from 'react';

const ListType = ({categories, handleClick, current}) => {
    const [category, setCategory] = useState(current);
    useEffect(() => {
        setCategory(current);
      }, [current]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const wrapperRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        // Khi dropdown mở thì gắn event
        document.addEventListener('mousedown', handleClickOutside);
        
        // Cleanup khi unmount hoặc dropdown đóng
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);
    return (
        <div ref={wrapperRef} className="relative border border-gray-200 rounded-sm shadow-lg">
            <button
                className="rounded-tl-md rounded-bl-md w-40 h-[40px] pl-[16px] pr-[17px] text-bold text-gray-700 hover:bg-gray-100 flex items-center justify-center gap-1 bg-[#F9FAFB] cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation();
                    setDropdownOpen(!dropdownOpen);
                }}
            >
            <span className='line-clamp-1'>{category}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
            </button>
            {dropdownOpen && (
            <ul className="absolute z-10 left-0 py-2 mt-1 w-38 bg-white rounded-md shadow-md max-h-[160px] overflow-y-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {categories.map((r) => (
                    <li
                        key={r}
                        className="py-2 px-3 hover:bg-gray-100 cursor-pointer text-sm text-center text-bold text-gray-700"
                        onClick={(e) => {
                            e.stopPropagation();
                            setCategory(r);
                            handleClick(r)
                            setDropdownOpen(false);
                        }}
                    >
                        {r}
                    </li>
                ))}
            </ul>
            )}
        </div>
    )
}

export default ListType