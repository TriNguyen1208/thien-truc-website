import { useEffect, useState } from 'react'
import { useLayout } from "@/layouts/layoutcontext";
import UploadImage from '../../components/UploadImage'
import CustomButton from '../../components/ButtonLayout';
import { SaveIcon, DeleteIcon, RecoveryIcon } from '../../components/Icon';
import ContentManagement from '../../components/ContentManagement';
import ProjectSetting from '../../components/ProjectSetting';
import useProjects from '../../hooks/useProjects';
import { useNavigationGuardContext } from '../../layouts/NavigatorProvider';
import { addDeleteImage, extractBlogImages } from '../../utils/handleImage';
import { useParams, useNavigate } from 'react-router-dom';
import { CancelPopup } from '../../components/Popup';
import Loading from '../../components/Loading';
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
    const {mutate: deleteProject, isPending: isPendingDeleteProject} = useProjects.projects.deleteOne();
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
    const { setShouldWarn } = useNavigationGuardContext(); 
    useEffect(() => {
        if (isLoadingProjectContent || isFetchingProjectContent) return;
        if (!project_contents) return;
        const initialForm = {
            title: project_contents.project.title ?? '',
            main_content: project_contents.project.main_content ?? '',
            content: project_contents.content ?? '',
            region_name: project_contents.project.region.name ?? '',
            isFeatured: project_contents.project.is_featured,
            main_image: "",
            link_image: project_contents.project.main_img ?? '',
            province: project_contents.project.province ?? '',
            completeTime: project_contents.project.complete_time ?? '',
            countWord: project_contents.content.replace(/<[^>]+>/g, '').trim().length
        }
        setInitialForm(initialForm);
        setForm(initialForm);
    }, [isLoadingProjectContent, isFetchingProjectContent, project_contents])

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
    }, [form, initialForm, setShouldWarn]);

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
        const {formData, doc} = await extractBlogImages(form.content); //chac chan se gui cho backend de cap nhat

        //Add delete image
        const formDataProject = addDeleteImage(initialForm, form, formData);
        
        const finalHTML = doc.body.innerHTML;
        // Duyệt qua tất cả key
        for (const key in form) {
            if (key === 'main_image' && form[key] instanceof File) {
                formDataProject.append('main_image', form[key]);
            } else if (key === 'content') {
                formDataProject.append('content', finalHTML); // content đã thay blob thành filename
            } else {
                formDataProject.append(key, form[key]);
            }
        }
        if(project_id !== null)
            updateProject({ id: project_id, formDataProject })
        setSaveOpen(false);
    }

    //Helper function
    const handleDelete = () => {
        //Xoa bai viet hien tai
        deleteProject(project_id);
        navigate('/quan-ly-du-an');
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
        buttonLabel2: 'Xóa',
        buttonAction2: handleDelete
    };
    const savePopupData = {
        open: saveOpen,
        setOpen: setSaveOpen,
        notification: 'Bạn có chắc chắn muốn lưu dự án này?',
        subTitle: 'Hành động này sẽ không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?',
        buttonLabel1: 'Hủy',
        buttonLabel2: 'Lưu',
        buttonAction2: handleSave
    };
    const recoverPopupData = {
        open: recoverOpen,
        setOpen: setRecoverOpen,
        notification: 'Bạn có chắc chắn muốn khôi phục dự án này?',
        subTitle: 'Hành động này sẽ không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?',
        buttonLabel1: 'Hủy',
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
            <div className='flex flex-row gap-6'>
                <ContentManagement type="dự án" setForm={setForm} form={form}/>
                <div className='flex flex-col flex-1 gap-6 max-w-[300px]'>
                    <ProjectSetting regions={regionNames} form={form} setForm={setForm}/>
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
            </div>
            <CancelPopup {...deletePopupData}/>
            <CancelPopup {...savePopupData}/>
            <CancelPopup {...recoverPopupData}/>
        </>
    )
}

export default EditProject