import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import logo from '@/assets/images/logo.png';
import LazyLoad from 'react-lazyload';
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 
  const menuItems = [
    { label: 'Trang Chủ', to: '/' },
    { label: 'Sản Phẩm', to: '/san-pham' },
    { label: 'Bảng Giá', to: '/bang-gia' },
    { label: 'Dự Án', to: '/du-an' },
    { label: 'Tin Tức', to: '/tin-tuc' },
    { label: 'Tuyển Dụng', to: '/tuyen-dung' },
    { label: 'Liên Hệ', to: '/lien-he' },
    { label: 'Về Chúng Tôi', to: '/ve-chung-toi' }
  ];
 
  return (
    <header className="container-fluid w-full bg-white shadow-sm sticky top-0 z-1000">
      <div className="py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <LazyLoad
              height={200}
              once
              offset={100}
              throttle={100}
              placeholder={<div className="w-full h-full bg-gray-200 rounded-t-lg overflow-hidden"></div>}
            >
              <img
                width={100}
                src={logo}
                alt="ThienTruc Logo"
              />
            </LazyLoad>
          </div>
 
          {/* Desktop Navigation - Moved left with margin-left adjustment */}
          <nav className="hidden lg:flex items-center space-x-8 ml-16">
            {menuItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.to}
                className={({ isActive }) =>
                  `transition-colors duration-200 text-sm font-medium ${isActive
                    ? 'text-green-700 font-semibold'
                    : 'text-gray-700 hover:text-green-700'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
 
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:text-green-700 transition-color cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <MenuOutlined className="text-xl" />
          </button>
        </div>
 
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3 pt-4">
              {menuItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.to}
                  className={({ isActive }) =>
                    `transition-colors duration-200 text-sm font-medium py-2 ${isActive
                      ? 'text-green-700 font-semibold'
                      : 'text-gray-700 hover:text-green-700'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;