import React, { useEffect } from 'react'
import { useLayout } from '../../layouts/layoutcontext'
import CustomButton from '@/components/ButtonLayout'
import {SaveIcon} from "@/components/Icon"
import DynamicForm from "@/components/DynamicForm"
const RecruitmentPageContent = () => {
  const {setLayoutProps} = useLayout();
  useEffect(()=>{
    setLayoutProps({
      title: "Nội dung Trang tuyển dụng",
      description: "Quản lý nội dung hiển thị trên trang tuyển dụng",
    })
  }, [])
  return (
    <div className='flex flex-col gap-5'>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-hidden px-6">
            <div className='flex flex-col gap-1 py-5'>
              <span className='text-[#09090B] text-2xl font-bold'>Banner Trang tuyển dụng</span>
              <span className='text-[#71717A] text-sm '>Chỉnh sửa tiêu đề và mô tả banner</span>
            </div>
            <form action="" className='flex flex-col gap-1 mb-6'>
              <div className='py-1 flex flex-col gap-3'>
                <label htmlFor="titleBanner" className='text-sm text-[#09090B] font-semibold'>Tiêu đề Banner <span style={{ color: 'red' }}>*</span> </label>
                <input 
                  id="titleBanner" 
                  type="text" 
                  className='px-[13px] py-3 rounded-md text-sm border border-[#e4e4e7] focus:border-gray-300 focus:outline-none'
                  required
                />
              </div>
              <div className='py-1 flex flex-col gap-3'>
                <label htmlFor="descriptionBanner" className='text-sm text-[#09090B] font-semibold'>Mô tả Banner <span style={{ color: 'red' }}>*</span></label>
                <textarea 
                  rows={5} 
                  className='px-[13px] py-3 rounded-md text-sm border border-[#e4e4e7] focus:border-gray-300 focus:outline-none' 
                  required/>
              </div>
            </form>
            <div className='mb-6'>
              <CustomButton
                height="40"
                fontSize="14"
                paddingX="16"
              >
                  <SaveIcon/>
                  <span>Lưu Banner</span>
              </CustomButton>
            </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-hidden px-6">
            <div className='flex flex-col gap-1 py-5'>
              <span className='text-[#09090B] text-2xl font-bold'>Văn hóa của chúng tôi</span>
              <span className='text-[#71717A] text-sm '>Đoạn văn có thể xuống dòng</span>
            </div>
            <form action="" className='flex flex-col gap-1 mb-6'>
              <div className='py-1 flex flex-col gap-3'>
                <label htmlFor="descriptionBanner" className='text-sm text-[#09090B] font-semibold'>Nội dung văn hóa công ty <span style={{ color: 'red' }}>*</span></label>
                <textarea 
                  rows={5} 
                  className='px-[13px] py-3 rounded-md text-sm border border-[#e4e4e7] focus:border-gray-300 focus:outline-none' 
                  required/>
              </div>
            </form>
            <div className='mb-6'>
              <CustomButton
                height="40"
                fontSize="14"
                paddingX="16"
              >
                  <SaveIcon/>
                  <span>Lưu văn hóa</span>
              </CustomButton>
            </div>
        </div>
    </div>
  )
}

export default RecruitmentPageContent