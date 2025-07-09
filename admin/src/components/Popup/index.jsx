// src/components/Popups.jsx
import { Modal, Result, Button } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import { CheckCircleFilled } from '@ant-design/icons';

export const SuccessPopup = ({ open, setOpen }) => {

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
              Successfully Purchased Cloud Server ECS!
            </div>
          }
          subTitle={
            <div className="text-gray-500 text-sm">
              Order number: <span className="text-black">2017182818828182881</span> &nbsp;
              Cloud server configuration takes 1-5 minutes, please wait.
            </div>
          }
          extra={[
            <Button type="primary" key="console" onClick={handleOk}>
              Go Console
            </Button>,
            <Button key="buy" onClick={handleOk}>
              Buy Again
            </Button>,
          ]}
        />
      </Modal>
    </div>
  );
};

export const CancelPopup = ({ open, setOpen }) => {

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
          title="Bạn có chắc chắn muốn huỷ hành động này không?"
          subTitle="Hành động này sẽ không thể hoàn tác."
          extra={[
            <Button key="cancel" onClick={() => setOpen(false)}>
              Quay lại
            </Button>,
            <Button key="confirm" type="primary" danger onClick={() => setOpen(false)}>
              Xác nhận huỷ
            </Button>,
          ]}
        />
      </Modal>
    </div>
  );
};
