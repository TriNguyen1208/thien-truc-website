import {useLayout} from '@/layouts/LayoutContext'
import useContact from '@/hooks/useContact';
import { useEffect,useState } from 'react'
import Table from '@/components/Table'
import Button from '@/components/Button'
import Notification from '@/components/Notification'
import ProductImageCell from '@/components/ProductImageCell'
import { DeleteIcon, EditIcon } from '@/components/Icon'
import DynamicForm from '@/components/DynamicForm'
import { toast } from 'react-toastify';
import changeToFormData from '@/utils/changeToFormData'
import Loading from '@/components/Loading'

const Contact = () => {
  const {setLayoutProps} = useLayout();
  const [listContacts , setListContacts] = useState([])
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);

  const [pendingItemDel, setPendingItemDel] = useState(null)
  const [pendingItemEdit, setPendingItemEdit] = useState(null)
  const [isOpenNotification, setIsOpenNotification] = useState(false)

  const {data: supportAgents, isLoading: isLoadingSupportAgent} = useContact.support_agents.getAll()
  const {mutate: addAgent,isPending : isLoadingCreateAgent} = useContact.support_agents.createOne()
  const {mutate: deleteAgent,isPending : isLoadingDeleteAgent} = useContact.support_agents.deleteOne()
  const {mutate: updateAgent, isPending : isLoadingUpdateAgent} = useContact.support_agents.updateOne()
 
const handleAddContact= ()=>
  {
    setIsModalOpenAdd(true)
  }
  useEffect(()=>{
    setLayoutProps({
      title: "Quản lý đội ngũ liên lạc",
      description: "Quản lý thông tin nhân viên liên lạc",
      hasButton: true,
      buttonLabel: "Thêm người liên lạc",
      buttonAction: handleAddContact
    })

  },[])
  useEffect(()=>{
    if(supportAgents)
    {
      setListContacts(supportAgents)
    }
  },[supportAgents])
  
  if(isLoadingSupportAgent || isLoadingCreateAgent || isLoadingDeleteAgent|| isLoadingUpdateAgent)
  {
    return(<Loading/>)
  }
  

  //====================================================Start Form=========================================================
   const handleSubmitButtonAdd = (valueForm) => {
    const { img, ...rest } = valueForm;
    let newForm = null;
    if(valueForm.img instanceof File){
        newForm = {
          ...rest,
          local_image: img,
        }
    }else{
      newForm = {
        ...rest,
        external_avatar_img: img,
      }
    }
    const formData = changeToFormData(newForm);
    addAgent(
      formData
      ,{
      onSuccess: (success)=> { toast.success(success ? success.message: "Thêm thành công!")},
      onError:(error)=>{toast.error(error ?  error.message: "Thêm thất bại!") }
      }
    );
    setIsModalOpenAdd(false)
  }
   const handleSubmitButtonEdit = (valueForm) => {
    const { img, ...rest } = valueForm;
    let newForm = null;
    if(valueForm.img instanceof File){
        newForm = {
          ...rest,
          local_image: img,
        }
    }else{
      newForm = {
        ...rest,
        external_avatar_img: img,
      }
    }
    const formData = changeToFormData(newForm);
    updateAgent(
      {
        id: listContacts[pendingItemEdit].id,
        updatedsupport_agents: formData
      }
      ,
      {
        onSuccess: (success)=> { toast.success(success ? success.message: "Lưu thành công!")},
        onError:(error)=>{toast.error(error ?  error.message: "Lưu thất bại!") }
      }
    )
    setIsModalOpenEdit(false)

  }
  const handleCancelButonAdd = ()=>{
      setIsModalOpenAdd(false)
    }
  const handleCancelButonEdit = ()=>{
      setIsModalOpenEdit(false)
  }
  const configAdd = {
    title: "Thêm người liên lạc mới",
    description: "Điền thông tin để thêm người liên lạc mới",
    widthModal: 700,
    contentCancelButton: "Huỷ",
    contentSubmitButton: "Tạo mới người liên lạc",
    isModalOpen: isModalOpenAdd,
    handleSubmitButton: handleSubmitButtonAdd,
    handleCancelButton: handleCancelButonAdd,
    handleCancelModal: handleCancelButonAdd,
    setIsModalOpen: setIsModalOpenAdd
  }

  const configEdit = {
    title: "Chỉnh sửa thông tin liên lạc",
    description: "Cập nhật thông tin người liên lạc",
    widthModal: 700,
    contentCancelButton: "Huỷ",
    contentSubmitButton: "Cập nhật",
    isModalOpen: isModalOpenEdit,
    handleSubmitButton: handleSubmitButtonEdit,
    handleCancelButton: handleCancelButonEdit,
    handleCancelModal: handleCancelButonEdit,
    setIsModalOpen: setIsModalOpenEdit
  }
  const dataAdd = [
    { name: 'name', label: 'Họ Tên', type: 'text', width: 12,  maxLength : 50, isRequired: true, placeholder: "VD: Đỗ Nguyễn Minh Trí" },
    { name: 'role', label: 'Vị trí', type: 'text', width: 12 ,  maxLength : 50,  placeholder: "VD: Trưởng phòng kinh doanh"  },
    { name: 'phone_number', label: 'Số điện thoại', type: 'text', isOnlyNumber: true , width: 12,  maxLength : 20, isRequired: true ,placeholder: "0123456789" },
    { name: 'facebook_url', label: 'Facebook', type: 'text', width: 12, placeholder: "VD: facebook.com/donguyenminhtri"},
    { name: 'img', label: 'Ảnh đại diện', type: 'image_upload', width: 12, placeholder: "VD: Đỗ Nguyễn Minh Trí", numberRows: 5 },
  ]
   const dataEdit = [
    { name: 'name', label: 'Họ Tên', value: (listContacts[pendingItemEdit] || []).name, type: 'text', width: 12,  maxLength : 50, isRequired: true, placeholder: "VD: Đỗ Nguyễn Minh Trí" },
    { name: 'role', label: 'Vị trí', value: (listContacts[pendingItemEdit] || []).role, type: 'text', width: 12 ,  maxLength : 50,  placeholder: "VD: Trưởng phòng kinh doanh"  },
    { name: 'phone_number', label: 'Số điện thoại',  value: (listContacts[pendingItemEdit] || []).phone_number, type: 'text', isOnlyNumber: true, width: 12,  maxLength : 20, isRequired: true ,placeholder: "0123456789" },
    { name: 'facebook_url', label: 'Facebook',  value: (listContacts[pendingItemEdit] || []).facebook_url ,type: 'text', width: 12, placeholder: "VD: facebook.com/donguyenminhtri"},
    { name: 'img', label: 'Ảnh đại diện', value: (listContacts[pendingItemEdit] || []).avatar_img, type: 'image_upload', width: 12, placeholder: "VD: Đỗ Nguyễn Minh Trí", numberRows: 5 },
  ]
  //====================================================End Form=========================================================
  //====================================================Start Table=======================================================
 
 const handleConfirmNotification= ()=>{
    deleteAgent(listContacts[pendingItemDel].id,
      {
        onSuccess: (success)=> { toast.success(success ? success.message: "Xóa thành công!")},
        onError:(error)=>{toast.error(error ?  error.message: "Xóa thất bại!") }
      }
    )
    setIsOpenNotification(false)
  }
  const handleCancelNotification= ()=>{
    setIsOpenNotification(false)
  }
  
  const notificationProps={
     open: isOpenNotification, 
     setOpen: setIsOpenNotification, 
     notification: "Xác nhận xóa nhân viên!", 
     subTitle:"Bạn có chắc chắn muốn xóa nhân viên này.", 
     buttonLabel1:"Hủy", 
     buttonAction1:handleCancelNotification, 
     buttonLabel2: "Xác nhận xóa", 
     buttonAction2: handleConfirmNotification
  }
  
  const handleDelItem = (e)=> {
    
    const index = parseInt(e.target.closest("[data-key]").getAttribute("data-key")) ;
        setPendingItemDel(index)
        setIsOpenNotification(true)
    }
  const delButton = {
    Icon: DeleteIcon, 
    colorBackground:"#ffffff",
    padding: 4,
    handleButton: handleDelItem
  }
   const editButton = {
    Icon: EditIcon, 
    colorBackground:"#ffffff",
    padding: 4,
    handleButton: (e)=>{
      const index = parseInt(e.target.closest("[data-key]").getAttribute("data-key")) ;
      setPendingItemEdit(index)
      setIsModalOpenEdit(true)
    }
    
  }
  
 const dataTable = listContacts.map((contact, index)=>{
        return([ {type: "text",content: index+1}, 
      {type: "component", component: <div> <ProductImageCell imageUrl = {contact.avatar_img} productName = {"Nhân viên"} /> </div>},
      {type: "text", content: contact.name === '' ? 'Cập nhật sau': contact.name}, 
      {type: "text", content: contact.role  === '' ? 'Cập nhật sau': contact.role},
      {type: "text", content: contact.phone_number  === '' ? 'Cập nhật sau': contact.phone_number},
      {type: "text", content: contact.facebook_url  === '' ? 'Cập nhật sau': contact.facebook_url},
      {type: "array-components", components: [ <div data-key={index} className='w-[44px] h-[40px]'><Button {...editButton} /></div>, <div data-key={index} className='w-[44px] h-[40px]'><Button {...delButton} /></div> ]}
        
    ])
 })


  
 
  const tableProps = {
    columns:["STT", "Ảnh đại diện", "Họ tên", "Vị trí","Số điện thoại", "Facebook", "Thao tác"],
    data: dataTable ,
    isSetting: false
  }
  //====================================================End Table=======================================================
 

  return (
    <div className='bg-white p-[24px] border border-gray-300 rounded-[8px] '> 
      <h1 className='text-black text-[24px] font-semibold my-[12px]'>Danh sách đội ngũ liên lạc</h1>
      <p className='text-[#71717A] text-[14px] font-regular  my-[12px]'> Tổng cộng {listContacts.length} người liên lạc</p>
      <div>
          <Table {...tableProps}/>
      </div> 

      <DynamicForm data={dataAdd} config={configAdd} />
      <DynamicForm data={dataEdit} config={configEdit} />
      <Notification {...notificationProps}/>
    </div>
  )
}

export default Contact