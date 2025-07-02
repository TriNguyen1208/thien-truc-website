import UserCard from "@/components/UserCard";
import Banner from "@/components/Banner";
import useContact from "@/redux/hooks/useContact";
import Form from "@/components/Form";
import {
    Mail,
    Phone,
    MapPin,
    Clock,
} from 'lucide-react';
import Loading from "@/components/Loading";
import { FiFacebook } from "react-icons/fi";
import { useRef } from "react";
import { useLocation, useEffect } from "react-router-dom";
export default function Contact() {
    const { data: dataAll, isLoading: isLoadingDataAll } = useContact.getAll();
    const sectionRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        if (location.state?.scrollToForm) {
            sectionRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [location]);
    const handleButton = () => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    if (isLoadingDataAll) {
        return (
            <Loading />
        )
    }
    const contactPageData = dataAll.contact_page;
    const supportAgentsData = dataAll.support_agents;
    const companyInfoData = dataAll.company_info;
    const dataBanner = {
        title: contactPageData.banner_title,
        description: contactPageData.banner_description,
        colorBackground: "var(--gradient-banner)",
        colorText: "#ffffff",
        hasButton: true,
        contentButton: "Liên hệ ngay",
        handleButton: handleButton
    };
    const dataForm = {
        title: "Gửi tin nhắn cho chúng tôi",
        type: 'lien-he'
    }
    return (
        <>
            <Banner data={dataBanner} />
            <div className="container-fluid bg-[var(--light-green-banner)] py-[70px]">
                <div className="font-[600] flex justify-center text-[30px] text-[var(--dark-green)] mb-[30px]">
                    Đội ngũ của chúng tôi
                </div>
                <div className="flex justify-center flex-wrap">
                    {(supportAgentsData || []).map((item) => {
                        const dataUserCard = {
                            image_avatar: item.avatar_img,
                            name: item.name,
                            role: item.role,
                            sdt: item.phone_numer,
                            url_facebook: item.facebook_url,
                        }
                        return (
                            <div key={item.id} className="w-[260px] mr-[20px] mb-[20px]">
                                <UserCard data={dataUserCard} />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div ref={sectionRef} className="container-fluid flex py-[70px] ">
                <div className="w-1/2 text-[var(--dark-green)] font-[400] ">
                    <div className="text-[30px] font-[600] mb-[15px]">
                        Liên hệ về chúng tôi
                    </div>
                    <div className="mb-[20px]">
                        Bạn có dự án trong đầu hoặc muốn tìm hiểu thêm về dịch vụ của chúng tôi? Điền vào biểu mẫu hoặc liên hệ trực tiếp với chúng
                        tôi qua thông tin bên dưới.
                    </div>
                    <div className="flex flex-col gap-[30px]">
                        <div className="flex items-center">
                            <div className="mr-[20px] w-[50px] h-[50px] bg-[#F0FDF4] rounded-full flex items-center justify-center">
                                <Mail className="w-5 h-5 text-[var(--green-bg)]" />
                            </div>
                            <div>
                                <div>
                                    Email
                                </div>
                                <div>
                                    {companyInfoData.company_email}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="mr-[20px] w-[50px] h-[50px] bg-[#F0FDF4] rounded-full flex items-center justify-center">
                                <Phone className="w-5 h-5 text-[var(--green-bg)]" />
                            </div>
                            <div>
                                <div>
                                    Điện thoại
                                </div>
                                <div>
                                    {companyInfoData.company_phone.map((item, index) => (
                                        <div key={index}>{item}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center">
                                <div className="mr-[20px] w-[50px] h-[50px] bg-[#F0FDF4] rounded-full flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-[var(--green-bg)]" />
                                </div>
                                <div>
                                    <div>
                                        Văn phòng
                                    </div>
                                    <div>
                                        {companyInfoData.office_address.map((item, index) => (
                                            <a
                                                key={index}
                                                href={item.googlemaps_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:underline no-underline text-sm hover:"
                                            >
                                                <div >{item.address} </div>
                                            </a>
                                        ))}

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="mr-[20px] w-[50px] h-[50px] bg-[#F0FDF4] rounded-full flex items-center justify-center">
                                <Clock className="w-5 h-5 text-[var(--green-bg)]" />
                            </div>
                            <div>
                                <div>
                                    Giờ làm việc
                                </div>
                                <div>
                                    {companyInfoData.working_hours.map((item, index) => (
                                        <div key={index}>{item}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <a
                            href={companyInfoData.fanpage_url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >

                            <div className="flex items-center">
                                <div className="mr-[20px] w-[50px] h-[50px] bg-[#F0FDF4] rounded-full flex items-center justify-center">
                                    <FiFacebook className="w-6 h-6 text-[var(--green-bg)]" />
                                </div>
                                <div>
                                    <div>
                                        Fanpage công ty
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="ml-[50px]">
                    <Form data={dataForm} />
                </div>
            </div >
            <div className="container-fluid bg-[var(--light-green-banner)] py-[35px]">
                <div className="text-[30px] font-[600] text-[var(--dark-green)] mb-[30px]">
                    Vị trí của chúng tôi
                </div>
                <div>
                    <div className="h-[500px]">
                        <iframe
                            src={companyInfoData.googlemaps_embed_url}
                            className="w-full h-full border-0"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
