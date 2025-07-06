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
// import React, { useState } from 'react'
// import Table from '@/components/Table'

// const Icon = () => (
//   <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M8 2.5H3.33333C2.97971 2.5 2.64057 2.64048 2.39052 2.89052C2.14048 3.14057 2 3.47971 2 3.83333V13.1667C2 13.5203 2.14048 13.8594 2.39052 14.1095C2.64057 14.3595 2.97971 14.5 3.33333 14.5H12.6667C13.0203 14.5 13.3594 14.3595 13.6095 14.1095C13.8595 13.8594 14 13.5203 14 13.1667V8.5" stroke="#09090B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
//       <path d="M12.25 2.25003C12.5152 1.98481 12.8749 1.83582 13.25 1.83582C13.6251 1.83582 13.9848 1.98481 14.25 2.25003C14.5152 2.51525 14.6642 2.87496 14.6642 3.25003C14.6642 3.6251 14.5152 3.98481 14.25 4.25003L8.00001 10.5L5.33334 11.1667L6.00001 8.50003L12.25 2.25003Z" stroke="#09090B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
//   </svg>
// )
// function Button({icon, width = "100%", handleClick}){
//   return(
//       <button 
//           className = "flex justify-center items-center py-[8px] border border-black text-white bg-(--green-bg) rounded-[6px] hover:bg-[#166534] transition-colors ease-out duration-300 cursor-pointer"
//           style={{width}}
//           onClick={handleClick}
//       >
//           {icon}
//       </button>
//   )
// }
// const ColorBlock = ({ color }) => (
//   <div className="flex items-center gap-2">
//     <div
//       className="w-4 h-4 rounded-sm"
//       style={{ backgroundColor: color }}
//     />
//     <span>{color}</span>
//   </div>
// );

// const TestComponents = () => {
//     const [selectedId, setSelectedId] = useState([]);
//     const handleToggle = (id) => {
//       setSelectedId((prev) => 
//         prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//       )
//     }
//     const handleButton = () => {
//       console.log("hello world")
//     }
//     const columns = [
//       "Mã dự án",
//       "Hình ảnh",
//       "Tên dự án",
//       "Vị trí",
//       "Hoàn thành",
//       "Trưng bày",
//       "Thao tác"
//     ];
//     const data = [
//         [
//             {
//                 type: "text",
//                 content: "DA002"
//             },
//             {
//                 type: "img",
//                 path: "https://khoinguonsangtao.vn/wp-content/uploads/2022/09/hinh-anh-gai-xinh-cap-2-3.jpg"
//             },
//             {
//                 type: "text",
//                 content: "Hệ thống an ninh Lotte Center"
//             },
//             {
//                 type: "text",
//                 content: "Ba Đình, Hà Nội"
//             },
//             {
//                 type: "text",
//                 content: "24/06/2024"
//             },
//             {
//                 type: "component",
//                 component: <ColorBlock color="#10b981"/>
//             },
//             {
//                 type: "array-components",
//                 components: [
//                     {component: <Button icon={<Icon/>} handleClick={handleButton}/>},
//                     {component: <Button icon={<Icon/>} handleClick={handleButton}/>}
//                 ]
//             }
//         ],
//         [
//             {
//                 type: "text",
//                 content: "DA002"
//             },
//             {
//                 type: "img",
//                 path: "https://khoinguonsangtao.vn/wp-content/uploads/2022/09/hinh-anh-gai-xinh-cap-2-3.jpg"
//             },
//             {
//                 type: "text",
//                 content: "Hệ thống an ninh Lotte Center"
//             },
//             {
//                 type: "text",
//                 content: "Ba Đình, Hà Nội"
//             },
//             {
//                 type: "text",
//                 content: "24/06/2024"
//             },
//             {
//                 type: "checkbox",
//                 checked: selectedId.includes("DA002"),
//                 onChange: () => handleToggle("DA002")
//             },
//             {
//               type: "array-components",
//               components: [
//                   {component: <Button icon={<Icon/>} handleClick={handleButton}/>},
//                   {component: <Button icon={<Icon/>} handleClick={handleButton}/>}
//               ]
//             }
//         ]
//     ]
//     return (
//       <div>
//           <Table columns={columns} data={data}/>
//       </div>
//     )
}

export default TestComponents