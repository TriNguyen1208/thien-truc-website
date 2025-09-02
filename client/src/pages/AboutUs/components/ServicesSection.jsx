import SectionTitle from "./SectionTitle";
import useAboutUs from '@/hooks/useAboutUs'
import Card from '@/components/Card'   
import Loading from '@/components/Loading';
import { WifiOutlined } from '@ant-design/icons';

const SecurityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
    </svg>
);

const NetworkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
    </svg>
);

const IoTIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
);

const ICON_TITLE_SERVICE = [
    <SecurityIcon />,
    <NetworkIcon />,
    <WifiOutlined />,
    <IoTIcon />
];

export default function Services() {
    const { data: aboutusServices, isLoading: isLoadingAboutUsServices } = useAboutUs.company_services.getAll();
    if (isLoadingAboutUsServices) {
        return (<Loading />);
    }

    return (
        <section className='flex flex-col bg-[#F0FDF4] p-[24px] lg:p-[36px]' >
            <div className='flex  justify-center mb-[20px]'>
                <SectionTitle>Nhiệm vụ và trách nhiệm</SectionTitle>
            </div>
            <div className='flex justify-center mb-[24px] lg:mb-[36px] text-center'>
                <span className='text-[15px] lg:text-[16px] text-[#166534] leading-[20px] '>
                    Chúng tôi cung cấp các dịch vụ lắp đặt và bảo trì thiết bị công nghệ chất lượng cao, đáp ứng mọi nhu cầu của khách hàng.
                </span>
            </div>
            <div className='grid grid-cols-1 gap-y-[24px] md:grid-cols-2 md:gap-x-[12px] lg:gap-4 xl:px-[48px]'> 
                {
                    aboutusServices.map((service, index) => (
                    <div
                        key={index}
                        className='mx-auto h-fit md:h-[380px] lg:h-[340px] w-full xl:max-w-[600px]'
                    >
                        <Card iconTitle={ICON_TITLE_SERVICE[index]} card={service} />
                    </div>
                ))}
            </div>
        </section>
    );
}