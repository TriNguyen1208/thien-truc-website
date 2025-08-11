import UserCard from "@/components/UserCard";
import Banner from "@/components/Banner";
import { Link, useLocation, useNavigation } from 'react-router-dom';
import useContact from "@/hooks/useContact";
import Form from "@/components/Form";
import { useRef, useEffect } from 'react'
import {
    Mail,
    Phone,
    MapPin,
    Clock,
} from 'lucide-react';
import Loading from "@/components/Loading";
import { FiFacebook } from "react-icons/fi";
import { PhoneIcon, EmailIcon, LocationIcon, TimeIcon, FacebookIcon } from '@/components/Icon'
import ComingSoon from '@/pages/ComingSoon'

export default function Contact() {
    //Liên kết với banner của trang 'về chúng tôi'
    const location = useLocation();
    const { data: dataAll, isLoading: isLoadingDataAll } = useContact.getAll();
    const sectionRef = useRef(null);
    const navigation = useNavigation();
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
        hasButton: contactPageData.is_visible ? true : false,
        contentButton: "Liên hệ ngay",
        handleButton: handleButton
    };
    const dataForm = {
        title: "Gửi tin nhắn cho chúng tôi",
        type: 'lien-he'
    }
    const fixedIframe = companyInfoData.googlemaps_embed_url
        ?.replace(/width="[^"]*"/, 'width="100%"')
        ?.replace(/height="[^"]*"/, 'height="100%"')
    return (
        <>
            {navigation.state == 'loading' && <Loading />}
            <Banner data={dataBanner} />
            {dataAll.contact_page.is_visible ? <div>
                <div className="container-fluid bg-[var(--light-green-banner)] py-[70px]">
                    <div className="font-[600] flex justify-center text-[30px] text-[var(--dark-green)] mb-[30px]">
                        Đội ngũ của chúng tôi
                    </div>
                    <div className="grid grid-cols-12 gap-6">
                        {(supportAgentsData || []).map((item) => {
                            const dataUserCard = {
                                image_avatar: item.avatar_img,
                                // name: item.name,
                                name: item.name,
                                role: item.role,
                                sdt: item.phone_number,
                                url_facebook: item.facebook_url,
                            }
                            return (
                                <div key={item.id} className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 h-[320px]" >
                                    <UserCard data={dataUserCard} />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div ref={sectionRef} className="container-fluid flex py-[70px] grid grid-cols-12 gap-5 sm:gap-10">
                    <div className="col-span-12 lg:col-span-6 text-[var(--dark-green)] font-[400] ">
                        <div className="text-[30px] font-[600] mb-[15px]">
                            Liên hệ về chúng tôi
                        </div>
                        <div className="mb-[20px]">
                            Bạn có dự án trong đầu hoặc muốn tìm hiểu thêm về dịch vụ của chúng tôi? Điền vào biểu mẫu hoặc liên hệ trực tiếp với chúng
                            tôi qua thông tin bên dưới.
                        </div>
                        <div className="flex flex-col gap-[30px]">
                            <div className="flex items-center gap-5">
                                <div className="w-12">
                                    <EmailIcon />
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
                            <div className="flex items-center gap-5">
                                <div className="w-12">
                                    <PhoneIcon />
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
                                <div className="flex items-center gap-5">
                                    <div className="w-12">
                                        <LocationIcon />
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
                                                    className="text-sm hover:underline"
                                                >
                                                    <div className="font-inherit text-[16px]">{item.address}</div>
                                                </a>
                                            ))}

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="w-12">
                                    <TimeIcon />
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
                                className="hover:underline"
                            >

                                <div className="flex items-center gap-5">
                                    <div className="w-12">
                                        <FacebookIcon />
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
                    <div className=" mx-[-20px] lg:mx-0 col-span-12 lg:col-span-6 ]">
                        <Form data={dataForm} />
                    </div>
                </div >
                <div className="container-fluid bg-[var(--light-green-banner)] py-[35px]">
                    <div className="text-[30px] font-[600] text-[var(--dark-green)] mb-[30px]">
                        Vị trí của chúng tôi
                    </div>
                    <div>
                        <div 
                            className="h-[500px] break-words"
                            dangerouslySetInnerHTML={{ __html: fixedIframe }}
                        />
                    </div>
                </div>
            </div>: <ComingSoon/>}
        </>
    )
}
