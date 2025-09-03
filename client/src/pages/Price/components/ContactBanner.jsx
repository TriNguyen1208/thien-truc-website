// src/pages/Price/components/ContactBanner.jsx
import React, { useMemo } from 'react';
import Banner from '@/components/Banner';

export default function ContactBanner({ navigate }) {
    const bannerContactData = useMemo(() => ({
        title: 'Sẵn sàng hợp tác với chúng tôi?',
        description: 'Hãy liên hệ ngay để được tư vấn và nhận báo giá miễn phí cho dự án của bạn.',
        colorBackground: '#F0FDF4',
        colorText: '#000000',
        hasButton: true,
        hasSearch: false,
        contentButton: 'Liên Hệ Ngay',
        handleButton: () => {
            navigate('/lien-he', { state: { scrollToForm: true } });
        },
    }), [navigate]);

    return <Banner data={bannerContactData} />;
}