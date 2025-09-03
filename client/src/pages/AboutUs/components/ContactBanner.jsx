import Banner from "@/components/Banner";
import { useNavigate } from "react-router-dom";

export default function ContactBanner() {
    const navigate = useNavigate();
    const bannerContact = {
        title: 'Sẵn sàng hợp tác với chúng tôi?',
        description: 'Hãy liên hệ ngay để được tư vấn và nhận báo giá miễn phí cho dự án của bạn.',
        colorBackground: "#F0FDF4",
        colorText: "#000000",
        hasButton: true,
        hasSearch: false,
        contentButton: 'Liên Hệ Ngay',
        handleButton: () => {
            navigate('/lien-he', { state: { scrollToForm: true } });
        },
        categories: null,
        contentPlaceholder: null
    };

    return <Banner data={bannerContact} />;
}