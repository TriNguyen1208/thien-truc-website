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
import TopNews from "@/components/TopNews";
import { useState } from "react";
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useEffect } from "react";
import {
    MailOutlined
} from '@ant-design/icons';

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
    const [index, setIndex] = useState(0);
    const [maxIndex, setMaxIndex] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const filter = searchParams.get('filter') || '';




    // return (
    //     //Không truyền width thì mặc định là full
    //     <GreenButton content={content} width="300px" handleClick={handleClick}/>
    // )

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

    const navigation = useNavigation();
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
                <TopNews />
                {/* Phần dự án tiêu biểu */}
                {/* <FeaturedProjects /> */}
            </div>
            <div className="bg-[var(--light-green-banner)] text-center p-[45px]">
                <div className="font-[600] text-[35px] text-[var(--dark-green)] mb-[20px]">
                    Dự án tiêu biểu
                </div>
                <div className="mb-[30px] w-[90%] lg:w-[70%] xl:w-[60%] mx-auto">
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
                <div className="px-[20px] relative ">
                    <button className="absolute top-1/2 z-10 translate-x-[-60px]"
                        onClick={handlePrev}

                    >
                        <div className="w-[45px] h-[45px] bg-gray-400 hover:bg-gray-500 rounded-full flex items-center justify-center cursor-pointer shadow-md transition">
                            <ArrowLeft color="white" size={20} />
                        </div>
                    </button>
                    <button className="absolute right-0 top-1/2 z-10 translate-x-[5px] translate-y-[-10px]"
                        onClick={handleNext}

                    >
                        <div className="w-[45px] h-[45px] bg-gray-400 hover:bg-gray-500 rounded-full flex items-center justify-center cursor-pointer shadow-md transition">
                            <ArrowRight color="white" size={20} />
                        </div>
                    </button>
                    <div className="overflow-hidden relative">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${index * (100)}%)` }}
                        >

                            {
                                (highlightProduct || []).map((item, i) => {
                                    return (
                                        <Link to={`/san-pham/${item.id}`} key={i}
                                            className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0"
                                        >
                                            <div className=' h-[620px] w-[90%] sm:w-[70%] md:w-[90%]'>
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
                        <img
                            src={homePageData.aboutus_img}
                            className="w-full h-full rounded-[20px] object-cover"
                            alt="About us"
                        />
                    </div>
                </div>
            </div>


        </>
    )
};


