// import React, { use, useEffect } from 'react'
// import SearchBar from '../../components/Search'
// import Setting from '../../components/Setting'
// import { useState } from 'react'
// import { useMemo } from 'react'
// import LabelAssign from '../../components/LabelAssgin'
// import useProjects from '../../hooks/useProjects'
// const TestComponents = () => {
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [filters, setFilters] = useState({
//         query: "",
//         category: "Tất cả loại",
//         display: "Tất cả trạng thái"
//     });
//     const { query, category, display } = filters;
//     const {data: projects, isLoading: isLoadingProjects} = useProjects.projects.getList(query, category, 1)
//     if(isLoadingProjects){
//         return <></>
//     }

//     useEffect(() => {
        
        
//         const projectsFetch = projects.results.map((item) => ({
//             name: item.name,
//             category: item.region.name,
//             state: item.region.name === "Miền Bắc" ? "Đã gán" : "Chưa gán",
//             id: item.id // thêm id nếu có để phục vụ cho checkbox
//         }));
//         setFilteredProducts(projectsFetch);
//         setSelectedId([]); // reset selection nếu cần
//     }, [filters]);


//     const handleEnter = (id) => {
//         // setFilters(prev => ({ ...prev, query: id }));
//     }
//     const handleSearch = (query, category, display) => {
//         setFilters({
//             query: query || "",
//             category: category || "Tất cả loại",
//             display: display || "Tất cả trạng thái"
//         });
//     }
//     const [state, setState] = useState([]);
//     console.log(state);
//     const [selectedId, setSelectedId] = useState([]); //tra ve 1 cai mang khi tick vao checkbox
//     const handleSearchSuggestion = (query, filter) => {
//         return useProjects.getSearchSuggestions(query, filter);
//     }
//     const handleToggle = (id) => {
//         setSelectedId((prev) => 
//           prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//         )
//     }

//     const productFetch = [
//         {
//             id: 2,
//             name: "Cable COMMSCOPE (THÙNG 305M) Cat 5 (6-219590-2)",
//             category: "CABLE",
//             state: "Chưa gán"
//         },
//         {
//             id: 43,
//             name: "CAMERA EZVIZ CS-C6N-3MP",
//             category: "CAMERA XOAY, CỐ ĐỊNH",
//             state: "Đã gán"
//         },
//         {
//             id: 4,
//             name: "CAMERA IMOU IPC-A32EP-L 3MP",
//             category: "CAMERA XOAY, CỐ ĐỊNH",
//             state: "Đã gán"
//         },
//         {
//             id: 21,
//             name: "CPU Intel Core i5-12400- Box(SK1700)",
//             category: "CPU INTEL",
//             state: "Chưa gán"
//         },
//         {
//             id: 24,
//             name: "HDD Western 1TB - WD11PURZ",
//             category: "HDD CHUYÊN DÙNG CHO ĐẦU GHI HÌNH CAMERA",
//             state: "Đã gán"
//         }
//     ];
//     useEffect(()=>{
//         const allState = filteredProducts.map(item => ({
//             id: item.id,
//             state: item.state,
//         }));
//         setState(allState);
//     }, [])
//     console.log(state)
//     const allId = filteredProducts.map(item => item.id)
//     const handleToggleAll = () => {
//         if (selectedId.length === allId.length) {
//         setSelectedId([]);
//         } else {
//         setSelectedId(allId);
//         }
//     };
    
//     const handleClear = () => setSelectedId([]);
//     const content = {
//         title: `Quản lý danh sách tin tức thuộc loại "Công Ty"`,
//         description: `Chọn các tin tức muốn thêm hoặc xóa khỏi loại "Công ty"`,
//         type: "tin tức"
//     }
//     const searchProps = {
//         hasButton: true,
//         placeholder: "Tìm kiếm theo tên loại sản phẩm",
//         handleEnter: handleEnter,
//         onSearch: handleSearch,
//         handleSearchSuggestion: handleSearchSuggestion,
//         categories: [
//             "Tất cả loại",
//             "Công ty",
//             "Nhà ở",
//             "Hợp đồngdjfdaksffksahflkjsahfashf"
//         ],
//         displays: [
//             "Tất cả trạng thái",
//             "Trưng bày",
//             "Không trưng bày"
//         ]
//     }
//     const dataTable = [
//         // Header row
//         [
//             {
//                 type: "checkbox",
//                 content: "Mã sản phẩm",
//                 checked: selectedId.length === filteredProducts.length,
//                 onChange: handleToggleAll,
//             },
//             {
//                 type: "text",
//                 content: "Tên sản phẩm"
//             },
//             {
//                 type: "text",
//                 content: "Loại sản phẩm"
//             },
//             {
//                 type: "text",
//                 content: "Trạng thái"
//             },
//         ],
//         // Data rows
//         ...filteredProducts.map((product) => [
//             {
//                 type: "checkbox",
//                 content: product.id,
//                 checked: selectedId.includes(product.id),
//                 onChange: () => handleToggle(product.id),
//             },
//             {
//                 type: "text",
//                 content: product.name
//             },
//             {
//                 type: "text",
//                 content: product.category
//             },
//             {
//                 type: "component",
//                 component: <LabelAssign 
//                                 current={state.find(item => item.id === product.id)?.state} 
//                                 onAssign={(newState) => {
//                                     setState(prev => 
//                                         prev.map(item =>
//                                             item.id === product.id ? { ...item, state: newState } : item
//                                         )
//                                     );
//                                 }}
//                             />
//             }
//         ])
//     ];
//     const [isModalOpen, setIsModalOpen] = useState(true);
//     return <Setting 
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         content={content}
//         searchProps={searchProps}
//         dataTable={dataTable}
//         selectedId={selectedId}
//         setSelectedId={setSelectedId}
//         handleClear={handleClear}
//         setState={setState}
//         state={state}
//     />
// }

// export default TestComponents

import React, { useState } from 'react';
import SearchBar from '../../components/Search';
import Setting from '../../components/Setting';
import LabelAssign from '../../components/LabelAssgin';
import useProjects from '../../hooks/useProjects';

const TestComponents = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const content = {
        title: `Quản lý danh sách dự án thuộc loại "Miền Bắc"`,
        description: `Chọn các dự án muốn thêm hoặc xóa khỏi loại "Miền Bắc"`,
        type: "dự án",
        category: "Miền Bắc",
    };
    return (
        <Setting
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            content={content}
            useDataList={useProjects.projects}
            useDataSuggestion={useProjects}
            useDataCategories={useProjects.project_regions}
        />
    );
};

export default TestComponents;
