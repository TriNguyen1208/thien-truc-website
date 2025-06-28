import Banner from "@/components/Banner";
import ItemPost from "../../components/ItemPost";
import PostCategory from "../../components/PostCategory";
import { useState } from "react";
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
    // TEST 
    const {data: dataAll, isLoading: isDataAll} = useProjects.getAll();
    const { data: projectPageData, isLoading: isLoadingProjectPage } = useProjects.getProjectPage();
    const { data: projectRegionData, isLoading: isLoadingProjectRegion } = useProjects.project_regions.useGetAll();
    const { data: projectData, isLoading: isLoadingProject } = useProjects.projects.useGetAll();
    const { data: regionData, isLoading: isLoadingRegion } = useProjects.projects.useGetByRegion('Miền Bắc');
 
    const [showAll, setShowAll] = useState(false);
    const navigate = useNavigate();
   
    if (isLoadingProjectPage || isLoadingProjectRegion || isLoadingProject ) {
        return (
            <>
                Dang loading
            </>
        )
    }
    // TEST 
    console.log(dataAll);
    console.log(regionData);
    console.log(projectData);
    // TODO: delete projectData, fix 0 - 6
    var visibleProject = showAll ? projectData : projectData.slice(0, 6)
    console.log("=============")
    console.log(typeof visibleProject, visibleProject)
    console.log("=============")
    let categoriesData = projectRegionData.map(item => item.name);
    const categoriesDefault = ["Tất cả dự án"];
    categoriesData = [...categoriesDefault, ...categoriesData];
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
                        {projectPageData.banner_description}
                    </div>
                </div>
                <div className="flex flex-wrap gap-[30px]">
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
                            <Link key={index} to={`/du-an/${item.id}`}
                                style = {{width: 'calc(100% / 3 - 20px)'}}
                            >
                                <div className=" mb-[30px]"
                                    style = {{width: '100%'}}
                                    >
                                    <ItemPost data={dataProject} />
                                </div>
                            </Link>
                            
                        );
                    })}
                    {/* ===== TEST =======  */}
                    {/* {visibleProject && visibleProject.length > 0 && (
                        (() => {
                            const item = visibleProject[0]; // test phần tử đầu tiên

                            item.complete_time = String(item.complete_time);
                            const dataProject = {
                                type: 'project',
                                title: item?.title ?? "",
                                description: item?.main_content ?? "",
                                location: item?.province ?? "",
                                date: item?.complete_time ?? "",
                                tag: item?.region?.name ?? "",
                                tagColor: item?.region?.rgb_color ?? "",
                                image: item?.main_img ?? "",
                                handleClick: handleClick2
                            };

                            return (
                                <>
                                
                                <Link key={item.id} to={`/du-an/${item.id}`} style={{ width: 'calc((100% / 3) - 30px)' }}>
                                    <div className="mb-[30px]" style={{ width: '100%' }}>
                                        <ItemPost data={dataProject} />
                                    </div>
                                </Link>
                                <Link key={item.id} to={`/du-an/${item.id}`} style={{ width: 'calc((100% / 3) - 30px)' }}>
                                    <div className="mb-[30px]" style={{ width: '100%' }}>
                                        <ItemPost data={dataProject} />
                                    </div>
                                </Link>
                                <Link key={item.id} to={`/du-an/${item.id}`} style={{ width: 'calc((100% / 3) - 30px)' }}>
                                    <div className="mb-[30px]" style={{ width: '100%' }}>
                                        <ItemPost data={dataProject} />
                                    </div>
                                </Link>
                                <Link key={item.id} to={`/du-an/${item.id}`} style={{ width: 'calc((100% / 3) - 30px)' }}>
                                    <div className="mb-[30px]" style={{ width: '100%' }}>
                                        <ItemPost data={dataProject} />
                                    </div>
                                </Link>
                                </>
                            );
                        })()
                    )} */}
                    {/* ===== END TEST =======  */}
                </div>
                <div className="text-center my-[50px]">
                    <ViewMoreButton content={showAll ? "Thu gọn" : "Xem tất cả dự án"} handleClick={handleShowAll} />
                </div>
            </div>
            <Banner data={bannerContactData} />
        </>
    )
}