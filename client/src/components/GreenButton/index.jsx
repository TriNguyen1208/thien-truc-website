function GreenButton({content, width = "100%", handleClick, type="button"}){
    return(
        <button 
            className = "flex justify-center py-[10px] text-[clamp(14px,2vw,16px)] items-center py-[4px] text-white bg-(--green-bg) rounded-[6px] hover:bg-[#166534] transition-colors ease-out duration-300 cursor-pointer"
            style={{width}}
            onClick={handleClick}
            type={type}
        >
            {content}
        </button>
    )
}

export default GreenButton;