import React from 'react';
import {
  FacebookOutlined,
  YoutubeOutlined,
  InstagramOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import useHome from "@/hooks/useHome";
import useContact from "@/hooks/useContact";
import Loading from "@/components/Loading"

const Footer = () => {
  const { data: homePageData, isLoading: isLoadingHomePage } = useHome.getHomePage();
  const { data: dataAll, isLoading: isLoadingDataAll } = useContact.getAll();
  if (isLoadingHomePage || isLoadingDataAll) {
    return (
      <>
        <Loading />
      </>
    )
  }
  const companyInfoData = dataAll.company_info;
  return (
    <footer style={{ background: "var(--gradient-banner)" }} className="bg-green-700 text-white py-8 container-fluid w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Công ty Thiên Trúc</h3>
          <p className="text-sm leading-relaxed">
            {homePageData.banner_description}
          </p>
          <div className="flex space-x-3">
            <FacebookOutlined className="text-lg cursor-pointer hover:text-blue-300 transition-colors" />
            <YoutubeOutlined className="text-lg cursor-pointer hover:text-red-300 transition-colors" />
            <InstagramOutlined className="text-lg cursor-pointer hover:text-pink-300 transition-colors" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
          <ul className="space-y-2">
            <li><NavLink to={"/"} className="text-sm hover:text-green-200 transition-colors">Trang chủ</NavLink></li>
            <li><NavLink to={"/san-pham"} className="text-sm hover:text-green-200 transition-colors">Sản phẩm</NavLink></li>
            <li><NavLink to={"/bang-gia"} className="text-sm hover:text-green-200 transition-colors">Bảng giá</NavLink></li>
            <li><NavLink to={"/du-an"} className="text-sm hover:text-green-200 transition-colors">Dự án tiêu biểu</NavLink></li>
            <li><NavLink to={"/tin-tuc"} className="text-sm hover:text-green-200 transition-colors">Tin tức</NavLink></li>
            <li><NavLink to={"/tuyen-dung"} className="text-sm hover:text-green-200 transition-colors">Tuyển dụng</NavLink></li>
            <li><NavLink to={"/lien-he"} className="text-sm hover:text-green-200 transition-colors">Liên hệ</NavLink></li>
            <li><NavLink to={"/ve-chung-toi"} className="text-sm hover:text-green-200 transition-colors">Về chúng tôi</NavLink></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Liên hệ với chúng tôi</h3>
          <div className="space-y-3">
            <div className="flex items-center  space-x-2">
              <EnvironmentOutlined className="text-base flex-shrink-0 text-[var(--yellow-bg)]" style={{ color: 'var(--yellow-bg)', fontSize: '20px' }} />
              <div>
                {companyInfoData.office_address.map((item, index) => (
                  <a
                    key={index}
                    href={item.googlemaps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline no-underline text-sm hover:"
                  >
                    <div >{item.address} </div>
                  </a>
                ))}
                
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <PhoneOutlined
                className="flex-shrink-0"
                style={{ color: 'var(--yellow-bg)', fontSize: '20px' }}
              />
              <div className="flex flex-col text-sm">
                {companyInfoData.company_phone.map((item, index) => (
                  <span key={index}>{item}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MailOutlined className="text-base flex-shrink-0" style={{ color: 'var(--yellow-bg)', fontSize: '20px' }} />
              <a href={`mailto:${companyInfoData.company_email}`} className="hover:underline text-sm">
                {companyInfoData.company_email}
              </a>
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Giờ làm việc</h3>
          <div>
            {companyInfoData.working_hours.map((item, index) => (
              <div className='mb-2' key={index}>{item}</div>
            ))}
          </div>
          <div className="mt-4 bg-[#166534] px-4 py-3">
            <p className="text-xs text-green-200 mb-2">
              Đối với dịch vụ chiếu sáng khẩn cấp ngoài giờ làm việc, vui lòng gọi đường dây của chúng tôi
            </p>
            <div className="text-yellow-300 font-semibold">
              <div>
                {companyInfoData.hotline.map((item, index) => (
                  <div key={index}>{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-green-600 mt-8 pt-6 text-center">
        <p className="text-sm text-green-200">
          © 2025 Công Ty Thiên Trúc. Tất cả các quyền được bảo lưu.
        </p>
      </div>
    </footer>
  );
};

export default Footer;