import { useRef } from "react";
import { useNavigation } from "react-router-dom";
import useRecruitment from "@/hooks/useRecruitment"
import ComingSoon from '@/pages/ComingSoon'
import Banner from "@/components/Banner"
import Loading from "@/components/Loading"
import Form from "@/components/Form";
import Reason from "./components/Reason";
import Culture from "./components/Culture";

export default function Recruitment() {
    //Call API
    const { data, isLoading } = useRecruitment.getRecruitmentPage();
    const navigation = useNavigation();
    const recruitmentRef = useRef(null);

    if (isLoading) {
        return <Loading />
    }

    const handleButtonBanner = () => {
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
                    <Reason/>
                    <Culture data={data} />
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