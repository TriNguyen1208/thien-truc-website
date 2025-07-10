import Button from '@/components/Button'
import {SaveIcon}  from '../Icon';
import { useRef } from 'react';
function Input({label, placeholder, rows,contentCurrent,ref, isRequire} )
{
    return(<div className="flex flex-col mb-[16px]">
        <label className="mb-[8px] font-medium">{label}{isRequire && <span className="text-red-500 ml-1">*</span>} </label>
        <textarea type="text"  ref ={ref} rows={rows}  required = {isRequire}   placeholder={placeholder} defaultValue={contentCurrent}
        className="text-[14px] resize-none font-regular p-[12px] min-h-[45px] border border-[#E4E4E7] bg-white rounded-[6px] focus:border-[#E4E4E7] outline-none "/>
    </div>)
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
            const result = {}
            inputRefs.map((inputRef, index)=>{
                const key = listInput[index].label
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
        padding : 8,
       
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
                            ref: inputRefs[index],
                            isRequire: input.isRequire,
                            rows: input.rows
                        }
                        
                        return(<div key = {index}>
                            <Input  {...props}/>
                             </div>)
                    })
                }

            </div>
            <div className='w-[145px] h-40[px]'>
              <button type = "submit"> <Button {...propsButton}/></button>
            </div>                
            </form>
           
        </div>
    )
}