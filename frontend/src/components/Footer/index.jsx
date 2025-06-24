import React from 'react';
import { BiLogoFacebook } from "react-icons/bi";
import { 
  FacebookOutlined, 
  YoutubeOutlined, 
  InstagramOutlined, 
  EnvironmentOutlined, 
  PhoneOutlined, 
  MailOutlined 
} from '@ant-design/icons';

const Footer = () => {
  return (
    <footer style={{ background: "var(--gradient-banner)" }} className="bg-green-700 text-white py-8">
      <div className="w-full px-6">
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
              <li><a href="/" className="text-sm hover:text-green-200 transition-colors">Trang Chủ</a></li>
              <li><a href="/san-pham" className="text-sm hover:text-green-200 transition-colors">Sản Phẩm</a></li>
              <li><a href="/bang-gia" className="text-sm hover:text-green-200 transition-colors">Bảng Giá</a></li>
              <li><a href="/du-an" className="text-sm hover:text-green-200 transition-colors">Dự Án Tiêu Biểu</a></li>
              <li><a href="/tin-tuc" className="text-sm hover:text-green-200 transition-colors">Tin Tức</a></li>
              <li><a href="/tuyen-dung" className="text-sm hover:text-green-200 transition-colors">Tuyển Dụng</a></li>
              <li><a href="/lien-he" className="text-sm hover:text-green-200 transition-colors">Liên Hệ</a></li>
              <li><a href="/ve-chung-toi" className="text-sm hover:text-green-200 transition-colors">Về Chúng Tôi</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Liên Hệ Với Chúng Tôi</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <EnvironmentOutlined className="text-base flex-shrink-0 " style={{ color: 'var(--yellow-bg)', fontSize: '20px' }} />
                <p className="text-sm">
                  123 Đường Nguyễn Huệ Quận 1, TP Hồ Chí Minh, Việt Nam
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <PhoneOutlined className="text-base flex-shrink-0" style={{ color: 'var(--yellow-bg)', fontSize: '20px' }} />
                <span className="text-sm">+84 28 1234 5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <MailOutlined className="text-base flex-shrink-0" style={{ color: 'var(--yellow-bg)', fontSize: '20px' }} />
                <span className="text-sm">info@thientruc.com</span>
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
      </div>
    </footer>
  );
};

export default Footer;