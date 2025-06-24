function GreenButton({content, width = "100%", handleClick}){
    return(
        <button 
            className = "flex justify-center items-center py-[8px] text-white bg-(--green-bg) rounded-[6px] hover:bg-[#166534] transition-colors ease-out duration-300 cursor-pointer"
            style={{width}}
            onClick={handleClick}
        >
            {content}
        </button>
    )
}

export default GreenButton;