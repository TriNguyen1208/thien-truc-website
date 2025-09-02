import React from 'react'
import UploadImage from '@/components/UploadImage'
import Button from '@/components/Button'
import Loading from '@/components/Loading'
import useHome from '../../../hooks/useHome'
import {useEffect, useState, useRef } from 'react';
import { AddIcon, EditIcon, SubtractIcon, ArrowDownIcon, ArrowUpIcon, SaveIcon, DeleteIcon,UploadIcon } from '@/components/Icon';
import Notification from '@/components/Notification'
import changeToFormData from '@/utils/changeToFormData';

const ImageAboutUs = () => {
    const { mutate: updateImageAboutUs, isPending: isPendingUpdateImageAboutUs } = useHome.updateHomePage.imageAboutUs();
    const { data: homePageData, isLoading: isLoadingHomePageData, isFetching: isFetchingHomePageData } = useHome.getHomePage();

    //================= Image giới thiệu công ty Thiên Trúc ========================
    const [valuesImageAboutus, setValuesImageAboutus] = useState(null); //giong form
    const [initialValuesImageAboutus, setInitialValuesImageAboutus] = useState(null);
    const [imageNotification, setImageNotification] = useState(false);
    useEffect(() => {
        if (isLoadingHomePageData || isFetchingHomePageData) {
            return;
        }
        const initialImage = {
            aboutus_img: homePageData?.aboutus_img ?? "",
        }
        setValuesImageAboutus(initialImage);
        setInitialValuesImageAboutus(initialImage);
    }, [isLoadingHomePageData, isFetchingHomePageData])

    const handleButtonImage = () => {
        const formData = changeToFormData(valuesImageAboutus);
        for (const [key, value] of formData.entries()) {
            if (value == '') {
                alert("Chưa nhập dữ liệu bắt buộc");
                return;
            }
        }
        updateImageAboutUs(formData);
        setImageNotification(false);
    }
    const saveImage = {
        open: imageNotification,
        setOpen: setImageNotification,
        notification: 'Xác nhận lưu thay đổi!',
        subTitle: 'Bạn có chắc chắn muốn lưu thay đổi.',
        buttonLabel1: 'Hủy',
        buttonAction1: () => { setImageNotification(false) },
        buttonLabel2: 'Lưu',
        buttonAction2: handleButtonImage
    }
    const configImageAboutUs = {
        setImageNotification: setImageNotification,
        valuesImageAboutus: valuesImageAboutus,
        setValuesImageAboutus: setValuesImageAboutus,
        initialValuesImageAboutus: initialValuesImageAboutus,
        propsButton: {
            Icon: SaveIcon,
            text: "Lưu thay đổi",
            colorText: "#ffffff",
            colorBackground: "#000000",
            padding: 10,
        }
    }
    if(isLoadingHomePageData || isFetchingHomePageData || isPendingUpdateImageAboutUs){
        return <Loading/>
    }
    return (
        <div>
            <form 
                onSubmit={(e) => { e.preventDefault(), configImageAboutUs.setImageNotification(true) }} 
                className='flex flex-col p-[24px] bg-white w-full h-full border-b border-l border-r border-b-[#E5E7EB] border-r-[#E5E7EB] border-l-[#E5E7EB] rounded-[8px]'
            >
                <div className="flex flex-col mb-[16px]">
                    <label className="mb-[8px] font-medium">
                        Ảnh giới thiệu công ty Thiên Trúc <span className='text-red-500 ml-1'>*</span>
                    </label>
                    <div className=''>
                        <UploadImage 
                            form={configImageAboutUs.valuesImageAboutus} 
                            setForm={configImageAboutUs.setValuesImageAboutus} 
                            initialForm={configImageAboutUs.initialValuesImageAboutus} 
                            keyImage="aboutus_img" 
                        />
                    </div>
                </div>
                <div className='h-40[px]'>
                    <button type='submit'> <Button {...configImageAboutUs.propsButton} /></button>
                </div>
            </form>
            <Notification  {...saveImage} />
        </div>
    )
}

export default ImageAboutUs