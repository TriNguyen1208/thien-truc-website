import {useLayout} from '@/layouts/LayoutContext'
import { useEffect,useState } from 'react'
import Table from '../../components/Table'
import Button from '../../components/Button'
import { DeleteIcon, EditIcon } from '../../components/Icon'
import DynamicForm from '../../components/DynamicForm'
import { CancelPopup } from '../../components/Popup'
import { Modal, Result } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
function SuccessPopup({ open, setOpen, notification, subTitle}) {

  const handleOk = () => setOpen(false);

  return (
    <div className="p-6">

      <Modal
        open={open}
        footer={null}
        onCancel={handleOk}
        centered
        closable
        width={550}
      > 
        <Result
          status="success"
          icon={<CheckCircleFilled style={{ color: '#52c41a', fontSize: 72 }} />}
          title={
            <div className="text-lg font-semibold">
              {notification || 'Successfully Purchased Cloud Server ECS!'}
            </div>
          }
          subTitle={
            <div className="text-gray-500 text-sm">
              {subTitle || 'Your order has been successfully processed. You can now manage your cloud server from the console.'}
            </div>
          }
         
        />
      </Modal>
    </div>
  );
};

const Manager = () => {
  const {setLayoutProps} = useLayout();
  const [listManagers , setListManagers] = useState([])
  const [isModalOpenAdd,setIsModalOpenAdd] = useState(false)
  const [isModalOpenEdit,setIsModalOpenEdit] = useState(false)
  const [pendingItemDel, setPendingItemDel] = useState(null)
  const [isOpenCancelPopup, setIsOpenCancelPopup] = useState(false)
  const [isOpenSuccesPopup, setIsOpenSuccesPopup] = useState(false)

  const handleConfirmPopup = ()=>{
    setIsOpenCancelPopup(false)
     setListManagers(prev => prev.filter(mgr => prev.indexOf(mgr) !== pendingItemDel))

  }
  const handleCanclePopup = ()=>{
    setIsOpenCancelPopup(false)

  }
  const succesProps = {
      open: isOpenSuccesPopup, 
     setOpen: setIsOpenSuccesPopup, 
     notification: "Lưu thành công!", 
     subTitle:" ", 
  }
  const cancelProps={
     open: isOpenCancelPopup, 
     setOpen: setIsOpenCancelPopup, 
     notification: "Xác nhận xóa Manager!", 
     subTitle:"Bạn có chắc chắn muốn xóa Manager này.", 
     buttonLabel1:"Hủy", 
     buttonAction1:handleCanclePopup, 
     buttonLabel2: "Xác nhận xóa", 
     buttonAction2: handleConfirmPopup
  }

 
  //====================================================Start Form=========================================================
   const handleSubmitButtonAdd = (valueForm) => {
    console.log('Day la button submit', valueForm)
    setIsModalOpenAdd(false)
    setIsOpenSuccesPopup(true)
  }
   const handleSubmitButtonEdit = (valueForm) => {
    console.log('Day la button submit', valueForm)
    setIsModalOpenEdit(false)
    setIsOpenSuccesPopup(true)

  }
  const configAdd = {
    title: "Thêm Manager mới",
    description: "Điền thông tin để thêm Manager mới",
    widthModal: 700,
    contentCancelButton: "Huỷ",
    contentSubmitButton: "Tạo mới Manager",
    isModalOpen: isModalOpenAdd,
    handleSubmitButton: handleSubmitButtonAdd,
    setIsModalOpen: setIsModalOpenAdd
  }

  const configEdit = {
    title: "Chỉnh sửa Manager",
    description: "Cập nhật thông tin Manager",
    widthModal: 700,
    contentCancelButton: "Huỷ",
    contentSubmitButton: "Cập nhật",
    isModalOpen: isModalOpenEdit,
    handleSubmitButton: handleSubmitButtonEdit,
    setIsModalOpen: setIsModalOpenEdit
  }
  const data = [
    { name: 'username', label: 'Tên đăng nhập', type: 'text', width: 6, isRequired: true, placeholder: "VD: minhtri1503", maxLength: 20},
    { name: 'password', label: 'Mật khẩu', type: 'password', width: 6, isRequired: true},
    { name: 'name', label: 'Họ tên', type: 'text', width: 12, isRequired: true ,placeholder: "VD: Đỗ Nguyễn Minh Trí" , maxLength: 100},
    { name: 'phone', label: 'Số điện thoại', type: 'text', width: 6, isRequired: false ,placeholder: "0123456789", maxLength: 20 },
    { name: 'email', label: 'Email', type: 'email', width: 6, placeholder: "VD: minhtri@gmail.com", maxLength: 100},
    { name: 'position', label: 'Vị trí công việc', type: 'text', width: 12, placeholder: "VD: Trưởng phòng kinh doanh", maxLength: 500  },
     { name: 'description', label: 'Mô tả', type: 'textarea', width: 12, isRequired: false, numberRows: 5, maxLength: 500},
  ]
  //====================================================End Form=========================================================
  const handleDelItem = (e)=> {
    
    const index = parseInt(e.target.closest("[data-key]").getAttribute("data-key")) ;
        setPendingItemDel(index)
        setIsOpenCancelPopup(true)
         
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
  const managers = [ 
    {
    username: "manager1", 
    fullname: "Nguyễn Văn A",
    phone:"0123456789", 
    email: "nguyen@gmail.com",
    position :"Nhân viên",
    description: "Miền nam"
    },
    {username: "manager2", 
    fullname: "Nguyễn Văn A",
     phone:"0123456789", 
    email: "nguyen@gmail.com",
    position :"Nhân viên",
     description: "Miền nam"
    },
     {username: "manager3", 
    fullname: "Nguyễn Văn A",
     phone:"0123456789", 
    email: "nguyen@gmail.com",
    position :"Nhân viên",
     description: "Miền nam"
    },
  ]
 const dataTable = listManagers.map((manager, index)=>{
        return([ {type: "text",content: manager.username}, 
      {type: "text", content: manager.fullname},
      {type: "text", content: manager.phone}, 
      {type: "text", content: manager.email},
      {type: "text", content: manager.position},
      {type: "text", content: manager.description},
      {type: "array-components", components: [ <div data-key={index} className='w-[44px] h-[40px]'><Button {...editButton} /></div>, <div data-key={index} className='w-[44px] h-[40px]'><Button {...delButton} /></div> ]}
        
    ])
 })


 

  useEffect(()=>{
    setLayoutProps({
      title: "Quản lý Manager",
      description: "Quản lý tài khoản của các Manager",
      hasButton: true,
      buttonLabel: "Thêm Manager",
      buttonAction:()=>{
          setIsModalOpenAdd(true)
      }
    })
  },[])
  useEffect(()=>{
    setListManagers(managers)
  },[])
  
 
  const tableProps = {
    columns:["Tên đăng nhập", "Họ tên", "Số điện thoại", "Email", "Vị trí", "Mô tả", "Thao tác"],
    data: dataTable ,
    isSetting: false
  }
  
  return (
    <div className='bg-white border border-gray-300 rounded-[8px] p-[24px]'> 
      <h1 className='text-black text-[24px] font-semibold my-[12px]'>Danh sách Manager</h1>
      <p className='text-[#71717A] text-[14px] font-regular  my-[12px]'> Tổng cộng {listManagers.length} Manager</p>
      <div>
          <Table {...tableProps}/>
      </div>
      <DynamicForm data={data} config={configAdd}/>
      <DynamicForm data={data} config={configEdit}/>
      <CancelPopup {...cancelProps}/>
      <SuccessPopup {...succesProps}/>
    </div>
  )
}

export default Manager