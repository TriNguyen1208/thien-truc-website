import {useLayout} from '@/layouts/LayoutContext'
import { useEffect,useState } from 'react'
import Table from '../../components/Table'
import Button from '../../components/Button'
import { DeleteIcon, EditIcon } from '../../components/Icon'
import DynamicForm from '../../components/DynamicForm'
import { CancelPopup, SuccessPopup } from '../../components/Popup'
const Contact = () => {
  const {setLayoutProps} = useLayout();
  const [listContacts , setListContacts] = useState([])
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
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
  //====================================================Start Form=========================================================
   const handleSubmitButtonAdd = (valueForm) => {
    console.log('Day la button submit', valueForm)
    setIsModalOpenAdd(false)
  }
   const handleSubmitButtonEdit = (valueForm) => {
    console.log('Day la button submit', valueForm)
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
    setIsModalOpen: setIsModalOpenEdit
  }
  const data = [
    { name: 'fullName', label: 'Họ Tên', type: 'text', width: 12, isRequired: true, placeholder: "VD: Đỗ Nguyễn Minh Trí" },
    { name: 'position', label: 'Vị trí', type: 'text', width: 12, placeholder: "VD: Trưởng phòng kinh doanh"  },
    { name: 'phone', label: 'Số điện thoại', type: 'text', width: 12, isRequired: true ,placeholder: "0123456789" },
    { name: 'facebook', label: 'Facebook', type: 'text', width: 12, placeholder: "VD: facebook.com/donguyenminhtri"},
    { name: 'Trine123', label: 'Mô tả', type: 'image_upload', width: 12, isRequired: true, placeholder: "VD: Đỗ Nguyễn Minh Trí", numberRows: 5 },
  ]
  //====================================================End Form=========================================================
  //====================================================Start Table=======================================================
  const handleDelItem = (e)=> {
    
    const index = parseInt(e.target.closest("[data-key]").getAttribute("data-key")) ;
        
    setListContacts(prev => prev.filter(ct => prev.indexOf(ct) !== index))
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
   
     setIsModalOpenEdit(true)
    
    }
    
  }
  
  const contacts = [ 
    {
    
    image: null, 
    fullname: "Nguyễn Văn A",
    position :"Trưởng phòng kinh doanh",
    phone:"0123456789", 
    facebook: "http/...",
    },
    {
   
    image: null, 
    fullname: "Nguyễn Văn A",
    position :"Trưởng phòng kinh doanh",
    phone:"0123456789", 
    facebook: "http/...",
    },
    {
 
    image: null, 
    fullname: "Nguyễn Văn A",
    position :"Trưởng phòng kinh doanh",
    phone:"0123456789", 
    facebook: "http/...",
    },
  ]
 const dataTable = listContacts.map((contact, index)=>{
        return([ {type: "text",content: index+1}, 
      {type: "img", path: "https://haycafe.vn/wp-content/uploads/2022/02/Tai-anh-girl-gai-dep-de-thuong-ve-may.jpg"},
      {type: "text", content: contact.fullname}, 
      {type: "text", content: contact.position},
      {type: "text", content: contact.phone},
      {type: "text", content: contact.facebook},
      {type: "array-components", components: [ <div data-key={index} className='w-[44px] h-[40px]'><Button {...editButton} /></div>, <div data-key={index} className='w-[44px] h-[40px]'><Button {...delButton} /></div> ]}
        
    ])
 })


  useEffect(()=>{
    setListContacts(contacts)
  },[])
  
 
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

      <DynamicForm data={data} config={configAdd} />
      <DynamicForm data={data} config={configEdit} />
     
      <SuccessPopup/>
    </div>
  )
}

export default Contact