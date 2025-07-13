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
import { useParams } from 'react-router-dom';
const EditNewsPage = () => {
    const {id: news_id} = useParams();
    const {data: news_contents, isLoading: isLoadingNewsContent} = useNews.news_contents.getOne(news_id);
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
            description: "Tạo bài viết tin tức mới",
            hasButtonBack: true,
        })
    }, [])
    const initialForm = useMemo(() => {
        if (isLoadingNewsContent) return null;
        return {
            title: news_contents.news.title ?? '',
            main_content: news_contents.news.main_content ?? '',
            content: news_contents.content ?? '',
            category_name: news_contents.news.category.name ?? '',
            isPublished: "Bản nháp",
            main_image: news_contents.news.main_img ?? null,
            link_image: '',
            countWord: 0
        };
    }, [isLoadingNewsContent]);

    const [form, setForm] = useState(null);

    useEffect(() => {
        if (initialForm) {
            setForm(initialForm);
        }
    }, [initialForm]);

    const {data: categories, isLoading: isLoadingCategories} = useNews.news_categories.getAll();
    useEffect(() => {
        const isDirty = JSON.stringify(form) !== JSON.stringify(initialForm);
        setShouldWarn(isDirty);
    }, [form]);
    if(isLoadingCategories || isLoadingNewsContent){
        return <></>
    }
    const handleSave = async () => {
        if(form.isPublished == "Trưng bày" && (form.title.length == 0 || form.main_content.length == 0 || form.content.length == 0)){
            alert("Chưa nhập những nội dung bắt buộc")
            return;
        }
        if(form == initialForm){
            alert("❌ Chưa có sự thay đổi nào");
            return;
        }
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
        setForm(initialForm);
    }
    const handleDelete = () => {
        //Xoa bai viet hien tai
    }
    const handleRecover = () => {
        setForm(initialForm)
    }
    const props = {
        categories: [
            ...(categories ?? []).map(item => item.name)
        ],
        displays: [
            "Bản nháp",
            "Trưng bày"
        ],
        currentCategory: "Công Ty",
        currentDisplay: "Bản nháp",
        onSave: handleSave,
        onRecover: handleRecover,
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

export default EditNewsPage