import Banner from "@/components/Banner"
import useRecruitment from "@/hooks/useRecruitment"
import Loading from "@/components/Loading"
import CenterCard from "@/components/CenterCard";
import GreenButton from "@/components/GreenButton";
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons"
import { useRef } from "react";
import Form from "@/components/Form";
import { useNavigation } from "react-router-dom";
import LazyLoad from "react-lazyload";
import ComingSoon from '@/pages/ComingSoon'

const BuildingIcon = () => (
    <svg width="65" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.334961" width="64" height="64" rx="32" fill="#DCFCE7" />
        <path d="M41.6683 44V22.6667C41.6683 21.9594 41.3873 21.2811 40.8872 20.781C40.3871 20.281 39.7089 20 39.0016 20H25.6683C24.9611 20 24.2828 20.281 23.7827 20.781C23.2826 21.2811 23.0016 21.9594 23.0016 22.6667V44M41.6683 44H44.335H41.6683ZM41.6683 44H35.0016H41.6683ZM23.0016 44H20.335H23.0016ZM23.0016 44H29.6683H23.0016ZM28.335 25.3333H29.6683H28.335ZM28.335 30.6667H29.6683H28.335ZM35.0016 25.3333H36.335H35.0016ZM35.0016 30.6667H36.335H35.0016ZM29.6683 44V37.3333C29.6683 36.9797 29.8088 36.6406 30.0588 36.3905C30.3089 36.1405 30.648 36 31.0016 36H33.6683C34.0219 36 34.3611 36.1405 34.6111 36.3905C34.8612 36.6406 35.0016 36.9797 35.0016 37.3333V44M29.6683 44H35.0016H29.6683Z" fill="#D9D9D9" />
        <path d="M41.6683 44V22.6667C41.6683 21.9594 41.3873 21.2811 40.8872 20.781C40.3871 20.281 39.7089 20 39.0016 20H25.6683C24.9611 20 24.2828 20.281 23.7827 20.781C23.2826 21.2811 23.0016 21.9594 23.0016 22.6667V44M41.6683 44H44.335M41.6683 44H35.0016M23.0016 44H20.335M23.0016 44H29.6683M35.0016 44V37.3333C35.0016 36.9797 34.8612 36.6406 34.6111 36.3905C34.3611 36.1405 34.0219 36 33.6683 36H31.0016C30.648 36 30.3089 36.1405 30.0588 36.3905C29.8088 36.6406 29.6683 36.9797 29.6683 37.3333V44M35.0016 44H29.6683M28.335 25.3333H29.6683M28.335 30.6667H29.6683M35.0016 25.3333H36.335M35.0016 30.6667H36.335" stroke="#22C55E" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round" />
    </svg>


);
const FlashIcon = () => (
    <svg width="65" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.984863" width="64" height="64" rx="32" fill="#DCFCE7" />
        <path d="M34.3184 29.3333V20L22.3184 34.6667H31.6517V44L43.6517 29.3333H34.3184Z" stroke="#22C55E" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round" />
    </svg>


);
const MemberIcon = () => (
    <svg width="65" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.665039" width="64" height="64" rx="32" fill="#DCFCE7" />
        <path d="M39.3315 42.6667H45.9982V40C45.9981 39.1687 45.7391 38.3581 45.2571 37.6808C44.775 37.0036 44.094 36.4933 43.3085 36.221C42.5231 35.9487 41.6724 35.9278 40.8746 36.1614C40.0767 36.3949 39.3715 36.8712 38.8569 37.524M39.3315 42.6667H25.9982M39.3315 42.6667V40C39.3315 39.1253 39.1635 38.2893 38.8569 37.524M38.8569 37.524C38.3617 36.2866 37.5072 35.2259 36.4035 34.4788C35.2999 33.7317 33.9977 33.3324 32.6649 33.3324C31.3321 33.3324 30.0299 33.7317 28.9262 34.4788C27.8225 35.2259 26.968 36.2866 26.4729 37.524M25.9982 42.6667H19.3315V40C19.3316 39.1687 19.5907 38.3581 20.0727 37.6808C20.5547 37.0036 21.2358 36.4933 22.0212 36.221C22.8066 35.9487 23.6574 35.9278 24.4552 36.1614C25.253 36.3949 25.9582 36.8712 26.4729 37.524M25.9982 42.6667V40C25.9982 39.1253 26.1662 38.2893 26.4729 37.524M36.6649 25.3333C36.6649 26.3942 36.2434 27.4116 35.4933 28.1618C34.7432 28.9119 33.7257 29.3333 32.6649 29.3333C31.604 29.3333 30.5866 28.9119 29.8364 28.1618C29.0863 27.4116 28.6649 26.3942 28.6649 25.3333C28.6649 24.2725 29.0863 23.255 29.8364 22.5049C30.5866 21.7548 31.604 21.3333 32.6649 21.3333C33.7257 21.3333 34.7432 21.7548 35.4933 22.5049C36.2434 23.255 36.6649 24.2725 36.6649 25.3333ZM44.6649 29.3333C44.6649 30.0406 44.3839 30.7188 43.8838 31.2189C43.3837 31.719 42.7055 32 41.9982 32C41.291 32 40.6127 31.719 40.1126 31.2189C39.6125 30.7188 39.3315 30.0406 39.3315 29.3333C39.3315 28.6261 39.6125 27.9478 40.1126 27.4477C40.6127 26.9476 41.291 26.6667 41.9982 26.6667C42.7055 26.6667 43.3837 26.9476 43.8838 27.4477C44.3839 27.9478 44.6649 28.6261 44.6649 29.3333ZM25.9982 29.3333C25.9982 30.0406 25.7173 30.7188 25.2172 31.2189C24.7171 31.719 24.0388 32 23.3315 32C22.6243 32 21.946 31.719 21.4459 31.2189C20.9458 30.7188 20.6649 30.0406 20.6649 29.3333C20.6649 28.6261 20.9458 27.9478 21.4459 27.4477C21.946 26.9476 22.6243 26.6667 23.3315 26.6667C24.0388 26.6667 24.7171 26.9476 25.2172 27.4477C25.7173 27.9478 25.9982 28.6261 25.9982 29.3333Z" stroke="#22C55E" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
)
const MoneyIcon = () => (
    <svg width="65" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.669922" width="64" height="64" rx="32" fill="#DCFCE7" />
        <path d="M32.6699 26.6667C30.4606 26.6667 28.6699 27.86 28.6699 29.3333C28.6699 30.8067 30.4606 32 32.6699 32C34.8793 32 36.6699 33.1933 36.6699 34.6667C36.6699 36.14 34.8793 37.3333 32.6699 37.3333M32.6699 26.6667C34.1499 26.6667 35.4433 27.2027 36.1353 28M32.6699 26.6667V25.3333M32.6699 26.6667V37.3333M32.6699 37.3333V38.6667M32.6699 37.3333C31.1899 37.3333 29.8966 36.7973 29.2046 36M44.6699 32C44.6699 33.5759 44.3595 35.1363 43.7565 36.5922C43.1534 38.0481 42.2695 39.371 41.1552 40.4853C40.0409 41.5996 38.718 42.4835 37.2621 43.0866C35.8062 43.6896 34.2458 44 32.6699 44C31.0941 44 29.5336 43.6896 28.0777 43.0866C26.6218 42.4835 25.2989 41.5996 24.1846 40.4853C23.0703 39.371 22.1864 38.0481 21.5834 36.5922C20.9803 35.1363 20.6699 33.5759 20.6699 32C20.6699 28.8174 21.9342 25.7652 24.1846 23.5147C26.4351 21.2643 29.4873 20 32.6699 20C35.8525 20 38.9048 21.2643 41.1552 23.5147C43.4056 25.7652 44.6699 28.8174 44.6699 32Z" stroke="#22C55E" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
)
const SmileIcon = () => (
    <svg width="65" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.330078" width="64" height="64" rx="32" fill="#DCFCE7" />
        <path d="M36.1007 35.7707C35.1006 36.7705 33.7443 37.3322 32.3301 37.3322C30.9159 37.3322 29.5596 36.7705 28.5594 35.7707M28.3301 29.3333H28.3434M36.3301 29.3333H36.3434M44.3301 32C44.3301 33.5759 44.0197 35.1363 43.4166 36.5922C42.8136 38.0481 41.9297 39.371 40.8154 40.4853C39.7011 41.5996 38.3782 42.4835 36.9223 43.0866C35.4664 43.6896 33.9059 44 32.3301 44C30.7542 44 29.1938 43.6896 27.7379 43.0866C26.282 42.4835 24.9591 41.5996 23.8448 40.4853C22.7305 39.371 21.8466 38.0481 21.2435 36.5922C20.6405 35.1363 20.3301 33.5759 20.3301 32C20.3301 28.8174 21.5944 25.7652 23.8448 23.5147C26.0952 21.2643 29.1475 20 32.3301 20C35.5127 20 38.5649 21.2643 40.8154 23.5147C43.0658 25.7652 44.3301 28.8174 44.3301 32Z" stroke="#22C55E" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
)

export default function Recruitment() {
    //Call API
    const { data, isLoading } = useRecruitment.getRecruitmentPage();
    const navigation = useNavigation();
    const recruitmentRef = useRef(null);
    if (isLoading) {
        return <Loading />
    }

    const handleButtonBanner = () => {
        //TODO:
        recruitmentRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    const content_banner_head = {
        title: data.banner_title,
        description: data.banner_description,
        hasButton: data.is_visible ? true : false,
        contentButton: "Ứng tuyển ngay",
        handleButton: handleButtonBanner
    };
    const content_banner_bottom = {
        title: "Sẵn sàng để gia nhập đội ngũ của chúng tôi",
        description: "Khám phá cơ hội nghề nghiệp tại NewsDaily và trở thành một phần của đội ngũ báo chí hàng đầu.",
        hasButton: true,
        contentButton: "Ứng tuyển ngay",
        handleButton: handleButtonBanner
    }
    return (
        <>
            {navigation.state == 'loading' && <Loading/>}
            <Banner data={content_banner_head} />
            {data.is_visible ? <div className="w-full overflow-x-hidden">
                <div className="container-fluid flex flex-col gap-10">
                    <div>
                        <h2 className="mt-[30px] text-center text-(--dark-green) text-3xl font-bold">
                            Tại sao nên gia nhập Thiên Trúc?
                        </h2>
                    </div>
                    <div>
                        <div className="flex flex-wrap justify-center gap-10 mb-10">
                            <CenterCard data={{ title: "Môi trường làm việc chuyên nghiệp", description: "Làm việc tại cơ sở hiện đại với đầy đủ các trang thiết bị tiện nghi trong ngành.", icon: BuildingIcon }} width="434px" height="218px" />
                            <CenterCard data={{ title: "Cơ hội phát triển", description: "Chúng tôi đầu tư vào sự phát triển của nhân viên thông qua đào tạo, hội thảo và cơ hội thăng tiến.", icon: FlashIcon }} width="434px" height="218px" />
                            <CenterCard data={{ title: "Đội ngũ đa dạng", description: "Làm việc với những người tài năng từ nhiều nền tảng khác nhau, mang đến nhiều góc nhìn và ý tưởng.", icon: MemberIcon }} width="434px" height="218px" />
                        </div>
                        <div className="flex flex-wrap justify-center max-w-4xl m-auto gap-4">
                            <CenterCard data={{ title: "Chế độ đãi ngộ hấp dẫn", description: "Mức lương cạnh tranh, bảo hiểm sức khỏe toàn diện, và các phúc lợi khác để đảm bảo sự hài lòng của nhân viên.", icon: MoneyIcon }} width="434px" height="218px" />
                            <CenterCard data={{ title: "Cân bằng công việc - cuộc sống", description: "Chú trọng đến việc cân bằng giữa công việc và cuộc sống để nhân viên cảm thấy thoải mái và hiệu quả.", icon: SmileIcon }} width="434px" height="218px" />
                        </div>
                    </div>
                    <div className="grid grid-cols-12 py-10 px-10 lg:gap-10 bg-[#F9FAFB] ">
                        <div className="col-span-12 lg:col-span-6 gap-5">
                            <h2 className="text-(--dark-green) text-3xl font-bold">Văn hóa của chúng tôi</h2>
                            <div className="text-[#166534] text-[16px] text-justify">
                                {data.culture_content}
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-6 mt-[30px]">
                            <div className="grid grid-cols-2 gap-10  ">
                                <LazyLoad
                                    height={200}
                                    offset={100}
                                    throttle={100}
                                    once
                                    placeholder={<div className="w-full h-full bg-gray-200 rounded-t-lg overflow-hidden"></div>}
                                    style={{width: '100%', height: '100%'}}
                                >
                                    <img src={data.culture_img_1} alt="" className="w-full h-full object-cover rounded-md"/>
                                </LazyLoad>
                                <LazyLoad
                                    height={200}
                                    offset={100}
                                    throttle={100}
                                    once
                                    placeholder={
                                        <div className="bg-gray-200 w-full h-full rounded-[20px]" />
                                    }
                                    style={{width: '100%', height: '100%'}}
                                >
                                    <img src={data.culture_img_2} alt="" className="w-full h-full object-cover rounded-md"/>
                                </LazyLoad>
                                <LazyLoad
                                    height={200}
                                    offset={100}
                                    throttle={100}
                                    once
                                    placeholder={
                                        <div className="bg-gray-200 w-full h-full rounded-[20px]" />
                                    }
                                    style={{width: '100%', height: '100%'}}
                                >
                                    <img src={data.culture_img_3} alt="" className="w-full h-full object-cover rounded-md"/>
                                </LazyLoad>
                                <LazyLoad
                                    height={200}
                                    offset={100}
                                    throttle={100}
                                    once
                                    placeholder={
                                        <div className="bg-gray-200 w-full h-full rounded-[20px]" />
                                    }
                                    style={{width: '100%', height: '100%'}}
                                >
                                    <img src={data.culture_img_4} alt="" className="w-full h-full object-cover rounded-md"/>
                                </LazyLoad>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-screen mt-10">
                    <Banner data={content_banner_bottom} />
                </div>
                <div ref={recruitmentRef} className="mt-10 mb-[50px] max-w-[731px]  w-full m-auto">
                    <Form data={{ title: "Liên hệ với đội ngũ tuyển dụng", type: "tuyen-dung" }} />
                </div>
            </div>: <ComingSoon/>}
        </>
    )
}