import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';

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
    <header className="bg-white shadow-sm">
      <div className="w-full px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/logo.png" 
              alt="ThienTruc Logo" 
              className="h-10 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.to}
                className={({ isActive }) =>
                  `transition-colors duration-200 text-sm font-medium ${
                    isActive
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
            className="lg:hidden p-2 text-gray-700 hover:text-green-700 transition-colors"
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
                    `transition-colors duration-200 text-sm font-medium py-2 ${
                      isActive
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


// import { NavLink } from "react-router-dom"
// export default function Header(){
//     return(
//         <>
//             <div>
//                 <ul className="flex space-x-4 list-none">
//                     <li>
//                         <NavLink to = "/">
//                             Trang chủ
//                         </NavLink>
//                     </li>
//                      <li>
//                         <NavLink to = "/san-pham">
//                             Sản phẩm
//                         </NavLink>
//                     </li>
//                      <li>
//                         <NavLink to = "/bang-gia">
//                             Bảng giá
//                         </NavLink>
//                     </li>
//                      <li>
//                         <NavLink to = "/tin-tuc">
//                             Tin tức
//                         </NavLink>
//                     </li>
//                      <li>
//                         <NavLink to = "/tuyen-dung">
//                             Tuyển dụng
//                         </NavLink>
//                     </li>
//                      <li>
//                         <NavLink to = "/lien-he">
//                             Liên hệ
//                         </NavLink>
//                     </li>
//                 </ul>
//             </div>
//         </>  
//         // // <header className="bg-white">
//     //   <div className="container mx-auto flex items-center justify-between px-4 py-2">
//     //     <img src="../../assets/images/logo.png" alt="Thiên Trúc Logo" className="h-8" />
//     //     <nav className="flex space-x-6">
//     //       <a href="#" className="text-black">Trang Chủ</a>
//     //       <a href="#" className="text-black">Sản Phẩm</a>
//     //       <a href="#" className="text-black">Bảng Giá</a>
//     //       <a href="#" className="text-black">Dự Án</a>
//     //       <a href="#" className="text-black">Tin Tức</a>
//     //       <a href="#" className="text-black">Tuyển Dụng</a>
//     //       <a href="#" className="text-black">Liên Hệ</a>
//     //       <a href="#" className="text-black">Về Chúng Tôi</a>
//     //     </nav>
//     //   </div>
//     // </header>
  
//     )
// }