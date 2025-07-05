
function Input({label, placeholder,idInput,contentCurrent} )
{
    return(<div className="flex flex-col mb-[16px]">
        <label htmlFor = {idInput} className="mb-[8px]">{label}  </label>
        <textarea type="text" id = {idInput} placeholder={placeholder} defaultValue={contentCurrent}
        className="text-[14px] font-regular p-[12px] border border-[#E4E4E7] bg-white rounded-[6px] focus:border-[#E4E4E7] outline-none "/>
    </div>)
}
export default function EditBanner({title, description, listInput, contentButton})
{
    function convertToE(str)
    {
        return str
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/đ/g, "d")
                .replace(/Đ/g, "D")
                .replace(/\s+/g, '');
        
    }
    return(
        <div className="flex flex-col p-[24px] bg-white w-full h-full border border-[#E5E7EB] rounded-[8px]">
            <div className="mb-[4px]">
                <h1 className="text-[24px] text-black font-semibold">
                    {title}
                </h1>
            </div>
            <div className="mb-[24px]">
                <p className="text-[14px] text-[#71717A] font-regular">
                    {description}
                </p>
            </div>
            <div>
                {
                    (listInput || []).map((input, index)=>{
                        const props = {
                            label: input.label,
                            placeholder: input.placeholder,
                            idInput: convertToE(title)+ index,
                            contentCurrent: input.contentCurrent
                        }
                        
                        return(<div key = {index}>
                            <Input {...props}/>
                             </div>)
                    })
                }

            </div>
            <div>
                button
            </div>
        </div>
    )
}