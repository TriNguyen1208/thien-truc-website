import { AddIcon, EditIcon, DeleteIcon } from '@/components/Icon';
import { useState } from 'react';
import useAboutUs from '@/hooks/useAboutUs';
import Notification from '@/components/Notification'
import Loading from '@/components/Loading'
import Button from '@/components/Button'
import DynamicForm from '@/components/DynamicForm'
import CardList from '@/components/CardList'
const WhyChooseUs = () => {
    //API cho tại sao chọn thiên trúc
    const { data: whyChooseUsData, isLoading: isLoadingWhyChooseUs } = useAboutUs.why_choose_us.getAll();
    const { mutate: updateWhyChooseUs, isPending: isPendingUpdateWhyChooseUs } = useAboutUs.why_choose_us.updateOne();
    const { mutate: createWhyChooseUs, isPending: isPendingCreateWhyChooseUs } = useAboutUs.why_choose_us.createOne();
    const { mutate: deleteWhyChooseUs, isPending: isPendingDeleteWhyChooseUs } = useAboutUs.why_choose_us.deleteOne();
    //Mở modal thêm tại sao chọn Thiên Trúc
    const [isModalOpenAddWhyChooseUs, setIsModalOpenAddWhyChooseUs] = useState(false);
    //Mở modal sửa tại sao chọn Thiên Trúc
    const [isModalOpenEditWhyChooseUs, setIsModalOpenEditWhyChooseUs] = useState(false);
    //Mở modal xóa tại sao chọn thiên trúc
    const [isOpenCancelWhyChooseUs, setIsOpenCancelWhyChooseUs] = useState(false);
    //----------------------Xử lý-------------------
    //Lưu trạng thái edit hiện tại
    const [dataEditWhyChooseUs, setDataEditWhyChooseUs] = useState([
        { name: 'title', label: 'Tên nhiệm vụ', type: 'text', width: 12, isRequired: true, placeholder: "VD: lắp đặt thiết bị", maxLength: 50  },
        { name: 'description', label: 'Mô tả', type: 'textarea', width: 12, isRequired: false, numberRows: 4, maxLength: 200 },
        { type: 'dynamicFields', name: 'details', label: 'Danh sách mô tả chi tiết (tối đa 5 dòng)', isRequired: false, isSingleColumn: true, width: 12, isCheckbox: false, limitRowDynamicFields: 5 },
    ]);
    
    //Lưu trạng thái danh sách nhiệm vụ và trách nhiệm hiện tại sử dung
    const [dataWhyChooseUsCurrent, setDataWhyChooseUsCurrent] = useState(null);
    //Xử lý thêm 1 tại sao chọn chúng tôi
    const handleSubmitButtonAddWhyChooseUs = (valueForm) => {
        createWhyChooseUs(valueForm);
        setIsModalOpenAddWhyChooseUs(false)
    }
    //Hủy thông báo tại sao chọn chúng tôi
    const handleCancelButtonAddWhyChooseUs = () => {
        setIsModalOpenAddWhyChooseUs(false)
    }
    //Xử lý sửa tại sao chọn chúng tôi
    const handleSubmitButtonEditWhyChooseUs = (valueForm) => {
        updateWhyChooseUs({
            id: dataWhyChooseUsCurrent.id,
            data: valueForm,
        })
        setIsModalOpenEditWhyChooseUs(false)
    }
    //Hủy thông báo sửa tại sao chọn chúng tôi
    const handleCancelButtonEditWhyChooseUs = () => {
        setIsModalOpenEditWhyChooseUs(false)
    }
    //Config data cho tại sao chọn thiên trúc để truyền vào props
    const configWhyChooseUs = {
        title: "\"Tại sao chọn Thiên Trúc\"",
        description: "Quản lý các lợi thế cạnh tranh của công ty",
        propsAddButton: {
            Icon: AddIcon,
            text: "Thêm nhiệm vụ",
            colorText: "#ffffff",
            colorBackground: "#000000",
            padding: 8,
        },
        setIsModalOpenAddWhyChooseUs: setIsModalOpenAddWhyChooseUs,
        configAddWhyChooseUs: {
            title: "Thêm nhiệm vụ mới",
            description: "Điền thông tin nhiệm vụ và mô tả chi tiết (tối đa 5 dòng)",
            contentCancelButton: "Hủy",
            contentSubmitButton: "Thêm mới",
            widthModal: 650,
            isModalOpen: isModalOpenAddWhyChooseUs,
            handleSubmitButton: handleSubmitButtonAddWhyChooseUs,
            handleCancelButton: handleCancelButtonAddWhyChooseUs,
            setIsModalOpen: setIsModalOpenAddWhyChooseUs,
        },
        configEditWhyChooseUs: {
            title: "Chỉnh sửa nhiệm vụ",
            description: "Điền thông tin nhiệm vụ và mô tả chi tiết (tối đa 5 dòng)",
            contentCancelButton: "Hủy",
            contentSubmitButton: "Cập nhật",
            widthModal: 650,
            isModalOpen: isModalOpenEditWhyChooseUs,
            handleSubmitButton: handleSubmitButtonEditWhyChooseUs,
            handleCancelButton: handleCancelButtonEditWhyChooseUs,
            setIsModalOpen: setIsModalOpenEditWhyChooseUs,
        },
        dataEditWhyChooseUs: dataEditWhyChooseUs,
        dataAddWhyChooseUs: 
        [
            { 
                name: 'title', 
                label: 'Tên nhiệm vụ', 
                type: 'text', 
                width: 12, 
                isRequired: true, 
                placeholder: "VD: lắp đặt thiết bị", 
                maxLength: 50  },
            { 
                name: 'description', 
                label: 'Mô tả', 
                type: 'textarea', 
                width: 12, 
                isRequired: false, 
                numberRows: 4, 
                maxLength: 200  },
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
        card: whyChooseUsData,
        handleEditButton: (item) => {
            const updatedForm = [
                { ...dataEditWhyChooseUs[0], value: item.title },
                { ...dataEditWhyChooseUs[1], value: item.description },
                { ...dataEditWhyChooseUs[2], value: item.details }
            ];
            setDataEditWhyChooseUs(updatedForm);
            setIsModalOpenEditWhyChooseUs(true);
            setDataWhyChooseUsCurrent(item);
        },
        handleDeleteButton: (item) => {
            setIsOpenCancelWhyChooseUs(true);
            setDataWhyChooseUsCurrent(item);
        },
        cancelPopub: {
            open: isOpenCancelWhyChooseUs,
            setOpen: setIsOpenCancelWhyChooseUs,
            notification: "Xác nhận xóa",
            subTitle: "Bạn có chắc chắn muốn xóa thông số nổi bật này ? ",
            buttonAction1:()=>{
                setIsOpenCancelWhyChooseUs(false);
            },
            buttonAction2: () => {
                if (dataWhyChooseUsCurrent) {
                    deleteWhyChooseUs(dataWhyChooseUsCurrent.id);
                    setIsOpenCancelWhyChooseUs(false);
                }
            },
        }
    }
    if(isLoadingWhyChooseUs || isPendingCreateWhyChooseUs || isPendingDeleteWhyChooseUs || isPendingUpdateWhyChooseUs){
        return <Loading/>
    }
    return (
        <div>
            <div className="flex flex-col p-[24px] bg-white w-full h-full border border-[#E5E7EB] rounded-[8px] gap-[20px] mt-[40px]">
                <div className='flex items-center justify-between'>
                    <div>
                        <div className="mb-[4px]">
                            <h1 className="text-[24px] text-black font-semibold">
                                {configWhyChooseUs.title}
                            </h1>
                        </div>
                        <div className="mb-[24px]">
                            <p className="text-[14px] text-[#71717A] font-regular">
                                {configWhyChooseUs.description}
                            </p>
                        </div>
                    </div>
                    <div className=' h-40[px] '>
                        <button type="submit" className='' onClick={() => configWhyChooseUs.setIsModalOpenAddWhyChooseUs(true)}> <Button {...configWhyChooseUs.propsAddButton} /></button>
                    </div>
                </div>
                <div className='grid grid-cols-12 gap-6'>
                    {(configWhyChooseUs.card || []).map((item, index) => {
                        return (
                            <div className='col-span-6' key={index}>
                                <CardList
                                    {...item}
                                    buttonEdit={
                                        <button onClick={() => configWhyChooseUs.handleEditButton(item)}>
                                            <EditIcon />
                                        </button>
                                    }
                                    buttonDelete={
                                        <button onClick={() => configWhyChooseUs.handleDeleteButton(item)}>
                                            <DeleteIcon />
                                        </button>
                                    }
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
            <DynamicForm data={configWhyChooseUs.dataAddWhyChooseUs} config={configWhyChooseUs.configAddWhyChooseUs} />
            <DynamicForm data={configWhyChooseUs.dataEditWhyChooseUs} config={configWhyChooseUs.configEditWhyChooseUs} />
            <Notification
                open={configWhyChooseUs.cancelPopub.open}
                setOpen={configWhyChooseUs.cancelPopub.setOpen}
                notification={configWhyChooseUs.cancelPopub.notification}
                subTitle={configWhyChooseUs.cancelPopub.subTitle}
                buttonAction1 = {configWhyChooseUs.cancelPopub.buttonAction1}
                buttonAction2={configWhyChooseUs.cancelPopub.buttonAction2}
            />
        </div>
    )
}
export default WhyChooseUs