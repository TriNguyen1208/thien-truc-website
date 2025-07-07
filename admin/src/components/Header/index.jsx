import React, { useState, useRef, useEffect } from 'react';
import { UserIcon } from '@/components/Icon';
import AccountModal from '@/components/Header/AccountModal';
import PasswordChangeModal from '@/components/Header/PasswordChangeModal';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const dropdownRef = useRef(null);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <header className="sticky top-0 py-1 bg-white z-50 shadow-sm border-gray-200 border-solid border-b">
        <div className="flex justify-end items-center px-6 py-2">
          <div
            className="flex items-center gap-2 cursor-pointer relative"
            onClick={handleClick}
            ref={dropdownRef}
          >
            <div className="flex items-center gap-3 px-8 py-1 rounded-md transition-all duration-200 ease-in-out hover:bg-gray-100 hover:scale-[1.02] group">
              <div className="w-11 h-11 rounded-full bg-gray-300 flex items-center justify-center group-hover:shadow-md">
                <UserIcon />
              </div>
              <span className="text-sm font-bold text-gray-800 group-hover:text-gray-700">
                Admin
              </span>
            </div>
            {/* Dropdown menu */}
            {open && (
              <div className="absolute top-full right-3 mt-4 w-40 bg-white rounded shadow-xl z-50">
                <ul className="text-center text-sm text-gray-700 font-semibold">
                  <li
                    className="py-1 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setShowAccountModal(true);
                      setOpen(false); // ✅ sửa đúng biến
                    }}
                  >
                    Thông tin tài khoản
                  </li>
                  <li className="py-1 hover:bg-gray-100 cursor-pointer text-red-600">
                    Đăng xuất
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      <AccountModal
        open={showAccountModal || showPasswordModal} // giữ cả 2 modal nền chung
        onClose={() => {
          setShowAccountModal(false);
          setShowPasswordModal(false);
        }}
        hideContent={showPasswordModal} // ẩn Account content nếu đang xem Password
        onChangePassword={() => {
          setShowPasswordModal(true); // chỉ toggle nội dung, không tắt
        }}
      />
      <PasswordChangeModal
        open={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </div>
  );
};

export default Header;
