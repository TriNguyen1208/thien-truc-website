  import {useLayout} from '@/layouts/LayoutContext'
  import { useEffect,useState } from 'react'
  import Table from '@/components/Table'
  import Button from '@/components/Button'
  import { DeleteIcon, EditIcon } from '@/components/Icon'
  import DynamicForm from '@/components/DynamicForm'
  import useAdmin from '@/hooks/useAdmin'
  import { toast } from 'react-toastify';
  import Loading from '@/components/Loading'
  import { useNavigate } from 'react-router-dom';
  import { useSelector } from 'react-redux';
  import { useMemo } from 'react';
  import Notification from '@/components/Notification'
  const Manager = () => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    const { setLayoutProps } = useLayout();

    const { data: managers, isLoading: isLoadingManagers } = useAdmin.manager.getAll();
    const { mutate: createManager , isPending: isLoadingCreateManager } = useAdmin.manager.createOne();
    const { mutate: updateManager, isPending: isLoadingUpdateManager  } = useAdmin.manager.updateOne();
    const { mutate: deleteManager, isPending: isLoadingDeleteManager } = useAdmin.manager.deleteOne();

  const [isModalOpenAdd,setIsModalOpenAdd] = useState(false)
  const [isModalOpenEdit,setIsModalOpenEdit] = useState(false)

  const [pendingItemDel, setPendingItemDel] = useState(null)
  const [pendingItemEdit, setPendingItemEdit] = useState(null)

  const [isOpenNotification, setIsOpenNotification] = useState(false)
  const [listManagers , setListManagers] = useState([])
  
  
   const dataEdit = useMemo(() => {
      if (typeof pendingItemEdit !== 'number' || pendingItemEdit < 0) return [];
      const manager = managers?.[pendingItemEdit];
      if (!manager) return [];
      return [
        { name: 'username', label: 'Tên đăng nhập', isReadOnly: true, type: 'text', value: manager.username, width: 6, isRequired: true, placeholder: "VD: minhtri1503", maxLength: 20},
        { name: 'password', label: 'Mật khẩu mới', type: 'password', width: 6},
        { name: 'name', label: 'Họ tên', type: 'text', value: manager.fullname, width: 12, isRequired: true, placeholder: "VD: Đỗ Nguyễn Minh Trí", maxLength: 100},
        { name: 'phone', label: 'Số điện thoại', type: 'text', value: manager.phone, width: 6, isRequired: false, placeholder: "0123456789", maxLength: 20 , isOnlyNumber:true },
        { name: 'email', label: 'Email', type: 'email', value: manager.email, width: 6, placeholder: "VD: minhtri@gmail.com", maxLength: 100},
        { name: 'position', label: 'Vị trí công việc', type: 'text', value: manager.position, width: 12, placeholder: "VD: Trưởng phòng kinh doanh", maxLength: 500},
        { name: 'description', label: 'Mô tả', type: 'textarea', value: manager.description, width: 12, isRequired: false, numberRows: 5, maxLength: 500},
      ];
    }, [pendingItemEdit, managers]);
    

    useEffect(() => {
          if (user && user.role !== 'admin') {
              toast.error('Bạn không có quyền truy cập trang này!');
              navigate('/');
          }
      }, [user, navigate]);
    
    // Tất cả hook đã được gọi, giờ return sớm là an toàn
    if (!user || user.role !== 'admin') {
        return null; 
    }

    useEffect(() => {
      setLayoutProps({
        title: 'Quản lý Manager',
        description: 'Quản lý tài khoản của các Manager',
        hasButton: true,
        buttonLabel: 'Thêm Manager',
        buttonAction: () => setIsModalOpenAdd(true),
      });
    }, []);

    useEffect(() => {
      if (managers) {
        setListManagers(managers);
      }
    }, [managers]);

    useEffect(() => {
      if (pendingItemEdit >= 0 && !managers?.[pendingItemEdit]) {
        setPendingItemEdit(-1);
      }
    }, [managers, pendingItemEdit]);

    useEffect(() => {
      if (!isModalOpenEdit) setPendingItemEdit(-1);
    }, [isModalOpenEdit]);

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
      useEffect(() => {
      if (managers) {
        setListManagers(managers);
      }
    }, [managers]);

    if(isLoadingManagers || isLoadingCreateManager || isLoadingUpdateManager ||isLoadingDeleteManager)
    {
      return(<Loading/>)
    }
    
  const handleConfirmNotification = ()=>{
    setIsOpenNotification(false)
    setListManagers(prev => prev.filter(mgr => prev.indexOf(mgr) !== pendingItemDel))
    deleteManager(managers[pendingItemDel].username,{
      onSuccess: (success)=> { toast.success(success ? success.message: "Xóa thành công!")},
      onError:(error)=>{toast.error(error ?  error.message: "Xóa thất bại!") }
      }
    )
    
  }
  const handleCancleNotification = ()=>{
    setIsOpenNotification(false)
  }
  const notificationProps={
     open: isOpenNotification, 
     setOpen: setIsOpenNotification, 
     notification: "Xác nhận xóa Manager!", 
     subTitle:"Bạn có chắc chắn muốn xóa Manager này.", 
     buttonLabel1:"Hủy", 
     buttonAction1:handleCancleNotification, 
     buttonLabel2: "Xác nhận xóa", 
     buttonAction2: handleConfirmNotification
  }
    //====================================================Start Form=========================================================
    const handleSubmitButtonAdd = (valueForm) => {
      
      createManager( {
        "username": valueForm.username,
        "password": valueForm.password,
        "fullname": valueForm.name,
        "phone": valueForm.phone,
        "email": valueForm.email,
        "position": valueForm.position,
        "description": valueForm.description
        },
        {
          onSuccess: (success)=> { toast.success(success ? success.message: "Lưu thành công!")},
          onError:(error)=>{toast.error(error ?  error.message: "Lưu thất bại!") }
        }
      )
      setIsModalOpenAdd(false)
    
    }
    const handleSubmitButtonEdit = (valueForm) => {
      updateManager( {
        "username": valueForm.username,
        "password": valueForm.password,
        "fullname": valueForm.name,
        "phone": valueForm.phone,
        "email": valueForm.email,
        "position": valueForm.position,
        "description": valueForm.description
        },
        {
          onSuccess: (success)=> { toast.success(success ? success.message: "Lưu thành công!")},
          onError:(error)=>{toast.error(error ?  error.message: "Lưu thất bại!") }
        }
      )
      setIsModalOpenEdit(false)

    }
    const handleCancelButtonAdd = ()=>{
      setIsModalOpenAdd(false)
    }
    const configAdd = {
      title: "Thêm Manager mới",
      description: "Điền thông tin để thêm Manager mới",
      widthModal: 700,
      contentCancelButton: "Huỷ",
      contentSubmitButton: "Tạo mới Manager",
      isModalOpen: isModalOpenAdd,
      handleSubmitButton: handleSubmitButtonAdd,
      handleCancelButton: handleCancelButtonAdd,
      handleCancelModal:handleCancelButtonAdd,
      setIsModalOpen: setIsModalOpenAdd
    }
  const handleCancelButtonEdit= ()=>{
      setIsModalOpenEdit(false)
    }
    const configEdit = {
      title: "Chỉnh sửa Manager",
      description: "Cập nhật thông tin Manager",
      widthModal: 700,
      contentCancelButton: "Huỷ",
      contentSubmitButton: "Cập nhật",
      isModalOpen: isModalOpenEdit,
      handleSubmitButton: handleSubmitButtonEdit,
      handleCancelButton: handleCancelButtonEdit,
      handleCancelModal:handleCancelButtonEdit,
      setIsModalOpen: setIsModalOpenEdit
    }
    const dataAdd = [
      { name: 'username', label: 'Tên đăng nhập', type: 'text', width: 6, isRequired: true, placeholder: "VD: minhtri1503", maxLength: 20},
      { name: 'password', label: 'Mật khẩu', type: 'password', width: 6, isRequired: true},
      { name: 'name', label: 'Họ tên', type: 'text', width: 12, isRequired: true ,placeholder: "VD: Đỗ Nguyễn Minh Trí" , maxLength: 100},
      { name: 'phone', label: 'Số điện thoại', type: 'text', width: 6, isRequired: false ,placeholder: "0123456789", maxLength: 20 , isOnlyNumber: true},
      { name: 'email', label: 'Email', type: 'email', width: 6, placeholder: "VD: minhtri@gmail.com", maxLength: 100},
      { name: 'position', label: 'Vị trí công việc', type: 'text', width: 12, placeholder: "VD: Trưởng phòng kinh doanh", maxLength: 500  },
      { name: 'description', label: 'Mô tả', type: 'textarea', width: 12, isRequired: false, numberRows: 5, maxLength: 500},
    ]
    //====================================================End Form=========================================================
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
        
      },
    }
    const dataTable = (listManagers || []).map((manager, index)=>{
          return([ 
          {type: "text",content: manager.username === '' ? 'Cập nhật sau': manager.username}, 
          {type: "text", content: manager.fullname === '' ? 'Cập nhật sau': manager.fullname},
          {type: "text", content: manager.phone === '' ? 'Cập nhật sau': manager.phone}, 
          {type: "text", content: manager.email === '' ? 'Cập nhật sau': manager.email},
          {type: "text", content: manager.position === '' ? 'Cập nhật sau': manager.position},
          {type: "text", content: manager.description === '' ? 'Cập nhật sau': manager.description},
          {type: "array-components", components: [ <div data-key={index} className='w-[44px] h-[40px]'><Button {...editButton} /></div>, <div data-key={index} className='w-[44px] h-[40px]'><Button {...delButton} /></div> ]}
          
      ])
  })
  
    const tableProps = {
      columns:["Tên đăng nhập", "Họ tên", "Số điện thoại", "Email", "Vị trí", "Mô tả", "Thao tác"],
      data: dataTable ,
      isSetting: false,
      width :['10%' ,'10%','10%', '15%', '20%','20%', '15%']
    }
    
    return (
      <div className='bg-white border border-gray-300 rounded-[8px] p-[24px]'> 
        <h1 className='text-black text-[24px] font-semibold my-[12px]'>Danh sách Manager</h1>
        <p className='text-[#71717A] text-[14px] font-regular my-[12px]'> Tổng cộng {(listManagers || []).length} Manager</p>
        <div>
            <Table {...tableProps}/>
        </div>
        <DynamicForm data={dataAdd} config={configAdd}/>
        {isModalOpenEdit && (
          <DynamicForm
            data={dataEdit}
            config={configEdit}
          />
        )}
        <Notification {...notificationProps}/>
      </div>
    )
  }

  export default Manager