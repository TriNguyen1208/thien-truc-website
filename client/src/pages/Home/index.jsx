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
import useNews from "@/hooks/useNews";
import LazyLoad from 'react-lazyload';
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import ComingSoon from '@/pages/ComingSoon'
import ItemPost from "@/components/ItemPost";

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
    const SEO = {
        title: "Trang chủ",
        description: "Trang chủ của công ty Thiên Trúc, nơi cung cấp các giải pháp chiếu sáng LED cao cấp.",
        keywords: "Thiên Trúc, chiếu sáng LED, giải pháp chiếu sáng, sản phẩm LED, dự án tiêu biểu",
        image: "../../assets/images/logo.png",
        url: "https://thientruc.vn",
        meta: {
            title: "Công ty Thiên Trúc",
            urlFacebook: "https://www.facebook.com/ctycpcnthientruc"
        }
    };
    const navigate = useNavigate();
    const [indexProduct, setIndexProduct] = useState(0);
    const [maxIndexProduct, setMaxIndexProduct] = useState(0);
    const [indexProject, setIndexProject] = useState(0);
    const [maxIndexProject, setMaxIndexProject] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const filter = searchParams.get('filter') || '';





    const navigation = useNavigation();
    const { data: allData, isLoading: loadingAll } = homeQueries.getAll();
    const { data: highlightProduct, isLoadingHighlightProduct } = useProducts.getHighlightProducts();
    const { data: highlightProject, isLoadingHighlightProject } = useProjects.getHighlightProjects(filter === "Tất cả dự án" ? '' : filter);
    const { data: highlightProjectRegion, isLoadingHighlightProjectRegion } = useProjects.project_regions.getAllFeatured();
    const { data: topNews, isLoading: newsLoading, error: newsError } = useNews.getFeaturedNews();

    useEffect(() => {
        const updateWidth = () => {
            const width = window.innerWidth;
            let numberProduct = 1;
            if (width >= 1024) numberProduct = 4;
            else if (width >= 768) numberProduct = 3;
            else if (width >= 450) numberProduct = 2;

            let numberProject = 1;
            if (width >= 1024) numberProject = 3;
            else if (width >= 768) numberProject = 2;

            if (highlightProduct?.length) {
                const maxProduct = Math.ceil(highlightProduct.length / numberProduct) - 1;
                setMaxIndexProduct(maxProduct);
                setIndexProduct((prevIndex) => Math.min(prevIndex, maxProduct));
            }
            if (highlightProject?.length) {
                const maxProject = Math.ceil(highlightProject.length / numberProject) - 1;
                setMaxIndexProject(maxProject);
                setIndexProject((prevIndex) => Math.min(prevIndex, maxProject));
            }
        };

        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, [highlightProduct, highlightProject]);


    const handlePrevProduct = () => {
        setIndexProduct((prev) => (
            Math.max(prev - 1, 0)
        ));
    }

    const handleNextProduct = () => {
        setIndexProduct((prev) => (
            Math.min(prev + 1, maxIndexProduct)
        ));
    };
    const handlePrevProject = () => {
        setIndexProject((prev) => (
            Math.max(prev - 1, 0)
        ));
    }

    const handleNextProject = () => {
        setIndexProject((prev) => (
            Math.min(prev + 1, maxIndexProject)
        ));
    };
    if (loadingAll || isLoadingHighlightProduct || isLoadingHighlightProject || isLoadingHighlightProjectRegion)
        return <Loading />
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

    return (
        <>
            <Helmet>
                {/* Title và description */}
                <title>{SEO.title}</title>
                <meta
                    name="description"
                    content={SEO.description}
                />

                {/* Canonical */}
                <link rel="canonical" href={SEO.url} />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content={SEO.meta.title} />
                <meta
                    property="og:image"
                    content={SEO.image}
                />
                <meta property="og:url" content={SEO.url} />

                {/* JSON-LD - Organization schema */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        name: "Thiên Trúc",
                        url: SEO.url,
                        logo: SEO.image,
                        sameAs: [
                            SEO.urlFacebook
                        ]
                    })}
                </script>
            </Helmet>

            {navigation.state == 'loading' && <Loading />}
            {/* <Banner data={dataBanner} /> */}
            <Carousel
                autoplay={homePageData.banner_switch_time > 0}
                autoplaySpeed={homePageData.banner_switch_time * 1000}
                arrows
                dots={{ className: 'custom-dots' }}
                prevArrow={<CustomPrevArrow />}
                nextArrow={<CustomNextArrow />}
                className="[&_.slick-prev]:hidden [&_.slick-next]:hidden h-full [&_.slick-slider]:h-full [&_.slick-track]:h-full [&_.slick-slide]:h-full"
            >
                {homePageData.banner_images.map((item, index) => (
                    <div key={index}
                    // className="cursor-pointer"
                    >
                        <div className="w-full h-full animate-slide-in-right">
                            <div className=" relative w-full h-full bg-black overflow-hidden ">
                                {/* Ảnh nền */}
                                <div
                                    className="w-full aspect-[4/1] bg-cover bg-center"
                                    style={{ backgroundImage: `url(${item})` }}
                                ></div>




                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
            {allData.home_page.is_visible ? <div>
                <div>
                    {/* Inlined TopNews Component */}
                    <section className="w-full mx-auto border-2 border-[#16A34A] " style={{ boxShadow: 'rgba(100, 100, 111, 0.2) -3px 13px 33px -3px' }}>
                        {newsLoading ? (
                            <div className="text-center text-gray-600">Đang tải tin nổi bật...</div>
                        ) : newsError ? (
                            <div className="text-center text-red-600">Không thể tải tin tức. Vui lòng thử lại sau.</div>
                        ) : !topNews || topNews.length === 0 ? (
                            <div className="text-center text-gray-600">Không có tin tức nổi bật.</div>
                        ) : (
                            <Carousel
                                autoplay={topNews.switch_time > 0}
                                autoplaySpeed={topNews.switch_time * 1000}
                                arrows
                                dots={{ className: 'custom-dots' }}
                                prevArrow={<CustomPrevArrow />}
                                nextArrow={<CustomNextArrow />}
                                className="[&_.slick-prev]:hidden [&_.slick-next]:hidden h-full [&_.slick-slider]:h-full [&_.slick-track]:h-full [&_.slick-slide]:h-full"
                            >
                                {topNews.featured_news.map((news) => (
                                    <div key={news.id}
                                        className="cursor-pointer"
                                        onClick={() => {
                                            navigate(`tin-tuc/${news.id}`)
                                        }}>
                                        <div className="w-full h-full animate-slide-in-right">
                                            <div className=" relative w-full h-full bg-black overflow-hidden ">
                                                {/* Ảnh nền */}
                                                <div
                                                    className="w-full lg:aspect-[19/8] md:aspect-[14/8] sm:aspect-[11/8] aspect-[10/8] bg-cover bg-center"
                                                    style={{ backgroundImage: `url(${news.img})` }}
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
                    <div className="bg-[var(--light-green-banner)] text-center py-[45px] px-[10px] sm:px-[25px] ">
                        <div className="font-[600] text-[35px] text-[var(--dark-green)] mb-[20px]">
                            Dự án tiêu biểu
                        </div>
                        <div className="mb-[30px] max-w-[70%] mx-auto">
                            <PostCategory categories={categoriesData || ["Tất cả dự án"]} handleClick={handleClickPostCategory} idCategories={idSelectedCategories} />
                        </div>
                        <div className="mx-[25px] md:px-[45px] relative ">
                            <button className="absolute top-1/2 left-[-40px] md:left-[-20px] z-10 "
                                onClick={handlePrevProject}

                            >
                                <div className="w-[45px] h-[45px] bg-gray-400 hover:bg-gray-500 rounded-full flex items-center justify-center cursor-pointer shadow-md transition">
                                    <ArrowLeft color="white" size={20} />
                                </div>
                            </button>
                            <button className="absolute right-[-40px] md:right-[-20px] top-1/2 z-10"
                                onClick={handleNextProject}

                            >
                                <div className="w-[45px] h-[45px] bg-gray-400 hover:bg-gray-500 rounded-full flex items-center justify-center cursor-pointer shadow-md transition">
                                    <ArrowRight color="white" size={20} />
                                </div>
                            </button>
                            <div className="overflow-hidden relative">
                                <div
                                    className="flex transition-transform duration-500 ease-in-out "
                                    style={{ transform: `translateX(-${indexProject * (100)}%)` }}
                                >

                                    {
                                        (highlightProject || []).map((item, index) => {
                                            const complete_time = String(new Date(item.complete_time).toLocaleDateString('vi-VN'))
                                            const dataProject = {
                                                type: 'project',
                                                title: item?.title ?? "",
                                                description: item?.main_content ?? "",
                                                location: item?.province ?? "",
                                                date: complete_time,
                                                tag: item?.region.name ?? "",
                                                tagColor: item?.region.rgb_color ?? "",
                                                image: item?.main_img ?? "",
                                            }
                                            return (

                                                <Link to={`/du-an/${item.id}`} key={index}
                                                    className="flex w-full justify-center  md:w-1/2 lg:w-1/3 flex-shrink-0 px-2"
                                                >
                                                    <div
                                                    >
                                                        <ItemPost data={dataProject} />
                                                    </div>
                                                </Link>

                                            )
                                        })
                                    }
                                </div>
                            </div>
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
                            onClick={handlePrevProduct}

                        >
                            <div className="w-[45px] h-[45px] bg-gray-400 hover:bg-gray-500 rounded-full flex items-center justify-center cursor-pointer shadow-md transition">
                                <ArrowLeft color="white" size={20} />
                            </div>
                        </button>
                        <button className="absolute right-[-40px] md:right-[-20px] top-1/2 z-10"
                            onClick={handleNextProduct}

                        >
                            <div className="w-[45px] h-[45px] bg-gray-400 hover:bg-gray-500 rounded-full flex items-center justify-center cursor-pointer shadow-md transition">
                                <ArrowRight color="white" size={20} />
                            </div>
                        </button>
                        <div className="overflow-hidden relative">
                            <div
                                className="flex transition-transform duration-500 ease-in-out "
                                style={{ transform: `translateX(-${indexProduct * (100)}%)` }}
                            >

                                {
                                    (highlightProduct || []).map((item, i) => {
                                        return (

                                            <Link to={`/san-pham/${item.id}`} key={i}
                                                className="flex w-full justify-center min-[450px]:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 px-2"
                                            >
                                                <div
                                                    className=' aspect-[4/8]  max-h-[400px] min-[450px]:max-h-[460px] w-full max-w-[230px]   sm:max-h-[380px] md:max-h-[420px]  lg:max-w-[280px] lg:max-h-[470px] xl:max-h-[500px]'
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
                            Công ty Thiên Trúc
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
                                style={{ width: '100%', height: '100%' }}
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
            </div > : <ComingSoon />
            }

        </>
    )
};