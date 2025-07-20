import React, { useEffect } from 'react'
import SearchBar from '../Search'
import { useState } from 'react'
import Table from '../Table'
import { Modal } from 'antd'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'

const AddHighlight = ({
    isOpen,
    onClose,
    content,
    onSave,
    useData,
    useDataSuggestion,
    useDataCategories
}) => {
    const {
        title,
        description,
        type,
        header
    } = content

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [filtered, setFiltered] = useState([]);
    const [selectedId, setSelectedId] = useState(null); // Chỉ chọn 1 item
    const [isHighlightChecked, setIsHighlightChecked] = useState(false); // Checkbox "Đặt lên đầu"
    const [id, setId] = useState(null);

    const queryParam = searchParams.get('query') || "";
    const categoryParam = searchParams.get('category') || "Tất cả loại";

    const [filtersSearch, setFiltersSearch] = useState({
        query: queryParam,
        category: categoryParam
    });

    const { data: datas, isLoading: isLoadingDatas } = useData.getList(
        filtersSearch.query,
        filtersSearch.category === "Tất cả loại" ? "" : filtersSearch.category,
        undefined
    );

    const { data: data, isLoading: isLoadingData } = useData.getOne(id);
    const { data: dataCategories, isLoading: isLoadingCategories } = useDataCategories.getAll();

    // Reset state khi modal được mở
    useEffect(() => {
        if (isOpen) {
            setSelectedId(null);
            setIsHighlightChecked(false);
            setId(null);
        }
    }, [isOpen]);

    // Xử lý khi có data từ getOne (tìm kiếm cụ thể)
    useEffect(() => {
        if (!data) return;

        const dataFetch = {
            id: data.id,
            name: data.name || data.title,
            category: data.region?.name || data.category?.name
        };

        setFiltered([dataFetch]);
        setSelectedId(null);
        setIsHighlightChecked(false);
    }, [data]);

    // Xử lý khi có data từ getList (tìm kiếm danh sách)
    useEffect(() => {
        if (!datas) return;

        const datasFetch = datas.map((item) => ({
            id: item.id,
            name: item.name || item.title,
            category: item.region?.name || item.category?.name
        }));

        setFiltered(datasFetch);
        setSelectedId(null);
        setIsHighlightChecked(false);
    }, [datas]);

    // Các hàm handler
    const handleEnter = (item) => {
        setId(item.id);
    };

    const handleSearch = (query, category) => {
        updateFilters({ query, category });
    };

    const updateFilters = ({ query, category }) => {
        const newFilters = {
            query: query ?? filtersSearch.query,
            category: category ?? filtersSearch.category
        };
        setFiltersSearch(newFilters);

        const params = new URLSearchParams();
        if (newFilters.query) params.set("query", newFilters.query);
        if (newFilters.category) params.set("category", newFilters.category);

        navigate({
            pathname: location.pathname,
            search: params.toString()
        });
    };

    const handleSearchSuggestion = (query, filter) => {
        return useDataSuggestion.getSearchSuggestions(query, filter);
    };

    const handleToggle = (id) => {
        // Chỉ cho chọn 1 item, nếu click vào item đã chọn thì bỏ chọn
        setSelectedId(prev => prev === id ? null : id);
        setIsHighlightChecked(false); // Reset checkbox khi thay đổi selection
    };



    const handleClear = () => {
        setSelectedId(null);
        setIsHighlightChecked(false);
    };

    const handleSave = () => {

        if (!selectedId) {
            onSave(null); // Không tick checkbox thì trả về null
        } else {
            // Tìm item được chọn
            const selectedItem = filtered.find(item => item.id === selectedId);
            if (selectedItem) {
                onSave({
                    data: selectedItem,
                    isCheckbox: isHighlightChecked
                });
            } else {
                onSave(null);
            }
        }
        onClose();
    };

    // Props cho SearchBar (bỏ display filter)
    const searchProps = {
        hasButtonCategory: true,
        hasButtonDisplay: false, // Bỏ filter display
        placeholder: `Tìm kiếm theo tên loại ${type}`,
        handleEnter,
        onSearch: handleSearch,
        handleSearchSuggestion,
        categories: [
            "Tất cả loại",
            ...(dataCategories?.map(item => item.name) || [])
        ],
        currentQuery: filtersSearch.query,
        currentCategory: filtersSearch.category
    };

    // Data cho table (bỏ checkbox header vì chỉ chọn 1)
    const dataTable = [
        [
            { type: "text", content: "Chọn" },
            { type: "text", content: header[1] },
            { type: "text", content: header[2] }
        ],
        ...filtered.map((data) => [
            {
                type: "checkbox",
                content: data.id,
                checked: selectedId === data.id,
                onChange: () => handleToggle(data.id)
            },
            { type: "text", content: data.name },
            { type: "text", content: data.category }
        ])
    ];

    if (isLoadingDatas || isLoadingCategories || isLoadingData) return <></>;

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            width={1000}
            centered
            footer={null}
        >
            <div className='flex flex-col gap-5 px-5 py-3 bg-white w-full rounded-md text-[18px]'>
                <div className='flex justify-between'>
                    <div className='flex flex-col'>
                        <span className='font-bold'>{title}</span>
                        <span className='text-sm text-[#71717A]'>{description}</span>
                    </div>
                </div>

                <div className=''>
                    <SearchBar data={searchProps} />
                </div>

                <div className="relative">
                    {selectedId && (
                        <div className="px-5 py-3 w-full rounded-md bg-[#EFF6FF] border border-[#EFF6FF] z-20 flex items-center gap-4 mb-5">
                            <span className="text-[#1E4DE8] font-medium">
                                Đã chọn 1 {type}
                            </span>
                            <button onClick={handleClear} className="px-3 cursor-pointer hover:bg-gray-100">
                                Bỏ chọn
                            </button>
                        </div>
                    )}

                    <div className="max-h-100 overflow-y-auto">
                        <Table
                            columns={[]}
                            data={dataTable}
                            isAddHighlight={true}
                        />
                    </div>
                </div>

                <div className='pt-5 flex flex-row justify-between'>
                    <div className='flex items-center gap-2'>
                        <input
                            type="checkbox"
                            id="highlight-checkbox"
                            checked={isHighlightChecked}
                            onChange={(e) => setIsHighlightChecked(e.target.checked)}
                            className="w-4 h-4"
                            disabled={!selectedId} // Chỉ enable khi đã chọn item
                        />
                        <label htmlFor="highlight-checkbox" className={`text-[#4b5563] ${!selectedId ? 'opacity-50' : ''}`}>
                            Đặt lên đầu tin tức nổi bật
                        </label>
                    </div>
                    <div className='flex flex-row gap-2'>
                        <button
                            className='px-4 py-2 bg-white text-black rounded-md cursor-pointer'
                            onClick={onClose}
                        >Hủy</button>
                        <button
                            className='px-4 py-2 bg-[#18181b] text-white rounded-md cursor-pointer'
                            onClick={handleSave}
                        >Lưu thay đổi</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default AddHighlight