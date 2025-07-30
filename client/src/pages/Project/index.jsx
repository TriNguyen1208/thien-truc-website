import Banner from "@/components/Banner";
import ItemPost from "@/components/ItemPost";
import PostCategory from "@/components/PostCategory";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import useProjects from "@/hooks/useProjects";
import { useState, useEffect } from 'react';
import Paging from "@/components/Paging";
import Loading from "@/components/Loading";

export default function Project() {

    // Khai bao cac hooks
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const pageParam = Number(searchParams.get("page")) || 1;
        setCurrentPage(pageParam);
    }, [searchParams]);

    // Lay params
    var query = searchParams.get('query') || undefined;
    const filter = searchParams.get('filter') || undefined;
    const is_featured = searchParams.get('is_featured') || undefined;
    const page = Number(searchParams.get('page')) || 1;
    const limit = searchParams.get('limit') || undefined;


    // fetch data 
    const { data: projectPageData, isLoading: isLoadingProjectPage } = useProjects.getProjectPage();
    const { data: projectRegionData, isLoading: isLoadingProjectRegion } = useProjects.project_regions.getAll();
    const { data: projectData, isLoading: isLoadingProject } = useProjects.projects.getList(query, filter === "Tất cả dự án" ? undefined : filter, is_featured,  page, limit);
    
    if (isLoadingProjectPage || isLoadingProjectRegion || isLoadingProject) {
        return (
            <Loading />
        )
    }

    // Khai bao bien 
    let categoriesData = projectRegionData.map(item => item.name);
    const categoriesDefault = ["Tất cả dự án"];
    categoriesData = [...categoriesDefault, ...categoriesData];
    const totalProjects = Number(projectData.totalCount);
    const pageSizes = 9;
    const numberPages = Math.ceil(totalProjects / pageSizes);
    const idSelectedCategories = filter ? categoriesData.findIndex((name) => name === filter) : 0;
    const dataPagination = {
        numberPagination: numberPages,
    };

    // Dinh nghia cac ham bat su kien 
    const handleSearchSuggestion = (query, filter) => {
        return useProjects.getSearchSuggestions(query, filter)
    }
    const handleEnter = (id) => {
        navigate(`/du-an/${id}`);
    }
    const handleSearchSubmit = (filter, query) => {
        const newParams = new URLSearchParams();
        newParams.set("query", query);
        newParams.set("filter", filter);
        newParams.set("page", "1");
        setSearchParams(newParams);

    }

    const handlePageChange = (page) => {
        const params = new URLSearchParams();
        if (query) params.set("query", query);
        if (filter && filter !== categoriesDefault[0]) params.set("filter", filter);
        if (page >= 2) params.set('page', page)

        setSearchParams(params);
    };
    const handleClickPostCategory = (idCategory) => {
        const params = new URLSearchParams();
        const nameRegion = categoriesData[idCategory];
        const region = projectRegionData.find(item => item.name === nameRegion);
        query = undefined;
        if (region && region.name != categoriesDefault) {
            params.set("filter", nameRegion);
            
        }
        setSearchParams(params);
      
        
       
    }

    const handleButton = () => {
        navigate('/lien-he');
    }

    const dataBanner = {
        title: projectPageData.banner_title,
        description: projectPageData.banner_description,
        colorBackground: "var(--gradient-banner)",
        colorText: "#ffffff",
        hasSearch: true,
        categories: categoriesData || categoriesDefault,
        contentPlaceholder: "Nhập vào đây",
        value: query,
        idCategories: idSelectedCategories,
        handleButton: handleSearchSubmit,
        handleSearchSuggestion: handleSearchSuggestion,
        handleEnter: handleEnter
    };


    const bannerContactData = {
        title: "Sẵn sàng bắt đầu dự án của bạn",
        description: "Liên hệ với chúng tôi để được tư vấn miễn phí và báo giá chi tiết",
        colorBackground: "var(--light-green-banner)",
        colorText: "#000000",
        hasButton: true,
        contentButton: "Liên hệ tư vấn",
        handleButton: handleButton
    };






    return (
        <>
            <Banner data={dataBanner} />
            <div className="container-fluid">
                <div className="my-[40px] text-center">
                    <h1 className='text-4xl mb-[30px] font-bold'>Công trình tiêu biểu</h1>
                    <div className="mb-[30px] w-[90%] lg:w-[70%] xl:w-[60%] mx-auto">
                        <   PostCategory categories={categoriesData || ["Tất cả dự án"]} handleClick={handleClickPostCategory} idCategories={idSelectedCategories} />
                    </div>
                    <div className="inline-block w-1/2 font-[300]">
                        {projectPageData.banner_description}
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-5 md:gap-10">
                    {(projectData.results || []).map((item, index) => {
                        const complete_time = String(item.complete_time)
                        const dataProject = {
                            type: 'project',
                            title: item?.title ?? "",
                            description: item?.main_content ?? "",
                            location: item?.province ?? "",
                            date: complete_time,
                            tag: item?.region.name ?? "",
                            tagColor: item?.region.rgb_color ?? "",
                            image: item?.main_img ?? "",
                        }
                        return (
                            <Link key={index} to={`/du-an/${item.id}`}
                            className="col-span-12 lg:col-span-4 md:col-span-6"
                            >
                                <div    
                                >
                                    <ItemPost data={dataProject}/>
                                </div>
                            </Link>

                        );
                    })}
                </div>
                <div className="mb-[30px]">
                    <Paging data={dataPagination} onPageChange={handlePageChange} currentPage={currentPage} />
                </div>
            </div>
            <Banner data={bannerContactData} />
        </>
    )
}