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
import {SuccessPopup, CancelPopup} from '@/components/Popup'
import extractBlobImage from '../../utils/extractBlobImage';
const AddNews = () => {
    const [openPopup, setOpenPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [openErrorPopup, setOpenErrorPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const {setLayoutProps} = useLayout();
    const { setShouldWarn } = useNavigationGuardContext();
    const postNews = useNews.news_contents.postOne({
        onSuccess: (res) => {
            setPopupMessage(res.message || 'Cập nhật thành công!');
            setOpenPopup(true);
        },
        onError: (err) => {
            const msg = err?.response?.data?.message || 'Cập nhật thất bại!';
            setErrorMessage(msg);
            setOpenErrorPopup(true);
        }
    })
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
        main_image: "",
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
    const handleSave = async () => {
        //Them bai viet, call database
        const {formData, doc} = await extractBlobImage(form.content);
        const finalHTML = doc.body.innerHTML;
        // Duyệt qua tất cả key
        for (const key in form) {
            if (key === 'main_image' && form[key] instanceof File) {
                formData.append('main_image', form[key]);
            } else if (key === 'content') {
                formData.append('content', finalHTML); // content đã thay blob thành filename
            } else {
                formData.append(key, form[key]);
            }
        }
        postNews.mutate(formData);
        console.log(form);
        console.log([...formData.entries()]);        
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
        <>
            <SuccessPopup
                open={openPopup}
                setOpen={setOpenPopup}
                notification={popupMessage}
                subTitle="Cảm ơn bạn đã gửi"
                buttonLabel1="Thoát"
                buttonLabel2="Tiếp tục chỉnh sửa"
            />
            <CancelPopup
                open={openErrorPopup}
                setOpen={setOpenErrorPopup}
                notification={errorMessage}
                subTitle="Vui lòng thử lại hoặc liên hệ quản trị viên"
                buttonLabel1="Đóng"
                buttonLabel2="Thử lại"
            />
            <div className='flex flex-row gap-6'>
                <ContentManagement type="tin tức" setForm={setForm} form={form}/>
                <EditNews {...props} form={form} setForm={setForm}/>
            </div>
        </>
        
    )
}

export default AddNews