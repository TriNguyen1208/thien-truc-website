import React, { useRef, useState } from 'react';
import useContact from '@/redux/hooks/useContact';
import GreenButton from '@/components/GreenButton';
import Loading from '@/components/Loading'; // Import component Loading của bạn
import {
    MailOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
} from '@ant-design/icons';
import contactAPI from '@/services/contact.api';
import recruitmentAPI from '@/services/recruitment.api';
import { Result, Button } from 'antd';

function PopupMessage({ status, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-60">
            <div className="bg-white rounded-lg shadow-lg relative p-8 w-full max-w-[600px]">
                <Result
                    status={status}
                    title={
                        status === "success"
                            ? "Cảm ơn bạn đã liên hệ!"
                            : "Gửi không thành công"
                    }
                    subTitle={
                        status === "success"
                            ? "Chúng tôi đã nhận được thông tin và sẽ phản hồi bạn trong thời gian sớm nhất."
                            : "Đã xảy ra lỗi trong quá trình gửi. Vui lòng thử lại sau."
                    }
                    extra={[
                        <Button type="primary" key="btn" onClick={onClose}>
                            {status === "success" ? "Gửi thêm" : "Thử lại"}
                        </Button>,
                    ]}
                />
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}

const Form = ({ data }) => {
    const [status, setStatus] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false); // Thêm state loading
    const {
        title = 'Gửi tin nhắn cho chúng tôi',
        type,
    } = data || {};
    const { data: contact, isLoading: isLoadingContact } =
        useContact.getCompanyInfo();
    const recruitmentRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        title: '',
        content: '',
    });

    if (isLoadingContact) return (
        <>
            <Loading />
        </>
    )

    const handleChangeDataForm = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleClickSendMessage = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Bắt đầu loading
        let response = null;

        try {
            if (type === 'lien-he') {
                response = await contactAPI.postContactForm(formData);
            } else if (type === 'tuyen-dung') {
                response = await recruitmentAPI.postRecruitmentForm(formData);
            }

            if (response?.success === true) {
                setStatus('success');
            } else {
                setStatus('error');
            }

            setFormData({
                name: '',
                email: '',
                phone: '',
                title: '',
                content: '',
            });
        } catch (error) {
            setStatus('error');
        } finally {
            setIsSubmitting(false); // Kết thúc loading
        }
    };

    // Hiển thị Loading khi đang submit
    if (isSubmitting) {
        return <Loading />;
    }

    return (
        <div ref={recruitmentRef}>
            {(status === 'success' || status === 'error') && (
                <PopupMessage status={status} onClose={() => setStatus(null)} />
            )}


            <div className="flex flex-col gap-10 items-center">
                <div className="flex flex-col w-full bg-green-50 px-8 py-8 gap-5">
                    <h2 className="text-(--dark-green) text-3xl font-bold">{title}</h2>
                    <form action="" className="w-full mx-auto bg-[#F0FDF4] flex flex-col gap-5">
                        <div className="flex flex-row gap-10 justify-between">
                            <div className="flex flex-col gap-3 w-[340px]">
                                <label className="text-sm font-medium text-[#374151]">
                                    Họ và tên <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChangeDataForm}
                                    placeholder="Nguyễn Đức Trí"
                                    required
                                    className="border border-gray-300 rounded-md px-4 py-3 outline-none text-gray-700 focus:border-gray-500"
                                />
                            </div>

                            <div className="flex flex-col gap-3 w-[340px]">
                                <label className="text-sm font-medium text-[#374151]">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChangeDataForm}
                                    placeholder="ductri0981@gmail.com"
                                    required
                                    className="border border-gray-300 rounded-md px-4 py-3 outline-none text-gray-700 focus:border-gray-500"
                                />
                            </div>
                        </div>

                        <div className="flex flex-row gap-10 justify-between">
                            <div className="flex flex-col gap-3 w-[340px]">
                                <label className="text-sm font-medium text-[#374151]">
                                    Số điện thoại
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChangeDataForm}
                                    placeholder="0906640981"
                                    className="border border-gray-300 rounded-md px-4 py-3 outline-none text-gray-700 focus:border-gray-500"
                                />
                            </div>

                            <div className="flex flex-col gap-3 w-[340px]">
                                <label className="text-sm font-medium text-[#374151]">
                                    Tiêu đề <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChangeDataForm}
                                    placeholder="Nhập tiêu đề"
                                    required
                                    className="border border-gray-300 rounded-md px-4 py-3 outline-none text-gray-700 focus:border-gray-500"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-medium text-[#374151]">
                                Nội dung <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChangeDataForm}
                                rows={6}
                                placeholder="Nhập nội dung tin nhắn của bạn"
                                required
                                className="border border-gray-300 rounded-md px-4 py-3 outline-none text-gray-700 focus:border-gray-500"
                            />
                        </div>

                        <GreenButton
                            content="Gửi tin nhắn"
                            handleClick={handleClickSendMessage}
                        />
                    </form>

                    <div className="p-6 border-t-1 border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                            <div className="flex flex-col items-center space-y-2">
                                <MailOutlined style={{ fontSize: '24px', color: '#22C55E' }} />
                                <div className="font-semibold">Email</div>
                                <div className="text-[#4B5563]">{contact.company_email}</div>
                            </div>

                            <div className="flex flex-col items-center space-y-2">
                                <PhoneOutlined style={{ fontSize: '24px', color: '#22C55E' }} />
                                <div className="font-semibold">Điện thoại</div>
                                <div className="text-[#4B5563]">{contact.company_phone}</div>
                            </div>

                            <div className="flex flex-col items-center space-y-2">
                                <EnvironmentOutlined style={{ fontSize: '24px', color: '#22C55E' }} />
                                <div className="font-semibold">Địa chỉ</div>
                                <div className="text-[#4B5563] text-sm">
                                    {/* {contact.office_address} */}
                                    {contact.office_address.map((item, index) => (
                                        <div key = {index}>{item.address} </div>
                                    ))}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;