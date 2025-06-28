import { useNavigate, useParams } from "react-router-dom"
import useNews from "../../redux/hooks/useNews";
import Loading from "@/components/Loading"
import BackButton from "./components/BackButton";
import LabelType from "./components/LabelType";
import { useEffect } from "react";
export default function NewsDetail(){
    const {id: news_id} = useParams();
    const mutation = useNews.news.updateNumReaders(news_id);

    useEffect(() => {
        mutation.mutate();
    }, []);
    const {data: news, isLoading: isLoadingNews} = useNews.news_contents.getOne(news_id);
    const navigate = useNavigate();
    if(isLoadingNews){
        return <Loading/>
    }
    const date = new Date(news.news.public_date);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getUTCFullYear();
    //content, color
    const handleClick = () => {
        navigate("/tin-tuc");
    }
    return (
        <>
            <div className="flex flex-row bg-[#F9FAFB] py-10">
                <div className="flex flex-col gap-3 m-auto w-3xl">
                    <BackButton data={{content: "Quay lại danh sách tin tức", handleClick: handleClick}}/>
                    <div className="flex flex-col shadow-2xl w-full bg-white py-5 px-10 rounded-sm gap-3">
                        <div>
                            <LabelType data={{content: news.news.category.name, color: news.news.category.rgb_color}}/>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h2 className="font-bold text-3xl ">{news.news.title}</h2>
                            <div className="flex flex-row gap-3 text-[#6B7280]">
                                <span className="">Ngày {day}, tháng {month}, năm {year}</span>
                                <span>&bull;</span>
                                <span>Khoảng {news.news.measure_time} phút đọc</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-12">
                            <div>
                                <img 
                                    src={news.news.main_img} 
                                    alt="" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div
                                dangerouslySetInnerHTML={{ __html: news.content }} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}