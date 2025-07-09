import {useLayout} from '@/layouts/LayoutContext'
import { useEffect,useState } from 'react'
import Table from '../../components/Table'
import Button from '../../components/Button'
import { DeleteIcon, EditIcon } from '../../components/Icon'
import DynamicForm from '../../components/DynamicForm'

const Manager = () => {
  const {setLayoutProps} = useLayout();
  const [listManagers , setListManagers] = useState([])
  const handleDelItem = (e)=> {
    
    const index = parseInt(e.target.closest("[data-key]").getAttribute("data-key")) ;
          setListManagers(prev => prev.filter(mgr => prev.indexOf(mgr) !== index))
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
      return(<div>
        <DynamicForm/>
      </div>)
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
          console.log("Them manager")
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
    <div> 
      <h1 className='text-black text-[24px] font-semibold my-[12px]'>Danh sách Manager</h1>
      <p className='text-[#71717A] text-[14px] font-regular  my-[12px]'> Tổng cộng 2 Manager</p>
      <div>
          <Table {...tableProps}/>
      </div>
    </div>
  )
}

export default Manager