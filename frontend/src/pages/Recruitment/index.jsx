import WhiteButton from "@/components/WhiteButton"
import Search from "@/components/Search"
import Banner from "../../components/Banner";
export default function Recruitment(){
    const handleClick = () => {
        //todo:
    }
    const categories = [
        "Tất cả dự án",
        "Miền Bắc",
        "Miền Trung",
        "Miền Nam"
    ];
    // const {
    //     title,
    //     description,
    //     colorBackground = "var(--gradient-banner)",
    //     colorText = "#ffffff",
    //     hasButton = false,
    //     contentButton = "",
    //     handleButton = null,
    //     categories = null,
    //     contentPlaceholder = null
    // } = data
    const data = {
        title: "Sẵn sàng bắt đầu với dự án của bạn",
        description: "Liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí và báo giá chi tiết",
        hasButton: false,
        contentButton: "Liên hệ tư vấn",
        handleButton: handleClick
    };
    return (
        <div className="">
            {/* <p>Đây là nội dung trang về tuyển dụng.</p>
            <WhiteButton content="Tới bảng giá" handleClick={handleClick}/>
            <p>Đây là nội dung trang về tuyển dụng.</p>
            <div className="ml-5">
            <Search contentPlaceholder="Tìm kiếm dự án" categories={categories}/>
                
            </div> */}
            <Banner data={data}/>
        </div>
    )
}