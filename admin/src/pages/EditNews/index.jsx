import { useEffect, useState } from 'react'
import { useLayout } from "@/layouts/layoutcontext";
import UploadImage from '../../components/UploadImage'
import CustomButton from '../../components/ButtonLayout';
import { SaveIcon, DeleteIcon, RecoveryIcon } from '../../components/Icon';
import ContentManagement from '../../components/ContentManagement';
import PostSettings from '../../components/PostSettings';
import useNews from '../../hooks/useNews';
import { useNavigationGuardContext } from '../../layouts/NavigatorProvider';
import { addDeleteImage, extractBlogImages } from '../../utils/handleImage';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const EditNews = () => {
    //navigate
    const navigate = useNavigate();
    //getID URL
    const {id: news_id} = useParams();
    //useState
    const [form, setForm] = useState(null);
    const [initialForm, setInitialForm] = useState(null);
    //Call API
    const {data: news_contents, isLoading: isLoadingNewsContent} = useNews.news_contents.getOne(news_id);
    const {data: categories, isLoading: isLoadingCategories} = useNews.news_categories.getAll();
    const updateNews = useNews.news_contents.updateOne()
    const deleteNews = useNews.news.deleteOne();
    //set layout 
    const {setLayoutProps} = useLayout();
    useEffect(() => {
        setLayoutProps({
            title: "Cập nhật tin tức",
            description: "Chỉnh sửa nội dung tin tức",
            hasButtonBack: true,
        })
    }, [])

    //check is change
    const { setShouldWarn } = useNavigationGuardContext();
    useEffect(() => {
        if (isLoadingNewsContent) return;
        setInitialForm({
            title: news_contents.news.title ?? '',
            main_content: news_contents.news.main_content ?? '',
            content: news_contents.content ?? '',
            category_name: news_contents.news.category.name ?? '',
            isPublished: news_contents.news.is_published ? "Trưng bày" : "Bản nháp",
            main_image: '',
            link_image: news_contents.news.main_img ?? null,
            countWord: news_contents.content.replace(/<[^>]+>/g, '').trim().length
        });
    }, [isLoadingNewsContent]) 

    useEffect(() => {
        if (initialForm) {
            setForm(initialForm);
        }
    }, [initialForm]);
    useEffect(() => {
        if(form == null || initialForm == null){
            return;
        }
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
        const isDirty = JSON.stringify(normalizeForm(form)) !== JSON.stringify(normalizeForm(initialForm));
        setShouldWarn(isDirty);
    }, [form, initialForm]);
    
    //Helper function
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
        const {formData, doc} = await extractBlogImages(form.content); //chac chan se gui cho backend de cap nhat
        //Add delete image
        const formDataNews = addDeleteImage(initialForm, form, formData);
        const finalHTML = doc.body.innerHTML;
        // Duyệt qua tất cả key
        for (const key in form) {
            if (key === 'main_image' && form[key] instanceof File) {
                formDataNews.append('main_image', form[key]);
            } else if (key === 'content') {
                formDataNews.append('content', finalHTML); // content đã thay blob thành filename
            } else {
                formDataNews.append(key, form[key]);
            }
        }
        for(let [key, value] of formDataNews.entries()){
            console.log(key, value);
        }
        if(news_id !== null)
            updateNews.mutate({ id: news_id, formDataNews });
        setInitialForm(form);
        setForm(form);
    }
    const handleDelete = () => {
        deleteNews.mutate(news_id);
        navigate('/quan-ly-tin-tuc')
        //Xoa bai viet hien tai
    }
    const handleRecover = () => {
        setForm(initialForm)
    }
    //Prop setting
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
    
    if(isLoadingCategories || isLoadingNewsContent || form == null){
        return <></>
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
                            onClick={handleSave}
                        >
                            <div className='flex gap-4 items-center'>
                                <SaveIcon/>
                                <span>Lưu thay đổi</span>
                                <span></span>
                            </div>
                        </CustomButton>
                        <CustomButton
                            onClick={handleRecover}
                        >
                            <div className='flex gap-6 items-center'>
                                <RecoveryIcon/>
                                <span>Khôi phục</span>
                                <span></span>
                            </div>
                        </CustomButton> 
                        <CustomButton
                            backgroundColor="white"
                            borderColor="#e4e4e7"
                            hoverBackgroundColor="oklch(57.7% 0.245 27.325)"
                            textColor="#000000"
                            hoverTextColor="#ffffff"
                            paddingX={16}
                            height={45}
                            onClick={handleDelete}
                        >
                            <div className='flex gap-11 items-center'>
                                <DeleteIcon/>
                                <span>Xóa</span>
                                <span></span>
                            </div>
                        </CustomButton>                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditNews