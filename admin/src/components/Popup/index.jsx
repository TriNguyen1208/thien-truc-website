// src/components/Popups.jsx
import { Modal, Result, Button } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import { CheckCircleFilled } from '@ant-design/icons';

export const SuccessPopup = ({ open, setOpen, notification, subTitle, buttonLabel1, buttonAction1, buttonLabel2, buttonAction2}) => {

  const handleOk = () => setOpen(false);

  return (
    <div className="p-6">

      <Modal
        open={open}
        footer={null}
        onCancel={handleOk}
        centered
        closable
        width={550}
      > 
        <Result
          status="success"
          icon={<CheckCircleFilled style={{ color: '#52c41a', fontSize: 72 }} />}
          title={
            <div className="text-lg font-semibold">
              {notification || 'Successfully Purchased Cloud Server ECS!'}
            </div>
          }
          subTitle={
            <div className="text-gray-500 text-sm">
              {subTitle || 'Your order has been successfully processed. You can now manage your cloud server from the console.'}
            </div>
          }
          extra={[
            <Button type="primary" key="console" onClick={buttonAction1 || handleOk}>
              {buttonLabel1 || 'Go to Console'}
            </Button>,
            <Button key="buy" onClick={buttonAction2 || handleOk}>
              {buttonLabel2 || 'Continue Shopping'}
            </Button>,
          ]}
        />
      </Modal>
    </div>
  );
};

export const CancelPopup = ({ open, setOpen, notification, subTitle, buttonLabel1, buttonAction1, buttonLabel2, buttonAction2}) => {

  return (
    <div className="p-6">
      <Modal
        open={open}
        footer={null}
        onCancel={() => setOpen(false)}
        centered
        closable
        width={550}
      >
        <Result
          status="error"
          icon={<CloseCircleFilled style={{ color: '#ff4d4f', fontSize: 60 }} />}
          title={notification || 'Bạn muốn huỷ hành động này?'}
          subTitle={subTitle || 'Hành động này không thể hoàn tác. Bạn có chắc chắn muốn huỷ?'}
          extra={[
            <Button key="cancel" onClick={buttonAction1 || (() => setOpen(false))}>
              {buttonLabel1 || 'Huỷ'}
            </Button>,
            <Button key="confirm" type="primary" danger onClick={buttonAction2 || (() => setOpen(false))}>
              {buttonLabel2 || 'Xác nhận'}
            </Button>,
          ]}
        />
      </Modal>
    </div>
  );
};
