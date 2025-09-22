import { useNavigate } from "react-router-dom";
import { Carousel } from 'antd';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import useNews from "@/hooks/useNews";

// --- Các component điều hướng cho Carousel ---
const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            className={`!flex !items-center !justify-center !w-[45px] !h-[45px] bg-black opacity-50 hover:opacity-70 rounded-full cursor-pointer shadow-md transition absolute z-50 left-4 top-1/2 -translate-y-1/2`}
            onClick={onClick}
        >
            <ArrowLeft color="white" size={20} />
        </div>
    );
};

const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            className={`!w-[45px] !h-[45px] bg-black opacity-50 hover:opacity-70 rounded-full !flex !items-center !justify-center cursor-pointer shadow-md transition absolute z-50 right-4 top-1/2 -translate-y-1/2`}
            onClick={onClick}
        >
            <ArrowRight color="white" size={20} />
        </div>
    );
};

// Giới thiệu về tin tức nổi bật
export default function FeaturedNews() {
    const navigate = useNavigate();
    const { data: topNews, isLoading, error } = useNews.getFeaturedNews();

    if (isLoading) {
        return (
            <>
            </>
        );
    }

    if (error) {
        return (
           <>
           </>
        );
    }

    if (!topNews || !topNews.featured_news || topNews.featured_news.length === 0) {
        return (
            <>
            </>
        );
    }
    return (
        <section className="w-full mx-auto border-2 border-[#16A34A]" style={{ boxShadow: 'rgba(100, 100, 111, 0.2) -3px 13px 33px -3px' }}>
            <Carousel
                autoplay={topNews.switch_time > 0}
                autoplaySpeed={topNews.switch_time * 1000}
                arrows
                dots={{ className: 'custom-dots' }}
                prevArrow={<CustomPrevArrow />}
                nextArrow={<CustomNextArrow />}
                className="[&_.slick-prev]:hidden [&_.slick-next]:hidden"
            >
                {topNews?.featured_news?.map((news) => (
                    <div
                        key={news.id}
                        className="cursor-pointer"
                        onClick={() => navigate(`tin-tuc/${news.id}`)}
                    >
                    <div className="w-full h-full animate-slide-in-right">
                        <div className="relative w-full h-full bg-black overflow-hidden">
                            {/* Ảnh nền */}
                            <div
                                className="w-full aspect-[11/4] bg-cover bg-center"
                                style={{ backgroundImage: `url(${news.img})` }}
                            ></div>

                            {/* Overlay gradient */}
                            <div className="absolute inset-x-0 bottom-0 lg:h-[14%] md:h-[20%] sm:h-[22%] h-[25%] max-[500px]:h-[30%]"
                                style={{
                                    background: `linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 20%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0.55) 60%, rgba(255,255,255,0.4) 80%, transparent 100%)`
                                }}
                            ></div>
                            
                            {/* Nội dung text */}
                            <div className="absolute left-0 lg:bottom-2 bottom-0 w-full z-20 sm:px-6 sm:py-4 text-center">
                                <div className="absolute inset-x-0 bottom-0 z-20 px-3 py-2 flex flex-col justify-end gap-1">
                                    <h4
                                        className="font-semibold text-gray-800 mb-0 line-clamp-2 text-sm sm:text-base md:text-lg leading-tight"
                                        style={{ textShadow: '0 1px 2px rgba(255,255,255,0.5)' }}
                                    >
                                        {news.title}
                                    </h4>
                                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed max-h-[3rem] overflow-hidden line-clamp-2">
                                        {news.main_content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                ))}
            </Carousel>
        </section>
        );
}