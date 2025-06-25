import React from 'react';
import { Alert, Flex, Spin } from 'antd';
const contentStyle = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};
const content = <div style={contentStyle} />;
const Loading = () => (
  <div gap="middle" vertical className='flex h-[100vh] !items-center'>
    <div gap=" middle" className=' scale-400 mx-auto '>
  
    
      <Spin tip="Đang tải..." size="large" >
        {content}
      </Spin>
    </div>
   
  </div>
);
export default Loading;