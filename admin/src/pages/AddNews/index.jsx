import React, { useEffect, useMemo, useRef, useState } from 'react'
import {useNavigate} from "react-router-dom"
import { useLayout } from "@/layouts/layoutcontext";
import {Editor} from "@tinymce/tinymce-react"
import EditorWord from '../../components/EditorWord';
import CustomButton from '../../components/ButtonLayout';
import { PlusIcon } from '../../components/Icon';
import ContentManagement from '../../components/ContentManagement';
import EditNews from '../../components/EditNews';
import useNews from '../../hooks/useNews';
import useNavigationGuard from '../../hooks/useNavigationGuard';
import { useNavigationGuardContext } from '../../layouts/NavigatorProvider';
const AddNews = () => {
    const {setLayoutProps} = useLayout();
    const { setShouldWarn } = useNavigationGuardContext();
    useEffect(() => {
        setLayoutProps({
            title: "Thêm tin tức mới",
            description: "Tạo bài viết tin tức mới"
        })
    }, [])
    const initialForm = useMemo(() => ({
        title: "",
        main_content: "",
        content: "",
        category_name: "Chọn loại tin tức",
        isPublished: "Bản nháp",
        link_image: "",
    }), []);
    const [form, setForm] = useState(initialForm);
    const {data: categories, isLoading: isLoadingCategories} = useNews.news_categories.getAll();
    useEffect(() => {
        const isDirty = JSON.stringify(form) !== JSON.stringify(initialForm);
        setShouldWarn(isDirty);
    }, [form]);
    if(isLoadingCategories){
        return <></>
    }
    const handleSave = () => {
        //Them bai viet, call database
        setForm(initialForm);
    }
    const handleDelete = () => {
        //Xoa bai viet hien tai
        setForm(initialForm)
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
        onSave: handleSave,
        onDelete: handleDelete
    }
    return (
        <div className='flex flex-row gap-6'>
            <ContentManagement type="tin tức" setForm={setForm} form={form}/>
            <EditNews {...props} form={form} setForm={setForm}/>
        </div>
    )
}

export default AddNews