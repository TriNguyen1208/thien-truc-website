import React from 'react'
import Button from '@/components/Button'
import FeatureCard from '../../../components/FeatureCard'
import Loading from '@/components/Loading'
import useHome from '../../../hooks/useHome'
import {useEffect, useState, useRef } from 'react';
import { AddIcon, EditIcon, SubtractIcon, ArrowDownIcon, ArrowUpIcon, SaveIcon, DeleteIcon,UploadIcon } from '@/components/Icon';
import Notification from '@/components/Notification'
import SimpleForm from '@/components/SimpleForm'

const HighlightFeature = () => {
    //============================= API ==========================
    //Lấy dữ liệu của highlightFeature của công ty
    const { data: highlightFeatureData, isLoading: isLoadingHighlightFeature } = useHome.highlight_stats_about_us.getAll();

    //Thao tác thêm, sửa, xóa của thông tin nổi bật công ty
    const { mutate: updateHighlightFeature, isPending: isPendingUpdateHighlightFeature } = useHome.highlight_stats_about_us.updateOne();
    const { mutate: createHighlightFeature, isPending: isPendingCreateHighlightFeature } = useHome.highlight_stats_about_us.createOne();
    const { mutate: deleteHighlightFeature, isPending: isPendingDeleteHighlightFeature } = useHome.highlight_stats_about_us.deleteOne();

    const [isModalOpenAddHighlightFeature, setIsModalOpenAddHighlightFeature] = useState(false);
    const [isModalOpenEditHighlightFeature, setIsModalOpenEditHighlightFeature] = useState(false);
    const [isOpenCancelHighlightFeature, setIsOpenCancelHighlightFeature] = useState(false);
    const [idCurrentEditHighlightFeature, setIdCurrentEditHighlightFeature] = useState(null);
    const [highlightFeatureToDelete, setHighlightFeatureToDelete] = useState(null);
    const [dataEditHighlightFeature, setDataEditHighlightFeature] = useState([
        { name: 'figures', label: 'Số liệu', type: 'text', width: 12, isRequired: false, placeholder: "VD: 100+", maxLength: 10 },
        { name: 'achievementName', label: 'Tên thành tựu', type: 'text', width: 12, isRequired: false, placeholder: "VD: dự án hoàn thành", maxLength: 50 },
    ]);
    const limitHighlightFeature = 3


    const handleSubmitButtonAddHighlightFeature = (valueForm) => {
        createHighlightFeature(valueForm);
        setIsModalOpenAddHighlightFeature(false)
    }
    const handleCancelButtonAddHighlightFeature = () => {
        setIsModalOpenAddHighlightFeature(false)
    }
    const handleSubmitButtonEditHighlightFeature = (valueForm) => {
        updateHighlightFeature({
            id: idCurrentEditHighlightFeature,
            data: valueForm,
        })
        setIsModalOpenEditHighlightFeature(false)
    }
    const handleCancelButtonEditHighlightFeature = () => {
        setIsModalOpenEditHighlightFeature(false)
    }
    
    const handleEditButton = (item) => {
        const updatedForm = [
            { ...dataEditHighlightFeature[0], value: item.number_text },
            { ...dataEditHighlightFeature[1], value: item.label }
        ];
        setDataEditHighlightFeature(updatedForm);
        setIsModalOpenEditHighlightFeature(true);
        setIdCurrentEditHighlightFeature(item.id);
    }
    const handleDeleteButton = (item) => {
        setIsOpenCancelHighlightFeature(true);
        setHighlightFeatureToDelete(item);
    }
    const configHighlightFeature = {
        title: "Thông số nổi bật của công ty",
        description: "Tối đa 3 thành tựu nổi bật",
        propsAddButton: {
            Icon: AddIcon,
            text: "Thêm thông số",
            colorText: "#ffffff",
            colorBackground: "#000000",
            padding: 8,
        },
        propsSaveButton: {
            Icon: SaveIcon,
            text: "Lưu thông số ",
            colorText: "#ffffff",
            colorBackground: "#000000",
            padding: 8,
        },
        arrayFeatureCard: highlightFeatureData,
        configAddHighlightFeature: {
            title: "Thêm thông số mới",
            description: "Điền thông tin thành tựu nổi bật của công ty",
            contentCancelButton: "Hủy",
            contentSubmitButton: "Thêm mới",
            widthModal: 550,
            isModalOpenSimple: isModalOpenAddHighlightFeature,
            handleSubmitButton: handleSubmitButtonAddHighlightFeature,
            handleCancelButton: handleCancelButtonAddHighlightFeature,
            setIsModalOpenSimple: setIsModalOpenAddHighlightFeature,
        },
        dataAddHighlightFeature: 
        [
            { 
                name: 'figures', 
                label: 'Số liệu', 
                type: 'text', 
                width: 12, 
                isRequired: false, 
                placeholder: "VD: 100+", 
                maxLength: 10 },
            { 
                name: 'achievementName', 
                label: 'Tên thành tựu', 
                type: 'text', 
                width: 12, 
                isRequired: false, 
                placeholder: "VD: dự án hoàn thành", 
                maxLength: 50 
            },
        ],
        configEditHighlightFeature: {
            title: "Chỉnh sửa thông số",
            description: "Điền thông tin thành tựu nổi bật của công ty",
            contentCancelButton: "Hủy",
            contentSubmitButton: "Cập nhật",
            widthModal: 550,
            isModalOpenSimple: isModalOpenEditHighlightFeature,
            handleSubmitButton: handleSubmitButtonEditHighlightFeature,
            handleCancelButton: handleCancelButtonEditHighlightFeature,
            setIsModalOpenSimple: setIsModalOpenEditHighlightFeature,
        },
        cancelPopub: {
            open: isOpenCancelHighlightFeature,
            setOpen: setIsOpenCancelHighlightFeature,
            notification: "Xác nhận xóa",
            subTitle: "Bạn có chắc chắn muốn xóa thông số nổi bật này ? ",
            buttonAction1: () => {
                setIsOpenCancelHighlightFeature(false);
            },
            buttonAction2: () => {
                if (highlightFeatureToDelete) {
                    deleteHighlightFeature(highlightFeatureToDelete.id);
                    setIsOpenCancelHighlightFeature(false);
                }
            },
        },
        setIsModalOpenAddHighlightFeature: setIsModalOpenAddHighlightFeature,
        limitHighlightFeature: limitHighlightFeature,
        handleEditButton: handleEditButton,
        handleDeleteButton: handleDeleteButton
    }
    if(isLoadingHighlightFeature || isPendingCreateHighlightFeature || isPendingDeleteHighlightFeature || isPendingUpdateHighlightFeature){
        return <Loading/>
    }
    return (
        <div>
            <div className="flex flex-col p-[24px] bg-white w-full h-full border border-[#E5E7EB] rounded-[8px] mt-[40px]">
                <div className='flex items-center justify-between'>
                    <div>
                        <div className="mb-[4px]">
                            <h1 className="text-[24px] text-black font-semibold">
                                {configHighlightFeature.title}
                            </h1>
                        </div>
                        <div className="mb-[24px]">
                            <p className="text-[14px] text-[#71717A] font-regular">
                                {configHighlightFeature.description}
                            </p>
                        </div>
                    </div>
                    <div className=' h-40[px]'>
                        <button type="submit"
                            onClick={() => {
                                configHighlightFeature.setIsModalOpenAddHighlightFeature(true)
                            }}
                            disabled={configHighlightFeature.arrayFeatureCard.length >= configHighlightFeature.limitHighlightFeature}
                        >
                            <Button
                                {...configHighlightFeature.propsAddButton}
                                disable={configHighlightFeature.arrayFeatureCard.length >= configHighlightFeature.limitHighlightFeature}
                            />
                        </button>
                    </div>
                </div>
                <div className='grid grid-cols-12 gap-6 mb-[25px]'>
                    {(configHighlightFeature.arrayFeatureCard || []).map((item, index) =>
                        <div className='col-span-4' key={index}>
                            <FeatureCard
                                title={item.number_text}
                                description={item.label}
                                buttonEdit={
                                    <button onClick={() => configHighlightFeature.handleEditButton(item)} className='cursor-pointer'>
                                        <EditIcon />
                                    </button>
                                }  
                                buttonDelete={
                                    <button onClick={() => configHighlightFeature.handleDeleteButton(item)} className='cursor-pointer'>
                                        <DeleteIcon />
                                    </button>
                                }
                            />
                        </div>)}
                </div>
            </div>
            <SimpleForm data={configHighlightFeature.dataAddHighlightFeature} config={configHighlightFeature.configAddHighlightFeature} />
            <SimpleForm data={dataEditHighlightFeature} config={configHighlightFeature.configEditHighlightFeature} />
            <Notification
                open={configHighlightFeature.cancelPopub.open}
                setOpen={configHighlightFeature.cancelPopub.setOpen}
                notification={configHighlightFeature.cancelPopub.notification}
                buttonAction1={configHighlightFeature.cancelPopub.buttonAction1}
                subTitle={configHighlightFeature.cancelPopub.subTitle}
                buttonAction2={configHighlightFeature.cancelPopub.buttonAction2}
            />
        </div>
    )
}

export default HighlightFeature