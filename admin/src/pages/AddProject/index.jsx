import { useEffect, useMemo, useState } from 'react'
import { useLayout } from "@/layouts/LayoutContext";
import UploadImage from '../../components/UploadImage'
import CustomButton from '../../components/ButtonLayout';
import { SaveIcon, RecoveryIcon } from '../../components/Icon';
import ContentManagement from '../../components/ContentManagement';
import useProjects from '../../hooks/useProjects';
import { useNavigationGuardContext } from '../../layouts/NavigatorProvider';
import {extractBlogImages} from '../../utils/handleImage';
import ProjectSetting from '../../components/ProjectSetting';
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
const AddProject = () => {
    //useState
    const [form, setForm] = useState(null);
    const [saveOpen, setSaveOpen] = useState(false);
    const [recoverOpen, setRecoverOpen] = useState(false);

    //Call API
    const {data: regions, isLoading: isLoadingRegions} = useProjects.project_regions.getAll();
    const {mutate: mutateProject, isPending: isPendingProject} = useProjects.project_contents.postOne()
    //set layout 
    const {setLayoutProps} = useLayout();
    useEffect(() => {
        setLayoutProps({
            title: "Thêm dự án mới",
            description: "Tạo bài viết dự án mới",
            hasButtonBack: true,
        })
    }, [])

    //check is change
    // const { setShouldWarn } = useNavigationGuardContext(); 
    const initialForm = useMemo(() => {
        if (isLoadingRegions) return null;
        return {
            title: "",
            main_content: "",
            content: "",
            region_name: (regions?.[0]?.name) ?? '',
            isFeatured: false,
            main_image: "",
            province: "",
            countWord: 0,
            completeTime: new Date()
        }
    }, [isLoadingRegions]);
    useEffect(() => {
        if (initialForm) {
            setForm(initialForm);
        }
    }, [initialForm]);
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
    // }, [form]);
    //Helper function
    const handleSave = async () => {
        if(form.title.length == 0 || form.main_content.length == 0 || form.content.length == 0){
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
        const {formData: formData1, doc} = await extractBlogImages(form.content);
        const finalHTML = doc.body.innerHTML;
        const formData2 = changeToFormData(form, finalHTML);
        const formData = new FormData();
        for(const [key, value] of formData1.entries()){
            formData.append(key, value);
        }
        for(const [key, value] of formData2.entries()){
            formData.append(key, value);
        }
        mutateProject(formData)  
        setForm(initialForm);
        setSaveOpen(false);
    }
    const handleRecover = () => {
        setForm(initialForm)
        setRecoverOpen(false);
    }
    //Popup
    const savePopupData = {
        open: saveOpen,
        setOpen: setSaveOpen,
        notification: 'Bạn có chắc chắn muốn lưu dự án này?',
        subTitle: 'Hành động này sẽ không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?',
        buttonLabel1: 'Hủy',
        buttonAction1: ()=>{setSaveOpen(false)},
        buttonLabel2: 'Lưu',
        buttonAction2: handleSave
    };
    const recoverPopupData = {
        open: recoverOpen,
        setOpen: setRecoverOpen,
        notification: 'Bạn có chắc chắn muốn khôi phục dự án này?',
        subTitle: 'Hành động này sẽ không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?',
        buttonLabel1: 'Hủy',
        buttonAction1: ()=>{setRecoverOpen(false)},
        buttonLabel2: 'Khôi phục',
        buttonAction2: handleRecover
    };
    //Loading
    if(isLoadingRegions || form === null || isPendingProject){
        return <Loading/>
    }
    const regionNames = regions.map(item => item.name);
    return (
        <>
            <form onSubmit={(e) => {e.preventDefault(); setSaveOpen(true)}} className='flex flex-row gap-6'>
                <ContentManagement type="dự án" setForm={setForm} form={form}/>
                <div className='flex flex-col flex-1 gap-6 max-w-[300px]'>
                    <ProjectSetting regions={regionNames} form={form} setForm={setForm}/>
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
                    </div>
                </div>
            </form>
            <Notification {...savePopupData}/>
            <Notification {...recoverPopupData}/>
        </>
    )
}

export default AddProject
