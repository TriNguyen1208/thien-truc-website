import {ActivityIcon} from '@/components/Icon'

export default function ItemActivity({data})
{
    return(
        <div className='w-full h-full relative border border-white hover:bg-[#F9FAFB] hover:border hover:border-[#F9FAFB] hover:rounded-[8px] px-[30px] py-[12px]'> 
            <div className='absolute left-[12px] top-[16px]'><ActivityIcon/></div>
            <div className='flex flex-col'>
                <div className='font-medium text-black text-[14px]'> {data.content} </div>
                <div className='text-[#71717A] text-[13px] font-regular '> Thực hiện bởi: {data.username} - {data.fullname} </div>
            </div>
            <div className='absolute top-[12px] right-[12px] text-[#71717A] text-[13px] font-regular '>{data.time} - {data.date}</div>
        </div>
    )
}