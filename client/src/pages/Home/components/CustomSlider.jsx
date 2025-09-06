import { useState, useEffect, useMemo, useCallback } from "react";
import { ArrowRight, ArrowLeft } from 'lucide-react';

// Nút dịch slider về trước
const SliderButton = ({onClick, direction}) => (
    <button 
        className={`absolute top-1/2 z-10 transform -translate-y-1/2 
        ${direction === "left" ? "left-[-30px] md:left-[-20px]" : "right-[-30px] md:right-[-20px]"}`}
        onClick={onClick}
    >
        <div className="w-[45px] h-[45px] bg-black opacity-50 hover:opacity-70 rounded-full flex items-center justify-center cursor-pointer shadow-md transition">
            {direction === "left" ? <ArrowLeft color="white" size={20} /> : <ArrowRight color="white" size={20} />}
        </div>
    </button>
)

/**
 * Component slider
 * @param {Array} data - Dữ liệu
 * @param {Function} renderItem - Hàm nhận một mục và chỉ số của nó, trả về một phần tử React.
 * @param {Object} itemsPerView - Đối tượng xác định số lượng mục hiển thị cho các breakpoint khác nhau. Ví dụ: { mobile: 1, sm: 2, md: 3, lg: 4 }
 */ 

export default function CustomSlider ({data = [], renderItem, itemsPerView}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [maxIndex, setMaxIndex] = useState(0);

    // Hàm lấy số lượng mục hiển thị trên mỗi trang phụ thuộc screen size
    const getItemsPerPage = useCallback(() => {
        const width = window.innerWidth;
        if (width >= 1024 && itemsPerView.lg) return itemsPerView.lg;
        if (width >= 768 && itemsPerView.md) return itemsPerView.md;
        if (width >= 450 && itemsPerView.sm) return itemsPerView.sm;
        return itemsPerView.mobile || 1;
    }, [itemsPerView]);

    // Tính toán chỉ số tối đa cho slider
    useEffect(() => {
        const calculateMaxIndex = () => {
            const itemsPerPage = getItemsPerPage();
            const newMaxIndex = data.length > itemsPerPage ? Math.ceil(data.length / itemsPerPage) - 1 : 0;
            setMaxIndex(newMaxIndex);
            setCurrentIndex(prev => Math.min(prev, newMaxIndex));
        };

        calculateMaxIndex();
        window.addEventListener("resize", calculateMaxIndex);
        return () => window.removeEventListener("resize", calculateMaxIndex);
    }, [data.length, getItemsPerPage]);

    // Xử lý sự kiện khi nhấn nút quay lại và tiếp theo
    const handlePrev = () => {
        setCurrentIndex(prev => Math.max(prev - 1, 0));
    };

    const handleNext = () => {
        setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
    };

    // Tính toán kiểu dáng cho slider
    const sliderStyle = useMemo(() => ({
        transform: `translateX(-${currentIndex * 100}%)`,
    }), [currentIndex]);

    if (!data || data.length === 0) {
        return <div className="text-center p-8">Không có dữ liệu để hiển thị.</div>;
    }

    return (
        <div className="mx-[25px] md:px-[45px] relative ">
            {maxIndex > 0 && (
                <>
                    <SliderButton onClick={handlePrev} direction="left" />
                    <SliderButton onClick={handleNext} direction="right" />
                </>
            )}
            <div className="overflow-hidden relative">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={sliderStyle}
                >
                    {data?.map((item, index) => renderItem(item, index))}
                </div>
            </div>
        </div>
    );
}