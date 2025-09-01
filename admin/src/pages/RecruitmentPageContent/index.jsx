import React, { useEffect, useState} from 'react'
import { useLayout } from '../../layouts/LayoutContext'
import CustomButton from '@/components/ButtonLayout'
import {SaveIcon} from "@/components/Icon"
import DynamicForm from "@/components/DynamicForm"
import EditBanner from '../../components/EditBanner'
import useRecruitment from '../../hooks/useRecruitment'
import Loading from '@/components/Loading'
import Notification from '@/components/Notification'
import { CancelPopup } from "../../components/Popup";
import { useRef } from 'react'
import { UploadIcon } from '../../components/Icon'
import Button from '@/components/Button'
import changeToFormData from '../../utils/changeToFormData'
import UploadImage from '@/components/UploadImage'

const RecruitmentPageContent = () => {
    //-----------------------API-----------------
    const {mutate: updateBanner, isPending: isPendingUpdateBanner} = useRecruitment.updateRecruitmentPage.banner();
    const {mutate: updateCulture, isPending: isPendingUpdateCulture} = useRecruitment.updateRecruitmentPage.culture();
    const {mutate: updateCultureImages, isPending: isPendingUpdateCultureImages} = useRecruitment.updateRecruitmentPage.culture_images();
    const {mutate: updateVisibility, isPending: isPendingUpdateVisibility} = useRecruitment.updateRecruitmentPage.visibility();
    const {data: recruitment, isLoading: isLoadingRecruitment, isFetching: isFetchingRecruitment} = useRecruitment.getRecruitmentPage();

    //-----------------------Lưu trạng thái của form sẽ gửi lên backend--------------
    //Dùng useState để lưu trạng thái
    const [valuesBanner, setValuesBanner] = useState(null);
    const [valuesCulture, setValuesCulture] = useState(null);
    const [valuesCultureImages, setValuesCultureImages] = useState(null);
    const [initialValuesCultureImages, setInitialValuesCultureImages] = useState(null);
    const [isVisible, setIsVisible] = useState(null);
    //Set trạng thái đầu tiên của hình
    useEffect(() => {
        if(isLoadingRecruitment || isFetchingRecruitment || isPendingUpdateVisibility){
            return;
        }
        const initialForm = {
            culture_img_1: recruitment?.culture_img_1 ?? "",
            culture_img_2: recruitment?.culture_img_2 ?? "",
            culture_img_3: recruitment?.culture_img_3 ?? "",
            culture_img_4: recruitment?.culture_img_4 ?? "",
        }
        setInitialValuesCultureImages(initialForm);
        setValuesCultureImages(initialForm)
    }, [isLoadingRecruitment, isFetchingRecruitment])

    //----------------------Nút visibility--------------
    //Set visible
    useEffect(() => {
        if(isLoadingRecruitment) return
        setIsVisible(recruitment.is_visible);
    }, [recruitment, isLoadingRecruitment]);
    //Xử lý nút visibililty
    function handleToggle(checked){
        setIsVisible(checked);
        updateVisibility({visibility: checked});
    }
    
    //--------------------------Banner----------------
    //Set layout cho banner
    const {setLayoutProps} = useLayout();
    useEffect(()=>{
        setLayoutProps({
            title: "Nội dung Trang tuyển dụng",
            description: "Quản lý nội dung hiển thị trên trang tuyển dụng",
            hasButton: false,
            buttonToggle: {
                currentState: isVisible,
                handleToggle: handleToggle,
            }
        })
    }, [isVisible])
    //Prop cho banner của trang tuyển dụng
    const bannerProps = {
        title: "Nội dung Trang tuyển dụng",
        description: "Quản lý nội dung hiển thị trên trang tuyển dụng",
        listInput: [
            {
                name: "banner_title",
                label: "Tiêu đề Banner",
                placeholder: "Nhập tiêu đề tuyển dụng",
                contentCurrent: recruitment?.banner_title ?? "",
                isRequire: true,
                rows: 1,
                maxLength: 100
            },
            {
                name:"banner_description",
                label: "Mô tả Banner",
                placeholder: "Nhập mô tả Banner",
                contentCurrent: recruitment?.banner_description ?? "",
                isRequire: true,
                rows: 3,
                maxLength: 300
            }
        ],
        saveButton: (result) => {
            setValuesBanner(result);
            setOpenBannerNotification(true);
        }
    }
    //Prop cho banner văn hóa của chúng tôi
    const cultureProps = {
        title: "Văn hóa của chúng tôi",
        description: "Đoạn văn có thể xuống dòng",
        listInput: [
            {
                name: "culture_content",
                label: "Nội dung văn hóa công ty",
                placeholder: "Nhập tiêu đề tuyển dụng",
                contentCurrent: recruitment?.culture_content ?? "",
                isRequire: true,
                rows: 6,
            }
        ],
        saveButton: (result) => {
            setValuesCulture(result);
            setOpenCultureNotification(true);
        }
    }

    //------------------------Thông báo----------------------
    const [openBannerNotification, setOpenBannerNotification] = useState(false);
    const [openCultureNotification, setOpenCultureNotification] = useState(false);
    const [openCultureImagesNotification, setOpenCultureImagesNotification] = useState(false);
    //Nhấn nút hủy thông báo
    function handleCancelBannerNotification() {
        setOpenBannerNotification(false)
    }
    function handleCancelCultureNotification() {
        setOpenCultureNotification(false)
    }
    function handleCancelCultureImagesNotification() {
        setOpenCultureImageNotification(false)
    }
    //Nhấn nút xác nhận
    function handleConfirmBannerNotification() {
        setOpenBannerNotification(false)
        updateBanner(valuesBanner);
    }
    function handleConfirmCultureNotification() {
        setOpenCultureNotification(false)
        updateCulture(valuesCulture);
    }
    function handleConfirmCultureImagesNotification() {
        setOpenCultureImagesNotification(false)
        const formData = changeToFormData(valuesCultureImages);
        for(const [_, value] of formData.entries()){
            if(value == ''){
                alert("Chưa nhập dữ liệu bắt buộc");
                return;
            }
        }
        updateCultureImages(formData)
    }
    //Truyền vào props
    const notificationBannerProps = {
        open: openBannerNotification,
        setOpen: setOpenBannerNotification,
        notification: 'Xác nhận lưu thay đổi!',
        subTitle: 'Bạn có chắc chắn muốn lưu thay đổi.',
        buttonLabel1: 'Hủy',
        buttonAction1: handleCancelBannerNotification,
        buttonLabel2: 'Lưu',
        buttonAction2: handleConfirmBannerNotification
    };
    const notificationCultureProps = {
        open: openCultureNotification,
        setOpen: setOpenCultureNotification,
        notification: 'Xác nhận lưu thay đổi!',
        subTitle: 'Bạn có chắc chắn muốn lưu thay đổi.',
        buttonLabel1: 'Hủy',
        buttonAction1: handleCancelCultureNotification,
        buttonLabel2: 'Lưu',
        buttonAction2: handleConfirmCultureNotification
    };
    const notificationCultureImagesProps = {
        open: openCultureImagesNotification,
        setOpen: setOpenCultureImagesNotification,
        notification: 'Xác nhận lưu thay đổi!',
        subTitle: 'Bạn có chắc chắn muốn lưu thay đổi.',
        buttonLabel1: 'Hủy',
        buttonAction1: handleCancelCultureImagesNotification,
        buttonLabel2: 'Lưu',
        buttonAction2: handleConfirmCultureImagesNotification
    };

    //-------------Custom button props-------------
    const buttonProps ={
        Icon: SaveIcon,
        text: "Lưu thay đổi",
        colorText: "#ffffff",
        colorBackground: "#000000",
        padding : 10,
    }

    //-----------------Upload image props-------------------------
    const imageProps = {
        culture_img_1: {
            form: valuesCultureImages ?? null,
            setForm: setValuesCultureImages,
            initialForm: initialValuesCultureImages,
            keyImage: "culture_img_1"
        },
        culture_img_2: {
            form: valuesCultureImages ?? null,
            setForm: setValuesCultureImages,
            initialForm: initialValuesCultureImages,
            keyImage: "culture_img_2"
        },
        culture_img_3: {
            form: valuesCultureImages ?? null,
            setForm: setValuesCultureImages,
            initialForm: initialValuesCultureImages,
            keyImage: "culture_img_3"
        },
        culture_img_4: {
            form: valuesCultureImages ?? null,
            setForm: setValuesCultureImages,
            initialForm: initialValuesCultureImages,
            keyImage: "culture_img_4"
        },
    }
    if(isLoadingRecruitment || isPendingUpdateBanner || isFetchingRecruitment || isPendingUpdateCulture || isPendingUpdateCultureImages || isPendingUpdateVisibility){
        return <Loading/>
    }
    return (
        <>
            <div className='flex flex-col gap-5'>
                <EditBanner {...bannerProps}/>
                <EditBanner {...cultureProps}/>
                <form onSubmit={(e) => {e.preventDefault(); setOpenCultureImagesNotification(true)}} className='flex flex-col p-[24px] bg-white w-full h-full border border-[#E5E7EB] rounded-[8px]'>
                    <div className="flex flex-col mb-[16px]">
                        <label className="mb-[8px] font-medium">Ảnh văn hóa công ty <span className='text-red-500 ml-1'>*</span></label>
                        <div className='grid grid-cols-2 gap-3'>
                            <UploadImage {...imageProps.culture_img_1}/>
                            <UploadImage {...imageProps.culture_img_2}/>
                            <UploadImage {...imageProps.culture_img_3}/>
                            <UploadImage {...imageProps.culture_img_4}/>
                        </div>
                    </div>
                    <div className='h-40[px]'>
                        <button type='submit'> <Button {...buttonProps}/></button>
                    </div>                
                </form>
            </div>
            <Notification {...notificationBannerProps}/>
            <Notification {...notificationCultureProps}/>
            <Notification {...notificationCultureImagesProps}/>
        </>
    )
}

export default RecruitmentPageContent
