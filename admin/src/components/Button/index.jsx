import { useState } from "react";
export default function Button({ Icon, text, colorText, colorBackground, padding = 0, handleButton, disable = false }) {
  const [hoverStyle, setHoverStyle] = useState({});

  function getBrightness(hex) {
    if (!hex) return 0
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    return 0.299 * r + 0.587 * g + 0.114 * b;
  }
  const handleMouseEnter = (colorBackground) => {
    if (getBrightness(colorBackground) > getBrightness("#808080")) {
      setHoverStyle({ filter: 'brightness(95%)', cursor: 'pointer' });
    } else if (colorBackground.toLowerCase() === '#000000') {
      setHoverStyle({ opacity: '70%', cursor: 'pointer' });
    }
  };
  const handleMouseLeave = () => {
    setHoverStyle({});
  };
  if (disable) handleButton = undefined
  return (
    <div
      onMouseEnter={!disable ? () => handleMouseEnter(colorBackground) : undefined}
      onMouseLeave={handleMouseLeave}
      onClick={!disable ? handleButton : undefined}
      className="flex flex-row border border-[#f5f5f5] items-center gap-[10px] w-full h-full rounded-[6px]"
      style={{
        color: colorText,
        backgroundColor: disable ? '#d3d3d3' : colorBackground, 
        padding: padding,
        ...(!disable ? hoverStyle : {}), 
        cursor: disable ? 'not-allowed' : hoverStyle.cursor || 'pointer',
        display: 'flex',
        justifyContent: text && Icon ? 'flex-start' : 'center',
      }}
    >
      {Icon && <div className="mx-[8px]"><Icon /></div>}
      {text && <p className="text-[14px] font-medium">{text}</p>}
    </div>
  );
}