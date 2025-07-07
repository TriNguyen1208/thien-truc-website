import React, { useState } from 'react';
import SearchBar from '../../components/Search';
import Setting from '../../components/Setting';
import LabelAssign from '../../components/LabelAssgin';
import useProjects from '../../hooks/useProjects';
import ColorBlock from '../../components/ColorBlock'
import { Button } from 'antd';
import Table from "../../components/Table"
const TestComponents = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const content = {
        title: `Quản lý danh sách dự án thuộc loại "Miền Bắc"`,
        description: `Chọn các dự án muốn thêm hoặc xóa khỏi loại "Miền Bắc"`,
        type: "dự án",
        category: "Miền Bắc",
        header: [
            "Mã dự án",
            "Tên dự án",
            "Khu vực",
        ]
    };
    return (
        <Setting
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            content={content}
            useData={useProjects.projects}
            useDataSuggestion={useProjects}
            useDataCategories={useProjects.project_regions}
        />
    );

    // const columns = [
    //     "STT",
    //     "Tên loại sản phẩm",
    //     "Màu sắc",
    //     "Số lượng sản phẩm",
    //     "Sản phẩm",
    //     "Thao tác"
    // ]
    // const data = [
    //     [
    //         {
    //             type: "text",
    //             content: "1"
    //         },
    //         {
    //             type: "text",
    //             content: "Điện thoại"
    //         },
    //         {
    //             type: "component",
    //             component: <ColorBlock color="#3b82f6"/>
    //         },
    //         {
    //             type: "text",
    //             content: "3"
    //         },
    //         {
    //             type: "text",
    //             content: "Iphone 15 pro max"
    //         },
    //         {
    //             type: "array-components",
    //             components: [
    //                 <Button/>,
    //                 <Button/>,
    //                 <Button/>
    //             ]
    //         }
    //     ],
    //     [
    //         {
    //             type: "text",
    //             content: "1"
    //         },
    //         {
    //             type: "text",
    //             content: "Điện thoại"
    //         },
    //         {
    //             type: "component",
    //             component: <ColorBlock color="#3b82f6"/>
    //         },
    //         {
    //             type: "text",
    //             content: "3"
    //         },
    //         {
    //             type: "text",
    //             content: "Iphone 15 pro max"
    //         },
    //         {
    //             type: "array-components",
    //             components: [
    //                 <Button/>,
    //                 <Button/>,
    //                 <Button/>
    //             ]
    //         }
    //     ],
    //     [
    //         {
    //             type: "text",
    //             content: "1"
    //         },
    //         {
    //             type: "text",
    //             content: "Điện thoại"
    //         },
    //         {
    //             type: "component",
    //             component: <ColorBlock color="#3b82f6"/>
    //         },
    //         {
    //             type: "text",
    //             content: "3"
    //         },
    //         {
    //             type: "text",
    //             content: "Iphone 15 pro max"
    //         },
    //         {
    //             type: "array-components",
    //             components: [
    //                 <Button/>,
    //                 <Button/>,
    //                 <Button/>
    //             ]
    //         }
    //     ],
    //     [
    //         {
    //             type: "text",
    //             content: "1"
    //         },
    //         {
    //             type: "text",
    //             content: "Điện thoại"
    //         },
    //         {
    //             type: "component",
    //             component: <ColorBlock color="#3b82f6"/>
    //         },
    //         {
    //             type: "text",
    //             content: "3"
    //         },
    //         {
    //             type: "text",
    //             content: "Iphone 15 pro max"
    //         },
    //         {
    //             type: "array-components",
    //             components: [
    //                 <Button/>,
    //                 <Button/>,
    //                 <Button/>
    //             ]
    //         }
    //     ]
    // ]
    // return <Table columns={columns} data={data} isSetting={false}/>

    // const handleEnter = (id) => {
    //     console.log(id);
    // }
    // const handleSearch = (query) => {
    //     console.log(query)
    // }
    // const handleSearchSuggestion = (query) => {
    //     return useProjects.getSearchSuggestions(query);
    // }
    // const data = {
    //     hasButton: false,
    //     placeholder: "Tìm kiếm theo tên loại sản phẩm",
    //     handleEnter: handleEnter,
    //     onSearch: handleSearch,
    //     handleSearchSuggestion: handleSearchSuggestion, //co 3 tham so la query, category = null, display = null,
    //     currentQuery: ""
    // }
    // return <SearchBar data={data}/>
};

export default TestComponents;
