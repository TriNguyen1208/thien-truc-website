import { Link, useNavigate, useParams } from "react-router-dom"
import { EnvironmentOutlined, CalendarOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Banner from "@/components/Banner";
import useProjects from "@/hooks/useProjects";
import Loading from "@/components/Loading";

{/* <ArrowLeftOutlined /> */ }
export default function ProjectDetail() {
    // Khai bao hooks
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: projectContentData, isLoading: isLoadingProjectContent } = useProjects.project_contents.getOne(id);
    const handleButton = () => {
        navigate("/lien-he", { state: { scrollToForm: true } });
    }
    if (isLoadingProjectContent) {
        return (
            <Loading />
        )
    }
    const data = {
        title: "Quan tâm đến dự án này",
        description: "Liên hệ với chúng tôi để được tư vấn chi tiết về tương tự dự án",
        colorBackground: "var(--light-green-banner)",
        colorText: "#000000",
        hasButton: true,
        contentButton: "Liên hệ tư vấn ngay",
        handleButton: handleButton
    };

    return (
        <>
            <div className="bg-[#f9fafb] py-[70px]">
                <div className="mb-[20px] w-3/4 mx-auto ">
                    <Link to='/du-an'>
                        <ArrowLeftOutlined style={{ fontSize: '16px', color: 'var(--green-bg)' }} />
                        <span className="ml-[10px] text-[var(--green-bg)]">Quay lại danh sách dự án</span>
                    </Link>
                </div>
                <div className="w-3/4 mx-auto bg-[#FFFFFF] p-6 rounded shadow-[rgba(100,_100,_111,_0.2)_0px_7px_29px_0px] rounded-[20px] mb-[40px]"
                    style={{ boxShadow: 'rgba(100, 100, 111, 0.2) -3px 13px 33px -3px' }}
                >
                    <div className="text-4xl font-[700] mb-[15px] break-words">
                        {projectContentData.project.title}
                    </div>
                    <div className="flex items-center">
                        <div>
                            <div
                                className="text-white px-[17px] pt-[4px] pb-[4px] rounded-full text-sm font-medium mr-[19px] flex items-center justify-center"
                                style={{ backgroundColor: projectContentData.project.region.rgb_color }}
                            >
                                {projectContentData.project.region.name}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex">
                                <div className="mr-[5px]">
                                    <EnvironmentOutlined style={{ fontSize: '16px', color: 'var(--green-bg)' }} />
                                </div>
                                <div className="mr-[15px]"> {projectContentData.project.province}</div>
                            </div>
                            <div className="flex">
                                <div className="mr-[5px]">
                                    <CalendarOutlined style={{ fontSize: '16px', color: 'var(--green-bg)' }} />
                                </div>
                                <div className="mr-[10px]">Hoàn thành {projectContentData.project.complete_time}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-3/4 mx-auto bg-[#FFFFFF] p-6 rounded shadow-[rgba(100,_100,_111,_0.2)_0px_7px_29px_0px] rounded-[20px] mb-[50px]"
                    style={{ boxShadow: 'rgba(100, 100, 111, 0.2) -3px 13px 33px -10px' }}
                >
                    <img className="w-full h-full object-cover mb-[50px]" src={projectContentData.project.main_img} alt="Hình ảnh dự án"></img>

                    <div dangerouslySetInnerHTML={{ __html: projectContentData.content }} className="break-words" />
                </div>
                <div className="w-3/4 mx-auto mb-[30px]"
                    style={{ boxShadow: 'rgba(100, 100, 111, 0.2) -3px 13px 33px -10px' }}
                >
                    <Banner data={data} />
                </div>
            </div>
        </>
    )
}
/*
projectContentData.content
*/