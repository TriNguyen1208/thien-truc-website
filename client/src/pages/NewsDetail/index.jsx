import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LazyLoad from "react-lazyload";
import renderWithLazyLoad from "@/utils/renderWithLazyLoad";
import useNews from "@/hooks/useNews";
import ComingSoon from '@/pages/ComingSoon';
import Loading from "@/components/Loading";
import BackButton from "@/components/BackButton";
import LabelType from "@/components/LabelType";

// Chuyển đổi hàm định dạng ngày tháng ra ngoài component để tái sử dụng và tránh tạo lại mỗi lần render.
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `Ngày ${day}, tháng ${month}, năm ${year}`;
};

export default function NewsDetail() {
    const { id: news_id } = useParams();
    
    // Sử dụng react-query's onSuccess/onError callback để xử lý logic sau khi mutation
    const { mutate: updateNumReaders } = useNews.news.updateNumReaders(news_id);
    
    // Fetch dữ liệu tin tức và trạng thái loading
    const { data: news, isLoading: isNewsLoading, isError } = useNews.news_contents.getOne(news_id);
    
    // Tối ưu useEffect, chỉ gọi mutate khi news_id thay đổi.
    useEffect(() => {
        if (news_id) {
            updateNumReaders({news_id});
        }
    }, [news_id, updateNumReaders]);

    // Xử lý các trạng thái loading, lỗi, hoặc dữ liệu không hợp lệ.
    if (isNewsLoading) {
        return <Loading />;
    }

    if (isError || !news || !news.news || !news.is_visible) {
        // Có thể hiển thị một trang lỗi cụ thể hơn hoặc ComingSoon
        return <ComingSoon />; 
    }

    const { news: newsData, content } = news;

    return (
        <>
            {news.is_visible ? (
            <div className="flex flex-row bg-[#F9FAFB] py-10">
                <div className="flex flex-col w-full max-w-[800px] gap-3 sm:px-[20px] mx-auto">
                    <BackButton content="Quay lại danh sách tin tức" />
                    <div className="flex flex-col shadow-2xl w-full bg-white py-5 px-6 rounded-sm gap-3">
                        <div>
                            <LabelType data={{ content: newsData.category.name, color: newsData.category.rgb_color }} />
                        </div>
                        <div className="flex flex-col gap-3">
                            <h2 className="font-bold text-3xl ">{newsData.title}</h2>
                            <div className="flex flex-col sm:flex-row gap-3 text-[#6B7280]">
                                <span>{formatDate(newsData.public_date)}</span>
                                <span>Khoảng {newsData.measure_time} phút đọc</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-12">
                            <LazyLoad
                                height={200}
                                offset={100}
                                throttle={100}
                                once
                                placeholder={<div className="w-full h-[300px] bg-gray-200 rounded-t-lg overflow-hidden"></div>}
                                style={{ width: '100%', height: 'auto' }}
                            >
                                <img
                                    src={newsData.main_img}
                                    alt={newsData.title}
                                    className="w-full h-full object-cover"
                                />
                            </LazyLoad>
                            <div className="break-words">{renderWithLazyLoad(content)}</div>
                        </div>
                    </div>
                </div>
            </div>
            ) : <ComingSoon />
        }
    </>
    );
}