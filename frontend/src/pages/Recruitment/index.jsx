import WhiteButton from "@/components/WhiteButton"
import Search from "@/components/Search"
import Banner from "../../components/Banner";
import useNews from '@/redux/hooks/useNews'
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
    const { data: news, isLoading: isLoadingNews } = useNews.getAll();
    if(isLoadingNews){
        return <>Loading...</>
    }
    const data = {
        title: news.news_page[0].banner_title,
        description: news.news_page[0].banner_description,
        hasButton: false,
        //Khi cần button thì hasButton: true, comment categories với contentPlaceholder và gỡ comment contentButton, handleButton
        categories: categories,
        contentPlaceholder: "Tìm kiếm tin tức",
        // contentButton: "Liên hệ tư vấn",
        // handleButton: handleClick
    };
    return (
        <div className="">
            <Banner data={data}/>
        </div>
    )
}