import { useLocation, useNavigation } from 'react-router-dom';
import { useRef, useEffect } from 'react'
import useContact from "@/hooks/useContact";
import ComingSoon from '@/pages/ComingSoon'
import Banner from "@/components/Banner";
import Loading from "@/components/Loading";
import Map from "./components/Map";
import ContactUs from "./components/ContactUs";
import SupportAgents from "./components/SupportAgents";

export default function Contact() {
    const { data: dataAll, isLoading: isLoadingDataAll } = useContact.getAll();
    const location = useLocation();
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
    const dataBanner = {
        title: contactPageData.banner_title,
        description: contactPageData.banner_description,
        colorBackground: "var(--gradient-banner)",
        colorText: "#ffffff",
        hasButton: contactPageData.is_visible ? true : false,
        contentButton: "Liên hệ ngay",
        handleButton: handleButton
    };

    return (
        <>
            {navigation.state == 'loading' && <Loading />}
            <Banner data={dataBanner} />
            {dataAll.contact_page.is_visible ? 
            <div>
                <SupportAgents supportAgentsData={dataAll.support_agents} />
                <div ref={sectionRef} >
                    <ContactUs companyInfoData={dataAll.company_info} />
                </div >
                <Map data={dataAll.company_info} />
            </div>: <ComingSoon/>}
        </>
    )
}
