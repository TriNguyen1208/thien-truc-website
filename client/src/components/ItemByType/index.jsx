import { useEffect } from 'react';
import { useState } from 'react';

function Item( {content} ) {
    return (
        <div className="flex items-center justify-center">
            <span className='whitespace-nowrap '>{content} </span>
        </div>
    );
}
 
function ItemByType({ types, handleClick, current }) {
    const [selected, setSelected] = useState(current);
    useEffect(()=> {
        setSelected(current);
    }, [current])
    const handleParentClick = (e) => {
        const childClicked = e.target.closest('[data-index]');  
        if (childClicked) {
            const index = Number(childClicked.getAttribute('data-index'));
            setSelected(index);
            handleClick(index)
        }
    }
    
  return (
    <div onClick={handleParentClick}  
        className="inline-flex flex-row justify-around gap-1 shadow-lg  bg-white w-fit"
    >
       {       
            types.map((type, index) => {
               return ( 
                <div 
                    key={index}
                    data-index={index}
                    className={`flex flex-row px-[24px] py-[12px] w-full h-[40px] rounded-sm cursor-pointer transition-all duration-300 ease-in-out 
                    ${selected === index ? "bg-[#059669] text-white shadow-md" : "bg-white text-[#4B5563] hover:bg-[#F3F4F6]"}`}
                >
                    <Item content={type} />
                </div>
                )
            })
       }
    </div>
  );
}
export default ItemByType;