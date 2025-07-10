import React, { useEffect, useRef } from 'react'
import {useNavigate} from "react-router-dom"
import { useLayout } from "@/layouts/layoutcontext";
import {Editor} from "@tinymce/tinymce-react"
import EditorWord from '../../components/EditorWord';
import CustomButton from '../../components/ButtonLayout';
import { PlusIcon } from '../../components/Icon';
import ContentManagement from '../../components/ContentManagement';
import EditProject from '../../components/EditProject';
const AddNews = () => {
    const {setLayoutProps} = useLayout();
    useEffect(() => {
        setLayoutProps({
            title: "Thêm dự án mới",
            description: "Tạo bài viết dự án mới"
        })
    }, [])

    return (
        <div className='flex flex-row gap-6'>
            <ContentManagement/>
            <EditProject/>
        </div>
      
    )
}

export default AddNews