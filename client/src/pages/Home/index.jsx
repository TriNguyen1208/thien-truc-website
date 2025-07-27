import Banner from "@/components/Banner";
import PostCategory from "@/components/PostCategory";
import ItemProduct from "@/components/ItemProduct";
import { Carousel } from 'antd';
import GreenButton from "@/components/GreenButton";
import Loading from "@/components/Loading";
import { Link } from "react-router-dom";
import homeQueries from "@/hooks/useHome";
import TopNews from "@/components/TopNews";

const slideData = [
    {
        id: 1,
        title: "Chiếu Sáng Trung Tâm Thương Mại",
        description: "Hệ thống đèn LED hiện đại cho mặt tiền trung tâm mua sắm tại Hà Nội"
    },
    {
        id: 2,
        title: "Đèn Trang Trí Văn Phòng",
        description: "Giải pháp chiếu sáng thông minh cho không gian làm việc hiện đại"
    },
    {
        id: 3,
        title: "Hệ Thống Đèn Khách Sạn",
        description: "Ánh sáng ấm áp tạo không gian sang trọng cho khách sạn 5 sao"
    },
    {
        id: 4,
        title: "Đèn Công Nghiệp",
        description: "Đèn LED công suất cao cho nhà máy và khu công nghiệp"
    }
];

export default function Home() {
    const numberItemProduct = 4;

    const handleClickButton = () => {
        console.log("Hello world")
    }
    const product = {
        image: "https://khoinguonsangtao.vn/wp-content/uploads/2022/09/hinh-anh-gai-xinh-cap-2-3.jpg",
        name: "Cable COMMSCOPE (THÙNG 305M) Cat 5 (6-219590-2)",
        price: 2650000,
    };
    const categories = [
        "Công Ty",
        "Điện Thoại"
    ];
    const handleClick = () => {
        console.log("123")
    };
    // return (
    //     //Không truyền width thì mặc định là full
    //     <GreenButton content={content} width="300px" handleClick={handleClick}/>
    // )
    const { data: allData, isLoading: loadingAll } = homeQueries.getAll();
    if (loadingAll) {
        return (
            <Loading />
        )
    }
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
            <Banner data={dataBanner} />
            <div className="bg-[var(--light-green-banner)] text-center p-[45px]">
                <div className="font-[600] text-[35px] text-[var(--dark-green)] mb-[20px]">
                    Dự án tiêu biểu
                </div>
                <div className="mb-[30px]">
                    <PostCategory categories={categories} handleClick={handleClick} />
                </div>
                <div className="w-full max-w-[900px] mx-auto border-2 border-[#166354] rounded-[10px] mb-[20px]"
                    style={{ boxShadow: 'rgba(100, 100, 111, 0.2) -3px 13px 33px -3px' }}
                >
                    <Carousel autoplay arrows dots={{ className: 'custom-dots' }}>
                        {slideData.map((slide) => (
                            <div key={slide.id}>
                                <div>
                                    <div
                                        className="w-full aspect-[19/8] bg-cover bg-center text-center rounded-t-[10px]"
                                        style={{
                                            backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop')`,
                                        }}
                                    ></div>
                                    <div className="p-4 text-left text-gray-800 text-base font-medium bg-white rounded-b-[10px]">
                                        <h4 className="text-lg font-semibold mb-2 text-gray-800">
                                            {slide.title}
                                        </h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {slide.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
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
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {[...Array(4)].map((_, i) => (
                        <ItemProduct key={i} product={product} handleClick={handleClickButton} />
                    ))}
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
