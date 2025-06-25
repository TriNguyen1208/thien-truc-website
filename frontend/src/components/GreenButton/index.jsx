function GreenButton({content}){
    return(
        <button className = "flex justify-center items-center w-full h-full px-[16px] py-[8px] text-white bg-(--green-bg) rounded-[6px] hover:bg-[#166534]">
            {content}
        </button>
    )
}

export default GreenButton;