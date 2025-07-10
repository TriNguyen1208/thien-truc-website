import React, { useEffect, useRef } from 'react'
import {useNavigate} from "react-router-dom"
import { useLayout } from "@/layouts/layoutcontext";
import {Editor} from "@tinymce/tinymce-react"
import EditorWord from '../../components/EditorWord';
import CustomButton from '../../components/ButtonLayout';
import { PlusIcon } from '../../components/Icon';
import ContentManagement from '../../components/ContentManagement';
import EditNews from '../../components/EditNews';
const AddNews = () => {
    const {setLayoutProps} = useLayout();
    useEffect(() => {
        setLayoutProps({
            title: "Thêm tin tức mới",
            description: "Tạo bài viết tin tức mới"
        })
    }, [])

    const editorRef = useRef(null);
    return (
        <div className='flex flex-row gap-6'>
            <ContentManagement/>
            <EditNews/>
        </div>
      
    )
}

export default AddNews