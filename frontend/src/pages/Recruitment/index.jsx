import Banner from "../../components/Banner"
import useRecruitment from "@/redux/hooks/useRecruitment"
import Loading from "@/components/Loading"
import CenterCard from "../../components/CenterCard";
import GreenButton from "../../components/GreenButton";
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons"
import useContact from "@/redux/hooks/useContact"
import { useRef, useState } from "react";
import recruitmentApi from "../../services/recruitment.api";
export default function Recruitment(){
    //Call API
    const {data, isLoading} = useRecruitment.getRecruitmentPage();
    const {data: contact, isLoading: isLoadingContact} = useContact.getCompanyInfo();
    const recruitmentRef = useRef(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        title: "",
        message: "",
    })
    if(isLoading || isLoadingContact){
        return <Loading/>
    }

    const handleButtonBanner = () => {
        //TODO:
        recruitmentRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    const content_banner_head = {
        title: data.banner_title,
        description: data.banner_description,
        hasButton: true,
        contentButton: "Ứng tuyển ngay",
        handleButton: handleButtonBanner 
    };
    const content_banner_bottom = {
        title: "Sẵn sàng để gia nhập đội ngũ của chúng tôi",
        description: "Khám phá cơ hội nghề nghiệp tại NewsDaily và trở thành một phần của đội ngũ báo chí hàng đầu.",
        hasButton: true,
        contentButton: "Ứng tuyển ngay",
        handleButton: handleButtonBanner 
    }
    
    const handleChangeDataForm = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
    const handleClickSendMessage = async (e) => {
        e.preventDefault();
        console.log(formData);
        // const res = await recruitmentApi.postFormRecruitment(formData);
        // if(res.data.message == "Completely"){
        //     setFormData({name: "", email: "", title: "", message: ""});
        // }else{
        //     console.log("Send form failed")
        // }
    }
    return (
        <>
            <Banner data={content_banner_head}/>
            <div className="w-full py-16">
                <div className="container-fluid flex flex-col gap-10">
                    <div>
                        <h2 className="text-center text-(--dark-green) text-3xl font-bold">
                            Tại sao nên gia nhập Thiên Trúc?
                        </h2>
                    </div>
                    <div>
                        <div className="flex flex-wrap justify-center gap-10 mb-10">
                            <CenterCard data={{title: "Môi trường làm việc chuyên nghiệp", description: "Làm việc tại cơ sở hiện đại với đầy đủ các trang thiết bị tiện nghi trong ngành."}} width="434px" height="238px"/>
                            <CenterCard data={{title: "Cơ hội phát triển", description: "Chúng tôi đầu tư vào sự phát triển của nhân viên thông qua đào tạo, hội thảo và cơ hội thăng tiến."}} width="434px" height="238px"/>
                            <CenterCard data={{title: "Đội ngũ đa dạng", description: "Làm việc với những người tài năng từ nhiều nền tảng khác nhau, mang đến nhiều góc nhìn và ý tưởng."}} width="434px" height="238px"/>
                        </div>
                        <div className="flex flex-wrap justify-center max-w-4xl m-auto gap-4">
                            <CenterCard data={{title: "Chế độ đãi ngộ hấp dẫn", description: "Mức lương cạnh tranh, bảo hiểm sức khỏe toàn diện, và các phúc lợi khác để đảm bảo sự hài lòng của nhân viên."}} width="434px" height="238px"/>
                            <CenterCard data={{title: "Cân bằng công việc - cuộc sống", description: "Chú trọng đến việc cân bằng giữa công việc và cuộc sống để nhân viên cảm thấy thoải mái và hiệu quả."}} width="434px" height="238px"/>
                        </div>
                    </div>
                    <div className="flex flex-row py-20 gap-20 bg-[#F9FAFB] justify-center">
                        <div className="flex flex-col max-w-2xl gap-5">
                            <h2 className="text-(--dark-green) text-3xl font-bold">Văn hóa của chúng tôi</h2>
                            <div className="text-[#166534] text-[16px] text-justify">
                                {data.culture_content}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-10">
                            <img src={data.culture_img_1} alt="" className="rounded-md"/>
                            <img src={data.culture_img_2} alt="" />
                            <img src={data.culture_img_3} alt="" />
                            <img src={data.culture_img_4} alt="" />
                        </div>
                    </div>
                    <Banner data={content_banner_bottom}/>
                    <div ref={recruitmentRef}>
                        <div className="flex flex-col gap-10 items-center">
                            <h2 className="text-[#020817] text-3xl font-bold">Liên hệ đội ngũ tuyển dụng</h2>
                            <div className="flex flex-col w-[731px] bg-green-50 px-8 py-8 gap-5">
                                <p className="text-[#4B5563] text-center">
                                    Bạn có câu hỏi về quy trình tuyển dụng hoặc vị trí cụ thể? Hãy liên hệ với đội ngũ tuyển dụng
                                    của chúng tôi.
                                </p>
                                <form action="" className="w-full mx-auto bg-[#F0FDF4] flex flex-col gap-5">
                                    <div className="flex flex-row gap-10 justify-between">
                                        <div className="flex flex-col gap-3 w-[340px]">
                                            <label htmlFor="" className="text-sm font-medium text-[#374151]">Họ và tên</label>
                                            <input 
                                                type="text" 
                                                placeholder="Nhập họ và tên của bạn" 
                                                className="border border-gray-300 rounded-md px-4 py-3 outline-none text-gray-700 focus:border-gray-500 focus:text-gray-700"
                                                name="name"
                                                onChange={handleChangeDataForm}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-3 w-[340px]">
                                            <label htmlFor="" className="text-sm font-medium text-[#374151]">Email</label>
                                            <input 
                                                name="email"
                                                onChange={handleChangeDataForm}
                                                type="text" 
                                                placeholder="Nhập địa chỉ email của bạn" 
                                                className="border border-gray-300 rounded-md px-4 py-3 outline-none text-gray-700 focus:border-gray-500 focus:text-gray-700"/>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <label htmlFor="" className="text-sm font-medium text-[#374151]">Tiêu đề</label>
                                        <input 
                                            name="title"
                                            onChange={handleChangeDataForm}
                                            type="text" 
                                            placeholder="Nhập tiêu đề" 
                                            className="border border-gray-300 rounded-md px-4 py-3 outline-none text-gray-700 focus:border-gray-500 focus:text-gray-700"/>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <label htmlFor="" className="text-sm font-medium text-[#374151]">Nội dung</label>
                                        <textarea 
                                            name="content"
                                            onChange={handleChangeDataForm}
                                            rows={6} 
                                            type="text" 
                                            placeholder="Nhập nội dung tin nhắn của bạn" 
                                            className="border border-gray-300 rounded-md px-4 py-3 outline-none text-gray-700 focus:border-gray-500 focus:text-gray-700"/>

                                    </div>
                                    <GreenButton content="Gửi tin nhắn" handleClick={handleClickSendMessage}/>
                                </form>
                                <div className="p-6 border-t-1 border-gray-200">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                        {/* Email */}
                                        <div className="flex flex-col items-center space-y-2">
                                            <MailOutlined style={{ fontSize: '24px', color: '#22C55E' }} />
                                            <div className="font-semibold">Email</div>
                                            <div className="text-[#4B5563]">{contact.company_email}</div>
                                        </div>

                                        {/* Điện thoại */}
                                        <div className="flex flex-col items-center space-y-2">
                                            <PhoneOutlined style={{ fontSize: '24px', color: '#22C55E' }} />
                                            <div className="font-semibold">Điện thoại</div>
                                            <div className="text-[#4B5563]">{contact.company_phone}</div>
                                        </div>

                                        {/* Địa chỉ */}
                                        <div className="flex flex-col items-center space-y-2">
                                            <EnvironmentOutlined style={{ fontSize: '24px', color: '#22C55E' }} />
                                            <div className="font-semibold">Địa chỉ</div>
                                            <div className="text-[#4B5563] text-sm">
                                                {contact.office_address}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}