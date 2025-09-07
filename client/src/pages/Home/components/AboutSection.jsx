import { Link } from "react-router-dom";
import GreenButton from "@/components/GreenButton";
import LazyLoad from '@/components/LazyLoad';

// Giới thiệu về công ty
export default function AboutSection({ content, imageUrl, stats = [] }) {
    return (
        <section className="container-fluid flex flex-col lg:flex-row mb-[100px] items-center mt-[50px] px-4">
            {/* Nội dung bên trái */}
            <div className="w-full lg:w-1/2">
                <h2 className="text-[32px] md:text-[36px] lg:text-[40px] font-[600] text-[var(--dark-green)] mb-[20px] text-center lg:text-left">
                    Công ty Thiên Trúc
                </h2>
                <p className="text-[16px] md:text-[18px] lg:text-[20px] mb-[20px] text-justify lg:text-left">
                    {content}
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start">
                    {(stats || []).map((item) => (
                        <div key={item.id} className="mr-[20px] mb-[20px]">
                            <div className="text-[22px] md:text-[24px] lg:text-[25px] text-[var(--green-bg)] font-[600] text-center lg:text-left">
                                {item.number_text}
                            </div>
                            <div className="text-[16px] md:text-[18px] lg:text-[20px] text-center lg:text-left">
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center lg:justify-start mt-4">
                    <Link to="/ve-chung-toi">
                        <GreenButton content={"Tìm hiểu về chúng tôi"} width="200px" />
                    </Link>
                </div>
            </div>

            {/* Hình ảnh bên phải */}
            <div className="w-full lg:w-1/2 mt-8 lg:mt-0 lg:ml-[30px]">
                <div
                    className="aspect-[16/9] w-full rounded-[20px]"
                    style={{ boxShadow: "rgba(100, 100, 111, 0.2) -3px 12px 58px 5px" }}
                >
                    <LazyLoad
                        height={200}
                        offset={100}
                        once
                        placeholder={<div className="w-full h-full bg-gray-200 rounded-[20px]"></div>}
                        style={{ width: '100%', height: '100%' }}
                    >
                        <img
                            src={imageUrl}
                            className="w-full h-full rounded-[20px] object-cover"
                            alt="Về công ty Thiên Trúc"
                        />
                    </LazyLoad>
                </div>
            </div>
        </section>
    );
}