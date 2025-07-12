import React from 'react'
import CustomButton from '@/components/ButtonLayout'
import {SaveIcon} from '@/components/Icon'
const SaveEdit = ({
    form,
    onSave,
    onDelete
}) => {
    const handleSave = () => {
        onSave();
    }
    const handleDelete = () => {
        onDelete();
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
                backgroundColor="white"
                borderColor="#e4e4e7"
                hoverBackgroundColor="#f3f4f6"
                textColor="#364153"
                hoverTextColor="#364153"
                paddingX={16}
                height={45}
                onClick={handleDelete}
            >
                <span>Hủy</span>
            </CustomButton>
        </div>
    )
}

export default SaveEdit