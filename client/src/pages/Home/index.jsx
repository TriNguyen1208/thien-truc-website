import Banner from "@/components/Banner";
import PostCategory from "@/components/PostCategory";
import ItemProduct from "@/components/ItemProduct";
import { Carousel } from 'antd';
import GreenButton from "@/components/GreenButton";
import Loading from "@/components/Loading";
import { Link, useSearchParams, useNavigation } from "react-router-dom";
import homeQueries from "@/hooks/useHome";
import useProducts from "@/hooks/useProducts";
import useProjects from "@/hooks/useProjects";
import { useState } from "react";
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useEffect } from "react";
import {
    MailOutlined
} from '@ant-design/icons';
import useNews from "@/hooks/useNews";
import LazyLoad from 'react-lazyload';
import { useNavigate } from "react-router-dom";
const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            className={`!flex !items-center !justify-center !w-[45px] !h-[45px] bg-gray-400 hover:!bg-gray-500 rounded-full   cursor-pointer shadow-md transition absolute z-50 left-4 top-1/2 -translate-y-1/2`}
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
            className={`!w-[45px] !h-[45px] bg-gray-400 hover:!bg-gray-500 rounded-full !flex !items-center !justify-center cursor-pointer shadow-md transition absolute z-50 right-4 top-1/2 -translate-y-1/2`}
            onClick={onClick}
        >
            <ArrowRight color="white" size={20} />
        </div>
    );
};


export default function Home() {
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);
    const [maxIndex, setMaxIndex] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const filter = searchParams.get('filter') || '';




    // return (
    //     //Không truyền width thì mặc định là full
    //     <GreenButton content={content} width="300px" handleClick={handleClick}/>
    // )
    
    const navigation = useNavigation();
    const { data: allData, isLoading: loadingAll } = homeQueries.getAll();
    const { data: highlightProduct, isLoadingHighlightProduct } = useProducts.getHighlightProducts();
    const { data: highlightProject, isLoadingHighlightProject } = useProjects.getHighlightProjects(filter === "Tất cả dự án" ? '' : filter);
    // const { data: highlightProject, isLoadingHighlightProject } = useProjects.getHighlightProjects();
    const { data: highlightProjectRegion, isLoadingHighlightProjectRegion } = useProjects.project_regions.getAllFeatured();
    useEffect(() => {
        const updateWidth = () => {
            const width = window.innerWidth;
            let number = 1;
            if (width >= 1280) number = 4;
            else if (width >= 1024) number = 3;
            else if (width >= 768) number = 2;


            if (highlightProduct?.length) {
                const max = Math.ceil(highlightProduct.length / number) - 1;
                setMaxIndex(max);
                setIndex((prevIndex) => Math.min(prevIndex, max));
            }
        };

        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, [highlightProduct]);


    const handlePrev = () => {
        setIndex((prev) => (
            // console.log(prev + 1, maxIndex);
            Math.max(prev - 1, 0)
        ));
    }

    const handleNext = () => {
        setIndex((prev) => (
            // console.log(prev + 1, maxIndex);
            Math.min(prev + 1, maxIndex)
        )
        );
    };
    if (loadingAll || isLoadingHighlightProduct || isLoadingHighlightProject || isLoadingHighlightProjectRegion)
        return <Loading/>

    const { data: topNews, isLoading: newsLoading, error: newsError } = useNews.getHighlightNews();
    if (loadingAll) {
        return (
            <Loading />
        )
    }
    console.log(highlightProject);
    console.log(highlightProjectRegion);
    const categoriesName = (highlightProjectRegion ?? []).map(item => item.name);
    const categoriesData = ["Tất cả dự án", ...categoriesName];
    const idSelectedCategories = filter ? categoriesData.findIndex((name) => name === filter) : 0;

    const handleClickPostCategory = (idCategory) => {
        const filter = categoriesData[idCategory];
        const newParams = new URLSearchParams();
        newParams.set("filter", filter);
        setSearchParams(newParams);

    };


    const homePageData = allData.home_page;
    const highlightStatsAboutUsData = allData.highlight_stats_about_us;
    const dataBanner = {
        title: homePageData.banner_title,
        description: homePageData.banner_description,
        colorBackground: "var(--gradient-banner)",
        colorText: "#ffffff",
    }
    
    return (
        <>
            {navigation.state == 'loading' && <Loading/>}
            <Banner data={dataBanner} />
                <div>
                
                {/* Inlined TopNews Component */}
                <section className="w-full mx-auto border-2 border-[#16A34A] rounded-[10px] " style={{ boxShadow: 'rgba(100, 100, 111, 0.2) -3px 13px 33px -3px' }}>
                    {newsLoading ? (
                        <div className="text-center text-gray-600">Đang tải tin nổi bật...</div>
                    ) : newsError ? (
                        <div className="text-center text-red-600">Không thể tải tin tức. Vui lòng thử lại sau.</div>
                    ) : !topNews || topNews.length === 0 ? (
                        <div className="text-center text-gray-600">Không có tin tức nổi bật.</div>
                    ) : (
                        <Carousel
                        autoplay
                        arrows 
                        dots={{ className: 'custom-dots' }}
                        // prevArrow={<CustomPrevArrow />}
                        // nextArrow={<CustomNextArrow />}
                        // className="[&_.slick-prev]:hidden [&_.slick-next]:hidden h-full [&_.slick-slider]:h-full [&_.slick-track]:h-full [&_.slick-slide]:h-full"
                        // arrows={true}
                            >
                            {topNews.map((news) => (
                                <div key={news.id} 
                                className="cursor-pointer"
                                     onClick={() => {
                                        navigate(`tin-tuc/${news.id}`)
                                        }}>
                                <div className="w-full h-full animate-slide-in-right">
                                    <div className=" relative w-full h-full bg-black overflow-hidden rounded-[10px]">
                                        {/* Ảnh nền */}
                                        <div
                                        className="w-full aspect-[19/8] bg-cover bg-center rounded-t-[10px]"
                                        style={{ backgroundImage: `url(${news.main_img})` }}
                                        ></div>

                                        {/* Overlay gradient trắng phía dưới */}
                                        <div className="absolute inset-x-0 bottom-0 lg:h-[14%] md:h-[20%] sm:h-[22%] h-[25%] max-[500px]:h-[30%] pointer-events-none">
                                            <div
                                                className="w-full h-full"
                                                style={{
                                                background: `linear-gradient(to top,
                                                    rgba(255,255,255,1) 0%,
                                                    rgba(255,255,255,0.85) 20%,
                                                    rgba(255,255,255,0.7) 40%,
                                                    rgba(255,255,255,0.55) 60%,
                                                    rgba(255,255,255,0.4) 80%,  
                                                    transparent 100%)`,
                                                }}
                                            ></div>
                                        </div>
                                        
                                        <div className="absolute left-0 lg:bottom-2 bottom-0 w-full z-20 sm:px-6 sm:py-4 text-center">
                                            <div className="absolute inset-x-0 bottom-0 z-20 px-3 py-2 flex flex-col justify-end gap-1">
                                                <h4
                                                    className="font-semibold text-gray-800 mb-0 line-clamp-2 text-sm sm:text-base md:text-lg leading-tight"
                                                    style={{ textShadow: '0 1px 2px rgba(255,255,255,0.5)' }}
                                                >
                                                    {news.title}
                                                </h4>
                                                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed max-h-[3rem] overflow-hidden">
                                                    {news.main_content}
                                                </p>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))}
                        </Carousel>
                    )}
                </section>
            <div className="bg-[var(--light-green-banner)] text-center p-[45px]">
                <div className="font-[600] text-[35px] text-[var(--dark-green)] mb-[20px]">
                    Dự án tiêu biểu
                </div>
                <div className="mb-[30px] max-w-[70%] mx-auto">
                    <PostCategory categories={categoriesData || ["Tất cả dự án"]} handleClick={handleClickPostCategory} idCategories={idSelectedCategories} />
                </div>
                <div 
                    className=" relative w-full xl:w-[70%] mx-auto border-2 border-[#166354] rounded-[10px] mb-[20px] "
                     style={{ boxShadow: 'rgba(100, 100, 111, 0.2) -3px 13px 33px -3px' }}
                >
                    <Carousel
                        dots={{ className: 'custom-dots' }}
                        prevArrow={<CustomPrevArrow />}
                        nextArrow={<CustomNextArrow />}
                        className="[&_.slick-prev]:hidden [&_.slick-next]:hidden h-full [&_.slick-slider]:h-full [&_.slick-track]:h-full [&_.slick-slide]:h-full"
                        arrows={true}
                    >
                        {(highlightProject || []).map((item) => (
                            <Link key={item.id} to={`du-an/${item.id}`} className="h-full">
                                <div >
                                    {item.main_img ? (
                                        
                                        <div
                                            className="w-full aspect-[15/10] sm:aspect-[19/9] bg-cover bg-center text-center rounded-t-[10px] transition-transform duration-300 group-hover:scale-105"
                                            style={{
                                                backgroundImage: `url(${item.main_img})`,
                                            }}
                                        >
                                        </div>
                                    ) : (
                                        <div className="w-full aspect-[15/10] sm:aspect-[19/9] flex items-center bg-gray-200 justify-center rounded-t-[10px]">
                                            <MailOutlined style={{ fontSize: '48px', color: '#9CA3AF' }} />
                                        </div>
                                    )}

                                    <div className="h-[150px] p-4 text-left text-gray-800 bg-white rounded-b-[10px] transition-colors duration-300 group-hover:bg-gray-50">
                                        <h4 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-2 group-hover:text-[var(--dark-green)] transition-colors duration-300">
                                            {item.title}dsàdsádấdajjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjdddddddddđddddddđdsfdsàdsjhfkjsdahfdhfjkdskjfhakjf
                                        </h4>
                                        <p className="text-lg text-gray-600 leading-relaxed line-clamp-2">
                                            {item.main_content}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </Carousel>
                </div>
            </div>
            </div>
            <div className="container-fluid py-[70px]">
                <div className="text-center">
                    <div className="text-[35px] font-[600] text-[var(--dark-green)] mb-[20px]">
                        Sản phẩm nổi bật
                    </div>
                    {/* TODO: XU LI NAY */}
                    <div className="text-[20px] inline-block max-w-[900px] mb-[30px]">
                        Khám phá các giải pháp chiếu sáng LED cao cấp của chúng tôi, được thiết kế để đạt hiệu quả, độ bền và hiệu suất vượt trội.
                    </div>
                </div>
                <div className="mx-[25px] md:px-[45px] relative ">
                    <button className="absolute top-1/2 left-[-40px] md:left-[-20px] z-10 "
                        onClick={handlePrev}

                    >
                        <div className="w-[45px] h-[45px] bg-gray-400 hover:bg-gray-500 rounded-full flex items-center justify-center cursor-pointer shadow-md transition">
                            <ArrowLeft color="white" size={20} />
                        </div>
                    </button>
                    <button className="absolute right-[-40px] md:right-[-20px] top-1/2 z-10"
                        onClick={handleNext}

                    >
                        <div className="w-[45px] h-[45px] bg-gray-400 hover:bg-gray-500 rounded-full flex items-center justify-center cursor-pointer shadow-md transition">
                            <ArrowRight color="white" size={20} />
                        </div>
                    </button>
                    <div className="overflow-hidden relative">
                        <div
                            className="flex transition-transform duration-500 ease-in-out "
                            style={{ transform: `translateX(-${index * (100)}%)` }}
                        >

                            {
                                (highlightProduct || []).map((item, i) => {
                                    return (
                                     
                                        <Link to={`/san-pham/${item.id}`} key={i}
                                            className="w-1/2 sm:w-1/4 flex-shrink-0 px-2"
                                        >
                                            <div 
                                            className = 'aspect-[4/11] w-full max-w-[220px] max-h-[500px] sm:aspect-[40/111]  sm:max-h-[450px] md:max-h-[470px] lg:max-h-[550px] xl:max-h-[580px] lg:max-w-[280px]'
                                            >
                                                <ItemProduct product={item}
                                                />
                                            </div>
                                        </Link>

                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid flex flex-col lg:flex-row mb-[100px] items-center mt-[50px] px-4">
                {/* Left content */}
                <div className="w-full lg:w-1/2">
                    <div className="text-[32px] md:text-[36px] lg:text-[40px] font-[600] text-[var(--dark-green)] mb-[20px] text-center lg:text-left">
                        Công ty thiên trúc
                    </div>
                    <div className="text-[16px] md:text-[18px] lg:text-[20px] mb-[20px] text-justify lg:text-left">
                        {homePageData.aboutus_content}
                    </div>
                    <div className="flex flex-wrap justify-center lg:justify-start">
                        {(highlightStatsAboutUsData || []).map((item) => {
                            return (
                                <div key={item.id} className="mr-[20px] mb-[20px]">
                                    <div className="text-[22px] md:text-[24px] lg:text-[25px] text-[var(--green-bg)] font-[600] text-center lg:text-left">
                                        {item.number_text}
                                    </div>
                                    <div className="text-[16px] md:text-[18px] lg:text-[20px] text-center lg:text-left">
                                        {item.label}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex justify-center lg:justify-start mt-4">
                        <Link to="/ve-chung-toi">
                            <GreenButton content={"Tìm hiểu về chúng tôi"} width="200px" />
                        </Link>
                    </div>
                </div>

                {/* Right image */}
                <div className="w-full lg:w-1/2 mt-8 lg:mt-0 lg:ml-[30px]">
                    <div
                        className="aspect-[16/9] w-full rounded-[20px]"
                        style={{ boxShadow: "rgba(100, 100, 111, 0.2) -3px 12px 58px 5px" }}
                    >
                        <LazyLoad
                            height={200}
                            offset={100}
                            throttle={100}
                            once
                            placeholder={<div className="w-full h-full bg-gray-200 rounded-t-lg overflow-hidden"></div>}
                            style={{width: '100%', height: '100%'}}
                        >
                            <img
                                src={homePageData.aboutus_img}
                                className="w-full h-full rounded-[20px] object-cover"
                                alt="About us"
                            />
                        </LazyLoad>
                    </div>
                </div>
            </div>


        </>
    )
};


