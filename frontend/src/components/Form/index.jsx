import React from 'react'
import { useRef, useState } from 'react'
import useContact from '@/redux/hooks/useContact'
import GreenButton from '../GreenButton'
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons"
import contactAPI from "../../services/contact.api"
import recruitmentAPI from "../../services/recruitment.api"
/*
  const data = {
        title: "Tri",
        type: 'lien-he'
    }
*/
const Form = ({ data }) => {
    const {
        title = 'Gửi tin nhắn cho chúng tôi',
        type
    } = data || []
    console.log(title, type)
    const { data: contact, isLoading: isLoadingContact } = useContact.getCompanyInfo();
    const recruitmentRef = useRef(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        title: "",
        content: "",
    })
    if (isLoadingContact) {
        return <>Đang load</>
    }
    const handleChangeDataForm = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    //Hàm này sẽ lấy dữ liệu từ formData sau đó gửi cho backend
    const handleClickSendMessage = async (e) => {
        e.preventDefault();
        console.log(formData);
        var response = null
        if (type == 'lien-he') {
            response = await contactAPI.postContactForm(formData);
        }
        else if (type == 'tuyen-dung') {
            response = await recruitmentAPI.postRecruitmentForm(formData);
        }
        console.log('Đã gửi thành công:', response)

        if (response?.success === true) {
            console.log('Successful')
            // Nếu muốn reset form: setFormData({ name: '', email: '', ... });
        } else {
            console.log('Error')
        }
          setFormData({
          name: '',
          email: '',
          phone: '',
          title: '',
          content: ''
        });

    }
    return (
        <div ref={recruitmentRef}>
            <div className="flex flex-col gap-10 items-center">
                <div className="flex flex-col w-[731px] bg-green-50 px-8 py-8 gap-5">
                    <h2 className="text-(--dark-green) text-3xl font-bold">{title}</h2>
                    <form action="" className="w-full mx-auto bg-[#F0FDF4] flex flex-col gap-5">
                        <div className="flex flex-row gap-10 justify-between">
                            <div className="flex flex-col gap-3 w-[340px]">
                                <label htmlFor="" className="text-sm font-medium text-[#374151]">Họ và tên <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    placeholder="Nguyễn Đức Trí"
                                    className="border border-gray-300 rounded-md px-4 py-3 outline-none text-gray-700 focus:border-gray-500 focus:text-gray-700"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChangeDataForm}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-3 w-[340px]">
                                <label htmlFor="" className="text-sm font-medium text-[#374151]">Email <span className="text-red-500">*</span></label>
                                <input
                                    value={formData.email}
                                    name="email"
                                    onChange={handleChangeDataForm}
                                    type="text"
                                    required
                                    placeholder="ductri0981@gmail.com"
                                    className="border border-gray-300 rounded-md px-4 py-3 outline-none text-gray-700 focus:border-gray-500 focus:text-gray-700" />
                            </div>
                        </div>
                        <div className="flex flex-row gap-10 justify-between">
                            <div className="flex flex-col gap-3 w-[340px]">
                                <label htmlFor="" className="text-sm font-medium text-[#374151]">Số Điện Thoại</label>
                                <input
                                    value={formData.phone}
                                    name="phone"
                                    onChange={handleChangeDataForm}
                                    type="number"
                                    placeholder="0906640981"
                                    className="border border-gray-300 rounded-md px-4 py-3 outline-none text-gray-700 focus:border-gray-500 focus:text-gray-700" />
                            </div>
                            <div className="flex flex-col gap-3 w-[340px]">
                                <label htmlFor="" className="text-sm font-medium text-[#374151]">Tiêu đề <span className="text-red-500">*</span></label>
                                <input
                                    value={formData.title}
                                    name="title"
                                    onChange={handleChangeDataForm}
                                    type="text"
                                    placeholder="Nhập tiêu đề"
                                    required
                                    className="border border-gray-300 rounded-md px-4 py-3 outline-none text-gray-700 focus:border-gray-500 focus:text-gray-700" />
                            </div>

                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="" className="text-sm font-medium text-[#374151]">Nội dung <span className="text-red-500">*</span></label>
                            <textarea
                                value={formData.content}
                                name="content"
                                onChange={handleChangeDataForm}
                                rows={6}
                                type="text"
                                placeholder="Nhập nội dung tin nhắn của bạn"
                                required
                                className="border border-gray-300 rounded-md px-4 py-3 outline-none text-gray-700 focus:border-gray-500 focus:text-gray-700" />

                        </div>
                        <GreenButton content="Gửi tin nhắn" handleClick={handleClickSendMessage} />
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

    )
}

export default Form