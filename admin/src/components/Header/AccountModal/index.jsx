import DisableTextBox from "@/components/DisabledTextBox";
import React, { useState } from "react";
import { updateProfile } from "@/services/auth.api";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { toast } from 'react-toastify';

export default function AdminAccountModal({ open, onClose, onChangePassword, hideContent, user }) {
  const [fullname, setFullName] = useState(user.fullname);
  const dispatch = useDispatch();
  const handleUpdate = async () => {
    try {
      const payload = {fullname}; // bổ sung field cần cập nhật
      await dispatch(updateProfile(payload));
      toast.success('Cập nhật thành công');
      onClose(); // đóng modal nếu cần
    } catch (err) {
      console.error('Update failed:', err);
      toast.error(err?.response?.data?.message || 'Lỗi cập nhật');
    }
  };
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/30 transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`bg-white rounded-lg shadow-lg w-[420px] p-6 relative animate-fade-in ${hideContent ? 'hidden' : ''}`}>
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        <h2 className="text-lg font-bold mb-1">Thông tin tài khoản</h2>
        <p className="text-sm text-gray-500 mb-7">
          Xem chi tiết thông tin tài khoản quản trị
        </p>

        <div className="space-y-5">
          {/* Tên tài khoản */}
          <div>
            <label className="block text-sm font-medium mb-1">Tên tài khoản</label>
            <div className="flex gap-2">
              <DisableTextBox
                width="flex-1"
                placeholder={user.username}
              />
              <button
                className="px-3 py-2 text-sm border border-gray-200 shadow-md rounded hover:bg-gray-100 whitespace-nowrap"
                onClick={onChangePassword}
              >
                Thay đổi mật khẩu
              </button>
            </div>
          </div>

          {/* Họ và tên */}
          <div>
            <label className="block text-sm font-medium mb-1">Họ và tên</label>
            <input
              type="text"
              className="px-3 py-2 border border-gray-300 rounded w-full text-sm"
              defaultValue={user.fullname}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-28">
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


export function ManagerAccountModal({ open, onClose, onChangePassword, hideContent, user }) {
  const [fullname, setFullName] = useState(user.fullname);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const dispatch = useDispatch();
  const handleUpdate = async () => {
    try {
      const payload = {fullname, phone, email}; // bổ sung field cần cập nhật
      await dispatch(updateProfile(payload));
      toast.success('Cập nhật thành công');
      onClose(); // đóng modal nếu cần
    } catch (err) {
      console.error('Update failed:', err);
      toast.error(err?.response?.data?.message || 'Lỗi cập nhật');
    }
  };
  return (
   <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/30 transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`bg-white rounded-lg shadow-lg w-[610px] p-6 relative animate-fade-in ${hideContent ? 'hidden' : ''}`}>
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        <h2 className="text-lg font-bold mb-1">Thông tin tài khoản</h2>
        <p className="text-sm text-gray-500 mb-7">
          Xem chi tiết thông tin tài khoản quản trị
        </p>

        <div className="space-y-5">
          {/* Tên tài khoản */}
          <div>
            <label className="block text-sm font-medium mb-1">Tên đăng nhập</label>
            <div className="flex gap-5">
              <DisableTextBox
                width="w-[400px]"
                type="input"
                placeholder={user.username}
              />
              <button
                className="px-3 py-2 text-sm border border-gray-200 shadow-md rounded hover:bg-gray-100 whitespace-nowrap"
                onClick={onChangePassword}
              >
                Thay đổi mật khẩu
              </button>
            </div>
          </div>

          {/* Họ và tên */}
          <div>
            <label className="block text-sm font-medium mb-1">Họ và tên</label>
            <input
              type="text"
              className="px-3 py-2 border border-gray-300 rounded w-full text-sm"
              defaultValue={user.fullname}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Số điện thoại</label>
            <input
              type="text"
              className="px-3 py-2 border border-gray-300 rounded w-full text-sm"
              defaultValue={user.phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            </div>
            <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="px-3 py-2 border border-gray-300 rounded w-full text-sm"
              defaultValue={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Vị trí công việc</label>
            <DisableTextBox
              type="textarea"
              width="w-[562px]"
              height="min-h-[50px]"
              placeholder={user.position || 'Chưa cập nhật'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mô tả</label>
            <DisableTextBox
              type="textarea"
              width="w-[562px]"
              height="min-h-[90px]"
              placeholder={user.description || 'Chưa cập nhật'}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-10">
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