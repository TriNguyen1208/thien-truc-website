import { AddIcon, EditIcon, DeleteIcon } from '@/components/Icon';
import { useState } from 'react';
import useAboutUs from '@/hooks/useAboutUs';
import Notification from '@/components/Notification'
import Loading from '@/components/Loading'
import Button from '@/components/Button'
import DynamicForm from '@/components/DynamicForm'
import CardList from '@/components/CardList'

const DutyAndResponsibility = () => {
    //API cho danh sách nhiệm vụ và trách nhiệm
    const { data: dutyAndResponsibilityData, isLoading: isLoadingDutyAndResponsibility } = useAboutUs.company_services.getAll();
    const { mutate: updateDutyAndResponsibility, isPending: isPendingUpdateDutyAndResponsibility } = useAboutUs.company_services.updateOne();
    const { mutate: createDutyAndResponsibility, isPending: isPendingCreateDutyAndResponsibility } = useAboutUs.company_services.createOne();
    const { mutate: deleteDutyAndResponsibility, isPending: isPendingDeleteDutyAndResponsibility } = useAboutUs.company_services.deleteOne();
    //----------Mở modal popup---------
    //Mở modal thêm nhiệm vụ
    const [isModalOpenAddDutyAndResponsibility, setIsModalOpenAddDutyAndResponsibility] = useState(false);
    //Mở modal sửa nhiệm vụ
    const [isModalOpenEditDutyAndResponsibility, setIsModalOpenEditDutyAndResponsibility] = useState(false);
    //Check xem có mở model xóa 1 nhiệm vụ hay không
    const [isOpenCancelDutyAndResponsibility, setIsOpenCancelDutyAndResponsibility] = useState(false);

    //------------Xử lý------------------
    const [dataEditDutyAndResponsibility, setDataEditDutyAndResponsibility] = useState([
        { name: 'title', label: 'Tên nhiệm vụ', type: 'text', width: 12, isRequired: true, placeholder: "VD: lắp đặt thiết bị", maxLength: 50  },
        { name: 'description', label: 'Mô tả', type: 'textarea', width: 12, isRequired: false, numberRows: 4, maxLength: 200  },
        { type: 'dynamicFields', name: 'details', label: 'Danh sách mô tả chi tiết (tối đa 5 dòng)', isRequired: false, isSingleColumn: true, width: 12, isCheckbox: false, limitRowDynamicFields: 5 },
    ]);
    //Lưu trạng thái danh sách nhiệm vụ và trách nhiệm hiện tại sử dung
    const [dataDutyAndResponsibilityCurrent, setDataDutyAndResponsibilityCurrent] = useState(null);

    //Xử lý thêm 1 danh sách nhiệm vụ và trách nhiệm
    const handleSubmitButtonAddDutyAndResponsibility = (valueForm) => {
        createDutyAndResponsibility(valueForm);
        setIsModalOpenAddDutyAndResponsibility(false)
    }
    //Hủy thông báo thêm nhiệm vụ và trách nhiệm
    const handleCancelButtonAddDutyAndResponsibility = () => {
        setIsModalOpenAddDutyAndResponsibility(false)
    }
    //Xử lý sửa 1 nhiệm vụ và trách nhiệm
    const handleSubmitButtonEditDutyAndResponsibility = (valueForm) => {
        updateDutyAndResponsibility({
            id: dataDutyAndResponsibilityCurrent.id,
            data: valueForm,
        })
        setIsModalOpenEditDutyAndResponsibility(false)
    }
    //Hủy thông báo sửa nhiệm vụ và trách nhiệm
    const handleCancelButtonEditDutyAndResponsibility = () => {
        setIsModalOpenEditDutyAndResponsibility(false)
    }
    //Config data cho danh sách nhiệm vụ và trách nhiệm để truyền vào props
    const configDutyAndResponsibility = {
        title: "Danh sách nhiệm vụ và trách nhiệm",
        description: "Quản lý các nhiệm vụ chính của công ty",
        propsAddButton: {
            Icon: AddIcon,
            text: "Thêm nhiệm vụ",
            colorText: "#ffffff",
            colorBackground: "#000000",
            padding: 8,
        },
        setIsModalOpenAddDutyAndResponsibility: setIsModalOpenAddDutyAndResponsibility,
        configAddDutyAndResponsibility: {
            title: "Thêm nhiệm vụ mới",
            description: "Điền thông tin nhiệm vụ và mô tả chí tiết (tối đa 5 dòng)",
            contentCancelButton: "Hủy",
            contentSubmitButton: "Thêm mới",
            widthModal: 650,
            isModalOpen: isModalOpenAddDutyAndResponsibility,
            handleSubmitButton: handleSubmitButtonAddDutyAndResponsibility,
            handleCancelButton: handleCancelButtonAddDutyAndResponsibility,
            setIsModalOpen: setIsModalOpenAddDutyAndResponsibility,
        },
        configEditDutyAndResponsibility: {
            title: "Chỉnh sửa nhiệm vụ",
            description: "Điền thông tin nhiệm vụ và mô tả chi tiết (tối đa 5 dòng)",
            contentCancelButton: "Hủy",
            contentSubmitButton: "Cập nhật",
            widthModal: 650,
            isModalOpen: isModalOpenEditDutyAndResponsibility,
            handleSubmitButton: handleSubmitButtonEditDutyAndResponsibility,
            handleCancelButton: handleCancelButtonEditDutyAndResponsibility,
            setIsModalOpen: setIsModalOpenEditDutyAndResponsibility,
        },
        dataEditDutyAndResponsibility: dataEditDutyAndResponsibility,
        dataAddDutyAndResponsibility: [
            { 
                name: 'title', 
                label: 'Tên nhiệm vụ', 
                type: 'text', 
                width: 12, 
                isRequired: true, 
                placeholder: "VD: lắp đặt thiết bị", 
                maxLength: 50 },
            { 
                name: 'description', 
                label: 'Mô tả', 
                type: 'textarea', 
                width: 12, 
                isRequired: false, 
                numberRows: 4, 
                maxLength: 200 },
            { 
                type: 'dynamicFields', 
                name: 'details', 
                label: 'Danh sách mô tả chi tiết (tối đa 5 dòng)', 
                isRequired: false, 
                isSingleColumn: true, 
                width: 12, 
                isCheckbox: false, 
                limitRowDynamicFields: 5 
            },
        ],
        card: dutyAndResponsibilityData,
        handleEditButton: (item) => {
            const updatedForm = [
                { ...dataEditDutyAndResponsibility[0], value: item.title },
                { ...dataEditDutyAndResponsibility[1], value: item.description },
                { ...dataEditDutyAndResponsibility[2], value: item.details }
            ];
            setDataEditDutyAndResponsibility(updatedForm);
            setIsModalOpenEditDutyAndResponsibility(true);
            setDataDutyAndResponsibilityCurrent(item);
        },
        handleDeleteButton: (item) => {
            setIsOpenCancelDutyAndResponsibility(true);
            setDataDutyAndResponsibilityCurrent(item);
        },
        cancelPopub: {
            open: isOpenCancelDutyAndResponsibility,
            setOpen: setIsOpenCancelDutyAndResponsibility,
            notification: "Xác nhận xóa",
            subTitle: "Bạn có chắc chắn muốn xóa thông số nổi bật này ? ",
            buttonAction1:()=>{
                setIsOpenCancelDutyAndResponsibility(false);
            },
            buttonAction2: () => {
                if (dataDutyAndResponsibilityCurrent) {
                    deleteDutyAndResponsibility(dataDutyAndResponsibilityCurrent.id);
                    setIsOpenCancelDutyAndResponsibility(false);
                }
            },
        }
    }
    if(isLoadingDutyAndResponsibility || isPendingCreateDutyAndResponsibility || isPendingDeleteDutyAndResponsibility || isPendingUpdateDutyAndResponsibility){
        return <Loading/>
    }
    return (
        <div>
            <div className="flex flex-col p-[24px] bg-white w-full h-full border border-[#E5E7EB] rounded-[8px] gap-[20px] mt-[40px]">
                <div className='flex items-center justify-between'>
                    <div>
                        <div className="mb-[4px]">
                            <h1 className="text-[24px] text-black font-semibold">
                                {configDutyAndResponsibility.title}
                            </h1>
                        </div>
                        <div className="mb-[24px]">
                            <p className="text-[14px] text-[#71717A] font-regular">
                                {configDutyAndResponsibility.description}
                            </p>
                        </div>
                    </div>
                    <div className='h-40[px] '>
                        <button type="submit" className='' onClick={() => configDutyAndResponsibility.setIsModalOpenAddDutyAndResponsibility(true)}> <Button {...configDutyAndResponsibility.propsAddButton} /></button>
                    </div>
                </div>
                <div className='grid grid-cols-12 gap-6'>
                    {(configDutyAndResponsibility.card || []).map((item, index) => {
                        return (
                            <div className='col-span-6' key={index}>
                                <CardList
                                    {...item}
                                    buttonEdit={
                                        <button onClick={() => configDutyAndResponsibility.handleEditButton(item)} className='cursor-pointer'>
                                            <EditIcon />
                                        </button>
                                    }
                                    buttonDelete={
                                        <button onClick={() => configDutyAndResponsibility.handleDeleteButton(item)} className='cursor-pointer'>
                                            <DeleteIcon />
                                        </button>
                                    }
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
            <DynamicForm data={configDutyAndResponsibility.dataAddDutyAndResponsibility} config={configDutyAndResponsibility.configAddDutyAndResponsibility} />
            <DynamicForm data={configDutyAndResponsibility.dataEditDutyAndResponsibility} config={configDutyAndResponsibility.configEditDutyAndResponsibility} />
            <Notification
                open={configDutyAndResponsibility.cancelPopub.open}
                setOpen={configDutyAndResponsibility.cancelPopub.setOpen}
                notification={configDutyAndResponsibility.cancelPopub.notification}
                subTitle={configDutyAndResponsibility.cancelPopub.subTitle}
                buttonAction1 = {configDutyAndResponsibility.cancelPopub.buttonAction1}
                buttonAction2={configDutyAndResponsibility.cancelPopub.buttonAction2}
            />
        </div>
    )
}

export default DutyAndResponsibility