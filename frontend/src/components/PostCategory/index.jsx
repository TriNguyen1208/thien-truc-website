import { useState, useEffect} from 'react';

function ItemCategory({ content }) {
    return (
        <div className="flex items-center justify-center">
            <span className='whitespace-nowrap '>{content} </span>
        </div>
    );
}

function PostCategory({ categories, handleClick, idSelected = '0' }) {
    const [selected, setSelected] = useState(String(idSelected));
     useEffect(() => {
        setSelected(String(idSelected));
    }, [idSelected]);
    const handleParentClick = (e) => {
        const childClicked = e.target.closest('[data-index]');
        if (childClicked) {
            const index = childClicked.getAttribute('data-index');
            setSelected(index);
            handleClick(index)
        }
    }

    return (
        <div onClick={handleParentClick}
            className="inline-flex flex-row justify-around gap-[8px] p-[8px] shadow-lg rounded-[30px] bg-white w-fit"
        >
            {
                categories.map((category, index) => {
                    return (
                        <div key={index}
                            data-index={index}
                            className={`flex flex-row  px-[24px] py-[12px] rounded-[30px] w-full h-[40px]  cursor-pointer transition-all duration-300 ease-in-out 
                    ${selected === `${index}` ? "bg-[#10B981] text-white shadow-md" : "bg-white text-[#4B5563] hover:bg-[#F3F4F6]"}`}
                        >
                            <ItemCategory content={category} />
                        </div>
                    )
                })
            }
        </div>
    );
}
export default PostCategory;