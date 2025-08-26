import { useEffect, useState } from 'react';
import { useLayout } from '@/layouts/LayoutContext';
import Button from '@/components/Button';
import { DeleteIcon, PlusIcon, SaveIcon } from '@/components/Icon';
import useContact from '@/hooks/useContact'
import Notification from '@/components/Notification'
import { toast } from 'react-toastify';
import Loading from '@/components/Loading'
function Address({index,address,isChecked, isMultiple, handleDelete, handleChange ,handleChecked})
{
  return(
    <div className='flex flex-col relative w-full h-full gap-[16px] border border-gray-300 rounded-[8px] p-[16px]'>
       <div className=' flex flex-row gap-[8px]'>
          <input type="checkbox" 
          onChange={(e) => handleChecked(address.id)}
          checked = {isChecked} className="w-5 h-5 bg-black accent-black rounded-md"  />
         <label htmlFor="" className='text-[14px] text-black font-medium'>Chi nhánh chính</label>
       </div>
       <div className=' flex flex-col gap-[8px]'>
         <label htmlFor="" className='text-[14px] text-black font-medium'>Địa chỉ {index}<span className="text-red-500 ml-1">*</span></label>
          <input type="text"
           onChange={(e) => handleChange(address.id, "address", e.target.value)}
           required
          
          className='focus:outline-none border border-gray-300 rounded-[8px] p-[12px] min-h-[45px]' placeholder='Vd: 123 Phường Bến Nghé TP.HCM' value={address.address}/>
       </div>
       <div className=' flex flex-col gap-[8px]'>
         <label htmlFor="" className='text-[14px] text-black font-medium'>Link Google Map</label>
          <input type="url"
           onChange={(e) => handleChange(address.id, "googlemaps_url", e.target.value)}
           className='focus:outline-none border border-gray-300 rounded-[8px] p-[12px] min-h-[45px]'
           placeholder='Vd: http://maps.google.com/...' 
           value={address.googlemaps_url} />
       </div>
      {isMultiple && <div className='absolute w-[44px] h-[40px] top-[12px] right-[12px]'><Button Icon = {DeleteIcon} colorText = {"#000000"} colorBackground = "#FFFFFF" handleButton = {handleDelete}/></div>}
    </div>
  )
}

const Company = () => {

    const { setLayoutProps } = useLayout();
    const {data: companyInfo, isLoading: isLoadingCompanyInfo} = useContact.getCompanyInfo()
    const {mutate: updateCompanyInfo, isPending: isLoadingUpdateCompanyInfo} = useContact.patchCompanyInfo()

    const [companyAddressList , setCompanyAddressList] = useState([])
    const [companyHourList , setCompanyHourList] = useState([])
    const [companyPhoneList , setCompanyPhoneList] = useState([])
    const [companyHotlineList , setCompanyHotlineList] = useState([])
    const [companyFanpageUrl ,setCompanyFanpageUrl] = useState (null)
    const [companyEmail, setCompanyEmail] = useState(null)
    const [companyEmbedUrl, setCompanyEmbedUrl] = useState(null)

    const [nextHourId, setNextHourId] = useState(0);
    const [nextPhoneId, setNextPhoneId] = useState(0);
    const [nextHotlineId, setNextHotlineId] = useState(0);
    const [nextAddressId, setNextAddressId] = useState(0);

    const [selectedAddressId, setSelectedAddressId] = useState(null);

    const [openNotification, setOpenNotification] = useState(false)
    const [pendingDeleteId, setPendingDeleteId] = useState(null);
    const [notificationType, setNotificationType] = useState(null); // "address" | "hour" | "phone" | "hotline"

    useEffect(() => {
      setLayoutProps({
        title: 'Thông tin công ty',
        description: 'Quản lý thông tin liên hệ của công ty',
        hasButton: false,
        
      })
    }, []);
    

    useEffect(()=>{
        if(companyInfo)
        {
           setCompanyAddressList(companyInfo.office_address)
          const maxId = Math.max(...companyInfo.office_address.map(h => h.id), 0);
          setNextAddressId(maxId + 1);

          setSelectedAddressId(companyInfo.main_office.id)

          setCompanyFanpageUrl(companyInfo.fanpage_url)
          setCompanyEmail(companyInfo.company_email)
          setCompanyEmbedUrl(companyInfo.googlemaps_embed_url)

          setCompanyHourList(companyInfo.working_hours.map((hour,index)=>{
            return({
                  id: index,
                  data: hour
            })
           })
          )
          setNextHourId(companyInfo.working_hours.length)

           setCompanyPhoneList(companyInfo.company_phone.map((phone,index)=>{
            return({
                  id: index,
                  data: phone
            })
           }))
          setNextPhoneId(companyInfo.company_phone.length)

         setCompanyHotlineList(companyInfo.hotline.map((hotline,index)=>{
            return({
                  id: index,
                  data: hotline
            })
           }))
          setNextHotlineId(companyInfo.hotline.length)

        }
    },[companyInfo])
    if(isLoadingCompanyInfo || isLoadingUpdateCompanyInfo)
    {
      return(<Loading/>)
    }
  
    const handleCancleNotification = ()=>{
        setOpenNotification(false)
  
    }
     const handleConfirmNotification = ()=>{
        setOpenNotification(false)

        if(notificationType == "address")
        {
            setCompanyAddressList(prev=> 
        {
          const news = prev.filter(addr => addr.id != pendingDeleteId)
          if(pendingDeleteId == selectedAddressId) 
          {
            setSelectedAddressId(news[0].id)
          }
          return news
        } 
        )
        }else if(notificationType == "hour") setCompanyHourList(prev=>prev.filter(hour => hour.id != pendingDeleteId))
         else if(notificationType == "phone")setCompanyPhoneList(prev=>prev.filter(phone => phone.id != pendingDeleteId))
         else if(notificationType == "hotline")setCompanyHotlineList(prev=>prev.filter(hotline => hotline.id != pendingDeleteId))
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        updateCompanyInfo(
            {
              "office_address":companyAddressList.map((address, index) =>{
                return({
                  "id" : address.id,
                  "address" : address.address,
                  "googlemaps_url" : address.googlemaps_url
                })
              }),
              "main_office_id": selectedAddressId,
              "googlemaps_embed_url": companyEmbedUrl,
              "working_hours": companyHourList.map((hour, index) =>{
                return(hour.data)
              }),
              "company_email": companyEmail,
              "company_phone": companyPhoneList.map((phone, index) =>{
                return(phone.data)
              }),
              "hotline": companyHotlineList.map((hotline, index) =>{
                return(hotline.data)
              }),
              "fanpage_url": companyFanpageUrl
        },
          {
            onSuccess: (success)=> { toast.success(success ? success.message: "Lưu thành công!")},
            onError:(error)=>{toast.error(error ?  error.message: "Lưu thất bại!") }
          }
        )
     
      }
     
    
    //===========Addresss=====================
   
  const notificationProps = {
     open:openNotification, 
     setOpen :setOpenNotification,
     notification:"Xác nhận xóa", 
     subTitle: "Bạn có chắc chắn muốn xóa? Hành động này không thể hoàn tác.", 
     buttonLabel1 : "Hủy", 
     buttonAction1: handleCancleNotification, 
     buttonLabel2: "Xác nhận xóa", 
     buttonAction2: handleConfirmNotification
  }
  const handleDeleteAddress = (e)=>{
      const parentWithDataIndex = e.target.closest('[data-index]');
      const index = parentWithDataIndex.getAttribute('data-index');
        setPendingDeleteId(index)
        setNotificationType("address")
        setOpenNotification(true)
       
    }
    const handleAddAddress = ()=>{
       setCompanyAddressList(prev=> ([
          ...prev, {
          address: "",
          googlemaps_url: "",
          id: nextAddressId
       
       }] ))
       setNextAddressId(prev => prev + 1)
    }
  
  const addressButton = {
    Icon: PlusIcon,
    text: "Thêm địa chỉ", 
    colorText:"#000000", 
    colorBackground: "#ffffff",
    padding :3, 
    handleButton: handleAddAddress
  }
  const handleAddressChange = (id, field, value) => {
  setCompanyAddressList(prev =>
    prev.map(addr =>
      addr.id === id ? { ...addr, [field]: value } : addr
    )
  );
};
const handleSelectMainAddress = (id) => {
  setSelectedAddressId(id);
};
  //============Hour work======================
   const hourButton = {
    Icon: PlusIcon,
    text: "Thêm giờ làm việc", 
    colorText:"#000000", 
    colorBackground: "#ffffff",
    padding :3, 
    handleButton:()=>{
         setCompanyHourList(prev=> ([
          ...prev, {id: nextHourId , data: ""}
          ] ))
           setNextHourId(prev => prev + 1);
    }
  }
  
  const handleDeleteHour =(e)=> {
      const parentWithDataIndex = e.target.closest('[data-index]');
      const index = parentWithDataIndex.getAttribute('data-index');
       setPendingDeleteId(index)
        setNotificationType("hour")
        setOpenNotification(true)
     
  }
  const handleHourChange = (id, value) => {
      setCompanyHourList(prev =>
        prev.map(hour =>
          hour.id === id ? { ...hour, data: value } : hour
        )
      );
    };
    //=========================Phone Company============================
   const phoneButton = {
    Icon: PlusIcon,
    text: "Thêm số điện thoại", 
    colorText:"#000000", 
    colorBackground: "#ffffff",
    padding :3, 
    handleButton:()=>{
      setCompanyPhoneList(prev=> ([
          ...prev, {id: nextPhoneId , data: ""}
          ] ))
           setNextPhoneId(prev => prev + 1);
  }
}
  const handleDeletePhone =(e)=> {
      const parentWithDataIndex = e.target.closest('[data-index]');
      const index = parentWithDataIndex.getAttribute('data-index');
      setPendingDeleteId(index)
      setNotificationType("phone")
      setOpenNotification(true)
      
  }
  const handlePhoneChange = (id, value) => {
      setCompanyPhoneList(prev =>
        prev.map(phone =>
          phone.id === id ? { ...phone, data: value } : phone
        )
      );
    };
    //=========================Hotline============================
  const hotlineButton = {
    Icon: PlusIcon,
    text: "Thêm số điện thoại", 
    colorText:"#000000", 
    colorBackground: "#ffffff",
    padding :3, 
    handleButton:()=>{
      setCompanyHotlineList(prev=> ([
          ...prev, {id: nextHotlineId , data: ""}
          ] ))
           setNextHotlineId(prev => prev + 1);
  }
}
  const handleDeleteHotline =(e)=> {
      const parentWithDataIndex = e.target.closest('[data-index]');
      const index = parentWithDataIndex.getAttribute('data-index');
      setPendingDeleteId(index)
      setNotificationType("hotline")
      setOpenNotification(true)
      
  }
  const handleHotlineChange = (id, value) => {
      setCompanyHotlineList(prev =>
        prev.map(hotline =>
          hotline.id === id ? { ...hotline, data: value } : hotline
        )
      );
    };
  //=============================================================
   const submitButton = {
    Icon: SaveIcon,
    text: "Lưu thông tin", 
    colorText: "#ffffff", 
    colorBackground: "#000000",
    padding :8, 
    handleButton:()=>{}
  }
 
  return (
    <form  onSubmit={handleSubmit} className='flex flex-col bg-white p-[24px] border border-gray-300 rounded-[8px] gap-[24px]'>
      <div className=' flex flex-col'>
        <h1 className='text-[24px] text-black font-semibold'>
        Thông tin liên hệ
      </h1>
      <span className='text-[14px] text-[#71717A] font-regular'>
        Chỉnh sửa thông tin công ty
      </span>
      </div>
      <div className=' '>
        <div className='flex flex-row justify-between my-[12px] '>
          <h2 className='text-[16px] text-black font-medium leading-none flex items-end'>
            Địa chỉ công ty<span className="text-red-500 ml-1">*</span>
          </h2>
          <div className=' h-[36px]'>
            <Button  {...addressButton}/>
          </div>

        </div>
        <div className='flex flex-col gap-[12px]'>
           { 
            companyAddressList.map((address, index)=>{
              const props = {
                  index: index + 1,
                  address: address,
                  isChecked: selectedAddressId === address.id ? true: false,
                  isMultiple: companyAddressList.length >= 2 ? true : false ,
                  handleDelete: handleDeleteAddress,
                  handleChange: handleAddressChange,
                  handleChecked: handleSelectMainAddress
              }
                return( 
                  <div data-index = {address.id} key={index}>
                        <Address {...props}/>
                  </div>
                )
            })
           }
        </div>
      </div>
        <div className=' flex flex-col gap-[8px]'>
         <label htmlFor="" className='text-[16px] text-black font-medium'>Link nhúng Google Maps của chi nhánh chính</label>
          <textarea type="text" 
            value={companyEmbedUrl || ""}
            onChange={(e)=>{setCompanyEmbedUrl(e.target.value)}}
            rows={6}
           className='focus:outline-none border resize-none border-gray-300 rounded-[8px] p-[12px] '
            placeholder=' Vd: <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9366.370348283874!2d107.03071395806015!3d11.989540521698338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31731332eb101045%3A0xab2bf64704fbfea5!2sH%C3%A3ng%20Thu%20%C3%82m%20Lil%20Ruby%20Records!5e0!3m2!1sen!2s!4v1752097400688!5m2!1sen!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' />
       </div>
        <div className='flex flex-col'>
              <div className='flex flex-row justify-between my-[12px] '>
                  <h2 className='text-[16px] text-black font-medium leading-none flex items-end'>
                  Giờ làm việc<span className="text-red-500 ml-1">*</span>
                  </h2>
              <div className=' h-[36px]'>
                <Button  {...hourButton}/>
              </div>

            </div>
            <div className='flex flex-col gap-[8px]'>
               {
              (companyHourList || []).map((hour, index)=>{
               
                  return(  
                      <div key={index} data-index = {hour.id} className='flex flex-row gap-[4px] items-center'>
                    <input type="text" required 
                  value={hour.data}
                 onChange={(e) => handleHourChange(hour.id, e.target.value)} 
                  className='focus:outline-none border border-gray-300 rounded-[8px] p-[8px] w-full'
                  placeholder='Vd: 8h-17h' />
                  {companyHourList.length >= 2 && <div className=' w-[44px] h-[40px] top-[12px] right-[12px]'><Button Icon = {DeleteIcon} colorText = {"#000000"} colorBackground = "#FFFFFF" handleButton = {handleDeleteHour}/></div>}
                      </div>)
              })
            }
            </div>
       
        </div>
        <div className='flex flex-col gap-[12px]'>
                <h2 className='text-[16px] text-black font-medium leading-none flex items-end'>
                  Email<span className="text-red-500 ml-1">*</span>
                </h2>

          <input type="email"
          value={companyEmail || ""}
          onChange={(e)=>{setCompanyEmail(e.target.value)}}
           maxLength={50} 
          required className='focus:outline-none border border-gray-300 rounded-[8px] p-[8px] '
          placeholder='Vd: Minhtri@gmail.com' />
        </div>


        <div className='flex flex-col gap-[12px]'>
                <div className='flex flex-row justify-between  '>
                <h2 className='text-[16px] text-black font-medium leading-none flex items-end'>
                  Số điện thoại công ty<span className="text-red-500 ml-1">*</span>
                </h2>
                <div className=' h-[36px]'>
                  <Button  {...phoneButton}/>
                </div>

              </div>
              <div className='flex flex-col gap-[8px]'>
               {
              (companyPhoneList || []).map((phone, index)=>{
                  return(  
                      <div key={index} data-index = {phone.id} className='flex flex-row gap-[4px] items-center'>
                    <input type="text" required 
                  value={phone.data}
                  onChange={(e) => handlePhoneChange(phone.id, e.target.value)} 
                  className='focus:outline-none border border-gray-300 rounded-[8px] p-[8px] w-full'
                  placeholder='Vd: 0345789789' />
                  {companyPhoneList.length >= 2 && <div className=' w-[44px] h-[40px] top-[12px] right-[12px]'><Button Icon = {DeleteIcon} colorText = {"#000000"} colorBackground = "#FFFFFF" handleButton = {handleDeletePhone}/></div>}
                      </div>)
              })
            }
            </div>
        </div>

          <div className='flex flex-col gap-[12px]'>
                <div className='flex flex-row justify-between  '>
                <h2 className='text-[16px] text-black font-medium leading-none flex items-end'>
                  Số điện thoại hỗ trợ (hotline)<span className="text-red-500 ml-1">*</span>
                </h2>
                <div className=' h-[36px]'>
                  <Button  {...hotlineButton}/>
                </div>

              </div>
              <div className='flex flex-col gap-[8px]'>
               {
              (companyHotlineList || []).map((hotline, index)=>{
                  return(  
                      <div key={index} data-index = {hotline.id} className='flex flex-row gap-[4px] items-center'>
                    <input type="text" required 
                  value={hotline.data}
                  onChange={(e) => handleHotlineChange(hotline.id, e.target.value)} 
                  className='focus:outline-none border border-gray-300 rounded-[8px] p-[8px] w-full'
                  placeholder='Vd: 1900 8888' />
                  {companyHotlineList.length >= 2 && <div className=' w-[44px] h-[40px] top-[12px] right-[12px]'><Button Icon = {DeleteIcon} colorText = {"#000000"} colorBackground = "#FFFFFF" handleButton = {handleDeleteHotline}/></div>}
                      </div>)
              })
            }
            </div>
        </div>

        <div className='flex flex-col gap-[12px]'>
                <h2 className='text-[16px] text-black font-medium leading-none flex items-end'>
                  Fanpage<span className="text-red-500 ml-1">*</span>
                </h2>

          <input type="url"
          value={companyFanpageUrl || ""}
          onChange = {(e)=>{setCompanyFanpageUrl(e.target.value)}}
          required className='focus:outline-none border border-gray-300 rounded-[8px] p-[8px] '
          placeholder='Vd: http://thientruc.com/...' />
        </div>
        <button type = 'submit'>
            <Button {...submitButton} />
        </button>
          <div className='absolute'>
            <Notification {...notificationProps}/>
          </div>
    </form>
  )
}

export default Company
