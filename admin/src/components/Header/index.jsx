import React, { useState, useRef, useEffect } from 'react';
import { UserIcon } from '@/components/Icon';
import { logoutUser } from '@/services/auth.api.js'
import AdminAccountModal, { ManagerAccountModal } from '@/components/Header/AccountModal';
import PasswordChangeModal from '@/components/Header/PasswordChangeModal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/slices/auth.slice.js' 

const Header = () => {
  // Lấy thông tin người dùng từ Redux store
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
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
                {user?.fullname}
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
                  <li className="py-1 hover:bg-gray-100 cursor-pointer text-red-600"
                      onClick={async () => {
                        await logoutUser();
                        dispatch(logout())
                      }
                  }>
                    Đăng xuất
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      {user?.role === "admin" ? (
        <AdminAccountModal
          open={showAccountModal || showPasswordModal}
          onClose={() => {
            setShowAccountModal(false);
            setShowPasswordModal(false);
          }}
          hideContent={showPasswordModal}
          onChangePassword={() => {
            setShowAccountModal(false);
            setShowPasswordModal(true);
          }}
          user={user}
        />
      ) : (
        <ManagerAccountModal
          open={showAccountModal || showPasswordModal}
          onClose={() => {
            setShowAccountModal(false);
            setShowPasswordModal(false);
          }}
          hideContent={showPasswordModal}
          onChangePassword={() => {
            setShowAccountModal(false);
            setShowPasswordModal(true);
          }}
          user={user}
        />
      )}

      <PasswordChangeModal
        open={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </div>
  );
};

export default Header;
