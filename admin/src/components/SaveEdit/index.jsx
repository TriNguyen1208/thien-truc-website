import React from 'react'
import CustomButton from '@/components/ButtonLayout'
import {SaveIcon, DeleteIcon} from '@/components/Icon'
const SaveEdit = ({
    form,
    onSave,
    onDelete = null,
    onRecover,
}) => {
    const handleSave = () => {
        onSave();
    }
    const handleDelete = () => {
        onDelete();
    }
    const handleRecorver = () => {
        onRecover();
    }
    return (
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
                onClick={handleRecorver}
            >
                <span>Khôi phục</span>
            </CustomButton>
            {onDelete != null && 
                <CustomButton
                backgroundColor="white"
                borderColor="#e4e4e7"
                hoverBackgroundColor="oklch(57.7% 0.245 27.325)"
                textColor="#000000"
                hoverTextColor="#ffffff"
                paddingX={16}
                height={45}
                onClick={handleDelete}
                >
                <div className='flex gap-11 items-center'>
                        <DeleteIcon/>
                        <span>Xóa</span>
                        <span></span>
                    </div>
                </CustomButton>
            }
            
        </div>
    )
}

export default SaveEdit