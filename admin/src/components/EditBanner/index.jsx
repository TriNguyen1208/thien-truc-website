import Button from '@/components/Button'
import {SaveIcon}  from '@/components/Icon';
import { useRef } from 'react';
import Input from './Input';

export default function EditBanner({
    title, 
    description, 
    listInput,
    saveButton
}){
    const inputRefs = listInput.map(()=>{
        return useRef()
    })
    const handleSaveButton = (e) => {
        e.preventDefault()
        if(saveButton){
            const result = {}
            inputRefs.map((inputRef, index) => {
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
                        return(
                            <div key = {index}>
                                <Input  {...props}/>
                            </div>)
                    })
                }
                </div>
                <div className='w-fit h-40[px]'>
                    <button className='w-full' type = "submit"> 
                        <Button {...propsButton}/>
                    </button>
                </div>                
            </form>
        </div>
    )
}