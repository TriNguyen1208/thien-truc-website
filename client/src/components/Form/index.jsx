import { useRef, useState } from 'react';
import useContact from '@/hooks/useContact';
import GreenButton from '@/components/GreenButton';
import Loading from '@/components/Loading'; // Import component Loading của bạn
import {
    MailOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
} from '@ant-design/icons';
import contactAPI from '@/services/contact.api';
import recruitmentAPI from '@/services/recruitment.api';
import {toast} from 'react-toastify'

const Form = ({ data }) => {
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

        const formToSubmit = { ...formData };
        if (!formToSubmit.phone.trim()) {
            delete formToSubmit.phone;
        }

        try {
            if (type === 'lien-he') {
                response = await contactAPI.postContactForm(formToSubmit);
            } else if (type === 'tuyen-dung') {
                response = await recruitmentAPI.postRecruitmentForm(formToSubmit);
            }
            
            if (response?.success === true) {
                toast.success(response?.message || "Gửi thành công");
            } else {
                toast.error(response?.message || "Gửi thất bại");
            }

            setFormData({
                name: '',
                email: '',
                phone: '',
                title: '',
                content: '',
            });
        } catch {
            toast.error(response?.message || "Gửi thất bại");
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
            <div className="flex flex-col gap-3 sm:gap-10 items-center">
                <div className="flex flex-col w-full bg-green-50 px-8 py-8 gap-5">
                    <h2 className="text-(--dark-green) text-3xl font-bold">{title}</h2>
                    <form onSubmit={handleClickSendMessage} className="w-full mx-auto bg-[#F0FDF4] flex flex-col gap-5">
                        <div className='grid grid-cols-12 gap-3 sm:gap-8'>
                            <div className="flex flex-col gap-3 col-span-12 sm:col-span-6">
                                <label for="name" className="text-sm font-medium text-[#374151]">
                                    Họ và tên <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChangeDataForm}
                                    placeholder="Đỗ Thanh Tùng"
                                    required
                                    className="border border-gray-300 rounded-md px-4 py-3 outline-none text-gray-700 focus:border-gray-500"
                                />
                            </div>

                            <div className="flex flex-col gap-3 col-span-12 sm:col-span-6">
                                <label for="email" className="text-sm font-medium text-[#374151]">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChangeDataForm}
                                    placeholder="thientruc@gmail.com"
                                    required
                                    className="border border-gray-300 rounded-md px-4 py-3 outline-none text-gray-700 focus:border-gray-500"
                                />
                            </div>

                            <div className="flex flex-col gap-3 col-span-12 sm:col-span-6">
                                <label htmlFor="phone" className="text-sm font-medium text-[#374151]">
                                    Số điện thoại
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    value={formData.phone ? formData.phone : ''}
                                    onChange={handleChangeDataForm}
                                    placeholder="0123456789"
                                    className="border border-gray-300 rounded-md px-4 py-3 outline-none text-gray-700 focus:border-gray-500"
                                />
                            </div>

                            <div className="flex flex-col gap-3 col-span-12 sm:col-span-6">
                                <label htmlFor="title" className="text-sm font-medium text-[#374151]">
                                    Tiêu đề <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={formData.title}
                                    onChange={handleChangeDataForm}
                                    placeholder="Nhập tiêu đề"
                                    required
                                    className="border border-gray-300 rounded-md px-4 py-3 outline-none text-gray-700 focus:border-gray-500"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <label htmlFor="content" className="text-sm font-medium text-[#374151]">
                                Nội dung <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="content"
                                id="content"
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
                            type="submit"
                            // handleClick={handleClickSendMessage}
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
                                <div className="text-[#4B5563]">
                                    {contact.company_phone.map((item, index) => (
                                        <div key={index}>{item} </div>
                                    ))}</div>
                            </div>

                            <div className="flex flex-col items-center space-y-2">
                                <EnvironmentOutlined style={{ fontSize: '24px', color: '#22C55E' }} />
                                <div className="font-semibold">Địa chỉ</div>
                                <div className="text-[#4B5563] text-sm">
                                    {/* {contact.office_address} */}
                                    {contact.office_address.map((item, index) => (
                                        <div key={index}>{item.address} </div>
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