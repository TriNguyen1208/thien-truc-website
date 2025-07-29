import { useState, useEffect} from 'react';

function ItemCategory({ content }) {
    return (
        <div className="flex items-center justify-center overflow-hidden text-center mx-auto ">
            <span className='whitespace-nowrap text-[12px] md:text-[16px] overflow-hidden truncate xl:overflow-visible '>{content} </span>
        </div>
    );
}

function PostCategory({ categories, handleClick, idCategories = '0' }) {
    const [selected, setSelected] = useState(String(idCategories));
     useEffect(() => {
        setSelected(String(idCategories));
    }, [idCategories]);
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
            className="grid grid-cols-2 sm:grid-cols-3   md:grid-cols-4 xl:grid-cols-6  mx-auto justify-around gap-[8px] p-[8px] shadow-lg rounded-[30px] bg-white w-full"
        >
            {
                categories.map((category, index) => {
                   
                    return (
                        <div key={index}
                            data-index={index}
                            className={`flex flex-row  px-[24px] py-[12px] rounded-[30px] h-[40px]  cursor-pointer transition-all duration-300 ease-in-out 
                    ${selected === `${index}` ? "bg-[#10B981] text-white shadow-md" : "bg-white text-[#4B5563] hover:bg-[#F3F4F6] w-full "}`}
                          
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