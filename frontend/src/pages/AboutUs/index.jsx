import useAboutUs from '@/redux/hooks/useAboutUs'
export default function AboutUs(){
    const { data: aboutus, isLoading: isLoadingAboutUs } = useAboutUs.getAll();
    if (isLoadingAboutUs) {
        return <p>Loading...</p>;
    }
    return (
        <>
            <p>{aboutus.about_us_page[0].banner_title}</p>
        </>
    )
}