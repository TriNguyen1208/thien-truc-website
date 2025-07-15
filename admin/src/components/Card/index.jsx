

export default function Card({title, description,quanCategory, quanlity, icon, handleClick})
{
    return(<div onClick={handleClick} className="flex flex-col relative w-full h-full p-[24px] bg-white border border-[#E5E7EB] rounded-[8px] cursor-pointer hover:shadow-md hover:scale-105 transition-all duration-300 ease-in-out">
        <div className="mb-[6px]">
            <h1  className = "text-[16px] font-semibold text-black">{title}</h1>
        </div>
        <div>
            <p className=" text-black text-[24px] font-medium " >
                {quanlity}
            </p>
        </div>
        <div className="flex flex-row">
              <p className=" text-[#71717A] text-[13px] font-regular " >
                {description}
            </p>
           {
            quanCategory ?  
            <p className="ml-[2px] text-[#71717A] text-[13px] font-regular " >
                {`• ${quanCategory}`}
            </p> : <></>
           }
        </div>
       {
        icon ?  <div className="absolute top-[24px] right-[24px]  text-[#71717A] text-[20px]">
            {icon}
        </div> : <></>
       }
    </div>)
}