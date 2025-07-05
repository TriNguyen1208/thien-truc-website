import React from 'react'
import SearchBar from '../Search'
const Setting = ({content}) => {
    const {
        title,
        description
    } = content

    //Search
    const handleEnter = (id) => {
        console.log(id);
    }
    const handleSearch = (query, category, display) => {
        console.log(query, category, display);
    }
    const handleSearchSuggestion = (query) => {
        const mockdata = [
        {
            "query": "Ủy ban nhân dân xã Ka Đơn",
            "id": 12,
            "img": null
        },
        {
            "query": "Ban QLDA Đầu tư Xây dựng quận Hoàn Kiếm",
            "id": 2,
            "img": null
        },
        {
            "query": "Học viện Cán bộ Tp. HCM",
            "id": 16,
            "img": null
        },
        {
            "query": "Liên đoàn Lao động quận Bình Thạnh - TP.HCM",
            "id": 14,
            "img": null
        },
        {
            "query": "Ngân hàng Vietcombank Chi nhánh Thăng Long",
            "id": 7,
            "img": null
        }];
        return mockdata;
    }
    const data = {
        hasButton: true,
        placeholder: "Tìm kiếm theo tên loại sản phẩm",
        handleEnter: handleEnter,
        onSearch: handleSearch,
        handleSearchSuggestion: handleSearchSuggestion,
        categories: [
            "Tất cả loại",
            "Công ty",
            "Nhà ở",
            "Hợp đồngdjfdaksffksahflkjsahfashf"
        ],
        displays: [
            "Tất cả trạng thái",
            "Trưng bày",
            "Không trưng bày"
        ]
    }

    return (
        <div className='flex flex-col gap-5 px-5 py-3 bg-red-500 w-full rounded-md'>
            <div className='flex justify-between'>
                <div className='flex flex-col'>
                   <span className='font-bold'>{title}</span> 
                   <span className='opacity-50 text-sm'>{description}</span>
                </div>
                <button className='h-[50%]'>X</button>
            </div>
            <div className=''>
                <SearchBar data={data}/>
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default Setting