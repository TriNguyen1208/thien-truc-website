import React from 'react'
import {Editor} from "@tinymce/tinymce-react"
import EditorWord from '../../components/EditorWord';
import CustomButton from '../../components/ButtonLayout';
import { PlusIcon } from '../../components/Icon';
const ContentManagement = () => {
  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-hidden w-[75%]'>
        <div className='flex flex-col p-6'>
            <h3 className='text-2xl font-semibold text-[#09090B]'>Nội dung tin tức</h3>
            <p className='text-sm font-normal text-[#71717A]'>Thông tin chính của bài viết</p>
        </div>
        <div className='flex flex-col gap-4 pb-6 px-6'>
            <div className='flex flex-col gap-3'>
                <label htmlFor="" className='text-[#09090b] font-medium'>Tiêu đề tin tức <span style={{color: "red"}}>*</span></label>
                <input 
                    type="text" 
                    required 
                    className='px-4 h-10 text-sm rounded-md border border-[#e4e4e7] focus:border-gray-300 focus:outline-none'
                    placeholder='Nhập tiêu đề tin tức...'
                />
            </div>
            <div className='flex flex-col gap-3'>
                <label htmlFor="" className='text-[#09090b] font-medium'>Nội dung tóm tắt tin tức</label>
                <input 
                    type="text"  
                    className='px-4 h-10 text-sm rounded-md border border-[#e4e4e7] focus:border-gray-300 focus:outline-none'
                    placeholder='Nhập nội dung tóm tắt tin tức...'
                />
            </div>
            <div className='flex flex-col gap-3'>
                <label htmlFor="" className='text-[#09090b] font-medium'>Nội dung tin tức <span style={{color: "red"}}>*</span></label>
                <EditorWord/>
            </div>
        </div>
    </div>
  )
}

export default ContentManagement