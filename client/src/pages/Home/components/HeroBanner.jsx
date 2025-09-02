import { Carousel } from 'antd';
import { ArrowRight, ArrowLeft } from 'lucide-react';

// --- Các component điều hướng cho Carousel ---
const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            className={`!flex !items-center !justify-center !w-[45px] !h-[45px] bg-gray-400 hover:!bg-gray-500 rounded-full cursor-pointer shadow-md transition absolute z-50 left-4 top-1/2 -translate-y-1/2`}
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

export default function HeroBanner({ images = [], switchTime = 0 }) {
    if (!images || images.length === 0) {
        return null; // Không hiển thị gì nếu không có ảnh
    }

    return (
        <Carousel
            autoplay={switchTime > 0}
            autoplaySpeed={switchTime * 1000}
            arrows
            dots={{ className: 'custom-dots' }}
            prevArrow={<CustomPrevArrow />}
            nextArrow={<CustomNextArrow />}
            className="[&_.slick-prev]:hidden [&_.slick-next]:hidden h-full [&_.slick-slider]:h-full [&_.slick-track]:h-full [&_.slick-slide]:h-full"
        >
            {images.map((item, index) => (
                <div key={index}>
                    <div className="w-full h-full animate-slide-in-right">
                        <div className="relative w-full h-full bg-black overflow-hidden">
                            <div
                                className="w-full aspect-[4/1] bg-cover bg-center"
                                style={{ backgroundImage: `url(${item})` }}
                            ></div>
                        </div>
                    </div>
                </div>
            ))}
        </Carousel>
    );
}
