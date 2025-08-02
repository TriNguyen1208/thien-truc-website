const ViewMoreButton = ({content, handleClick}) => {
  return (
    <button 
      className="w-full bg-white text-[14px] text-(--green-bg) px-4 py-2 rounded border border-green-600 hover:bg-(--green-bg) hover:text-white transition-colors ease-out duration-300 cursor-pointer"
      onClick={handleClick}
    >
      {content} &gt;
    </button>
  );
};

export default ViewMoreButton;