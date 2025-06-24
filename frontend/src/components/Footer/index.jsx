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

const Footer = () => {
  return (
    <footer style={{ background: "var(--gradient-banner)" }} className="bg-green-700 text-white py-8 container-fluid w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Công ty Thiên Trúc</h3>
          <p className="text-sm leading-relaxed">
            Giải pháp chiếu sáng LED chuyên nghiệp cho 
            các dự án thương mại, dân dụng và công 
            nghiệp trên khắp Việt Nam.
          </p>
          <div className="flex space-x-3">
            <FacebookOutlined className="text-lg cursor-pointer hover:text-blue-300 transition-colors" />
            <YoutubeOutlined className="text-lg cursor-pointer hover:text-red-300 transition-colors" />
            <InstagramOutlined className="text-lg cursor-pointer hover:text-pink-300 transition-colors" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Liên Kết Nhanh</h3>
          <ul className="space-y-2">
            <li><NavLink to={"/"} className="text-sm hover:text-green-200 transition-colors">Trang Chủ</NavLink></li>
            <li><NavLink to={"/san-pham"} className="text-sm hover:text-green-200 transition-colors">Sản Phẩm</NavLink></li>
            <li><NavLink to={"/bang-gia"} className="text-sm hover:text-green-200 transition-colors">Bảng giá</NavLink></li>
            <li><NavLink to={"/du-an"} className="text-sm hover:text-green-200 transition-colors">Dự Án Tiêu Biểu</NavLink></li>
            <li><NavLink to={"/tin-tuc"} className="text-sm hover:text-green-200 transition-colors">Tin Tức</NavLink></li>
            <li><NavLink to={"/tuyen-dung"} className="text-sm hover:text-green-200 transition-colors">Tuyển Dụng</NavLink></li>
            <li><NavLink to={"/lien-he"} className="text-sm hover:text-green-200 transition-colors">Liên Hệ</NavLink></li>
            <li><NavLink to={"/ve-chung-toi"} className="text-sm hover:text-green-200 transition-colors">Về Chúng Tôi</NavLink></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Liên Hệ Với Chúng Tôi</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <EnvironmentOutlined className="text-base flex-shrink-0 text-[var(--yellow-bg)]" style={{ color: 'var(--yellow-bg)', fontSize: '20px' }} />
              <a
                href="https://maps.app.goo.gl/KwHzrxJ4kNRh1wt97"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline no-underline text-sm hover:"
              >
                123 Đường Nguyễn Huệ, Quận 1, TP Hồ Chí Minh, Việt Nam
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <PhoneOutlined className="text-base flex-shrink-0" style={{ color: 'var(--yellow-bg)', fontSize: '20px' }} />
              <a href="tel:+842812345678" className="hover:underline text-sm">
                +84 28 1234 5678
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <MailOutlined className="text-base flex-shrink-0" style={{ color: 'var(--yellow-bg)', fontSize: '20px' }} />
              <a href="mailto:info@thientruc.com" className="hover:underline text-sm">
                info@thientruc.com
              </a>
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Giờ Làm Việc</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Thứ Hai - Thứ Sáu:</span>
              <span>8:00 - 17:30</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Thứ Bảy:</span>
              <span>8:00 - 12:00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Chủ Nhật:</span>
              <span>Nghỉ</span>
            </div>
          </div>
          <div className="mt-4 bg-[#166534] px-4 py-3">
            <p className="text-xs text-green-200 mb-2">
              Đối với dịch vụ chiếu sáng khẩn cấp ngoài giờ làm việc, vui lòng gọi đường dây của chúng tôi
            </p>
            <div className="text-yellow-300 font-semibold">
              +84 28 9876 5432
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