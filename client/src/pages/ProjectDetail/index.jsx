import { useParams, useNavigate, useNavigation } from "react-router-dom";
import { EnvironmentOutlined, CalendarOutlined } from "@ant-design/icons";
import BackButton from "@/components/BackButton";
import Banner from "@/components/Banner";
import useProjects from "@/hooks/useProjects";
import Loading from "@/components/Loading";
import LazyLoad from "@/components/LazyLoad";
import renderWithLazyLoad from "@/utils/renderWithLazyLoad";
import ComingSoon from "@/pages/ComingSoon";

export default function ProjectDetail() {
  // Hooks
  const { id } = useParams();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const {data: projectContentData, isLoading: isLoadingProjectContent} = useProjects.project_contents.getOne(id);

  // Handler
  const handleContactClick = () => {
    navigate("/lien-he", { state: { scrollToForm: true } });
  };

  // Loading state
  if (isLoadingProjectContent) {
    return <Loading />;
  }

  const { project, content } = projectContentData;

  const bannerData = {
    title: "Quan tâm đến dự án này",
    description: "Liên hệ với chúng tôi để được tư vấn chi tiết về dự án tương tự",
    colorBackground: "var(--light-green-banner)",
    colorText: "#000000",
    hasButton: true,
    contentButton: "Liên hệ tư vấn ngay",
    handleButton: handleContactClick,
  };

  return (
    <>
      {navigation.state === "loading" && <Loading />}
      {projectContentData?.is_visible ? (
      <div className="bg-[#f9fafb] py-[70px]">
        <div className="max-w-[800px] mx-auto sm:px-[20px]">
          <BackButton content="Quay lại danh sách dự án" />

          {/* Thông tin dự án */}
          <div className="bg-white p-6 rounded-[20px] mb-[40px] shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-[15px] break-words">
              {project.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              {/* Region */}
              <span
                className="max-w-max text-white px-[17px] py-[4px] rounded-full text-sm font-medium flex items-center justify-center"
                style={{ backgroundColor: project.region.rgb_color }}
              >
                {project.region.name}
              </span>

              {/* Province */}
              {project.province && (
                <div className="flex items-center">
                  <EnvironmentOutlined
                    style={{ fontSize: 16, color: "var(--green-bg)" }}
                  />
                  <span className="ml-2">{project.province}</span>
                </div>
              )}

              {/* Completion time */}
              {project.complete_time && (
                <div className="flex items-center">
                  <CalendarOutlined
                    style={{ fontSize: 16, color: "var(--green-bg)" }}
                  />
                  <span className="ml-2">
                    Hoàn thành{" "}
                    {new Date(project.complete_time).toLocaleDateString("vi-VN")}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Nội dung dự án */}
          <div className="bg-white p-6 rounded-[20px] mb-[50px] shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]">
            {project.main_img && (
              <LazyLoad
                height={200}
                offset={100}
                throttle={100}
                once
                placeholder={
                  <div className="w-full h-full bg-gray-200 rounded-t-lg overflow-hidden"></div>
                }
              >
                <img
                  className="w-full h-full object-cover mb-[50px]"
                  src={project.main_img}
                  alt="Hình ảnh dự án"
                />
              </LazyLoad>
            )}
            <div className="break-words">{renderWithLazyLoad(content)}</div>
          </div>

          {/* Banner CTA */}
          <div className="max-w-[800px] mx-auto mb-[30px]">
            <Banner data={bannerData} />
          </div>
        </div>
      </div>
      ) : (
        <ComingSoon />
      )}
    </>
  );
}
