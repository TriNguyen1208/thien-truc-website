import CustomButton from '../ButtonLayout'
import { PlusIcon, OpenIcon, SaveIcon } from '../Icon'
import React, { useRef, useState, useMemo, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
const ProjectSetting = ({
    regions,
    form, 
    setForm,
}) => {
    const [dropdownOpenRegions, setDropDownOpenRegions] = useState(false);
    const wrapperRegionRef = useRef();

    useEffect(()=>{
        const handleClickOutside = (e) => {
            if (
                wrapperRegionRef.current &&
                !wrapperRegionRef.current.contains(e.target)
            ) {
                setDropDownOpenRegions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside); //lang nghe du kien click chuot
        return () => document.removeEventListener('mousedown', handleClickOutside); //go bo su kien event listener. Tranh lap lai nhieu lan
    })
    return (
        <div className='bg-white p-6 flex flex-col gap-6 rounded-lg shadow-sm border border-gray-200 overflow-visible '>
            <h3 className='text-2xl font-semibold text-[#09090B]'>Cài đặt bài viết</h3>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-3 pt-1'>
                    <label htmlFor="" className='text-sm font-medium '>Khu vực dự án <span style={{color: "red"}}>*</span></label>
                    <CustomButton
                        backgroundColor="white"
                        borderColor="#e4e4e7"
                        hoverBackgroundColor="#f3f4f6"
                        textColor="#364153"
                        hoverTextColor="#364153"
                        height={45}
                        paddingX={0}
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setDropDownOpenRegions(!dropdownOpenRegions);
                        }}
                        position='relative'
                    >
                        <div ref={wrapperRegionRef} className='flex flex-row items-center justify-center px-5'>
                            <span className='line-clamp-1'>{form.region_name}</span>
                            {
                                dropdownOpenRegions && (
                                    <ul className="absolute z-10 left-0 py-2 top-12 w-full bg-[#F9FAFB] rounded-md shadow-md max-h-[200px] overflow-y-auto"
                                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                    >
                                        {regions.map((item, index) => (
                                            <li
                                                key={index}
                                                className='py-2 hover:bg-gray-100 cursor-pointer text-sm text-center text-gray-700'
                                                onClick={(e)=> {
                                                    e.preventDefault();
                                                    setForm((prev) => ({...prev, ["region_name"]: item}));
                                                    setDropDownOpenRegions(false);
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
                    <label htmlFor="" className='text-sm font-medium'>Vị trí cụ thể</label> 
                    <input 
                        type="text" 
                        className='px-4 h-10 text-sm rounded-md border border-[#e4e4e7] focus:border-gray-300 focus:outline-none'
                        placeholder='VD: Long Biên, Hà Nội'
                        value={form.province}
                        onChange={(e) => {
                            const value = e.target.value;
                            setForm((prev) => ({ ...prev, province: value }));
                        }}
                    />
                </div>
                <div className='flex flex-col gap-3 pt-1'>
                    <label htmlFor="" className='text-sm font-medium'>Thời gian hoàn thành</label> 
                    <DatePicker
                        selected={form.completeTime}
                        onChange={(date) => {
                            setForm((prev) => ({ ...prev, ['completeTime']: date }));
                        }}
                        maxDate={new Date()}
                        dateFormat="dd/MM/yyyy"
                        className="px-4 w-full h-10 text-sm rounded-md border border-[#e4e4e7] focus:border-gray-300 focus:outline-none"
                        placeholderText="Chọn ngày hoàn thành"
                    />
                </div>
                <div className='flex flex-row gap-2'>
                    <input 
                        type="checkbox" 
                        id="display" 
                        checked={form.isFeatured}
                        onChange={(e) => {
                            const checked = e.target.checked;
                            setForm((prev) => ({ ...prev, isFeatured: checked }));
                        }}
                    />

                    <label htmlFor="display" className='text-[#090908]'>Trưng bày ở trang chủ</label>
                </div>
            </div>
        </div>  
    )
}

export default ProjectSetting