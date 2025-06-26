import { useState } from 'react';
function ItemCategory( {content} ) {
    return (
        <div className="flex items-center justify-center">
            <span className='whitespace-nowrap '>{content} </span>
        </div>
    );
}
 
function PostCategory({ categories }) {
    const [selected, setSelected] = useState('0');
    const handleParentClick = (e) => {
        const childClicked = e.target.closest('[data-index]');  
        if (childClicked) {
            const index = childClicked.getAttribute('data-index');
            setSelected(index);
        }
    }
    
  return (
    <div onClick={handleParentClick}  className="flex flex-row inline-flex justify-around gap-[8px] p-[8px] shadow-lg rounded-[30px] bg-white w-fit h-[56px]">
      
       {       
            categories.map((category, index) => {
               return ( <div key = {index} data-index = {index} className={`flex flex-row  px-[24px] py-[12px] rounded-[30px] w-full h-[40px]  cursor-pointer transition-all duration-300 ease-in-out 
                ${selected === `${index}` ? "bg-[#10B981] text-white shadow-md" : "bg-white text-[#4B5563] hover:bg-[#F3F4F6]"}`} >
                 <ItemCategory  content={category} />
                </div>
                )
            })
       }
          
    </div>
  );
}
export default PostCategory;