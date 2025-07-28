import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  HomeIcon,
  PeopleIcon,
  PhoneIcon,
  CompanyIcon,
  ProductIcon,
  CategoryIcon,
  NewsIcon,
  FolderIcon,
  ProjectIcon,
  LocationIcon,
  DollarIcon,
  InfoIcon
} from '@/components/Icon'; // file icons/index.js export lại các icon đã có

const getSections = (role) => {
  const sharedItems = [
    { label: 'Đội ngũ liên lạc', to: '/doi-ngu-lien-lac', icon: PhoneIcon },
    { label: 'Thông tin công ty', to: '/thong-tin-cong-ty', icon: CompanyIcon },
  ];

  const baseSections = [
    {
      label: 'QUẢN LÝ SẢN PHẨM',
      items: [
        { label: 'Quản lý sản phẩm', to: '/quan-ly-san-pham', icon: ProductIcon },
        { label: 'Quản lý loại sản phẩm', to: '/quan-ly-loai-san-pham', icon: CategoryIcon },
      ],
    },
    {
      label: 'QUẢN LÝ TIN TỨC',
      items: [
        { label: 'Quản lý tin tức', to: '/quan-ly-tin-tuc', icon: NewsIcon },
        { label: 'Quản lý loại tin tức', to: '/quan-ly-loai-tin-tuc', icon: FolderIcon },
      ],
    },
    {
      label: 'QUẢN LÝ DỰ ÁN',
      items: [
        { label: 'Quản lý dự án', to: '/quan-ly-du-an', icon: ProjectIcon },
        { label: 'Quản lý khu vực dự án', to: '/quan-ly-khu-vuc-du-an', icon: LocationIcon },
      ],
    },
    {
      label: 'NỘI DUNG TRANG',
      items: [
        { label: 'Trang chủ', to: '/noi-dung-trang/trang-chu', icon: HomeIcon },
        { label: 'Trang sản phẩm', to: '/noi-dung-trang/san-pham', icon: ProductIcon },
        { label: 'Trang bảng giá', to: '/noi-dung-trang/bang-gia', icon: DollarIcon },
        { label: 'Trang dự án', to: '/noi-dung-trang/du-an', icon: ProjectIcon },
        { label: 'Trang tin tức', to: '/noi-dung-trang/tin-tuc', icon: NewsIcon },
        { label: 'Trang tuyển dụng', to: '/noi-dung-trang/tuyen-dung', icon: PeopleIcon },
        { label: 'Trang liên hệ', to: '/noi-dung-trang/lien-he', icon: PhoneIcon },
        { label: 'Về chúng tôi', to: '/noi-dung-trang/ve-chung-toi', icon: InfoIcon },
      ],
    },
  ];

  // Role-based section
  let roleSection = []; // Debugging line to check the role
  if (role === 'admin') {
    roleSection.push({
      items: [
        { label: 'Bảng điều khiển', to: '/', icon: HomeIcon },
        { label: 'Quản lý manager', to: '/quan-ly-manager', icon: PeopleIcon },
        ...sharedItems
      ]
    });
  } else if (role === 'manager') {
    roleSection.push({
      items: [
        { label: 'Bảng điều khiển', to: '/', icon: HomeIcon },
        ...sharedItems
      ]
    });
  }

  return [...roleSection, ...baseSections];
};

const Sider = () => {
  const role = useSelector((state) => { 
    return state.auth.user.role
  }); // ✅ hợp lệ trong component
  const sections = getSections(role);

  return (
    <div className="w-65 h-full top-0 left-0 overflow-y-auto overflow-x-hidden no-scrollbar px-3 border-gray-200 border-solid shadow-sm">
      <div className="sticky top-0 z-10 bg-white mb-1 pt-7 pb-5">
        <h1 className="px-3 text-[23px] font-bold text-gray-800">Trang Quản Trị</h1>
      </div>
      <div className="px-3 flex flex-col space-y-1">
      {sections.map((section, i) => (
        <div key={i} className="mb-6">
          <p className="text-[13px] font-medium text-gray-500 uppercase mb-2">{section.label}</p>
          <div className="space-y-1">
            {section.items.map((item, j) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={j}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center py-2 rounded-lg text-[14px] font-medium transition-colors ${
                      isActive
                        ? 'font-medium bg-blue-100 text-blue-700 border-r-3 border-blue-700'
                        : 'text-gray-600 hover:text-black hover:bg-gray-300 hover:font-semibold'
                    }`
                  }
                >
                <div style={{ width: '20px', height: '20px' }}>
                    <Icon />
                </div>
                  <span className="ml-3">{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Sider;
