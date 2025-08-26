import { useEffect, useState } from 'react'
import { useLayout } from "@/layouts/LayoutContext";
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
import Notification from '@/components/Notification'
import Loading from '../../components/Loading';
import changeToFormData from '../../utils/changeToFormData';
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
const EditNews = () => {
    //navigate
    const navigate = useNavigate();
    //getID URL
    const {id: news_id} = useParams();
    //useState
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [saveOpen, setSaveOpen] = useState(false);
    const [recoverOpen, setRecoverOpen] = useState(false);
    const [form, setForm] = useState(null);
    const [initialForm, setInitialForm] = useState(null);
    //Call API

    const {data: news_contents, isLoading: isLoadingNewsContent, isFetching: isFetchingNewsContent} = useNews.news_contents.getOne(news_id);
    const {data: categories, isLoading: isLoadingCategories} = useNews.news_categories.getAll();
    const {mutate: updateNews, isPending: isPendingUpdateNews} = useNews.news_contents.updateOne()
    const {mutate: deleteNews, isPending: isPendingDeleteNews} = useNews.news.deleteOne(() => navigate('/quan-ly-tin-tuc'));
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
    // const { setShouldWarn } = useNavigationGuardContext();
    useEffect(() => {
        if (isLoadingNewsContent || isFetchingNewsContent) return;
        if (!news_contents) return;
        const initialForm = {
            title: news_contents.news.title ?? '',
            main_content: news_contents.news.main_content ?? '',
            content: news_contents.content ?? '',
            category_name: news_contents.news.category.name ?? '',
            isPublished: news_contents.news.is_published ?? true,
            main_image: news_contents.news.main_img ?? "",
            countWord: normalizeContent(news_contents.content).replace(/<[^>]+>/g, '').trim().length
        };
        setInitialForm(initialForm);
        setForm(initialForm);
    }, [isLoadingNewsContent, isFetchingNewsContent, news_contents]) 
    // useEffect(() => {
    //     if(form == null || initialForm == null){
    //         return;
    //     }
    //     const stripCountWord = (obj) => {
    //         const { countWord, ...rest } = obj;
    //         return rest;
    //     };
    //     const isDirty = JSON.stringify(stripCountWord(normalizeForm(form))) !==
    //                     JSON.stringify(stripCountWord(normalizeForm(initialForm)));
    //     setShouldWarn(isDirty);
    // }, [form, initialForm, setShouldWarn]);
    
    //Helper function
    const handleSave = async () => {
        if(form.isPublished == true && (form.title.length == 0 || form.main_content.length == 0 || form.content.length == 0)){
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
        const {formData: formData1, doc} = await extractBlogImages(form.content); //chac chan se gui cho backend de cap nhat
        //Add delete image
        const formData2 = addDeleteImage(initialForm, form, formData1);
        const finalHTML = doc.body.innerHTML;
        const formData3 = changeToFormData(form, finalHTML);
        
        // Duyệt qua tất cả key
        const formData = new FormData();
        for(const [key, value] of formData2.entries()){
            formData.append(key, value);
        }
        for(const [key, value] of formData3.entries()){
            formData.append(key, value);
        }
        if(news_id !== null)
            updateNews({ id: news_id, formData })
        setSaveOpen(false);
    }
    const handleDelete = () => {
        deleteNews(news_id)
        //Xoa bai viet hien tai
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
            {str: "Bản nháp", state: false},
            {str: "Đã xuất bản", state: true}
        ]
    }
    //Popup
    const deletePopupData = {
        open: deleteOpen,
        setOpen: setDeleteOpen,
        notification: 'Bạn có chắc chắn muốn xóa tin tức này?',
        subTitle: 'Hành động này sẽ không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?',
        buttonLabel1: 'Hủy',
        buttonAction1: ()=>{setDeleteOpen(false)},
        buttonLabel2: 'Xóa',
        buttonAction2: handleDelete
    };
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
    if(isLoadingCategories || isLoadingNewsContent || form == null || isPendingDeleteNews || isPendingUpdateNews || isFetchingNewsContent){
        return <Loading/>
    }
    return (
        <>
            <form onSubmit={(e) => {e.preventDefault(); setSaveOpen(true)}} className='flex flex-row gap-6'>
                <ContentManagement type="tin tức" setForm={setForm} form={form}/>
                <div className='flex flex-col flex-1 gap-6 max-w-[300px]'>
                    <PostSettings {...props} form={form} setForm={setForm}/>
                    <div className='bg-white p-6 flex flex-col gap-6 rounded-lg shadow-sm border border-gray-200 overflow-x-hidden '>
                        <h3 className='text-2xl font-semibold text-[#09090B]'>Ảnh đại diện</h3>
                        <UploadImage form={form} setForm={setForm} initialForm={initialForm} keyImage="main_image" flexDirection='col' gap={8} overflow='block'/>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <CustomButton
                            htmlType='submit'
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
                        <CustomButton
                            backgroundColor="white"
                            borderColor="#e4e4e7"
                            hoverBackgroundColor="oklch(57.7% 0.245 27.325)"
                            textColor="#000000"
                            hoverTextColor="#ffffff"
                            paddingX={16}
                            height={45}
                            onClick={() => setDeleteOpen(true)}
                        >
                            <div className='flex gap-11 items-center'>
                                <DeleteIcon/>
                                <span>Xóa</span>
                                <span></span>
                            </div>
                        </CustomButton>                        
                    </div>
                </div>
            </form>
            <Notification {...deletePopupData}/>
            <Notification {...savePopupData}/>
            <Notification {...recoverPopupData}/>
        </>
    )
}

export default EditNews
