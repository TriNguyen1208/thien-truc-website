import SectionTitle from "./SectionTitle";
import ProgressItem from "./ProgressItem";
import { CheckCircleOutlined, UsergroupAddOutlined, LineChartOutlined } from '@ant-design/icons';

// Icon SVG được tách ra thành component riêng cho sạch sẽ
const TechnicianIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-6">
        <path d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
    </svg>
);

const LIST_PROGRESS = [
    { icon: <CheckCircleOutlined />, label: 'Dự án hoàn thành', value: '200+', percent: 90 },
    { icon: <UsergroupAddOutlined />, label: 'Khách hàng hài lòng', value: '98%', percent: 76 },
    { icon: <LineChartOutlined />, label: 'Tăng trưởng hàng năm', value: '35%', percent: 85 },
    { icon: <TechnicianIcon />, label: 'Đội ngũ kỹ thuật viên', value: '20+', percent: 95 }
];

export default function StoryAndAchievementsSection({ storyContent }) {
    return (
        <section className='grid grid-cols-1 sm:p-8 my-[24px] p-2 gap-y-16 md:grid-cols-2 md:gap-x-[24px] lg:p-[40px] lg:gap-x-[50px] xl:px-[120px] xl:py-[40px] xl:gap-x-[100px]'>
            {/* Our Story */}
            <div className='p-[8px]'>
                <div className='flex flex-col my-[8px]'>
                    <SectionTitle>Câu chuyện của chúng tôi</SectionTitle>
                </div>
                <p className='text-[14px] lg:text-[16px] text-[#166534]'>
                    {storyContent}
                </p>
            </div>

            {/* Achievements */}
            <div className='p-[8px] h-fit bg-[#F0FDF4] rounded-[8px] shadow-md hover:scale-[1.05] transition-all duration-300 ease-in-out'>
                <div className='flex flex-col p-[8px]'>
                    <SectionTitle>Thành tựu của chúng tôi</SectionTitle>
                </div>
                <div className='p-[8px] xl:p-[24px]'>
                    {LIST_PROGRESS.map((pro, index) => (
                        <ProgressItem key={index} {...pro} />
                    ))}
                </div>
            </div>
        </section>
    );
}