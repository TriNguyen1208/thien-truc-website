import React from 'react'
import SearchBar from '../../components/Search'
import Setting from '../../components/Setting'
const TestComponents = () => {
    // const handleEnter = (id) => {
    //     console.log(id);
    // }
    // const handleSearch = (query, category, display) => {
    //     console.log(query, category, display);
    // }
    // const handleSearchSuggestion = (query) => {
    //     const mockdata = [
    //     {
    //         "query": "Ủy ban nhân dân xã Ka Đơn",
    //         "id": 12,
    //         "img": null
    //     },
    //     {
    //         "query": "Ban QLDA Đầu tư Xây dựng quận Hoàn Kiếm",
    //         "id": 2,
    //         "img": null
    //     },
    //     {
    //         "query": "Học viện Cán bộ Tp. HCM",
    //         "id": 16,
    //         "img": null
    //     },
    //     {
    //         "query": "Liên đoàn Lao động quận Bình Thạnh - TP.HCM",
    //         "id": 14,
    //         "img": null
    //     },
    //     {
    //         "query": "Ngân hàng Vietcombank Chi nhánh Thăng Long",
    //         "id": 7,
    //         "img": null
    //     }];
    //     return mockdata;
    // }
    // const data = {
    //     hasButton: true,
    //     placeholder: "Tìm kiếm theo tên loại sản phẩm",
    //     handleEnter: handleEnter,
    //     onSearch: handleSearch,
    //     handleSearchSuggestion: handleSearchSuggestion,
    //     categories: [
    //         "Tất cả dự án",
    //         "Công ty",
    //         "Nhà ở",
    //         "Hợp đồngdjfdaksffksahflkjsahfashf"
    //     ],
    //     displays: [
    //         "Tất cả hiển thị",
    //         "Trưng bày",
    //         "Không trưng bày"
    //     ]
    // }
    // return (
    //     <>
    //         <SearchBar data={data}/>
    //     </>
    // )
    const content = {
        title: `Quản lý danh sách tin tức thuộc loại "Công Ty"`,
        description: `Chọn các tin tức muốn thêm hoặc xóa khỏi loại "Công ty"`
    }
    return <Setting content={content}/>
}

export default TestComponents