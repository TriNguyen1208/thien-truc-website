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
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      closable
      centered
      width={440} // 👈 nhỏ hơn đáng kể
      styles={{ padding: '12px 18px 3px' }}
    >
      <div className="text-center mt-[1px]">
        <div className="flex justify-center mb-4">
        <CloseCircleFilled style={{ color: '#ff4d4f', fontSize: 48 }} />
        </div>

        <div className="mt-2 text-[18px] font-semibold leading-tight text-black">
          {notification}
        </div>

        <div className="mt-1 mb-4 text-[14px] text-gray-500 leading-normal">
          {subTitle}
        </div>

        <div className="flex justify-center gap-2 mt-6">
          <Button size="middle" onClick={buttonAction1 || (() => setOpen(false))}>
            {buttonLabel1 || 'Hủy'}
          </Button>
          <Button size="middle" danger type="primary" onClick={buttonAction2 || (() => setOpen(false))}>
            {buttonLabel2 || 'Xác nhận'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};