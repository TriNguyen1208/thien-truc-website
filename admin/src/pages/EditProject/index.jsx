import { useEffect, useState } from 'react'
import { useLayout } from "@/layouts/LayoutContext";
import UploadImage from '../../components/UploadImage'
import CustomButton from '../../components/ButtonLayout';
import { SaveIcon, DeleteIcon, RecoveryIcon } from '../../components/Icon';
import ContentManagement from '../../components/ContentManagement';
import ProjectSetting from '../../components/ProjectSetting';
import useProjects from '../../hooks/useProjects';
import { useNavigationGuardContext } from '../../layouts/NavigatorProvider';
import { addDeleteImage, extractBlogImages } from '../../utils/handleImage';
import { useParams, useNavigate } from 'react-router-dom';
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
const EditProject = () => {
    //navigate
    const navigate = useNavigate();
    //getID URL
    const {id: project_id} = useParams();

    //useState
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [saveOpen, setSaveOpen] = useState(false);
    const [recoverOpen, setRecoverOpen] = useState(false);
    const [form, setForm] = useState(null);
    const [initialForm, setInitialForm] = useState(null);
    
    //Call API
    const {data: regions, isLoading: isLoadingRegions} = useProjects.project_regions.getAll();
    const {data: project_contents, isLoading: isLoadingProjectContent, isFetching: isFetchingProjectContent} = useProjects.project_contents.getOne(project_id);
    const {mutate: updateProject, isPending: isPendingUpdateProject} = useProjects.project_contents.updateOne()
    const {mutate: deleteProject, isPending: isPendingDeleteProject} = useProjects.projects.deleteOne(() => navigate('/quan-ly-du-an'));
    //set layout 
    const {setLayoutProps} = useLayout();
    useEffect(() => {
        setLayoutProps({
            title: "Chỉnh sửa dự án",
            description: "Chỉnh sửa nội dung dự án",
            hasButtonBack: true,
        })
    }, [])

    //check is change
    // const { setShouldWarn } = useNavigationGuardContext(); 
    useEffect(() => {
        if (isLoadingProjectContent || isFetchingProjectContent) return;
        if (!project_contents) return;
        const initialForm = {
            title: project_contents.project.title ?? '',
            main_content: project_contents.project.main_content ?? '',
            content: project_contents.content ?? '',
            region_name: project_contents.project.region.name ?? '',
            isFeatured: project_contents.project.is_featured,
            main_image: project_contents.project.main_img ?? '',
            province: project_contents.project.province ?? '',
            completeTime: project_contents.project.complete_time ?? '',
            countWord: normalizeContent(project_contents.content).replace(/<[^>]+>/g, '').trim().length
        }
        setInitialForm(initialForm);
        setForm(initialForm);
    }, [isLoadingProjectContent, isFetchingProjectContent, project_contents])
    
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
        if(form.title.length == 0 || form.main_content.length == 0 || form.content.length == 0){
            alert("Chưa nhập những nội dung bắt buộc");
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
        if(project_id !== null)
            updateProject({ id: project_id, formData })
        setSaveOpen(false);
    }

    //Helper function
    const handleDelete = () => {
        //Xoa bai viet hien tai
        deleteProject(project_id);
    }
    const handleRecover = () => {
        setForm(initialForm);
        setRecoverOpen(false);
    }
    //Popup
    const deletePopupData = {
        open: deleteOpen,
        setOpen: setDeleteOpen,
        notification: 'Bạn có chắc chắn muốn xóa dự án này?',
        subTitle: 'Hành động này sẽ không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?',
        buttonLabel1: 'Hủy',
        buttonAction1: ()=>{setDeleteOpen(false)},
        buttonLabel2: 'Xóa',
        buttonAction2: handleDelete
    };
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
    if(isLoadingRegions || isLoadingProjectContent || form == null || isPendingDeleteProject || isPendingUpdateProject || isFetchingProjectContent){
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

export default EditProject
