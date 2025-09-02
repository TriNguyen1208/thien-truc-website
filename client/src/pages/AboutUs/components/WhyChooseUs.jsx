import SectionTitle from "./SectionTitle";
import Card from "@/components/Card";
import Loading from '@/components/Loading';
import useAboutUs from '@/hooks/useAboutUs'

export default function WhyChooseUsSection() {
    const { data: aboutusChoose, isLoading: isLoadingAboutUsChoose } = useAboutUs.why_choose_us.getAll()
    if (isLoadingAboutUsChoose) {
        return <Loading />;
    }

    return (
        <section className='flex flex-col bg-[#157E3C] p-[24px]'>
            <div className='flex justify-center mb-[20px] !text-white'>
                <SectionTitle className="text-white">Tại sao chọn Thiên Trúc?</SectionTitle>
            </div>
            <div className='flex justify-center mb-[24px] text-center'>
                <span className='text-[14px] lg:text-[16px] text-[#ffffff]'>
                    Chúng tôi mang đến những giá trị khác biệt để trở thành đối tác lý tưởng cho doanh nghiệp của bạn.
                </span>
            </div>
            <div className='grid grid-cols-1 justify-items-center gap-y-[24px] lg:grid-cols-2 lg:p-[32px] xl:grid-cols-4 lg:gap-[24px] xl:gap-4'>
                {aboutusChoose.map((reason, index) => (
                    <div
                        key={index}
                        className={`h-fit lg:h-[350px] lg:w-[330px] xl:w-full md:max-w-[600px] w-full ${index % 2 === 0 ? 'lg:justify-self-end' : 'lg:justify-self-start'}`}
                    >
                        <Card card={reason} />
                    </div>
                ))}
            </div>
        </section>
    );
}