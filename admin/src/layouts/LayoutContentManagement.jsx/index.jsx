import React, { useEffect, useRef } from 'react'
import {useNavigate} from "react-router-dom"
import { useLayout } from "@/layouts/layoutcontext";
import {Editor} from "@tinymce/tinymce-react"
import EditorWord from '../../components/EditorWord';
import CustomButton from '../../components/ButtonLayout';
import { PlusIcon } from '../../components/Icon';
const LayoutContentManagement = () => {
    const {setLayoutProps} = useLayout();
    useEffect(() => {
        setLayoutProps({
            title: "Thêm tin tức mới",
            description: "Tạo bài viết tin tức mới"
        })
    }, [])

    const editorRef = useRef(null);
    return (
        <>
            <div className='flex flex-row gap-6'>
                
                <div className='flex flex-col flex-1 gap-6'>
                    <div className='bg-white p-6 flex flex-col gap-6 rounded-lg shadow-sm border border-gray-200 overflow-x-hidden '>
                        <h3 className='text-2xl font-semibold text-[#09090B]'>Cài đặt bài viết</h3>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-3 pt-1'>
                                <label htmlFor="" className='text-sm font-medium '>Loại tin tức <span style={{color: "red"}}>*</span></label>
                                <div className='flex flex-row gap-2'>
                                    <CustomButton

                                    >
                                        <span>Sản phẩm</span>
                                    </CustomButton>
                                    <CustomButton><PlusIcon/></CustomButton>
                                </div>
                            </div>
                            <div className='flex flex-col gap-3 pt-1'>
                                <label htmlFor="" className='text-sm font-medium'>Trạng thái <span style={{color: "red"}}>*</span></label> 
                                <button></button>
                            </div>
                        </div>
                    </div>  
                    <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200 overflow-x-hidden '>

                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </>
      
    )
}

export default LayoutContentManagement