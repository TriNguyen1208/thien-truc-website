import Button from '@/components/Button'
import { DeleteIcon } from '@/components/Icon';

export default function Address({
    index,
    address,
    isChecked, 
    isMultiple, 
    handleDelete, 
    handleChange ,
    handleChecked
}){
    return(
        <div className='flex flex-col relative w-full h-full gap-[16px] border border-gray-300 rounded-[8px] p-[16px]'>
            <div className=' flex flex-row gap-[8px]'>
                <input 
                    type="checkbox" 
                    onChange={(e) => handleChecked(address.id)}
                    checked = {isChecked} 
                    className="w-5 h-5 bg-black accent-black rounded-md cursor-pointer"  
                    id='main_agency'
                />
                <label htmlFor="main_agency" className='text-[14px] text-black font-medium cursor-pointer'>Chi nhánh chính</label>
            </div>
            <div className=' flex flex-col gap-[8px]'>
                <label htmlFor="" className='text-[14px] text-black font-medium'>
                    Địa chỉ {index}<span className="text-red-500 ml-1">*</span>
                </label>
                <input type="text"
                    onChange={(e) => handleChange(address.id, "address", e.target.value)}
                    required
                    className='focus:outline-none border border-gray-300 rounded-[8px] p-[12px] min-h-[45px]' placeholder='Vd: 123 Phường Bến Nghé TP.HCM' value={address.address}
                />
            </div>
            <div className=' flex flex-col gap-[8px]'>
                <label htmlFor="" className='text-[14px] text-black font-medium'>Link Google Map</label>
                <input type="url"
                    onChange={(e) => handleChange(address.id, "googlemaps_url", e.target.value)}
                    className='focus:outline-none border border-gray-300 rounded-[8px] p-[12px] min-h-[45px]'
                    placeholder='Vd: http://maps.google.com/...' 
                    value={address.googlemaps_url} 
                />
            </div>
            {isMultiple && 
                <div className='absolute w-[44px] h-[40px] top-[12px] right-[12px]'>
                    <Button 
                        Icon = {DeleteIcon} 
                        colorText = {"#000000"} 
                        colorBackground = "#FFFFFF" 
                        handleButton = {handleDelete}
                    />
                        
                </div>
            }
        </div>
    )
}