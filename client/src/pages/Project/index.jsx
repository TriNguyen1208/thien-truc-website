import { useState, useEffect, useRef } from 'react';
import { useNavigate, useNavigation, useSearchParams } from 'react-router-dom';
import useProjects from "@/hooks/useProjects";
import ComingSoon from '@/pages/ComingSoon';
import Banner from "@/components/Banner";
import Paging from "@/components/Paging";
import Loading from "@/components/Loading";
import ProjectsGrid from './components/ProjectGrid';
import ProjectsToolbar from './components/ProjectToolbar';


export default function Project() {
    // Khai bao cac hooks
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const navigation = useNavigation();
    const scrollTargetRef = useRef(null);
    useEffect(() => {
        const pageParam = Number(searchParams.get("page")) || 1;
        setCurrentPage(pageParam);
    }, [searchParams]);

    // Lay params
    const query = searchParams.get('query') || undefined;
    const filter = searchParams.get('filter') || undefined;
    const is_featured = searchParams.get('is_featured') || undefined;
    const page = Number(searchParams.get('page')) || 1;
    const limit = searchParams.get('limit') || undefined;

    // fetch data 
    const { data: projectPageData, isLoading: isLoadingProjectPage } = useProjects.getProjectPage();
    const { data: projectRegionData, isLoading: isLoadingProjectRegion } = useProjects.project_regions.getAll();
    const { data: projectData, isLoading: isLoadingProject } = useProjects.projects.getList(query, filter === "Tất cả dự án" ? undefined : filter, is_featured, page, limit);

    if (isLoadingProjectPage || isLoadingProjectRegion)
        return <Loading />;

    // Khai bao bien 
    const categoriesDefault = ["Tất cả dự án"];
    let categoriesData = projectRegionData.map(item => item.name);
    categoriesData = [...categoriesDefault, ...categoriesData];
    const totalProjects = Number(projectData?.totalCount || 0);
    const pageSizes = 9;
    const numberPages = Math.ceil(totalProjects / pageSizes);
    const idSelectedCategories = filter ? 
    categoriesData.findIndex((name) => name === filter) 
    : (categoriesData.findIndex((name) => name === "Miền Nam") === -1 ? 0: categoriesData.findIndex((name) => name === "Miền Nam"));
    const dataPagination = {
        numberPagination: numberPages,
    };

    // Handlers
    const handleEnter = (id) => {
        navigate(`/du-an/${id}`);
    }
    const handleSearchSubmit = (filter, query) => {
        const newParams = new URLSearchParams();
        newParams.set("query", query ? query : "");
        newParams.set("filter", filter);
        newParams.set("page", "1");
        setSearchParams(newParams);
        setTimeout(() => {
            scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 0);
    }

    const handlePageChange = (page) => {
        const params = new URLSearchParams();
        if (query) params.set("query", query);
        if (filter && filter !== categoriesDefault[0]) params.set("filter", filter);
        if (page >= 2) params.set('page', page);

        setSearchParams(params);
        setTimeout(() => {
            scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 0);
    };

    const handleClickPostCategory = (idCategory) => {
        const params = new URLSearchParams();
        const nameRegion = categoriesData[idCategory];
        const region = projectRegionData.find(item => item.name === nameRegion);
        
        if (region && region.name !== categoriesDefault[0]) {
            params.set("filter", nameRegion);
        }
        if(query)
            params.set("query", query)
        setSearchParams(params);
        setTimeout(() => {
            scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 0);
    }

    const handleButton = () => {
        navigate('/lien-he');
    }

    const handleSearchSuggestion = (query, filter, is_published) => {
        return useProjects.getSearchSuggestions(query, filter === 'Tất cả dự án' ? undefined : filter);
    };
    const bannerData = {
        title: projectPageData.banner_title,
        description: projectPageData.banner_description,
        colorBackground: "var(--gradient-banner)",
        colorText: "#ffffff",
        hasSearch: projectPageData.is_visible ? true : false,
        categories: categoriesData || categoriesDefault,
        contentPlaceholder: "Nhập vào đây",
        currentQuery: query,
        currentCategory: categoriesData[idSelectedCategories],
        handleButton: handleSearchSubmit,
        handleSearchSuggestion: handleSearchSuggestion,
        handleEnter: handleEnter,
        scrollTargetRef: scrollTargetRef
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
            {navigation.state === 'loading' && <Loading />}
            <Banner data={bannerData} />
            {projectPageData.is_visible ? (
                <div>
                    <ProjectsToolbar
                        categories={categoriesData}
                        idSelectedCategories={idSelectedCategories}
                        handleClick={handleClickPostCategory}
                        scrollTargetRef={scrollTargetRef}
                    />
                    <ProjectsGrid
                        projects={projectData?.results}
                        isLoading={isLoadingProject}
                    />
                    <div className="mb-[30px] container-fluid">
                        <Paging
                            data={dataPagination}
                            onPageChange={handlePageChange}
                            currentPage={currentPage}
                        />
                    </div>
                    <Banner data={bannerContactData} />
                </div>
            ) : (
                <ComingSoon />
            )}
        </>
    );
}
