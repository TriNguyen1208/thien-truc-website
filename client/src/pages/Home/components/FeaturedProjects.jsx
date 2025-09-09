import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import useProjects from "@/hooks/useProjects";
import PostCategory from "@/components/PostCategory";
import ItemPost from "@/components/ItemPost";
import CustomSlider from "./CustomSlider";

// Component hiển thị một dự án
// Tạo dữ liệu cho một dự án
const ProjectItem = (item) => {
    const complete_time = item.complete_time ? String(new Date(item.complete_time).toLocaleDateString('vi-VN')) : null
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
        <Link to={`/du-an/${item.id}`} className="flex w-full justify-center md:w-1/2 lg:w-1/3 flex-shrink-0 px-2">
            <div>
                <ItemPost data={dataProject} />
            </div>
        </Link>
    );
}

export default function FeaturedProjects() {

    // Khởi tạo state cho các tham số tìm kiếm
    const [searchParams, setSearchParams] = useSearchParams();
    const filter = searchParams.get('filter') || '';

    // Lấy danh sách dự án nổi bật
    const { data: highlightProject, isLoading } = useProjects.getHighlightProjects(filter === "Tất cả dự án" ? '' : filter);
    const { data: highlightProjectRegion } = useProjects.project_regions.getAllFeatured();

    // Tạo danh sách các danh mục
    const categoriesData = useMemo(() => {
        const regionNames = (highlightProjectRegion ?? []).map(item => item.name);
        return ["Tất cả dự án", ...regionNames];
    }, [highlightProjectRegion]);

    // ID của danh mục được chọn
    const idSelectedCategories = filter ? categoriesData.findIndex((name) => name === filter) : 0;

    // Xử lý sự kiện khi người dùng chọn một danh mục
    const handleClickPostCategory = (idCategory) => {
        const newFilter = categoriesData[idCategory];
        setSearchParams({ filter: newFilter });
    };

    if (isLoading) return <div className="text-center p-10">Đang tải dự án...</div>;

    // Tạo danh sách các dự án nổi bật
    return (
        <section className="bg-[var(--light-green-banner)] text-center py-[45px] px-[10px] sm:px-[25px]">
            <h2 className="font-[600] text-[35px] text-[var(--dark-green)] mb-[20px]">
                Dự án tiêu biểu
            </h2>
            <div className="mb-[30px] max-w-[70%] mx-auto">
                <PostCategory
                    categories={categoriesData}
                    handleClick={handleClickPostCategory}
                    idCategories={idSelectedCategories}
                />
            </div>
            <CustomSlider
                data={highlightProject}
                renderItem={(item) => <ProjectItem key={item.id} {...item} />}
                itemsPerView={{ mobile: 1, md: 2, lg: 3 }}
            />
        </section>
    );
}
