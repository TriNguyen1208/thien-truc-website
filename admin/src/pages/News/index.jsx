import React, { useState } from 'react';
import { Button } from 'antd';
import { SuccessPopup, CancelPopup } from '@/components/Popups';

export default function TestPopupPage() {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);

  return (
    <div className="p-10 space-y-6">
      <div className="space-x-4">
        <Button type="primary" onClick={() => setOpenSuccess(true)}>
          Mở popup thành công
        </Button>
        <Button danger onClick={() => setOpenCancel(true)}>
          Mở popup huỷ
        </Button>
      </div>

      {/* Success Popup Example */}
      <SuccessPopup
        open={openSuccess}
        setOpen={setOpenSuccess}
        notification="Tạo bài viết thành công!"
        subTitle="Bạn có thể xem chi tiết bài viết vừa tạo hoặc quay lại danh sách."
        buttonLabel1="Xem chi tiết"
        buttonAction1={() => {
          console.log("Chuyển đến trang chi tiết");
          setOpenSuccess(false);
        }}
        buttonLabel2="Về danh sách"
        buttonAction2={() => {
          console.log("Quay về danh sách");
          setOpenSuccess(false);
        }}
      />

      {/* Cancel Popup Example */}
      <CancelPopup
        open={openCancel}
        setOpen={setOpenCancel}
        notification="Bạn có chắc chắn muốn xoá bài viết này không?"
        subTitle="Bài viết sẽ bị xoá vĩnh viễn và không thể khôi phục."
        buttonLabel1="Không xoá"
        buttonAction1={() => {
          console.log("Huỷ xoá");
          setOpenCancel(false);
        }}
        buttonLabel2="Xác nhận xoá"
        buttonAction2={() => {
          console.log("Xoá bài viết");
          setOpenCancel(false);
        }}
      />
    </div>
  );
}
