import useAboutUs from '@/hooks/useAboutUs';
import useContact from '@/hooks/useContact';
import Banner from '@/components/Banner';
import Loading from '@/components/Loading';
import StoryAndAchievement from './components/StoryAndAchievement';
import Services from './components/ServicesSection';
import CoreValues from './components/CoreValues';
import WhyChooseUs from './components/WhyChooseUs';
import ContactBanner from './components/ContactBanner';
import ComingSoon from '@/pages/ComingSoon';
import { useNavigation } from 'react-router-dom';


export default function AboutUs() {
    const { data: aboutusPage, isLoading: isLoadingAboutUsPage } = useAboutUs.getAboutUsPage();
    const { data: company_info, isLoading: isLoadingContact } = useContact.getCompanyInfo();
    const navigation = useNavigation();

    if (isLoadingContact || isLoadingAboutUsPage) {
        return (<Loading />);
    }
    
    const bannerMain = {
        title : aboutusPage.banner_title,
        description: aboutusPage.banner_description,
        colorBackground : "var(--gradient-banner)",
        colorText : "#ffffff",
        hasButton: aboutusPage.is_visible ? true : false,
        hasSearch : false,
        contentButton : `Trụ sở chính: ${company_info.main_office.address}`,
        handleButton : ()=>{ window.open(company_info.main_office.googlemaps_url, "_blank")},
        categories : null,
        contentPlaceholder : null
    } 
    return (
        <div className='w-full'>
            {navigation.state === 'loading' && <Loading />}
            <Banner data={bannerMain} />
            {aboutusPage.is_visible ? (
                <>
                    <StoryAndAchievement storyContent={aboutusPage.our_story_content} />
                    <Services />
                    <CoreValues />
                    <WhyChooseUs />
                    <ContactBanner />
                </>
            ) : (
                <ComingSoon />
            )}
        </div>
    );
}