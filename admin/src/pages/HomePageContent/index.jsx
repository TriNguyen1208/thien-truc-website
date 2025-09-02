import EditBanner from "../../components/EditBanner"
import FeatureCard from '../../components/FeatureCard';
import Button from '@/components/Button'
import { AddIcon, EditIcon, SubtractIcon, ArrowDownIcon, ArrowUpIcon, SaveIcon, DeleteIcon,UploadIcon } from '../../components/Icon';
import SimpleForm from '../../components/SimpleForm'
import {useEffect, useState, useRef } from 'react';
import Notification from '@/components/Notification'
import Table from "../../components/Table"
import SearchBar from '../../components/Search'
import ProductImageCell from '../../components/ProductImageCell'
import useHome from '../../hooks/useHome';
import useNews from '../../hooks/useNews';
import AddHighlight from '../../components/AddHighlight';
import Loading from '@/components/Loading'
import { useNavigate } from 'react-router-dom';
import { useLayout } from "@/layouts/LayoutContext"

import UploadImage from '@/components/UploadImage'
import changeToFormData from '../../utils/changeToFormData';
import BannerImages from './BannerImages';
import HighlightNews from './HighlightNews';
import ImageAboutUs from './ImageAboutUs';
import HighlightFeature from './HighlightFeature';
const HomePageContent = () => {
    //------------------API------------------
    //Lấy dữ liệu của homepage
    const { data: homePageData, isLoading: isLoadingHomePageData, isFetching: isFetchingHomePageData } = useHome.getHomePage();

    //Update aboutus, visibility
    const { mutate: updateAboutUs, isPending: isPendingUpdateAboutUs } = useHome.updateHomePage.aboutUs();
    const { mutate: updateVisibility, isPending: isPendingUpdateVisibility} = useHome.updateHomePage.visibility();

    //--------------Nút isVisibility--------------
    //Check isVisible
    const [isVisible, setIsVisible] = useState(null);
    useEffect(() => {
        if(isLoadingHomePageData) return
        setIsVisible(homePageData.is_visible);
    }, [homePageData, isLoadingHomePageData]);
    //Xử lý nút visibility
    function handleToggle(checked){
        setIsVisible(checked);
        updateVisibility({visibility: checked});
    }
    //-----------------Set Layout cho trang---------------------
    const { setLayoutProps } = useLayout()
    useEffect(() => {
        setLayoutProps({
            title: "Nội dung Trang chủ",
            description: "Quản lý nội dung hiển trị trên trang chủ",
            hasButton: false,
            buttonToggle: {
                currentState: isVisible,
                handleToggle: handleToggle
            }
        })
    }, [isVisible]);

    const [valuesAboutus, setValuesAboutus] = useState(null)
    const [aboutusNotification, setAboutusNotification] = useState(false)
    const handleCancelAboutus = () => {
        setAboutusNotification(false)
    }
    const handleConfirmAboutus = () => {
        updateAboutUs(valuesAboutus)
        setAboutusNotification(false)
    }
    
    const configAboutUs = {
        title: "Giới thiệu về công ty Thiên Trúc",
        description: "Đoạn văn và ảnh đại diện công ty",
        listInput: 
        [
            { 
                name: "Nội dung giới thiệu", 
                label: 'Nội dung giới thiệu', 
                placeholder: 'Nhập tiêu đề...', 
                contentCurrent: homePageData?.aboutus_content ?? "", 
                isRequire: true, 
                rows: 7 
            },
        ],
        notificationProps: {
            open: aboutusNotification,
            setOpen: setAboutusNotification,
            notification: "Xác nhận lưu thay đổi!",
            subTitle: "Bạn có chắc chắn muốn lưu thay đổi.",
            buttonLabel1: "Hủy",
            buttonAction1: handleCancelAboutus,
            buttonLabel2: "Xác nhận",
            buttonAction2: handleConfirmAboutus
        },
        handleSave: (values) => {
            setValuesAboutus(values)
            setAboutusNotification(true)
        }
    }
    if (isLoadingHomePageData || isPendingUpdateAboutUs || isFetchingHomePageData || isPendingUpdateVisibility) {
        return <Loading/>
    }
    return (
        <>
            <BannerImages />
            <div className='mt-[40px]'></div>
            <EditBanner
                title={configAboutUs.title}
                description={configAboutUs.description}
                listInput={configAboutUs.listInput}
                saveButton={configAboutUs.handleSave}
            />
            <ImageAboutUs />
            <HighlightFeature />
            <HighlightNews />
            <Notification  {...configAboutUs.notificationProps} />
        </>
    );
}

export default HomePageContent