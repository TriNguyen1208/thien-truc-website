import React from 'react'
import {Editor} from "@tinymce/tinymce-react"
import EditorWord from '../../components/EditorWord';
import CustomButton from '../../components/ButtonLayout';
import { PlusIcon } from '../../components/Icon';
import { useState } from 'react';
const ContentManagement = ({
    type, //tin tuc hoac du an
    form,
    setForm
}) => {
    const handleChangeDataForm = (e) => {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]: value}));
    }
    return (
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-hidden w-[75%]'>
            <div className='flex flex-col p-6'>
                <h3 className='text-2xl font-semibold text-[#09090B]'>Nội dung {type}</h3>
                <p className='text-sm font-normal text-[#71717A]'>Thông tin chính của {type}</p>
            </div>
            <div className='flex flex-col gap-4 pb-6 px-6'>
                <div className='flex flex-col gap-3'>
                    <label htmlFor="" className='text-[#09090b] font-medium'>Tiêu đề {type} <span style={{color: "red"}}>*</span></label>
                    <input 
                        type="text" 
                        name="title"
                        value={form.title}
                        onChange={handleChangeDataForm}
                        className='px-4 h-10 text-sm rounded-md border border-[#e4e4e7] focus:border-gray-300 focus:outline-none'
                        placeholder={`Nhập tiêu đề ${type}...`}

                    />
                </div>
                <div className='flex flex-col gap-3'>
                    <label htmlFor="" className='text-[#09090b] font-medium'>Nội dung tóm tắt {type}</label>
                    <input 
                        type="text"  
                        name="main_content"
                        value={form.main_content}
                        onChange={handleChangeDataForm}
                        className='px-4 h-10 text-sm rounded-md border border-[#e4e4e7] focus:border-gray-300 focus:outline-none'
                        placeholder={`Nhập nội dung tóm tắt ${type}...`}
                    />
                </div>
                <div className='flex flex-col gap-3'>
                    <label htmlFor="" className='text-[#09090b] font-medium'>Nội dung {type} <span style={{color: "red"}}>*</span></label>
                    <EditorWord form={form} setForm={setForm}/>
                </div>
            </div>
        </div>
    )
}

export default ContentManagement