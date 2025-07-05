export default function Button({Icon, text, colorText, colorBackground, handleButton})
{
    return(<div onClick = {handleButton} className="flex flex-row  items-center  p-[4] gap-[10px] w-full h-full rounded-[6px] hover:cursor-pointer hover:opacity-[80%] "
                style={{ color: colorText, backgroundColor: colorBackground }}
    >
        {
            Icon?<div className="mx-[8px]"> <Icon/></div>:<></>
        }
        {
            text? <p className="text-[14px] font-medium">{text} </p> :<></>
        }
    </div>)
}