import useAboutUs from '@/redux/hooks/useAboutUs'
import Banner from '@/components/Banner'
import Card from '@/components/Card'    
import CenterCard from '@/components/CenterCard'
import Loading from '@/components/Loading'
import useContact from '@/redux/hooks/useContact'
import {CheckCircleOutlined,  UsergroupAddOutlined, LineChartOutlined, WifiOutlined, DollarOutlined} from '@ant-design/icons'
import {useNavigate} from 'react-router-dom'

//Start extra Component 
function ProgressItem({ icon, label, value, percent }) {
  return (
    <div className="mb-[30px] text-[16px]">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2 text-green-700">
          {icon}
          <span>{label}</span>
        </div>
        <span className="font-semibold text-green-800">{value}</span>
      </div>
      <div className="w-full h-2 rounded-full bg-green-100">
        <div
          className="h-full bg-green-600 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function Title({content})
{
    return(
        <h1 className='  font-bold text-[30px] text-[#14532D] '>
            {content}
        </h1>
    )
}
//End extra component


//Main component
export default function AboutUs(){
    const { data: company_info, isLoading: isLoadingContact } = useContact.getCompanyInfo()
    const { data: aboutusPage, isLoading: isLoadingAboutUsPage } = useAboutUs.getAboutUsPage()
    const { data: aboutusServices, isLoading: isLoadingAboutUsServices } = useAboutUs.company_services.getAll()
    const { data: aboutusChoose, isLoading: isLoadingAboutUsChoose } = useAboutUs.why_choose_us.getAll()
    const navigate = useNavigate()
    
    if (isLoadingContact || isLoadingAboutUsPage ||isLoadingAboutUsServices || isLoadingAboutUsChoose) {
        return (<Loading/>);
    }
  
    const bannerMain = {
        title : aboutusPage.banner_title,
        description: aboutusPage.banner_description,
        colorBackground : "var(--gradient-banner)",
        colorText : "#ffffff",
        hasButton : true,
        hasSearch : false,
        contentButton : `Trụ sở chính: ${company_info.main_office.address}`,
        handleButton : ()=>{ window.open(company_info.main_office.googlemaps_url, "_blank")},
        categories : null,
        contentPlaceholder : null
    } 
    const bannerContact = {
        title : 'Sẵn Sàng Hợp Tác Với Chúng Tôi?',
        description: 'Hãy liên hệ ngay để được tư vấn và nhận báo giá miễn phí cho dự án của bạn.',
        colorBackground : "#F0FDF4",
        colorText : "#000000",
        hasButton : true,
        hasSearch : false,
        contentButton : 'Liên Hệ Ngay',
        handleButton : ()=>{ navigate('/lien-he',  { state: { scrollTo: "componentForm" } })},
        categories : null,
        contentPlaceholder : null
    }
    const listProgress = [
        {
            icon: <CheckCircleOutlined/>,
            label: 'Dự án hoàn thành',
            value :'200+',
            percent: 90
        },
        {
            icon: <UsergroupAddOutlined/>,
            label: 'Khách hàng hài lòng',
            value: '98%',
            percent: 76
        },
        {
            icon: <LineChartOutlined/>,
            label: 'Tăng trưởng hàng năm',
            value: '35%',
            percent: 85
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-6">
                            <path d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                            </svg>,
            label: 'Đội ngũ kỹ thuật viên',
            value: '20+',
            percent: 95
        }
                                     
    ]
    const iconTitleService = [
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
        </svg>,

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
        </svg> ,

        <WifiOutlined />,

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
    ]

    const  listValues = [
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
            icon :()=>{
                return( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                </svg>)
            },
            title : 'Đổi Mới',
            des: 'Chúng tôi không ngừng học hỏi, nghiên cứu và áp dụng những công nghệ mới để mang đến những giải pháp tiên tiến.'
        },
        {
            icon : ()=>{
               return( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>)
            },
            title : 'Cam Kết',
            des: 'Chúng tôi cam kết với lời hứa của mình, luôn đảm bảo tiến độ và chất lượng công việc, xây dựng niềm tin với khách hàng.'
        }
    ]
    return (
        <>
            <Banner data = {bannerMain}/>
            {/////////////////////////////////////////////
            }
            <div className='flex flex-grow px-[100px] py-[50px] gap-x-[50px] '>
                <div className='w-[50%]'>
                    <div className='flex flex-col my-[20px]'>
                       <Title content={'Câu Chuyện Của Chúng Tôi'}/>
                    </div>
                    <div className=''>
                       <span className='text-[15px] text-[#166534] leading-[20px] '>
                         {aboutusPage.our_story_content}
                       </span>
                    </div>
                </div>
                <div className=' w-[50%] bg-[#F0FDF4] p-[30px] rounded-[8px] shadow-md hover:scale-[1.05] transition-all duration-300 ease-in-out'>
                    <div className='flex flex-col mb-[20px]'>
                        <Title content = {'Thành Tựu Của Chúng Tôi'}/>
                    </div>
                    <div>
                        {
                            listProgress.map((pro,index) =>{
                                return(
                                    <ProgressItem key = {index} {...pro} />
                                )
                            })
                        }
                    </div>

                </div>
                
            </div>
             {/////////////////////////////////////////////
            }
            <div className='flex flex-col bg-[#F0FDF4] px-[150px] pb-[100px] pt-[50px] ' >
                <div className='flex  justify-center mb-[20px]'>
                    <Title content={'Nhiệm Vụ & Trách Nhiệm'}/>
                </div>
                <div className='flex justify-center mb-[80px] text-center'>
                    <span className='text-[15px] text-[#166534] leading-[20px] w-[60%] '>
                        Chúng tôi cung cấp các dịch vụ lắp đặt và bảo trì thiết bị công nghệ chất lượng cao, đáp ứng mọi nhu cầu của khách hàng.
                    </span>
                </div>
                <div className='grid grid-cols-2 grid-row-2  gap-[30px] justify-center'> 
                        {
                            aboutusServices.map((service, index) =>{
                                return(
                                   <div key = {index} className='mx-auto w-[560px] h-[360px] '>
                                     <Card iconTitle = {iconTitleService[index]} card = {service}/>
                                   </div>
                                )
                            })
                        }
                </div>
            </div>
             {/////////////////////////////////////////////
            }
             <div className='flex flex-col bg-[#ffffff] px-[150px] py-[50px] ' >
                <div className='flex  justify-center mb-[20px]'>
                    <Title content={' Giá Trị Cốt Lõi'}/>
                </div>
                <div className='flex justify-center mb-[80px] text-center'>
                    <span className='text-[15px] text-[#166534] leading-[20px] w-[60%] '>
                        Những giá trị định hướng mọi hoạt động và quyết định của chúng tôi.
                    </span>
                </div>
                <div className='flex flex-row  gap-[30px] justify-center'> 
                        {
                            listValues.map((value, index) =>{
                                return(
                                   <div key = {index} className='w-[264px] h-[290px] text-[#14532D] '>
                                     <CenterCard data={value}/>
                                   </div>
                                )
                            })
                        }
                </div>
            </div>
             {/////////////////////////////////////////////
            }
            <div className='flex flex-col bg-[#157E3C] px-[150px] pb-[100px] pt-[50px] ' >
                <div className='flex  justify-center mb-[20px] !text-white'>
                        <h1 className=' font-bold text-[30px] text-white '>
                            Tại Sao Chọn Thiên Trúc?
                        </h1>
                </div>
                <div className='flex justify-center mb-[80px] text-center'>
                    <span className='text-[15px] text-[#ffffff] leading-[20px] w-[60%] '>
                        Chúng tôi mang đến những giá trị khác biệt để trở thành đối tác lý tưởng cho doanh nghiệp của bạn.
                    </span>
                </div>
                <div className='flex flex-row  gap-[30px] justify-center'> 
                        {
                            aboutusChoose.map((service, index) =>{
                                return(
                                   <div key = {index} className='mx-auto w-[363px] h-[320px] '>
                                     <Card  card = {service}/>
                                   </div>
                                )
                            })
                        }
                </div>
            </div>
             {/////////////////////////////////////////////
            }
            <Banner data = {bannerContact}/>
        </>
    )
}