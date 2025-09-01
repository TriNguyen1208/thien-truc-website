import { useState, useEffect } from 'react';

export default function Input({
    label, 
    placeholder, 
    rows,
    maxLength, 
    contentCurrent,
    inputRef, 
    isRequire
}){
    const [value, setValue] = useState(contentCurrent || '');
    useEffect(() => {
        setValue(contentCurrent || '');
    }, [contentCurrent]);

    useEffect(() => {
        if (inputRef) inputRef.current = { value }; // gán lại giá trị vào ref cho component cha
    }, [value]);
    const isMax = value.length >= maxLength;
    return(
        <div className="flex flex-col mb-[16px]">
            <label className="mb-[8px] font-medium">
                {label}{isRequire && <span className="text-red-500 ml-1">*</span>} 
            </label>
            <textarea 
                type="text" 
                ref ={inputRef} 
                rows={rows}  
                required = {isRequire}  
                placeholder={placeholder} 
                value={value}
                onChange={(e) => setValue(e.target.value)}
                maxLength={maxLength}
                className={`text-[14px] resize-none font-regular p-[12px] min-h-[45px] border rounded-[6px] outline-none ${isMax ? 'border-red-500' : 'border-[#E4E4E7]'
            }`}/>
        </div>
    )
}