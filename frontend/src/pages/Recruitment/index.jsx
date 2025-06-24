import WhiteButton from "@/components/WhiteButton"
import Search from "@/components/Search"
import Banner from "../../components/Banner";
export default function Recruitment(){
    const handleClick = () => {
        //todo:
        console.log("hehe");
    }
    const categories = [
        "Tất cả thể loại",
        "Công Ty",
        "Dự Án",
        "Sản Phẩm",
        "Tuyển Dụng",
        "Thành Tích",
        "Sự Kiện"
    ];
    const data = {
        title: "jdhfdfjdshfkwer",
        description: "eitwrkjhdfdkljfshfjdx,vn,xcndfskfjd",
        hasButton: false,
        hasSearch: true,
        //Khi cần button thì hasButton: true, comment categories với contentPlaceholder và gỡ comment contentButton, handleButton
        categories: categories,
        contentPlaceholder: "Tìm kiếm tin tức",
        contentButton: "Liên hệ tư vấn",
        handleButton: handleClick
    };
    return (
        <div className="">
            {/* <Banner data={data}/> */}
            <div>Đây là trang tuyển dụng</div>
        </div>
    )
}