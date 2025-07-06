import React, { useEffect } from 'react'
import SearchBar from '../Search'
import { useState } from 'react'
import Table from '../Table'
import { AcceptIcon, ExitIcon } from '../Icon'
import LabelAssign from "../LabelAssgin"
import { Modal } from 'antd'
import { useMemo } from 'react'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'

const Setting = ({
    isOpen,
    onClose,
    content,
    useDataList,
    useDataSuggestion,
    useDataCategories
}) => {
    const {
        title,
        description,
        type,
        category,
    } = content

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [filtered, setFiltered] = useState([]);
    const [selectedId, setSelectedId] = useState([]);
    const [display, setDisplay] = useState([]);
    const [countAssign, setCountAssign] = useState(0);

    const queryParam = searchParams.get('query') || "";
    const categoryParam = searchParams.get('category') || "Tất cả loại";
    const displayParam = searchParams.get('display') || "Tất cả trạng thái";

    const [filtersSearch, setFiltersSearch] = useState({
        query: queryParam,
        category: categoryParam,
        display: displayParam
    });
    const { data: projects, isLoading: isLoadingProjects } = useDataList.getList(
        filtersSearch.query,
        filtersSearch.category === "Tất cả loại" ? "" : filtersSearch.category,
        1
    );

    useEffect(() => {
        if (!projects) return;

        const projectsFetch = projects.results.map((item) => ({
            id: item.id,
            name: item.name || item.title,
            category: item.region.name || item.category.name,
            display: (item.region.name || item.category.name) === category ? "Đã gán" : "Chưa gán"
        }));

        const filteredDisplay = projectsFetch.filter((product) => {
            const matchDisplay =
                filtersSearch.display === "Tất cả trạng thái" ||
                (filtersSearch.display === "Trưng bày" && product.display === "Đã gán") ||
                (filtersSearch.display === "Không trưng bày" && product.display === "Chưa gán");
            return matchDisplay;
        });

        setFiltered(filteredDisplay);
        setSelectedId([]);
    }, [projects, filtersSearch.display]);

    useEffect(() => {
        const allDisplay = filtered.map(item => ({
            id: item.id,
            display: item.display
        }));
        setDisplay(allDisplay);
    }, [filtered]);

    useEffect(() => {
        const assign = display.filter(item => item.display === "Đã gán");
        setCountAssign(assign.length)
    }, [display]);

    const handleEnter = (id) => {
        // updateFilters({ query: id });
    };

    const handleSearch = (query, category, display) => {
        updateFilters({ query, category, display });
    };

    const updateFilters = ({ query, category, display }) => {
        const newFilters = {
            query: query ?? filtersSearch.query,
            category: category ?? filtersSearch.category,
            display: display ?? filtersSearch.display
        };
        setFiltersSearch(newFilters);

        const params = new URLSearchParams();
        if (newFilters.query) params.set("query", newFilters.query);
        if (newFilters.category) params.set("category", newFilters.category);
        if (newFilters.display) params.set("display", newFilters.display);

        navigate({
            pathname: location.pathname,
            search: params.toString()
        });
    };

    const handleSearchSuggestion = (query, filter) => {
        return useDataSuggestion.getSearchSuggestions(query, filter);
    };

    const handleToggle = (id) => {
        setSelectedId((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleToggleAll = () => {
        const allId = filtered.map(item => item.id);
        if (selectedId.length === allId.length) {
            setSelectedId([]);
        } else {
            setSelectedId(allId);
        }
    };

    const handleClear = () => setSelectedId([]);

    const { data: dataCategories, isLoading: isLoadingCategories } = useDataCategories.getAll();

    const searchProps = {
        hasButton: true,
        placeholder: `Tìm kiếm theo tên loại ${type}`,
        handleEnter,
        onSearch: handleSearch,
        handleSearchSuggestion,
        categories: [
            "Tất cả loại",
            ...(dataCategories?.map(item => item.name) || [])
        ],
        displays: [
            "Tất cả trạng thái",
            "Trưng bày",
            "Không trưng bày"
        ],
        currentQuery: filtersSearch.query,
        currentCategory: filtersSearch.category,
        currentDisplay: filtersSearch.display
    };

    if (isLoadingProjects || isLoadingCategories) return <></>;

    const dataTable = [
        [
            {
                type: "checkbox",
                content: "Mã sản phẩm",
                checked: selectedId.length === filtered.length,
                onChange: handleToggleAll
            },
            { type: "text", content: "Tên sản phẩm" },
            { type: "text", content: "Loại sản phẩm" },
            { type: "text", content: "Trạng thái" }
        ],
        ...filtered.map((product) => [
            {
                type: "checkbox",
                content: product.id,
                checked: selectedId.includes(product.id),
                onChange: () => handleToggle(product.id)
            },
            { type: "text", content: product.name },
            { type: "text", content: product.category },
            {
                type: "component",
                component: (
                    <LabelAssign
                        current={display.find(item => item.id === product.id)?.display}
                        onAssign={(newDisplay) => {
                            setDisplay(prev =>
                                prev.map(item =>
                                    item.id === product.id ? { ...item, display: newDisplay } : item
                                )
                            );
                        }}
                    />
                )
            }
        ])
    ];

    const handleClickAssign = () => {
        setDisplay(prev =>
            prev.map(item =>
                selectedId.includes(item.id)
                    ? { ...item, display: "Đã gán" }
                    : item
            )
        );
        setSelectedId([]);
    };

    const handleClickRemove = () => {
        setDisplay(prev =>
            prev.map(item =>
                selectedId.includes(item.id)
                    ? { ...item, display: "Chưa gán" }
                    : item
            )
        );
        setSelectedId([]);
    };

    const handleSave = () => {
        console.log("hello world");
    };
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
                    <SearchBar data={searchProps}/>
                </div>
                <div className="relative">
                    {selectedId.length > 0 && (
                        <div className="px-5 py-3 w-full rounded-md bg-[#EFF6FF] border border-[#EFF6FF] z-20 flex items-center gap-4 mb-5">
                            <span className="text-[#1E4DE8] font-medium">
                                Đã chọn {selectedId.length} {type}
                            </span>
                            <div className="flex gap-2 justify-between">
                                <button 
                                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded flex items-center gap-2 cursor-pointer"
                                    onClick={handleClickAssign}
                                >
                                    <AcceptIcon/>
                                    <span>Gán vào danh mục</span>
                                </button>
                                <button 
                                    className="border border-gray-300 px-3 py-2 rounded flex items-center gap-2 cursor-pointer hover:bg-gray-100"
                                    onClick={handleClickRemove}
                                >
                                    <ExitIcon/>
                                    <span>Bỏ khỏi danh mục</span>
                                </button>
                                <button onClick={handleClear} className="px-3 cursor-pointer hover:bg-gray-100">
                                    Bỏ chọn
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="max-h-100 overflow-y-auto">
                        <Table
                            columns={[]}
                            data={dataTable}
                            isSetting={true}
                        />
                    </div>
                </div>
                <div className='pt-5 flex flex-row justify-between'>
                    <span className='text-[#4b5563]'>
                        Tổng: {countAssign} tin tức đã được gán vào danh mục {category}
                    </span>
                    <div className='flex flex-row gap-2'>
                        <button 
                            className='px-4 py-2 bg-white text-black rounded-md cursor-pointer'
                            onClick={onClose}
                        >Hủy</button>
                        <button 
                            className='px-4 py-2 bg-[#18181b] text-white rounded-md cursor-pointer'
                            onClick={handleSave}
                        >Lưu thay đổi</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default Setting