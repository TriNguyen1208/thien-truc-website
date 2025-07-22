import { useEffect, useMemo, useState } from 'react'
import { useLayout } from "@/layouts/layoutcontext";
import UploadImage from '../../components/UploadImage'
import CustomButton from '../../components/ButtonLayout';
import { SaveIcon, RecoveryIcon } from '../../components/Icon';
import ContentManagement from '../../components/ContentManagement';
import PostSettings from '../../components/PostSettings';
import useNews from '../../hooks/useNews';
import { useNavigationGuardContext } from '../../layouts/NavigatorProvider';
import { extractBlogImages } from '../../utils/handleImage';
import Notification from '@/components/Notification'
import Loading from '../../components/Loading';
function normalizeContent(content = '') {
    return content
        .replace(/\r\n/g, '\n') // chuẩn hóa xuống dòng
        .replace(/&nbsp;/g, ' ') // nếu có dùng &nbsp;
        .trim();
}
function normalizeForm(form) {
    return {
        ...form,
        content: normalizeContent(form.content),
        // nếu có nhiều field HTML thì thêm normalize ở đây
    };
}
const AddNews = () => {
    //useState
    const [form, setForm] = useState(null);
    const [saveOpen, setSaveOpen] = useState(false);
    const [recoverOpen, setRecoverOpen] = useState(false);
    //Call API
    const {data: categories, isLoading: isLoadingCategories} = useNews.news_categories.getAll();
    const {mutate: mutateNews, isPending: isPendingNews} = useNews.news_contents.postOne()
    //set layout 
    const {setLayoutProps} = useLayout();
    useEffect(() => {
        setLayoutProps({
            title: "Thêm tin tức mới",
            description: "Tạo bài viết tin tức mới",
            hasButtonBack: true,
        })
    }, [])

    //check is change
    const { setShouldWarn } = useNavigationGuardContext(); 
    const initialForm = useMemo(() => {
        if (isLoadingCategories) return null;
        return {
            title: "",
            main_content: "",
            content: "",
            category_name: (categories?.[0]?.name) ?? '',
            isPublished: "Bản nháp",
            main_image: "",
            link_image: "",
            countWord: 0
        }
    }, [isLoadingCategories]);
    useEffect(() => {
        if (initialForm) {
            setForm(initialForm);
        }
    }, [initialForm]);
    useEffect(() => {
        if(form == null || initialForm == null){
            return;
        }
        const isDirty = JSON.stringify(normalizeForm(form)) !== JSON.stringify(normalizeForm(initialForm));
        setShouldWarn(isDirty);
    }, [form]);

    //Helper function
    const handleSave = async () => {
        if(form.isPublished == "Đã xuất bản" && (form.title.length == 0 || form.main_content.length == 0 || form.content.length == 0)){
            alert("Chưa nhập những nội dung bắt buộc")
            setSaveOpen(false);
            return;
        }
        if(form == initialForm){
            alert("❌ Chưa có sự thay đổi nào");
            setSaveOpen(false);
            return;
        }
        //Them bai viet, call database
        const {formData, doc} = await extractBlogImages(form.content);
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
        mutateNews(formData);  
        setForm(initialForm);
        setSaveOpen(false);
    }
    const handleRecover = () => {
        setForm(initialForm)
        setRecoverOpen(false);
    }

    //Prop setting
    const props = {
        categories: [
            ...(categories ?? []).map(item => item.name)
        ],
        displays: [
            "Bản nháp",
            "Đã xuất bản"
        ]
    }
    //Popup
    const savePopupData = {
        open: saveOpen,
        setOpen: setSaveOpen,
        notification: 'Bạn có chắc chắn muốn lưu tin tức này?',
        subTitle: 'Hành động này sẽ không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?',
        buttonLabel1: 'Hủy',
        buttonAction1: ()=>{setSaveOpen(false)},
        buttonLabel2: 'Lưu',
        buttonAction2: handleSave
    };
    const recoverPopupData = {
        open: recoverOpen,
        setOpen: setRecoverOpen,
        notification: 'Bạn có chắc chắn muốn khôi phục tin tức này?',
        subTitle: 'Hành động này sẽ không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?',
        buttonLabel1: 'Hủy',
        buttonAction1: ()=>{setRecoverOpen(false)},
        buttonLabel2: 'Khôi phục',
        buttonAction2: handleRecover
    };
    //Loading
    if(isLoadingCategories || form === null || isPendingNews){
        return <Loading/>
    }

    return (
        <>
            <div className='flex flex-row gap-6'>
                <ContentManagement type="tin tức" setForm={setForm} form={form}/>
                <div className='flex flex-col flex-1 gap-6 max-w-[300px]'>
                    <PostSettings {...props} form={form} setForm={setForm}/>
                    <UploadImage form={form} setForm={setForm}/>
                    <div className='flex flex-col gap-2'>
                        <CustomButton
                            onClick={() => setSaveOpen(true)}
                        >
                            <div className='flex gap-4 items-center'>
                                <SaveIcon/>
                                <span>Lưu thay đổi</span>
                                <span></span>
                            </div>
                        </CustomButton>
                        <CustomButton
                            onClick={() => setRecoverOpen(true)}
                        >
                            <div className='flex gap-6 items-center'>
                                <RecoveryIcon/>
                                <span>Khôi phục</span>
                                <span></span>
                            </div>
                        </CustomButton>                    
                    </div>
                </div>
            </div>
            <Notification {...savePopupData}/>
            <Notification {...recoverPopupData}/>
        </>
    )
}

export default AddNews