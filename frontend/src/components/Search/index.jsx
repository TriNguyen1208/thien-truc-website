import React, { useState, useRef, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';

const SearchBar = ({ data }) => {
  const {
    categories,
    contentPlaceholder,
    onSearch,
    handleSearchSuggestion,
    handleEnter
  } = data;

  const [category, setCategory] = useState(categories?.[0] || '');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [displaySuggestion, setDisplaySuggestion] = useState([]);

  const wrapperRef = useRef(null);

  // Debounce query
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, 100);
    return () => clearTimeout(timeout);
  }, [query]);

  // Gọi API sau khi debounce query
  const { data: suggestions = [], isLoading } = handleSearchSuggestion(
    debouncedQuery,
    category === categories[0] ? '' : category
  );

  // Cập nhật displaySuggestion khi debounceQuery hoặc suggestions thay đổi
  useEffect(() => {
    if (!query.trim()) {
      setDisplaySuggestion([]);
      return;
    }

    const baseSuggestions = Array.isArray(suggestions) ? suggestions : [];

    setDisplaySuggestion([
      { id: 'input', query: query },
      ...baseSuggestions,
    ]);
  }, [query, suggestions.length]);

  // Đóng dropdown và suggestions khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setShowSuggestions(false);
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query) => {
    if (onSearch) {
      onSearch(category, query);
    }
  };

  if (!categories || !contentPlaceholder) return null;

  return (
    <div ref={wrapperRef} className="flex bg-white rounded-md max-w-3xl h-12">
      {/* Dropdown chọn category */}
      <div className="relative">
        <button
          className="rounded-tl-md rounded-bl-md w-38 h-full pl-[16px] pr-[17px] text-bold text-gray-700 hover:bg-gray-100 flex items-center justify-center gap-1 bg-[#F9FAFB] cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setDropdownOpen(!dropdownOpen);
          }}
        >
          <span>{category}</span>
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
                  setDropdownOpen(false);
                }}
              >
                {r}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Input tìm kiếm */}
      <div className={`relative flex-1 px-4 py-4 text-sm border ${isFocused ? "border-gray-500" : ""}`}>
        <input
          type="text"
          placeholder={contentPlaceholder || "Nhập từ khóa tìm kiếm..."}
          className="w-full text-gray-700 focus:outline-none focus:text-gray-700"
          value={query}
          onFocus={() => {
            setIsFocused(true);
            setShowSuggestions(true);
          }}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setHighlightedIndex((prev) => Math.min(prev + 1, displaySuggestion.length - 1));
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              setHighlightedIndex((prev) => Math.max(prev - 1, 0));
            } else if (e.key === 'Enter') {
              const item = displaySuggestion[highlightedIndex];
              if (item) {
                if (item.id === 'input') {
                  handleSearch(item.query);
                } else {
                  handleEnter(item.id);
                }
              } else {
                handleSearch(query);
              }
            }
          }}
        />

        {/* Gợi ý kết quả */}
        {showSuggestions && debouncedQuery && (
          <ul className="absolute z-10 left-0 py-2 mt-3 w-full bg-white shadow-md max-h-64 overflow-y-auto">
            {displaySuggestion.map((item, index) => (
              <li
                key={index}
                className={`py-2 cursor-pointer text-sm text-bold text-gray-700 text-left px-4 flex gap-3 items-center ${
                  index === highlightedIndex ? 'bg-gray-100' : ''
                }`}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => {
                  if (item.id === 'input') {
                    handleSearch(item.query);
                  } else {
                    handleEnter(item.id);
                  }
                }}
              >
                {item.id === 'input' ? (
                  <>
                    <SearchOutlined style={{ fontSize: '16px'}} />
                    {query}
                  </>
                ) : (
                  <>
                    <img src={item.img} alt="" className="w-5 h-5" />
                    {item.query}
                  </>
                )}
              </li>
            ))}

            {isLoading && (
              <li key="loading" className="py-2 px-4 text-sm text-gray-500">
                Đang tải...
              </li>
            )}
          </ul>
        )}
      </div>

      {/* Nút tìm kiếm */}
      <button
        className="bg-[#ffc107] hover:bg-[#EBBE1C] text-black px-6 py-2 font-medium text-sm flex items-center gap-2 rounded-r-md cursor-pointer"
        onClick={() => handleSearch(query)}
      >
        <SearchOutlined style={{ fontSize: '16px', position: 'relative', top: '1px' }} />
        <span>Tìm kiếm</span>
      </button>
    </div>
  );
};

export default SearchBar;
