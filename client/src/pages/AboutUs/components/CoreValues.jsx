import SectionTitle from "./SectionTitle";
import {UsergroupAddOutlined, DollarOutlined} from '@ant-design/icons'
import CenterCard from '@/components/CenterCard'

const InnovationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
    </svg>
);

const CommitmentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
);

const LIST_VALUES = [
    {
        icon : DollarOutlined ,
        title : 'Chất Lượng',
        des: 'Chúng tôi cam kết mang đến những sản phẩm và dịch vụ chất lượng cao, đáp ứng và vượt trên mong đợi của khách hàng.'
    },
    {
        icon : UsergroupAddOutlined ,
        title : 'Hợp Tác',
        des: 'Chúng tôi tin vào sức mạnh của sự hợp tác, làm việc cùng nhau để tạo ra những giải pháp tốt nhất cho khách hàng.'
    },
    {
        icon: InnovationIcon,
        title: 'Đổi Mới',
        des: 'Chúng tôi không ngừng học hỏi, nghiên cứu và áp dụng những công nghệ mới để mang đến những giải pháp tiên tiến.'
    },
    {
        icon: CommitmentIcon,
        title: 'Cam Kết',
        des: 'Chúng tôi cam kết với lời hứa của mình, luôn đảm bảo tiến độ và chất lượng công việc, xây dựng niềm tin với khách hàng.'
    }
]

export default function CoreValues() {
    return (
        <section className='flex flex-col bg-[#ffffff] p-[24px] lg:p-[48px]'>
            <div className='flex justify-center mb-[12px]'>
                <SectionTitle>Giá trị cốt lõi</SectionTitle>
            </div>
            <div className='flex justify-center mb-[24px] text-center xl:mb-[48px]'>
                <span className='text-[15px] lg:text-[16px] text-[#166534] leading-[20px]'>
                    Những giá trị định hướng mọi hoạt động và quyết định của chúng tôi.
                </span>
            </div>
            <div className='grid grid-cols-1 xl:justify-items-center gap-y-[24px] md:grid-cols-2 md:gap-[24px] lg:px-[48px] xl:px-4 xl:grid-cols-4'>
                {LIST_VALUES.map((value, index) => (
                    <div
                        key={index}
                        className={`text-[#14532D] overflow-hidden p-[2px] ${index % 2 === 0 ? 'lg:justify-self-end' : 'lg:justify-self-start'}`}
                    >
                        <CenterCard data={value} />
                    </div>
                ))}
            </div>
        </section>
    )
}