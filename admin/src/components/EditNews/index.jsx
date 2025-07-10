import React, { useRef, useState, useMemo, useEffect } from 'react'
import CustomButton from '../ButtonLayout'
import { PlusIcon, OpenIcon, SaveIcon } from '../Icon'
const EditNews = ({
    categories,
    displays,
    currentCategory,
    currentDisplay,
    form,
    setForm
}) => {
    const inputRef = useRef();
    const handleButtonClick = () => {
        inputRef.current.click();
    }
    const handleChange= (e) => {
        const file = e.target.files[0];
        if(file){
            setFile(file.name)
            setForm((prev) => ({ ...prev, "link_image": file.name }));
        }
    }
    const [file, setFile] = useState(null);
    const [dropdownOpenCategory, setDropDownOpenCategory] = useState(false);
    const [dropdownOpenDisplay, setDropDownOpenDisplay] = useState(false);
    // const [category, setCategory] = useState(currentCategory);
    // const [display, setDisplay] = useState(currentDisplay)
    const wrapperCategoryRef = useRef();
    const wrapperDisplayRef = useRef();
    const truncateCategories = useMemo(()=>{
        if(!categories){
            return;
        }
        return categories.map((category)=>{
            return category.slice(0, 20);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const truncateDisplays = useMemo(()=>{
        if(!displays){
            return;
        }
        return displays.map((display)=>{
            return display.slice(0, 20);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
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
    const handleButton = () => {
        console.log(form)
    }
    return (
        <div className='flex flex-col flex-1 gap-6 max-w-[25%]'>
            <div className='bg-white p-6 flex flex-col gap-6 rounded-lg shadow-sm border border-gray-200 overflow-x-hidden overflow-y-hidden h-[40%]'>
                <h3 className='text-2xl font-semibold text-[#09090B]'>Cài đặt bài viết</h3>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-3 pt-1'>
                        <label htmlFor="" className='text-sm font-medium '>Loại tin tức <span style={{color: "red"}}>*</span></label>
                        <div className='flex flex-row gap-2'>
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
                                    setDropDownOpenCategory(!dropdownOpenCategory);
                                }}
                            >
                                <div ref={wrapperCategoryRef} className='flex flex-row gap-2 items-center justify-center relative w-42 px-5'>
                                    <span>{truncateCategories[categories.indexOf(form.category_name)]}</span>
                                    <OpenIcon/>
                                    {
                                        dropdownOpenCategory && (
                                            <ul className="absolute z-10 left-0 py-2 top-8 w-full bg-[#F9FAFB] rounded-md shadow-md max-h-[200px] overflow-y-auto"
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
                            <CustomButton
                                backgroundColor="white"
                                borderColor="#e4e4e7"
                                hoverBackgroundColor="#f3f4f6"
                                textColor="#364153"
                                hoverTextColor="#364153"
                                paddingX={16}
                                height={45}
                            ><PlusIcon/></CustomButton>
                        </div>
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
                        >
                            <div ref={wrapperDisplayRef} className='flex flex-row gap-14 items-center justify-center relative px-5'>
                                <span></span>
                                <span>{truncateDisplays[displays.indexOf(form.isPublished)]}</span>
                                <OpenIcon/>
                                {
                                    dropdownOpenDisplay && (
                                        <ul className="absolute z-10 left-0 py-2 top-8 w-full bg-[#F9FAFB] rounded-md shadow-md max-h-[200px] overflow-y-auto"
                                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                        >
                                            {displays.map((item, index) => (
                                                <li
                                                    key={index}
                                                    className='py-2 hover:bg-gray-100 cursor-pointer text-sm text-center text-gray-700'
                                                    onClick={(e)=> {
                                                        e.preventDefault();
                                                        setForm((prev) => ({...prev, ["isPublished"]: item}));
                                                        setDropDownOpenDisplay(false);
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
                        value={form.link_image}
                        onChange={(e) => setForm((prev) => ({ ...prev, ["link_image"]: e.target.value }))}
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
                        hoverBackgroundColor="#f3f4f6"
                        textColor="#364153"
                        hoverTextColor="#364153"
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
                    onClick={handleButton}
                >
                    <div className='flex gap-4 items-center'>
                        <SaveIcon/>
                        <span>Lưu tin tức</span>
                        <span></span>
                    </div>
                </CustomButton>
                <CustomButton
                    backgroundColor="white"
                    borderColor="#e4e4e7"
                    hoverBackgroundColor="#f3f4f6"
                    textColor="#364153"
                    hoverTextColor="#364153"
                    paddingX={16}
                    height={45}
                >
                    <span>Hủy</span>
                </CustomButton>
            </div>
        </div>
    )
}

export default EditNews