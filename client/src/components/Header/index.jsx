import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import logo from '@/assets/images/logo.png';
import LazyLoad from 'react-lazyload';
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const wrapperRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const menuItems = [
    { label: 'Trang chủ', to: '/' },
    { label: 'Sản phẩm', to: '/san-pham' },
    { label: 'Bảng giá', to: '/bang-gia' },
    { label: 'Dự án', to: '/du-an' },
    { label: 'Tin tức', to: '/tin-tuc' },
    { label: 'Tuyển dụng', to: '/tuyen-dung' },
    { label: 'Liên hệ', to: '/lien-he' },
    { label: 'Về chúng tôi', to: '/ve-chung-toi' }
  ];
 
  return (
    <header ref={wrapperRef} className="container-fluid w-full bg-white shadow-sm sticky top-0 z-2000">
      <div className="py-1 md:py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <LazyLoad
              height={200}
              once
              offset={100}
              throttle={100}
              placeholder={<div className="w-full h-full bg-gray-200 rounded-t-lg overflow-hidden"></div>}
              style={{width: '100px'}}
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