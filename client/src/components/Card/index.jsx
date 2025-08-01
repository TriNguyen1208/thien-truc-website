import { CheckCircleOutlined } from "@ant-design/icons";


function Card({card,iconTitle, width="100%", height="100%", padding="25px"}){
    if (!card) {
        return <p>No card data available</p>;
    }
   
    return (
        <div 
            className={`flex flex-col bg-white gap-[16px] rounded-[8px] hover:shadow-lg transform hover:scale-105  transition-all duration-300 ease-in-out `}
            style={{ width, height, padding }}
        >

            <div className="flex flex-row gap-[16px] items-center text-(--dark-blue) ">
                <div>{iconTitle}</div>
                <div>
                    <h2 className="text-[20px] font-bold  ">
                        {card.title}
                    </h2>
                </div>
            </div>
            <div>

                <p className="text-[14px] text-[#166534] leading-loose transition-all duration-300 ease-in-out">
                    {card.description}
                </p>
            </div>
            <div>
                    <ul className="flex flex-col gap-[12px]  ">
                        {
                            card.details.map((detail, index) =>{
                            return (
                                <li key = {index} className="flex flex-row gap-[8px] text-[14px] text-[#166534]">
                                <div>
                                   <CheckCircleOutlined />
                                </div>
                                <p className="">
                                    {detail}
                                </p>
                            </li>
                            )                       
                        } )
                        }                                    
                    </ul>
            </div>
        </div>
    )
}
export default Card;