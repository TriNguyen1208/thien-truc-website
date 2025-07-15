export default function CardList({ title, description, details, buttonEdit, buttonDelete}) {
    return (<div className="flex flex-col group relative w-full h-[270px] p-[24px] bg-white border border-[#E5E7EB] rounded-[8px] hover:bg-[#FdFdFd]">
        <h1 className="leading-none text-[20px] text-[#000000] font-bold mb-[10px]">
            {title}
        </h1>
        <p className="text-[14px] font-regular text-[#71717A] mb-[10px] line-clamp-3">
            {description}
        </p>
        <div className=" flex flex-row gap-[4px] absolute top-[8px] right-[8px] invisible  group-hover:visible ">
            <div className="w-[40px] h-[36px] ">
                {buttonEdit}
            </div>
            <div className="w-[40px] h-[36px] ">
                {buttonDelete}
            </div>
        </div>
        <ul className={`list-disc marker:text-green-800 pl-5`}>
            {(details || []).map((item, index) => (
                <li key = {index} >{item}</li>
            ))}
        </ul>
    </div>)
}