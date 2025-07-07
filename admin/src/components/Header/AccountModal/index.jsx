export default function AccountModal({ open, onClose, onChangePassword, hideContent }) {
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
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-300 rounded w-full text-sm"
                defaultValue="Admin"
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
              defaultValue="Đỗ Thanh Tùng"
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
          <button className="px-4 py-2 rounded bg-black text-white text-sm hover:bg-gray-800">
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
}
