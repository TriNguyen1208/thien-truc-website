import React, { useEffect, useMemo, useRef, useState } from 'react'
// import {useNavigate} from "react-router-dom"
import { useLayout } from "@/layouts/layoutcontext";
import {Editor} from "@tinymce/tinymce-react"
import EditorWord from '../../components/EditorWord';
import UploadImage from '../../components/UploadImage'
import CustomButton from '../../components/ButtonLayout';
import { PlusIcon, SaveIcon, DeleteIcon } from '../../components/Icon';
import ContentManagement from '../../components/ContentManagement';
import ProjectSetting from '../../components/ProjectSetting';
import useProjects from '../../hooks/useProjects';
import { useNavigationGuardContext } from '../../layouts/NavigatorProvider';
import {SuccessPopup, CancelPopup} from '@/components/Popup'
import { addDeleteImage, extractBlogImages } from '../../utils/handleImage';
import { useParams } from 'react-router-dom';

const EditProject = () => {
    //getID URL
    const {id: project_id} = useParams();

    //useState
    const [openPopup, setOpenPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [openErrorPopup, setOpenErrorPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [form, setForm] = useState(null);
    const [initialForm, setInitialForm] = useState(null);
    
    //Call API
    const {data: regions, isLoading: isLoadingRegions} = useProjects.project_regions.getAll();
    const {data: project_contents, isLoading: isLoadingProjectContent} = useProjects.project_contents.getOne(project_id);
    const updateProject = useProjects.project_contents.updateOne({
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
        if (isLoadingRegions) return;
        setInitialForm({
            title: project_contents.project.title ?? '',
            main_content: project_contents.project.main_content ?? '',
            content: project_contents.content ?? '',
            region_name: project_contents.project.region.name ?? '',
            isFeatured: project_contents.project.is_featured,
            main_image: project_contents.project.main_img ?? '',
            link_image: "",
            province: project_contents.project.province ?? '',
            completeTime: project_contents.project.complete_time ?? ''
        })
    }, [isLoadingProjectContent])

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
        if(form.title.length == 0 || form.main_content.length == 0 || form.content.length == 0){
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
        const formDataProject = addDeleteImage(initialForm.content, form.content, formData);
        
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
        for(let [key, value] of formDataProject.entries()){
            console.log(key, value);
        }
        if(project_id !== null)
            updateProject.mutate({ id: project_id, formDataProject });
        setInitialForm(form);
        setForm(form);
    }
    const handleRecover = () => {
        setForm(initialForm)
    }

    //Loading
    if(isLoadingRegions || isLoadingProjectContent || form == null){
        return <></>
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
                            <span>Khôi phục</span>
                        </CustomButton>                   
                    </div>
                </div>
            </div>
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
        </>
    )
}

export default EditProject