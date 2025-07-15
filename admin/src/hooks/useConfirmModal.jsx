import React, { useState } from 'react';
import { Modal } from 'antd';

const useConfirmModal = () => {
  const [open, setOpen] = useState(false);
  const [resolver, setResolver] = useState(null);

  const confirm = () => {
    setOpen(true);
    return new Promise((resolve) => {
      setResolver(() => resolve);
    });
  };

  const handleOk = () => {
    setOpen(false);
    resolver?.(true);
  };

  const handleCancel = () => {
    setOpen(false);
    resolver?.(false);
  };

  const modal = (
    <Modal
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      title="Rời khỏi trang?"
      okText="Rời đi"
      cancelText="Ở lại"
      closable={false}
      maskClosable={false}
    >
      <p>Bạn có chắc chắn muốn rời khỏi? Dữ liệu chưa lưu sẽ bị mất.</p>
    </Modal>
  );

  return { confirm, modal };
};

export default useConfirmModal;
