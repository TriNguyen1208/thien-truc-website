import { PhoneIcon, EmailIcon, LocationIcon, TimeIcon, FacebookIcon, TaxIcon } from '@/components/Icon'
import Form from "@/components/Form";

// Hàm custom mỗi line custom theo type = "" / address / fanpage
const Contact_Section = ({ data, type = "" }) => {
    const content = (
        <div className="flex items-center gap-5">
            <div className="w-12">
                {data.icon}
            </div>
            <div>
                <div>{data.label}</div>

                {/* Nếu không phải fanpage thì check value */}
                {type !== "fanpage" && (
                    Array.isArray(data?.value) ? (
                        <div>
                            {data.value.map((item, index) =>
                                type === "address" ? (
                                    <a
                                        key={index}
                                        href={item.googlemaps_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm hover:underline"
                                    >
                                        <div className="font-inherit text-[16px]">
                                            {item.address}
                                        </div>
                                    </a>
                                ) : (
                                    <div key={index}>{item}</div>
                                )
                            )}
                        </div>
                    ) : (
                        <div>{data?.value}</div>
                    )
                )}
            </div>
        </div>
    );

    return type === "fanpage" ? (
        <a 
            href={data?.value} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:underline"
        >
            {content}
        </a>
    ) : content;
}

// Liên hệ (thông tin và form)
export default function ContactUs({ companyInfoData }) {

    const LIST_CONTACT = [
    {icon: <TaxIcon />, label: "Mã số thuế", value: companyInfoData.taxcode},
    {icon: <EmailIcon />, label: "Email", value: companyInfoData.company_email},
    {icon: <PhoneIcon />, label: "Điện thoại", value: companyInfoData.company_phone},
    {icon: <LocationIcon />, label: "Văn phòng", value: companyInfoData.office_address},
    {icon: <TimeIcon />, label: "Giờ làm việc", value: companyInfoData.working_hours},
    {icon: <FacebookIcon />, label: "Fanpage công ty", value: companyInfoData.fanpage_url}
    ]

    const dataForm = {
        title: "Gửi tin nhắn cho chúng tôi",
        type: 'lien-he'
    }
    return (
        <section className="container-fluid flex py-[70px] grid grid-cols-12 gap-5 sm:gap-10">
            <div className="col-span-12 lg:col-span-6 text-[var(--dark-green)] font-[400] ">
                <div className="text-[30px] font-[600] mb-[15px]">
                    Liên hệ về chúng tôi
                </div>
                <div className="mb-[20px]">
                    Bạn có dự án trong đầu hoặc muốn tìm hiểu thêm về dịch vụ của chúng tôi? Điền vào biểu mẫu hoặc liên hệ trực tiếp với chúng
                    tôi qua thông tin bên dưới.
                </div>
                <div className="flex flex-col gap-[30px]">
                    <Contact_Section data={LIST_CONTACT[0]} />
                    <Contact_Section data={LIST_CONTACT[1]} />
                    <Contact_Section data={LIST_CONTACT[2]} />
                    <Contact_Section data={LIST_CONTACT[3]} type="address" />
                    <Contact_Section data={LIST_CONTACT[4]}  />
                    <Contact_Section data={LIST_CONTACT[5]} type="fanpage" />
                </div>
            </div>
            <div className=" mx-[-20px] lg:mx-0 col-span-12 lg:col-span-6 ]">
                <Form data={dataForm} />
            </div>
        </section>
    )
}