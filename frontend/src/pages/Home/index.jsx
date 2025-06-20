import useHome from "@/redux/hooks/useHome"
// import useAboutUs from "@/redux/hooks/useAboutUs"
// import useContact from "@/redux/hooks/useContact"
// import useNews from "@/redux/hooks/useNews"
// import useProducts from "@/redux/hooks/useProducts"
// import useProjects from "@/redux/hooks/useProjects"
// import useRecruitment from "@/redux/hooks/useRecruitment"

//Ví dụ chill chill
export default function Home(){

    // const { data: home, isLoading: isLoadingHome } = useHome.getAll();
    // const { data: aboutus, isLoading: isLoadingAboutUs } = useAboutUs.getAll();
    // const { data: contact, isLoading: isLoadingContact } = useContact.getAll();
    // const { data: news, isLoading: isLoadingNews } = useNews.getAll();
    // const {data: product, isLoading: isLoadingProduct} = useProducts.getId(2);
    // const { data: projects, isLoading: isLoadingProjects } = useProjects.getAll();
    // const { data: recruitment, isLoading: isLoadingRecruitment } = useRecruitment.getAll();

    // const isLoading = isLoadingHome || isLoadingAboutUs || isLoadingContact ||
    //                   isLoadingNews || isLoadingProduct || isLoadingProjects || isLoadingRecruitment;
    // if (isLoading) {
    //     return <p>Loading...</p>;
    // }
    // if (!home || !aboutus || !contact || !news || !product || !projects || !recruitment) {
    //     return <p>Dữ liệu chưa sẵn sàng hoặc có lỗi.</p>;
    // }
    // return (
    //     <>
    //         <h1>Welcome to Home Page</h1>
    //         <p>{home.home_page[0].banner_title}</p>
    //         <p>{aboutus.about_us_page[0].banner_title}</p>
    //         <p>{contact.contact_page[0].banner_title}</p>
    //         <p>{news.news_page[0].banner_title}</p>
    //         <p>{product.product[0].name}</p>
    //         <p>{projects.projects_page[0].banner_title}</p>
    //         <p>{recruitment.recruitment_page[0].banner_title}</p>
    //     </>
    // )
    const {data, isLoading} = useHome.highlight_stats_about_us.getOne(1);
    if(isLoading){
        return <>Is Loading...</>
    }
    if (!data) {
        return <>No data available</>; // hoặc null
      }
    return(
        <>
            {data.highlight_stat_with_id[0].number_text}
        </>
    )
}