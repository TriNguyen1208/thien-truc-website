import React, { useState } from 'react';
import { Button } from 'antd';

const CustomButton = ({
  children,
  icon,
  type = 'primary',
  height = 48,
  backgroundColor = '#000',
  hoverBackgroundColor = '#333',  // 👈 màu khi hover
  borderColor = '#000',
  textColor = '#fff',
  hoverTextColor = '#fff',
  fontSize = 16,
  paddingX = 24,
  borderRadius = 6,
  htmlType = "button",
  position = "",
  ...rest
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Button
      type={type}
      icon={icon}
      htmlType={htmlType}
      style={{
        height,
        backgroundColor: hovered ? hoverBackgroundColor : backgroundColor,
        borderColor,
        color: hovered ? hoverTextColor : textColor,
        fontSize,
        padding: `0 ${paddingX}px`,
        borderRadius,
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.2s ease',
        position: position
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
