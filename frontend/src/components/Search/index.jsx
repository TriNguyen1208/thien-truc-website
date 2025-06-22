<<<<<<< HEAD
import React, { useState } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

const SearchBar = ({categories, contentPlaceholder}) => {
  if(categories == null || contentPlaceholder == null){
    return <></>
  }
  
  const [category, setCategory] = useState(categories[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => {
    if (dropdownOpen) {
      const handleClick = () => {
        setDropdownOpen(false);
      };

      // Thêm sự kiện click toàn trang
      document.addEventListener('click', handleClick);

      // Cleanup khi dropdown đóng hoặc component unmount
      return () => {
        document.removeEventListener('click', handleClick);
      };
    }
  }, [dropdownOpen]);
  return (
    <div className="flex bg-white rounded-md max-w-3xl h-12">
      {/* Dropdown */}
      <div className="relative">
        <button
          className="rounded-tl-md rounded-bl-md w-38 h-full pl-[16px] pr-[17px] text-bold text-gray-700 hover:bg-gray-100 flex items-center justify-center gap-1 bg-[#F9FAFB] cursor-pointer"
          onClick={(e) =>{
            e.stopPropagation();
            setDropdownOpen(!dropdownOpen)
          }} 
        >
          <span>{category}</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {dropdownOpen && (
          <ul className="absolute z-10 left-0 py-2 mt-1 w-38 bg-white rounded-md shadow-md">
            {
              categories.map((r) => (
                <li
                  key={r}
                  className="py-2 hover:bg-gray-100 cursor-pointer text-sm text-center text-bold text-gray-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCategory(r);
                    setDropdownOpen(false);
                  }}
                >
                  {r}
                </li>
              ))
            }
          </ul>
        )}
      </div>

      {/* Search input */}
      <input
        type="text"
        placeholder={contentPlaceholder}
        className="flex-1 px-4 py-2 text-sm outline-none text-[#9CA3AF] focus:text-gray-700"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Search button */}
      <button className="bg-[#ffc107] hover:bg-[#EBBE1C] text-black px-6 py-2 font-medium text-sm flex items-center gap-2 rounded-r-md cursor-pointer">
        <SearchOutlined style={{ fontSize: '16px', position: 'relative', top: '1px' }} />
        <span>Tìm kiếm</span>
      </button>
    </div>
  );
};

export default SearchBar;
=======
import React from 'react';

const LabelProject = (props) => {
  const {data, color }  = props
  return (
    <button className={`bg-${color}-500 text-black px-6 py-2 rounded-full`}>
      {data}
    </button>
  );
};

export default LabelProject;
>>>>>>> origin/feature/components/header-footer-labelProject-viewMoreButtom
