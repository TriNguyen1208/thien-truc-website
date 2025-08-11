import { Link, useNavigate, useNavigation, useParams } from "react-router-dom"
import { EnvironmentOutlined, CalendarOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import BackButton from "../../components/BackButton";
import Banner from "@/components/Banner";
import useProjects from "@/hooks/useProjects";
import Loading from "@/components/Loading";
import LazyLoad from 'react-lazyload'
import renderWithLazyLoad from "../../utils/renderWithLazyLoad";
{/* <ArrowLeftOutlined /> */ }
import ComingSoon from '@/pages/ComingSoon'
export default function ProjectDetail() {
    // Khai bao hooks
    const { id } = useParams();
    const navigate = useNavigate();
    const navigation = useNavigation();
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
            {navigation.state == 'loading' && <Loading />}
            {projectContentData.is_visible ? <div className="bg-[#f9fafb] py-[70px]">
                <div className="max-w-[800px] mx-auto sm:px-[20px]">
                    <BackButton content="Quay lại danh sách dự án"/>
                    <div className="bg-[#FFFFFF] p-6 shadow-[rgba(100,_100,_111,_0.2)_0px_7px_29px_0px] rounded-[20px] mb-[40px]"
                        style={{ boxShadow: 'rgba(100, 100, 111, 0.2) -3px 13px 33px -3px' }}
                    >
                        <div className="text-2xl sm:text-3xl lg:text-4xl font-[700] mb-[15px] break-words">
                            {projectContentData.project.title}
                        </div>
                        <div className="flex flex-col sm:items-center sm:flex-row gap-3">
                            <div>
                                <div
                                    className="max-w-max  text-white px-[17px] pt-[4px] pb-[4px] rounded-full text-sm font-medium  flex items-center justify-center"
                                    style={{ backgroundColor: projectContentData.project.region.rgb_color }}
                                >
                                    {projectContentData.project.region.name}
                                </div>
                            </div>
                            {/* <div className="flex"> */}
                            {projectContentData.project.province && (
                                <div className="flex">
                                    <div className="mr-[5px]">
                                        <EnvironmentOutlined style={{ fontSize: '16px', color: 'var(--green-bg)' }} />
                                    </div>
                                    <div className="mr-[15px]"> {projectContentData.project.province}</div>
                                </div>
                            )}
                            {projectContentData.project.complete_time && (
                                <div className="flex">
                                    <div className="mr-[5px]">
                                        <CalendarOutlined style={{ fontSize: '16px', color: 'var(--green-bg)' }} />
                                    </div>
                                    <div className="mr-[10px]">Hoàn thành {new Date(projectContentData.project.complete_time).toLocaleDateString('vi-VN')}</div>
                                </div>
                            )}
                        </div>
                        {/* </div> */}
                    </div>
                    <div className=" max-w-[800px]  mx-auto bg-[#FFFFFF] p-6 rounded shadow-[rgba(100,_100,_111,_0.2)_0px_7px_29px_0px] rounded-[20px] mb-[50px]"
                        style={{ boxShadow: 'rgba(100, 100, 111, 0.2) -3px 13px 33px -10px' }}
                    >
                        {projectContentData.project.main_img && (
                            <LazyLoad
                                height={200}
                                offset={100}
                                throttle={100}
                                once
                                placeholder={<div className="w-full h-full bg-gray-200 rounded-t-lg overflow-hidden"></div>}
                                style={{ width: '100%', height: '100%' }}
                            >
                                <img className="w-full h-full object-cover mb-[50px]" src={projectContentData.project.main_img} alt="Hình ảnh dự án" />
                            </LazyLoad>)}
                        <div className="break-words">{renderWithLazyLoad(projectContentData.content)}</div>
                    </div>
                    <div className="max-w-[800px]  mx-auto mb-[30px]"
                        style={{ boxShadow: 'rgba(100, 100, 111, 0.2) -3px 13px 33px -10px' }}
                    >
                        <Banner data={data} />
                    </div>
                </div>
            </div>: <ComingSoon/>}
        </>
    )
}
/*
projectContentData.content
*/