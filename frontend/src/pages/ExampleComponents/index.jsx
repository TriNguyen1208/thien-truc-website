import React from 'react'
import Banner from "../../components/Banner"
import Card from "../../components/Card"
import CenterCard from "../../components/CenterCard"
import GreenButton from "../../components/GreenButton"
import ItemProduct from "../../components/ItemProduct"
import LabelProject from "../../components/LabelProject"
import PostCategory from "../../components/PostCategory"
import ViewMoreButton from "../../components/ViewMoreButton"
import Search from 'antd/es/transfer/search'
import WhiteButton from '../../components/WhiteButton'
import ItemPost from '../../components/ItemPost'
import useProducts from '../../redux/hooks/useProducts'
import useNews from '../../redux/hooks/useNews'
import { useEffect } from 'react'
const ExampleComponents = () => {
    // Example Banner
    //Cái này là của thanh search bar
    // const handleButton = (category, query) => {
    //     console.log(category, query);
    // }
    // const handleSearchSuggestion = (query, filter) => {
    //     return useProducts.getSearchSuggestions(query, filter)
    // }
    // const data = {
    //     title: "Gdhfdjkfsdkfhfggggggggggggggsdkf",
    //     description: "dỉyqewiruerhdskjfdfđsfsfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffkfdaf",
    //     colorBackground: "var(--gradient-banner)",
    //     colorText: "#ffffff",
    //     hasSearch: true,
    //     categories: [
    //         "Tất cả dự án",
    //         "CABLE",
    //         "PHẦN MỀM DIỆT VIRUS",
    //         "MAINBOARD",
    //         "CPU INTEL",
    //         "RAM",
    //         "HDD CHUYÊN DÙNG CHO ĐẦU GHI HÌNH CAMERA",
    //         "POWER",
    //         "KEYBOARD CÓ DÂY",
    //         "MOUSE QUANG CÓ DÂY",
    //         "CAMERA XOAY, CỐ ĐỊNH",
    //     ],
    //     contentPlaceholder: "Nhập vào đây",
    //     handleButton: handleButton,
    //     handleSearchSuggestion: handleSearchSuggestion
    // };

    //Cái này là của whiteButton
    // const handleButton = () => {
    //     console.log("Hello world")
    // }
    // const data = {
    //     title: "Gdhfdjkfsdkfhfggggggggggggggsdkf",
    //     description: "dỉyqewiruerhdskjfdfđsfsfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffkfdaf",
    //     colorBackground: "var(--gradient-banner)",
    //     colorText: "#ffffff",
    //     hasButton: true,
    //     contentButton: "Hello",
    //     handleButton: handleButton 
    // };
    // return (
    //     <>
    //         <Banner data={data}/>
    //         <p>Đây là trang Home.</p>
    //     </>
    // )

    //Example Card
    // const card = {
    //     details: "fasdkghdjfkdashjfadsklfh\nfdfdfd",
    //     title: "dsfshkfskf",
    //     description: "dshfkdfja"
    // }
    // return(
    //     <>
    //         {/* Không truyền width, heigth, padding thì mặc định là w-full, h-full, padding: 25 */}
    //         <Card card={card} width="360px" height="200px" padding="25px"/>
    //     </>
    // )

    //Example CenterCard
    // const data = {
    //     title: "fdskfdalfaf",
    //     description: "dkfhdkghddfdaskfhadsfkjdahgkfldhfsakjfhdsalk"
    // };
    // return (
    //     //Không truyền width với height thì mặc định là full
    //     <CenterCard data={data} width="360px" height="200px"/>
    // )

    //Example GreenButton
    // const handleClick = () => {
    //     console.log("Hello world")
    // }
    // const content = "Xem Thêm"
    // return (
    //     //Không truyền width thì mặc định là full
    //     <GreenButton content={content} width="300px" handleClick={handleClick}/>
    // )

    //Example ItemPost
    // const handleClick = () => {
    //     console.log("hello world");
    // }
    // const data = {
    //     type: "news", // 'project' hoặc 'news'
    //     title: "fdsfdaf",
    //     description: "gdkfdaf",
    //     location: "qrewrwqr",
    //     date: "eriqurpewur",
    //     tag: "Công ty",
    //     tagColor: '#ef4444',
    //     image: 'https://khoinguonsangtao.vn/wp-content/uploads/2022/09/hinh-anh-gai-xinh-cap-2-3.jpg',
    //     status: true,
    //     handleClick: handleClick
    // };
    // return (
    //     //Không truyền width mặc định là width full
    //     <ItemPost data={data} width="437px"/>
    // )

    //Example ItemProduct
    //Ở đây có thể navigate đến chi tiết dự án,...
    // const handleClickButton = () => {
    //     console.log("Hello world")
    // }
    // const product = {
    //     image: "https://khoinguonsangtao.vn/wp-content/uploads/2022/09/hinh-anh-gai-xinh-cap-2-3.jpg",
    //     name: "fdsafdafadf",
    //     price: 123
    // }
    // return(
    //     //Không nhập width với height mặc định là  width="324px", height="620px"
    //     <div>
    //         <ItemProduct product={product} handleClick={handleClickButton}/>
    //     </div>
    // )

    //Example LabelProject
    // const data = {
    //     content: "Miền Bắc", 
    //     color: "red"
    // }
    // return(
    //     <LabelProject data={data}/>
    // )

    //Example PostCategory
    // const categories = [
    //     "Công Ty",
    //     "Điện Thoại"
    // ];
    // //Trả index của category từ con về cha để cha xử lý
    // const handleClick = (category) =>{
    //     console.log(category)
    // }
    // return (
    //     <PostCategory categories={categories} handleClick={handleClick}/>
    // )

    //Example WhiteButton
    // const handleClick = () => {
    //     console.log("Hello world")
    // }
    // const data = {
    //     content: "Nhập vào đây",
    //     handleClick: handleClick
    // }
    // return <WhiteButton data={data}/>

    // Example ViewMoreButton
    // const handleClick = () => {
    //     console.log("hello world")
    // }
    // return(
    //     <ViewMoreButton content="Hellogfhfffffffffffff" handleClick={handleClick}/>
    // )
    const {mutate} = useNews.news.useUpdateNumReaders(1);
    useEffect(() => {
        mutate(); // ✅ Gọi 1 lần khi component mount
    }, []);
    return <>Hello</>
}

export default ExampleComponents
