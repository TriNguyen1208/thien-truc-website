import React, { useRef, useState } from 'react'
import CustomButton from '../ButtonLayout'
import { PlusIcon, OpenIcon, SaveIcon } from '../Icon'

const EditProject = () => {
    const inputRef = useRef();
    const handleButtonClick = () => {
        inputRef.current.click();
    }
    const handleChange= (e) => {
        const file = e.target.files[0];
        if(file){
            setFile(file.name)
        }
    }
    const [file, setFile] = useState(null);
    return (
        <div className='flex flex-col flex-1 gap-6 max-w-[25%]'>
            <div className='bg-white p-6 flex flex-col gap-6 rounded-lg shadow-sm border border-gray-200 overflow-x-hidden '>
                <h3 className='text-2xl font-semibold text-[#09090B]'>Cài đặt bài viết</h3>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-3 pt-1'>
                        <label htmlFor="" className='text-sm font-medium '>Khu vực dự án <span style={{color: "red"}}>*</span></label>
                        <div className='flex flex-row gap-2 w-full'>
                            <CustomButton
                                backgroundColor="white"
                                borderColor="#e4e4e7"
                                hoverBackgroundColor="#d1d5dc"
                                textColor="#09090b"
                                height={45}
                            >
                                <div className='flex flex-row gap-2 items-center'>
                                    <span>Chọn khu vực</span>
                                    <OpenIcon/>
                                </div>
                            </CustomButton>
                            <CustomButton
                                backgroundColor="white"
                                borderColor="#e4e4e7"
                                hoverBackgroundColor="#d1d5dc"
                                textColor="#09090b"
                                paddingX={16}
                                height={45}
                            ><PlusIcon/></CustomButton>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 pt-1'>
                        <label htmlFor="" className='text-sm font-medium'>Vị trí cụ thể</label> 
                        <input 
                            type="text" 
                            className='px-4 h-10 text-sm rounded-md border border-[#e4e4e7] focus:border-gray-300 focus:outline-none'
                            placeholder='VD: Long Biên, Hà Nội'
                        />
                    </div>
                    <div className='flex flex-col gap-3 pt-1'>
                        <label htmlFor="" className='text-sm font-medium'>Thời gian hoàn thành</label> 
                        <input 
                            type="date" 
                            required 
                            className='px-4 h-10 text-sm rounded-md border border-[#e4e4e7] focus:border-gray-300 focus:outline-none'
                            placeholder='VD: Long Biên, Hà Nội'
                        />
                    </div>
                    <div className='flex flex-row gap-2'>
                        <input type="checkbox" id="display"/>
                        <label htmlFor="display" className='text-[#090908]'>Trưng bày ở trang chủ</label>
                    </div>
                </div>
            </div>  
            <div className='bg-white p-6 flex flex-col gap-6 rounded-lg shadow-sm border border-gray-200 overflow-x-hidden '>
                <h3 className='text-2xl font-semibold text-[#09090B]'>Ảnh đại diện</h3>
                <div className='flex flex-col gap-4'>
                    <input 
                        type="text" 
                        required 
                        className='px-4 h-10 text-sm rounded-md border border-[#e4e4e7] focus:border-gray-300 focus:outline-none'
                        placeholder='Nhập link ảnh'
                    />
                    <span className='text-center'>Hoặc</span>
                    <input
                        type="file"
                        accept="image/*"
                        ref={inputRef}
                        onChange={handleChange}
                        hidden
                    />
                    <CustomButton
                        backgroundColor="white"
                        borderColor="#e4e4e7"
                        hoverBackgroundColor="#d1d5dc"
                        textColor="#0a0a0a"
                        paddingX={16}
                        height={45}
                        onClick={handleButtonClick}
                    >
                        <span className='font-medium'>Nhập từ thiết bị</span>
                    </CustomButton>
                    <span className={`${file == null ? "hidden": ""}`}>{file != null && file.slice(0, 25)}</span>
                </div>
            </div>  
            <div className='flex flex-col gap-2'>
                <CustomButton
                    
                >
                    <div className='flex gap-4 items-center'>
                        <SaveIcon/>
                        <span>Lưu dự án</span>
                        <span></span>
                    </div>
                </CustomButton>
                <CustomButton
                    backgroundColor="white"
                    borderColor="#e4e4e7"
                    hoverBackgroundColor="#d1d5dc"
                    textColor="#0a0a0a"
                    paddingX={16}
                    height={45}
                >
                    <span>Hủy</span>
                </CustomButton>
            </div>
        </div>
    )
}

export default EditProject