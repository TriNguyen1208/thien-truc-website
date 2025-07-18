import React from 'react';
import { Spin } from 'antd';

const contentStyle = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

const Loading = () => (
  <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-[9999] bg-white/50">
    <Spin tip="Đang tải..." size="large">
      {content}
    </Spin>
  </div>
);

export default Loading;
