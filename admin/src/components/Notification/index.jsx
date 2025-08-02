import { Modal } from 'antd';
import Button from '../Button';
import {ExclamationCircleOutlined  } from '@ant-design/icons'
export const Notification = ({ open, setOpen, notification, subTitle, buttonLabel1, buttonAction1, buttonLabel2, buttonAction2}) => {


  const cancleButtonProps={
    text: buttonLabel1 || 'Hủy', 
    colorText: '#000000', 
    colorBackground: '#ffffff', 
    padding : 0, 
    handleButton: buttonAction1 || setOpen(false), 
  }
  const confirmButtonProps={
    text: buttonLabel2 || 'Xác nhận', 
    colorText: '#ffffff', 
    colorBackground:  '#000000', 
    padding : 8, 
    handleButton: buttonAction2 || setOpen(false), 
  }
  return (
    <Modal
      open={open}
      onCancel={buttonAction1 || (() => setOpen(false))}
      footer={null}
      closable
      centered
      width={440} // 👈 nhỏ hơn đáng kể
      styles={{ padding: '12px 18px 3px' }}
    >
      <div className="text-center mt-[1px]">
       <div className='text-[50px] text-[#fadb14]'>

       <ExclamationCircleOutlined />
       </div>
        <div className="mt-2 text-[18px] font-semibold leading-tight text-black">
          {notification}
        </div>

        <div className="mt-1 mb-4 text-[14px] text-gray-500 leading-normal">
          {subTitle}
        </div>

        <div className="flex justify-center gap-2 mt-6">
          <div className='w-[70px] h-[35px]'>
             <Button {...cancleButtonProps}/>
          </div>
          <div  className='w-fit h-[35px]'>
             <Button {...confirmButtonProps}/>
          </div>
         
        </div>
      </div>
    </Modal>
  );
};
export default Notification;