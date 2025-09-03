import React from 'react'
import { useLayout } from "@/layouts/LayoutContext"
import { useEffect } from "react"
import EditBanner from "@/components/EditBanner"
import { useState } from 'react';
import useAboutUs from '@/hooks/useAboutUs';
import Notification from '@/components/Notification'
import Loading from '@/components/Loading'
import DutyAndResponsibility from './DutyAndResponsibility'
import WhyChooseUs from './WhyChooseUs'
const AboutUsPageContent = () => {
    //------------------API------------------
    //API cho trang về chúng tôi và câu chuyện của chúng tôi + visibility
    const { data: aboutUsPageData, isLoading: isLoadingAboutUsPageData} = useAboutUs.getAboutUsPage();
    const { mutate: updateBanner, isPending: isPendingUpdateBanner } = useAboutUs.updateAboutUsPage.banner();
    const { mutate: updateOurStory, isPending: isPendingUpdateOurStory } = useAboutUs.updateAboutUsPage.ourStory();
    const { mutate: updateVisibility, isPending: isPendingUpdateVisibility} = useAboutUs.updateAboutUsPage.visibility();

    //--------------Nút isVisibility--------------
    //Check isVisible
    const [isVisible, setIsVisible] = useState(null);
    useEffect(() => {
        if(isLoadingAboutUsPageData) return
        setIsVisible(aboutUsPageData.is_visible);
    }, [aboutUsPageData, isLoadingAboutUsPageData]);
    //Xu ly nut isVisible
    function handleToggle(checked){
        setIsVisible(checked);
        updateVisibility({visibility: checked});
    }

    //----------------Banner-------------
    //Use state luu trang thai cua form Banner
    const [valuesBanner, setValuesBanner] = useState(null)
    const [valuesStory, setValuesStory] = useState(null)
    //Set layout cho banner
    const { setLayoutProps } = useLayout();
    useEffect(() => {
        setLayoutProps({
            title: "Nội dung Trang về chúng tôi",
            description: "Quản lý nội dung hiển trị trên trang về chúng tôi",
            hasButton: false,
            buttonToggle: {
                currentState: isVisible,
                handleToggle: handleToggle
            }
        })
    }, [isVisible]);
    //Luu banner trang về chúng tôi
    const handleBannerSave = (data) => {
        setValuesBanner(data);
        setBannerNotification(true);
    }
    //Lưu câu chuyện về chúng tôi
    const handleOurStorySave = (data) => {
        setValuesStory(data);
        setStoryNotification(true);
    }
    //Props cho banner trang về chúng tôi
    const bannerProps = {
        title: "Banner trang về chúng tôi",
        description: "Chỉnh sửa tiêu đề và mô tả banner",
        listInput: 
        [
            { 
                name: "title", 
                label: 'Tiêu đề banner', 
                placeholder: 'Nhập nội dung tiêu đề...', 
                contentCurrent: aboutUsPageData?.banner_title ?? "", 
                isRequire: true, 
                rows: 1, 
                maxLength: 100 },
            { 
                name: "description", 
                label: 'Mô tả banner', 
                placeholder: 'Nhập nội dung mô tả...', 
                contentCurrent: aboutUsPageData?.banner_description ?? "", 
                isRequire: true, 
                rows: 3, 
                maxLength: 300
            },
        ],
        saveButton: handleBannerSave
    }
    //Props cho câu chuyện của chúng tôi
    const ourStoryProps = {
        title: "Câu chuyện của chúng tôi",
        description: "Chỉnh sửa tiêu đề và mô tả banner",
        listInput: 
        [
            { 
                name: "our_story_content", 
                label: 'Nội dung câu chuyện',
                placeholder: 'Nhập nội dung câu chuyện...', 
                contentCurrent: aboutUsPageData?.our_story_content ?? "", 
                isRequire: true, 
                rows: 5 
            },
        ],
        saveButton: handleOurStorySave
    }

    //------------------Thông báo-------------------
    //useState mo thong bao xac nhan
    const [bannerNotification, setBannerNotification] = useState(false)
    const [storyNotification, setStoryNotification] = useState(false)
    //Hủy thông báo trang về chúng tôi
    const handleCancelBanner= () => {
        setBannerNotification(false)
    }
    //Xác nhận thông báo trang về chúng tôi
    const handleConfirmBanner= () => {
        updateBanner(valuesBanner);
        setBannerNotification(false)
    }
    //Hủy thông báo câu chuyện của chúng tôi
    const handleCancelStory= () => {
        setStoryNotification(false)
    }
    //Xác nhận thông báo câu chuyện của chúng tôi
    const handleConfirmStory= () => {
        updateOurStory(valuesStory);
        setStoryNotification(false)
    }
    //Prop cho thong bao
    const notificationBannerProps = {
        open: bannerNotification, 
        setOpen: setBannerNotification, 
        notification: "Xác nhận lưu thay đổi!", 
        subTitle:"Bạn có chắc chắn muốn lưu thay đổi.", 
        buttonLabel1:"Hủy", 
        buttonAction1:handleCancelBanner, 
        buttonLabel2: "Xác nhận", 
        buttonAction2: handleConfirmBanner
    }
    //Prop cho thong bao
    const notificationOurStoryProps = {
        open: storyNotification, 
        setOpen: setStoryNotification, 
        notification: "Xác nhận lưu thay đổi!", 
        subTitle:"Bạn có chắc chắn muốn lưu thay đổi.", 
        buttonLabel1:"Hủy", 
        buttonAction1:handleCancelStory, 
        buttonLabel2: "Xác nhận", 
        buttonAction2: handleConfirmStory
    }
    if (isLoadingAboutUsPageData || isPendingUpdateBanner || isPendingUpdateOurStory || isPendingUpdateVisibility) {
        return (
            <Loading/>
        )
    }
    return (
        <>
            <div className='mb-[40px]'>
                <EditBanner {...bannerProps}/>
            </div>
            <EditBanner {...ourStoryProps}/>
            <DutyAndResponsibility />
            <WhyChooseUs />
            <Notification {...notificationBannerProps} />
            <Notification {...notificationOurStoryProps} />
        </>
    )
}

export default AboutUsPageContent