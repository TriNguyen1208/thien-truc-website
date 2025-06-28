import Banner from "@/components/Banner";
import ItemPost from "../../components/ItemPost";
import PostCategory from "../../components/PostCategory";
import project from "../../services/projects.api"
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import ViewMoreButton from "../../components/ViewMoreButton";
import useProjects from "../../redux/hooks/useProjects"
export default function Project() {
    const handleButton = (category, query) => {
        console.log(category, query);
    }
    const handleSearchSuggestion = (query, filter) => {
        return useProjects.getSearchSuggestions(query, filter)
    }
    const { data: projectPageData, isLoading: isLoadingProjectPage } = useProjects.getProjectPage();
    const { data: projectRegionData, isLoading: isLoadingProjectRegion } = useProjects.project_regions.useGetAll();


    const [showAll, setShowAll] = useState(false);
    const navigate = useNavigate();
    const [bannerData, setBannerData] = useState(null);
    var [projectData, setProjectData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const dataAll = await project.getAll();
            console.log(dataAll);
            setBannerData(dataAll.project_page);
            setProjectData(dataAll.projects);

        }
        fetchData();
    }, [])
    if (projectData) {
        // TODO: delete projectData
        var visibleProject = showAll ? projectData : projectData.slice(0, 6)
    }
    if (isLoadingProjectPage || isLoadingProjectRegion) {
        return (
            <>
                Dang loading
            </>
        )
    }
    let categoriesData = projectRegionData.map(item => item.name);
    const categoriesDefault = ["Tất cả dự án"];
    categoriesData = [...categoriesDefault, ...categoriesData];
    console.log(categoriesData);
    const data = {
        title: projectPageData.banner_title,
        description: projectPageData.banner_description,
        colorBackground: "var(--gradient-banner)",
        colorText: "#ffffff",
        hasSearch: true,
        categories: categoriesData || categoriesDefault,
        contentPlaceholder: "Nhập vào đây",
        handleButton: handleButton,
        handleSearchSuggestion: handleSearchSuggestion
    };

    const handleClick1 = (category) => {
        console.log(category)
    }
    const handleClick2 = () => {
        console.log("hello world");
    }
    //Cái này là của whiteButton
    const handleBannerContact = () => {
        navigate("/lien-he")
    }
    const handleShowAll = () => {
        setShowAll(!showAll)
    }
    const bannerContactData = {
        title: "Sẵn sàng bắt đầu dự án của bạn",
        description: "Liên hệ với chúng tôi để được tư vấn miễn phí và báo giá chi tiết",
        colorBackground: "var(--light-green-banner)",
        colorText: "#000000",
        hasButton: true,
        contentButton: "Liên hệ tư vấn",
        handleButton: handleBannerContact
    };
    // return (
    //     <>
    //         <Banner data={data}/>
    //         <p>Đây là trang Home.</p>
    //     </>
    // )

    return (
        <>
            <Banner data={data} />
            <div className="container-fluid">
                <div className="my-[40px] text-center">
                    <h1 className='text-4xl mb-[30px] font-bold'>Công trình tiêu biểu</h1>
                    <div className="mb-[30px]">
                        <   PostCategory categories={categoriesData || ["Tất cả dự án"]} handleClick={handleClick1} />
                    </div>
                    <div className="inline-block w-1/2 font-[300]">
                        {bannerData?.banner_description ?? ""}
                    </div>
                </div>
                <div className="flex flex-wrap justify-center">
                    {(visibleProject || []).map((item, index) => {
                        item.complete_time = String(item.complete_time)
                        const dataProject = {
                            type: 'project',
                            title: item?.title ?? "",
                            description: item?.main_content ?? "",
                            location: item?.province ?? "",
                            date: item?.complete_time ?? "",
                            tag: item?.region.name ?? "",
                            tagColor: item?.region.rgb_color ?? "",
                            image: item?.main_img ?? "",
                            handleClick: handleClick2
                        }
                        return (
                            <Link key={index} to={`/du-an/${item.id}`}>
                                <div className="mr-[30px] mb-[30px] w-[437px]">
                                    <ItemPost data={dataProject} />
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <div className="text-center my-[50px]">
                    <ViewMoreButton content={showAll ? "Thu gọn" : "Xem tất cả dự án"} handleClick={handleShowAll} />
                </div>
            </div>
            <Banner data={bannerContactData} />
        </>
    )
}