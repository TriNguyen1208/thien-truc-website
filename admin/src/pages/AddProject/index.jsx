import { useEffect, useMemo, useState } from 'react'
import { useLayout } from "@/layouts/layoutcontext";
import UploadImage from '../../components/UploadImage'
import CustomButton from '../../components/ButtonLayout';
import { SaveIcon } from '../../components/Icon';
import ContentManagement from '../../components/ContentManagement';
import useProjects from '../../hooks/useProjects';
import { useNavigationGuardContext } from '../../layouts/NavigatorProvider';
import {extractBlogImages} from '../../utils/handleImage';
import ProjectSetting from '../../components/ProjectSetting';

const AddProject = () => {
    //useState
    const [form, setForm] = useState(null);
    
    //Call API
    const {data: regions, isLoading: isLoadingRegions} = useProjects.project_regions.getAll();
    const postProject = useProjects.project_contents.postOne()

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
    const { setShouldWarn } = useNavigationGuardContext(); 
    const initialForm = useMemo(() => {
        if (isLoadingRegions) return null;
        return {
            title: "",
            main_content: "",
            content: "",
            region_name: (regions?.[0]?.name) ?? '',
            isFeatured: false,
            main_image: "",
            link_image: "",
            province: "",
            completeTime: new Date()
        }
    }, [isLoadingRegions]);
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
    }, [form]);
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
        postProject.mutate(formData);     
        setForm(initialForm);
    }
    const handleRecover = () => {
        setForm(initialForm)
    }

    //Loading
    if(isLoadingRegions || form === null){
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
        </>
    )
}

export default AddProject