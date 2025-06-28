import Demo from "../../components/ItemPost";
import UserCard from "../../components/UserCard";
import Banner from "../../components/Banner";
import { useNavigate } from 'react-router-dom';
import useContact from "../../redux/hooks/useContact";
import {
    Mail,
    Phone,
    MapPin,
    Clock,
} from 'lucide-react';
import { FiFacebook } from "react-icons/fi"; // Fi = Feather Icons (outline)

export default function Contact() {
    const { data: dataAll, isLoading: isLoadingDataAll } = useContact.getAll();
    const navigate = useNavigate();
    //Cái này là của whiteButton
    const handleButton = () => {
        navigate('/lien-he')
    }
    if (isLoadingDataAll) {
        return (
            <div>Is loading</div>
        )
    }
    const contactPageData = dataAll.contact_page;
    const supportAgentsData = dataAll.support_agents;
    const companyInfoData = dataAll.company_info;
    const parts = companyInfoData.working_hours.split(".");
    console.log(dataAll)
    const dataBanner = {
        title: contactPageData.banner_title,
        description: contactPageData.banner_description,
        colorBackground: "var(--gradient-banner)",
        colorText: "#ffffff",
        hasButton: true,
        contentButton: "Liên hệ ngay",
        handleButton: handleButton
    };
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
                            <div key={item.id} className="w-[350px] mr-[20px] mb-[20px]">
                                <UserCard data={dataUserCard} />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="container-fluid flex py-[70px]">
                <div className="w-1/2 text-[var(--dark-green)] font-[400]">
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
                                    {companyInfoData.company_phone}
                                </div>
                            </div>
                        </div>
                        <a
                            href={companyInfoData.googlemaps_url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="flex items-center">
                                <div className="mr-[20px] w-[50px] h-[50px] bg-[#F0FDF4] rounded-full flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-[var(--green-bg)]" />
                                </div>
                                <div>
                                    <div>
                                        Văn phòng
                                    </div>
                                    <div>
                                        {companyInfoData.office_address}
                                    </div>
                                </div>
                            </div>
                        </a>
                        <div className="flex items-center">
                            <div className="mr-[20px] w-[50px] h-[50px] bg-[#F0FDF4] rounded-full flex items-center justify-center">
                                <Clock className="w-5 h-5 text-[var(--green-bg)]" />
                            </div>
                            <div>
                                <div>
                                    Giờ làm việc
                                </div>
                                <div>
                                    {parts.map((item, index) => (
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
                <div>
                    Form
                </div>
            </div >
            <div className="container-fluid bg-[var(--light-green-banner)] py-[35px]">
                <div className="text-[30px] font-[600] text-[var(--dark-green)] mb-[30px]">
                    Vị trí của chúng tôi
                </div>
                <div>
                    <div className="h-[500px]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1731.3900774364906!2d105.62670415968444!3d10.46181896279175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a65a50ea1ee67%3A0x4617b76f410a907c!2zQ8O0bmcgVHkgVG5oaCBUaGnDqm4gVHLDumM!5e1!3m2!1svi!2s!4v1751040961139!5m2!1svi!2s"
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
