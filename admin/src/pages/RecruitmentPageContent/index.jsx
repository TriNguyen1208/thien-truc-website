import React, { useEffect, useState} from 'react'
import { useLayout } from '../../layouts/layoutcontext'
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

function UploadImage({
  form, 
  setForm, 
  initialForm,
  keyImage
}){
  const fileInputRef = useRef();
  const [file, setFile] = useState(null);
  const [urlInput, setUrlInput] = useState('');

  useEffect(() => {
    setFile(form?.[keyImage] ?? null)
  }, [form, keyImage])

  useEffect(() => {
    setUrlInput(form?.[keyImage] ?? "");
  }, [initialForm]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if(file){
        setFile(file)
        setForm((prev) => ({...prev, [keyImage]: file}))
    }
    e.target.value = null;
  }
  const removeImage = (fieldName) => {
    setForm((prev) => {
        if (prev[fieldName]?.startsWith?.('blob:')) {
            URL.revokeObjectURL(prev[fieldName]);
        }
        return { ...prev, [fieldName]: '' };
    });
  };
  return (
    <>
     <div className="space-y-4">
        {/* URL Input */}
        <div className="flex gap-2 w-full items-stretch">
            <input
                type="url"
                value={urlInput} //Chỉ có khi nhập tay(nếu như fetch ban đầu thì thay đổi cái này)
                onChange={(e) => {
                    setUrlInput(e.target.value)
                    setForm((prev) => ({
                        ...prev,
                        [keyImage]: e.target.value
                    }));
                }}
                placeholder="Nhập link ảnh"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md w-full"
            />
            {/* File Upload */}
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleChange}
            />
            <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                disabled={!!file} //Nếu như có giá trị nào trong file thì sẽ disable button
                className="flex h-full px-4 py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 disabled:bg-gray-300 cursor-pointer"
            >
                <div>
                    <UploadIcon />
                </div>
                <div className="ml-[15px]">
                    Upload ảnh
                </div>
            </button>
        </div>
        {file?.name && ( //File mà có name thì nó là upload ảnh
            <div className="text-xs text-gray-700 break-all relative border border-gray-200 rounded-md p-2">
                URL: {file.name}
                <button
                    type="button"
                    onClick={() => removeImage(keyImage)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                >
                    ×
                </button>
            </div>
        )}
    </div>
    </>
  )
}
const RecruitmentPageContent = () => {
  const {setLayoutProps} = useLayout();
  const {mutate: updateRecruitment, isPending: isPendingRecruitment} = useRecruitment.patch();
  const {data: recruitment, isLoading: isLoadingRecruitment, isFetching: isFetchingRecruitment} = useRecruitment.getRecruitmentPage();
  const [saveOpenBanner, setSaveOpenBanner] = useState(false);
  const [saveOpenCulture, setSaveOpenCulture] = useState(false);
  const [saveOpenImage, setSaveOpenImage] = useState(false);
  const [form, setForm] = useState(null);
  const [initialForm, setInitialForm] = useState(null);
  useEffect(()=>{
    setLayoutProps({
      title: "Nội dung Trang tuyển dụng",
      description: "Quản lý nội dung hiển thị trên trang tuyển dụng",
    })
  }, [])
  useEffect(() => {
    if(isLoadingRecruitment || isFetchingRecruitment){
      return;
    }
    const initialForm = {
      banner_title: recruitment?.banner_title ?? "",
      banner_description: recruitment?.banner_description ?? "",
      culture_content: recruitment?.culture_content ?? "",
      culture_img_1: recruitment?.culture_img_1 ?? "",
      culture_img_2: recruitment?.culture_img_2 ?? "",
      culture_img_3: recruitment?.culture_img_3 ?? "",
      culture_img_4: recruitment?.culture_img_4 ?? "",
    }
    setForm(initialForm);
    setInitialForm(initialForm);
  }, [isLoadingRecruitment, isFetchingRecruitment])

  const handleButtonBanner = () => {
    const formData = changeToFormData(form);
    updateRecruitment(formData)
    setSaveOpenBanner(false);
    //Gửi API lên backend
  }
  const handleButtonCulture = () => {
    const formData = changeToFormData(form);
    updateRecruitment(formData)
    setSaveOpenCulture(false);
  }
  const handleButtonImage = (e) => {
    setSaveOpenImage(true);
    e.preventDefault();
    const formData = changeToFormData(form);
    for(const [_, value] of formData.entries()){
      if(value == ''){
        alert("Chưa nhập dữ liệu bắt buộc");
        return;
      }
    }
    updateRecruitment(formData);
  }
  const saveBannerPopupData = {
    open: saveOpenBanner,
    setOpen: setSaveOpenBanner,
    notification: 'Bạn có chắc chắn muốn lưu banner của trang tuyển dụng này?',
    subTitle: 'Hành động này sẽ không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?',
    buttonLabel1: 'Hủy',
    buttonAction1: ()=>{setSaveOpenBanner(false)},
    buttonLabel2: 'Lưu',
    buttonAction2: handleButtonBanner
  };
  const saveCulturePopupData = {
    open: saveOpenCulture,
    setOpen: setSaveOpenCulture,
    notification: 'Bạn có chắc chắn muốn lưu văn hóa của trang tuyển dụng này?',
    subTitle: 'Hành động này sẽ không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?',
    buttonLabel1: 'Hủy',
    buttonAction1: ()=>{setSaveOpenCulture(false)},
    buttonLabel2: 'Lưu',
    buttonAction2: handleButtonCulture
  };
  const saveImage = {
    open: saveOpenImage,
    setOpen: setSaveOpenImage,
    notification: 'Bạn có chắc chắn muốn lưu ảnh văn hóa công ty của trang tuyển dụng này?',
    subTitle: 'Hành động này sẽ không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?',
    buttonLabel1: 'Hủy',
    buttonAction1: ()=>{setSaveOpenImage(false)},
    buttonLabel2: 'Lưu',
    buttonAction2: handleButtonImage
  };
  const propsBanner = {
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
          maxLength: 200
        }
      ],
      saveButton: (result) => {
        setForm((prev) => ({...prev, ...result}));
        setSaveOpenBanner(true);
      }
  }
  const propsCulture = {
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
      },
    ],
    saveButton: (result) => {
      setForm((prev) => ({...prev, ...result}));
      setSaveOpenCulture(true);
    }
  }
  if(isLoadingRecruitment || isPendingRecruitment || isFetchingRecruitment){
    return <Loading/>
  }
  const propsButton ={
      Icon: SaveIcon,
      text: "Lưu thay đổi",
      colorText: "#ffffff",
      colorBackground: "#000000",
      padding : 10,
  }
  return (
    <>
      <div className='flex flex-col gap-5'>
        <EditBanner {...propsBanner}/>
        <EditBanner {...propsCulture}/>
        <form onSubmit={handleButtonImage} className='flex flex-col p-[24px] bg-white w-full h-full border border-[#E5E7EB] rounded-[8px]'>
          <div className="flex flex-col mb-[16px]">
            <label className="mb-[8px] font-medium">Ảnh văn hóa công ty <span className='text-red-500 ml-1'>*</span></label>
            <div className='grid grid-cols-2 gap-3'>
              <UploadImage form={form} setForm={setForm} initialForm={initialForm} keyImage="culture_img_1"/>
              <UploadImage form={form} setForm={setForm} initialForm={initialForm} keyImage="culture_img_2"/>
              <UploadImage form={form} setForm={setForm} initialForm={initialForm} keyImage="culture_img_3"/>
              <UploadImage form={form} setForm={setForm} initialForm={initialForm} keyImage="culture_img_4"/>
            </div>
          </div>
          <div className='h-40[px]'>
              <button type='submit'> <Button {...propsButton}/></button>
          </div>                
        </form>
      </div>
      <Notification {...saveBannerPopupData}/>
      <Notification {...saveCulturePopupData}/>
      <Notification {...saveImage}/>
    </>
    
    
  )
}

export default RecruitmentPageContent