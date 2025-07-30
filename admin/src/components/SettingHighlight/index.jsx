import React, { useEffect } from 'react'
import SearchBar from '../Search'
import { useState } from 'react'
import Table from '../Table'
import { AcceptIcon, ExitIcon } from '../Icon'
import LabelAssign from "../LabelAssgin"
import { Modal } from 'antd'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'

const SettingHighlight = ({
    isOpen,
    onClose,
    content,
    useData,
    useDataSuggestion,
    useDataCategories
}) => {
    //Khởi tạo lấy data bằng useState và call API ở đây
    const {
        title,
        description,
        type,
        category,
        header
    } = content
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [filtered, setFiltered] = useState([]);
    const [selectedId, setSelectedId] = useState([]);
    const [display, setDisplay] = useState([]);
    const [displayMap, setDisplayMap] = useState(new Map());
    const [countAssign, setCountAssign] = useState(0);
    const [id, setId] = useState(null);
    const queryParam = searchParams.get('query') || "";
    const categoryParam = searchParams.get('category') || "Tất cả loại";
    const displayParam = searchParams.get('display') || "Tất cả trạng thái";
    const [filtersSearch, setFiltersSearch] = useState({
        query: queryParam,
        category: categoryParam,
        display: displayParam
    });
    const { data: datas, isLoading: isLoadingDatas } = useData.getList(
        filtersSearch.query,
        filtersSearch.category === "Tất cả loại" ? "" : filtersSearch.category,
        undefined
    );
    const {data: data, isLoading: isLoadingData} = useData.getOne(id);
    const { data: dataCategories, isLoading: isLoadingCategories } = useDataCategories.getAll();

    //Sử dụng useEffect để cập nhật state
    useEffect(()=>{
        if(!data) return
        const updatedMap = new Map(displayMap);

        const dataFetchFunc = () => {
            const id = data.id;
            const name = data.name || data.title;
            const cat = data.region.name || data.category.name;
            const displayVal = updatedMap.get(id) || (cat === category ? "Đã gán" : "Chưa gán");
            updatedMap.set(id, displayVal);
            return {
                id: id,
                name: name,
                category: cat,
                display: displayVal
            };
        }
        const dataFetch = dataFetchFunc();
        if(filtersSearch.display === "Tất cả trạng thái" || filtersSearch.display === dataFetch.display){
            setFiltered([dataFetch])
        }else{
            setFiltered([]);
        }
        setDisplayMap(updatedMap)
        setSelectedId([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, filtersSearch.display, category])
    useEffect(() => {
        if (!datas) return;
        const updatedMap = new Map(displayMap);
        const datasFetch = datas.map((item) => {
            const id = item.id;
            const name = item.name || item.title;
            const cat = item.region?.name || item.category?.name;
            const displayVal = updatedMap.get(id) || (cat === category ? "Đã gán" : "Chưa gán");
            updatedMap.set(id, displayVal);
            return {
                id: id,
                name: name,
                category: cat,
                display: displayVal
            };
        });
        const filteredDisplay = datasFetch.filter((data) => {
            const matchDisplay = filtersSearch.display === "Tất cả trạng thái" || filtersSearch.display === data.display;
            return matchDisplay;
        });

        setFiltered(filteredDisplay);
        setDisplayMap(updatedMap)
        setSelectedId([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [datas, filtersSearch.display, category]);
    useEffect(() => {
        const updatedMap = new Map(displayMap);
        display.forEach(({ id, display }) => {
            updatedMap.set(id, display);
        });
        setDisplayMap(updatedMap);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [display]);
    
    useEffect(() => {
        const allDisplay = filtered.map(item => ({
            id: item.id,
            display: item.display
        }));
        setDisplay(allDisplay);
    }, [filtered]); //khong biet de lam gi

    useEffect(() => {
        const assign = display.filter(item => item.display === "Đã gán");
        setCountAssign(assign.length)
    }, [display]);


    //Các hàm handler cần có
    const handleEnter = (item) => {
        setId(item.id);
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
    const handleClickAssign = () => {
        setDisplay(prev =>
            prev.map(item =>
                selectedId.includes(item.id)
                    ? { ...item, display: "Đã gán" }
                    : item
            )
        );
        setSelectedId([]);
        const params = new URLSearchParams();
        params.set("display", "Tất cả trạng thái");
        navigate({
            pathname: location.pathname,
            search: params.toString()
        });
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
        const params = new URLSearchParams();
        params.set("display", "Tất cả trạng thái");
        navigate({
            pathname: location.pathname,
            search: params.toString()
        });
    };

    const handleSave = () => {
        //Ở đây có 1 lệnh post gửi lên API sau đó thoát ra luôn
        onClose()
    };

    //Truyền vào props thì dùng ở đây
    const searchProps = {
        hasButtonCategory: true,
        hasButtonDisplay: true,
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
            "Đã gán",
            "Chưa gán"
        ],
        currentQuery: filtersSearch.query,
        currentCategory: filtersSearch.category,
        currentDisplay: filtersSearch.display,
        displayMap: displayMap
    };
    const dataTable = [
        [
            {
                type: "checkbox",
                content: header[0],
                checked: selectedId.length === filtered.length,
                onChange: handleToggleAll
            },
            { type: "text", content: header[1] },
            { type: "text", content: header[2] },
            { type: "text", content: "Trạng thái" }
        ],
        ...filtered.map((data) => [
            {
                type: "checkbox",
                content: data.id,
                checked: selectedId.includes(data.id),
                onChange: () => handleToggle(data.id)
            },
            { type: "text", content: data.name },
            { type: "text", content: data.category },
            {
                type: "component",
                component: (
                    <LabelAssign
                        current={display.find(item => item.id === data.id)?.display}
                        onAssign={(newDisplay) => {
                            setDisplay(prev =>
                                prev.map(item =>
                                    item.id === data.id ? { ...item, display: newDisplay } : item
                                )
                            );
                        }}
                    />
                )
            }
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
                            isHighlight={true}
                        />
                    </div>
                </div>
                <div className='pt-5 flex flex-row justify-between'>
                    <span className='text-[#4b5563]'>
                        Tổng: {countAssign} {type} đã được gán vào danh mục {category}
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

export default SettingHighlight