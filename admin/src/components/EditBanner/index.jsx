import Button from '@/components/Button'
import {SaveIcon}  from '../Icon';
import { useRef, useState, useEffect } from 'react';
function Input({label, placeholder, rows,maxLength, contentCurrent,inputRef, isRequire} )
{
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
            <label className="mb-[8px] font-medium">{label}{isRequire && <span className="text-red-500 ml-1">*</span>} </label>
            <textarea type="text" 
                ref ={inputRef} 
                rows={rows}  
                required = {isRequire}  
                placeholder={placeholder} 
                value={value}
                onChange={(e) => setValue(e.target.value)}
                maxLength={maxLength}
                className={`text-[14px] resize-none font-regular p-[12px] min-h-[45px] border rounded-[6px] outline-none ${
                isMax ? 'border-red-500' : 'border-[#E4E4E7]'
            }`}/>
        </div>
    )
}

export default function EditBanner({title, description, listInput,saveButton})
{
    const inputRefs = listInput.map((input, index)=>{
        return useRef()
    })
    const handleSaveButton = (e)=>{
        e.preventDefault()
        if(saveButton)
        {
            const result =
             {}
            inputRefs.map((inputRef, index)=>{
                const key = listInput[index].name
                result[key] = inputRef.current.value
            })
            
            saveButton(result)
        }
    }
    const propsButton ={
        Icon: SaveIcon,
        text: "Lưu thay đổi",
        colorText: "#ffffff",
        colorBackground: "#000000",
        padding : 10,
    }
    return(
        <div className="flex flex-col p-[24px] bg-white w-full h-full border border-[#E5E7EB] rounded-[8px]">
            <div className="mb-[4px]">
                <h1 className="text-[24px] text-black font-semibold">
                    {title}
                </h1>
            </div>
            <div className="mb-[24px]">
                <p className="text-[14px] text-[#71717A] font-regular">
                    {description}
                </p>
            </div>
            <form onSubmit={handleSaveButton}>
                <div>
                {
                    (listInput || []).map((input, index)=>{
                        const props = {
                            label: input.label,
                            placeholder: input.placeholder,
                            contentCurrent: input.contentCurrent,
                            inputRef: inputRefs[index],
                            isRequire: input.isRequire, 
                            rows: input.rows,
                            maxLength: input.maxLength
                        }
                        
                        return(<div key = {index}>
                            <Input  {...props}/>
                             </div>)
                    })
                }
            </div>
            <div className='w-fit h-40[px]'>
              <button className='w-full' type = "submit"> <Button {...propsButton}/></button>
            </div>                
            </form>
        </div>
    )
}