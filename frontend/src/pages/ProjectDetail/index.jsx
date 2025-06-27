import { Link, useNavigate, useParams } from "react-router-dom"
import project from "../../services/projects.api"
import { useEffect, useState } from "react";
import {
    EnvironmentOutlined,
    CalendarOutlined,
    ArrowLeftOutlined,
} from '@ant-design/icons';
import Banner from "../../components/Banner";
{/* <ArrowLeftOutlined /> */ }
export default function ProjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [dataProjectDetail, setDataProjectDetail] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const data = await project.projects.getOne(id);
            setDataProjectDetail(data);
        }
        fetchData();
    }, [])
    console.log(dataProjectDetail);
    const htmlContent = "<b>Xin chào</b>, <i>React!</i>";
    //Cái này là của whiteButton
    const handleButton = () => {
        navigate('/lien-he')
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
                <div className="mb-[20px] w-1/2 mx-auto ">
                    <Link to='/du-an'>
                        <ArrowLeftOutlined style={{ fontSize: '16px', color: 'var(--green-bg)' }} />
                        <span className="ml-[10px] text-[var(--green-bg)]">Quay lại danh sách dự án</span>
                    </Link>
                </div>
                <div className="w-1/2 mx-auto bg-[#FFFFFF] p-6 rounded shadow-[rgba(100,_100,_111,_0.2)_0px_7px_29px_0px] rounded-[20px] mb-[40px]"
                    style={{ boxShadow: 'rgba(100, 100, 111, 0.2) -3px 13px 33px -3px' }}
                >
                    <div className="text-4xl font-[700] mb-[15px]">
                        Khu do thi
                    </div>
                    <div className="flex items-center">
                        <div>
                            <div
                                className="text-white px-[17px] pt-[7px] pb-[4px] rounded-full text-sm font-medium mr-[19px]"
                                style={{ backgroundColor: 'rgb(255, 61, 48)' }}
                            >
                                Miền Bắc
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex">
                                <div className="mr-[10px]">
                                    <EnvironmentOutlined style={{ fontSize: '16px', color: 'var(--green-bg)' }} />
                                </div>
                                <div className="mr-[10px]"> Long bien, Ha Noi</div>
                            </div>
                            <div className="flex">
                                <div className="mr-[10px]">
                                    <CalendarOutlined style={{ fontSize: '16px', color: 'var(--green-bg)' }} />
                                </div>
                                <div className="mr-[10px]">Hoan thanh 2023</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 mx-auto bg-[#FFFFFF] p-6 rounded shadow-[rgba(100,_100,_111,_0.2)_0px_7px_29px_0px] rounded-[20px] mb-[50px]"
                    style={{ boxShadow: 'rgba(100, 100, 111, 0.2) -3px 13px 33px -10px' }}
                >
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                </div>
                <div className="w-1/2 mx-auto mb-[30px]"
                    style={{ boxShadow: 'rgba(100, 100, 111, 0.2) -3px 13px 33px -10px' }}
                >
                    <Banner data={data} />
                </div>
            </div>
        </>
    )
}