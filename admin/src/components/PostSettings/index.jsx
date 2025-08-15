import React, { useRef, useState, useMemo, useEffect } from 'react'
import CustomButton from '../ButtonLayout'
import { PlusIcon, OpenIcon, SaveIcon } from '../Icon'
import UploadImage from '../UploadImage';
import SaveEdit from '../SaveEdit';
const PostSettings = ({
    categories,
    displays,
    form,
    setForm,
}) => {
    
    const [dropdownOpenCategory, setDropDownOpenCategory] = useState(false);
    const [dropdownOpenDisplay, setDropDownOpenDisplay] = useState(false);
    const wrapperCategoryRef = useRef();
    const wrapperDisplayRef = useRef();
    useEffect(()=>{
        const handleClickOutside = (e) => {
            if (
              wrapperCategoryRef.current &&
              !wrapperCategoryRef.current.contains(e.target)
            ) {
              setDropDownOpenCategory(false);
            }
          
            if (
              wrapperDisplayRef.current &&
              !wrapperDisplayRef.current.contains(e.target)
            ) {
              setDropDownOpenDisplay(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside); //lang nghe du kien click chuot
        return () => document.removeEventListener('mousedown', handleClickOutside); //go bo su kien event listener. Tranh lap lai nhieu lan
    })
    
    return (
        <div className='bg-white p-6 flex flex-col gap-6 rounded-lg shadow-sm border border-gray-200 overflow-visible'>
            <h3 className='text-2xl font-semibold text-[#09090B]'>Cài đặt bài viết</h3>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-3 pt-1'>
                    <label htmlFor="" className='text-sm font-medium '>Loại tin tức <span style={{color: "red"}}>*</span></label>
                    <CustomButton
                        backgroundColor="white"
                        borderColor="#e4e4e7"
                        hoverBackgroundColor="#f3f4f6"
                        textColor="#364153"
                        hoverTextColor="#364153"
                        paddingX={0}
                        height={45}
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setDropDownOpenCategory(!dropdownOpenCategory);
                        }}
                        position='relative'
                    >
                        <div ref={wrapperCategoryRef} className='flex flex-row items-center justify-center px-5'>
                            <span className='line-clamp-1'>{form.category_name}</span>
                            {
                                dropdownOpenCategory && (
                                    <ul className="absolute z-[100] left-0 py-2 top-12 w-full bg-[#F9FAFB] rounded-md shadow-md max-h-[200px] overflow-y-auto"
                                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                    >
                                        {categories.map((item, index) => (
                                            <li
                                                key={index}
                                                className='py-2 hover:bg-gray-100 cursor-pointer text-sm text-center text-gray-700'
                                                onClick={(e)=> {
                                                    e.preventDefault();
                                                    setForm((prev) => ({...prev, ["category_name"]: item}));
                                                    setDropDownOpenCategory(false);
                                                }}
                                            >
                                                <span className='break-words'>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) 
                            }
                        </div>
                    </CustomButton>
                </div>
                <div className='flex flex-col gap-3 pt-1'>
                    <label htmlFor="" className='text-sm font-medium'>Trạng thái <span style={{color: "red"}}>*</span></label> 
                    <CustomButton
                        backgroundColor="white"
                        borderColor="#e4e4e7"
                        hoverBackgroundColor="#f3f4f6"
                        textColor="#364153"
                        hoverTextColor="#364153"
                        paddingX={0}
                        height={45}
                        onClick={(e) => {
                            e.stopPropagation();
                            setDropDownOpenDisplay(!dropdownOpenDisplay);
                        }}
                        position='relative'
                    >
                        <div ref={wrapperDisplayRef} className='flex flex-row items-center justify-center px-5'>
                            <span className='line-clamp-1'>{form.isPublished == true ? "Đã xuất bản" : "Bản nháp"}</span>
                            {
                                dropdownOpenDisplay && (
                                    <ul className="absolute z-10 left-0 py-2 top-12 w-full bg-[#F9FAFB] rounded-md shadow-md max-h-[200px] overflow-y-auto"
                                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                    >
                                        {displays.map((item, index) => (
                                            <li
                                                key={index}
                                                className='py-2 hover:bg-gray-100 cursor-pointer text-sm text-center text-gray-700'
                                                onClick={(e)=> {
                                                    e.preventDefault();
                                                    setForm((prev) => ({...prev, ["isPublished"]: item.state}));
                                                    setDropDownOpenDisplay(false);
                                                }}
                                            >
                                                <span className='break-words'>{item.str}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) 
                            }
                        </div>
                    </CustomButton>
                </div>
            </div>
        </div>  
    )
}

export default PostSettings