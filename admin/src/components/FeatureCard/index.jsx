export default function FeatureCard({title, description, buttonEdit, buttonDelete})
{
    return (<div className="flex flex-col group relative w-full h-full p-[24px] bg-white border border-[#E5E7EB] rounded-[8px] hover:bg-[#FdFdFd]">
        <div className="mx-auto">
            <h1 className="leading-none text-[30px] text-[#2563EB] font-bold">
                {title}
            </h1>
        </div>
        <div className="mx-auto mt-[8px]">
            <p className="text-[14px] font-regular text-[#71717A]">
                {description}
            </p>
        </div>
        <div className=" flex flex-row gap-[4px] absolute top-[8px] right-[8px] invisible  group-hover:visible">
           <div className="w-[40px] h-[36px] ">
             {buttonEdit}
           </div>
            <div className="w-[40px] h-[36px] ">
                {buttonDelete}
            </div>
        </div>
    </div>)
}