import React, { useEffect, useRef, useState } from 'react'
import {useNavigate} from "react-router-dom"
import { useLayout } from "@/layouts/layoutcontext";
import {Editor} from "@tinymce/tinymce-react"
import EditorWord from '../../components/EditorWord';
import CustomButton from '../../components/ButtonLayout';
import { PlusIcon } from '../../components/Icon';
import ContentManagement from '../../components/ContentManagement';
import EditNews from '../../components/EditNews';
import useNews from '../../hooks/useNews';
const AddNews = () => {
    const {setLayoutProps} = useLayout();
    useEffect(() => {
        setLayoutProps({
            title: "Thêm tin tức mới",
            description: "Tạo bài viết tin tức mới"
        })
    }, [])
    const [form, setForm] = useState({
        title: "",
        main_content: "",
        content: "",
        category_name: "Chọn loại tin tức",
        isPublished: "Bản nháp",
        link_image: "",
    })
    const {data: categories, isLoading: isLoadingCategories} = useNews.news_categories.getAll();
    if(isLoadingCategories){
        return <></>
    }
    const props = {
        categories: [
            "Chọn loại tin tức",
            ...(categories ?? []).map(item => item.name)
        ],
        displays: [
            "Bản nháp",
            "Trưng bày"
        ],
        currentCategory: "Chọn loại tin tức",
        currentDisplay: "Bản nháp",
    }
    return (
        <div className='flex flex-row gap-6'>
            <ContentManagement type="tin tức" setForm={setForm} form={form}/>
            <EditNews {...props} form={form} setForm={setForm}/>
        </div>
    )
}

export default AddNews