import { useState } from "react";
export default function Button({Icon, text, colorText, colorBackground, padding = 0, handleButton})
{
    const [hoverStyle, setHoverStyle] = useState({});

    function getBrightness(hex) {
      if(!hex) return 0
        const r = parseInt(hex.substr(1, 2), 16);
        const g = parseInt(hex.substr(3, 2), 16);
        const b = parseInt(hex.substr(5, 2), 16);
        return 0.299 * r + 0.587 * g + 0.114 * b;
    }
  const handleMouseEnter = (colorBackground) => {
    if (getBrightness(colorBackground) > getBrightness("#808080")) {
      setHoverStyle({ filter: 'brightness(95%)' });
    } else if (colorBackground.toLowerCase() === '#000000') {
      setHoverStyle({ opacity:'70%' });
    } 
  };
   const handleMouseLeave = () => {
    setHoverStyle({});
  };
    return(<div onMouseEnter={()=>handleMouseEnter(colorBackground)} onMouseLeave={handleMouseLeave} onClick = {handleButton} 
                className="flex flex-row border border-[#f5f5f5]   items-center gap-[10px] w-full h-full rounded-[6px] hover:cursor-pointer "
                style={{ color: colorText, backgroundColor: colorBackground, padding: padding,...hoverStyle, display: 'flex', justifyContent: (text && Icon) ? 'flex-start':'center'   }}
    >
        {
            Icon?<div className="mx-[8px]"> <Icon/></div>:<></>
        }
        {
            text? <p className="text-[14px] font-medium">{text} </p> :<></>
        }
    </div>)
}