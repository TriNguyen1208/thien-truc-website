// components/ProjectsGrid.jsx
import { Link } from 'react-router-dom';
import ItemPost from "@/components/ItemPost";

const ProjectsGrid = ({ projects}) => {

    if (!projects || projects.length === 0) {
        return (
            <div className="container-fluid text-center text-gray-500 my-10">
                <p>Không tìm thấy dự án nào.</p>
            </div>
        );
    }
    return (
        <div className="container-fluid">
            <div className="grid grid-cols-12 gap-5 md:gap-10">
                {(projects || []).map((item, index) => {
                    const complete_time = item.complete_time ? (String(new Date(item.complete_time).toLocaleDateString('vi-VN'))) : null;
                    const dataProject = {
                        type: 'project',
                        title: item?.title ?? "",
                        description: item?.main_content ?? "",
                        location: item?.province ?? "",
                        date: complete_time,
                        tag: item?.region.name ?? "",
                        tagColor: item?.region.rgb_color ?? "",
                        image: item?.main_img ?? "",
                    };
                    return (
                        <Link
                            key={index}
                            to={`/du-an/${item.id}`}
                            className="col-span-12 lg:col-span-4 md:col-span-6 max-md:max-w-[500px] max-md:w-full max-md:mx-auto"
                        >
                            <ItemPost data={dataProject} />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default ProjectsGrid;