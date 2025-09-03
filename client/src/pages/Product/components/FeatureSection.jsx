// src/pages/components/FeatureSection.jsx
import { useMemo } from 'react';
import Banner from '@/components/Banner';
import CenterCard from '@/components/CenterCard';
import { TruckOutlined, UserOutlined, CreditCardOutlined, SafetyOutlined } from '@ant-design/icons';

export default function FeatureSection({ navigate }) {
    const bannerViewPricesData = useMemo(() => ({
        title: 'Xem bảng giá ngay',
        description: 'Xem chi tiết giá lắp đặt các thiết bị điện tử và giải pháp thi công tại Thiên Trúc',
        colorBackground: "#F0FDF4",
        colorText: "#000000",
        hasButton: true,
        contentButton: 'Tới Bảng Giá',
        handleButton: () => navigate('/bang-gia'),
    }), [navigate]);

    const centerCardsData = useMemo(() => [
        { icon: TruckOutlined, title: "Giao hàng nhanh", description: "Miễn phí với đơn hàng trên 1 triệu." },
        { icon: UserOutlined, title: "Tư vấn chuyên nghiệp", description: "Đội ngũ kỹ thuật viên giàu kinh nghiệm." },
        { icon: SafetyOutlined, title: '100% chính hãng', description: "Cam kết sản phẩm chính hãng." },
        { icon: CreditCardOutlined, title: "Thanh toán linh hoạt", description: "Nhiều phương thức thanh toán." }
    ], []);

    return (
        <>
            <Banner data={bannerViewPricesData} />
            <div className='container-fluid grid grid-cols-2 gap-[16px] place-items-center my-[8px] lg:grid-cols-4 lg:py-6'>
                {centerCardsData.map((card, index) => (
                    <div key={index} className='w-[100%] h-[220px] max-h-[200px] sm:w-[260px] sm:h-[160px] lg:w-[90%]'>
                        <CenterCard data={card} />
                    </div>
                ))}
            </div>
        </>
    );
}