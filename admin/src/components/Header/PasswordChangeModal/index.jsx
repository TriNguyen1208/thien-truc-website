import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import { updatePassword } from '@/services/auth.api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '@/services/auth.api.js'
import { logout } from '@/slices/auth.slice.js';


export default function PasswordChangeModal({ open, onClose, role }) {
  if (!open) return null;
  const navigate = useNavigate();
  const [old_password, setOldPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [verify_password, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const handleUpdate = async () => {
    if (new_password !== verify_password) {
      message.error('Xác nhận mật khẩu không khớp');
      return;
    }
    try {
      const payload = { old_password, new_password, verify_password };
      const res = await dispatch(updatePassword(payload));
      toast.success('Cập nhật mật khẩu thành công');
      onClose();
    } catch (err) {
      console.error('Update failed:', err);
      toast.error(err?.response?.data?.message || 'Lỗi cập nhật mật khẩu');
    }
  };

  const handleForgotPassword = async () => {
    onClose(); // đóng modal
      // Xóa ngay client-side để tránh bị effect redirect vì vẫn còn user
    localStorage.removeItem('user');

    // Điều hướng trước
    navigate(
      {
        pathname: '/dang-nhap',
        search: '?step=forgot',
      },
      { replace: true }
    );

    // Logout server-side không chặn
    logoutUser().catch((e) => {
      console.warn('logoutUser failed', e);
    });
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      {/* Khung modal */}
      <div className="bg-white rounded-lg shadow-lg w-[420px] p-6 relative animate-fade-in">
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        {/* Tiêu đề */}
        <h2 className="text-lg font-bold mb-1">Chỉnh sửa mật khẩu</h2>
        <p className="text-sm text-gray-500 mb-7">
          Xem chi tiết thông tin tài khoản quản trị
        </p>

        {/* Form */}
        <div className="space-y-5">
          {/* Tên tài khoản */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Mật khẩu cũ
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-300  rounded w-full text-sm"
                placeholder="Nhập mật khẩu cũ"
                onChange={(e) => setOldPassword(e.target.value)}
              />   
              <button className="px-3 py-2 text-sm border border-gray-300 shadow-sm rounded hover:bg-gray-100 whitespace-nowrap"
                  onClick={handleForgotPassword} >
                Quên mật khẩu
              </button>
            </div>
          </div>

          {/* Họ và tên */}
          <div>
            <label className="block text-sm font-medium mb-2">Mật khẩu mới</label>
            <input
              type="text"
              className="px-3 py-2 border border-gray-300 rounded w-full text-sm mb-3"
              placeholder="Nhập mật khẩu mới"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="text"
              className="px-3 py-2 border border-gray-300 rounded w-full text-sm"
              placeholder="Xác nhận mật khẩu mới"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Nút hành động */}
        <div className="flex justify-end gap-2 mt-15">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-400 text-sm hover:bg-gray-100"
          >
            Hủy
          </button>
          <button className="px-4 py-2 rounded bg-black text-white text-sm hover:bg-gray-800"
            onClick={() => {
              handleUpdate();
            }}>
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
}

