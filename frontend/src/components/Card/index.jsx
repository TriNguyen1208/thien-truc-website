import { CheckCircleOutlined } from "@ant-design/icons";

function Card({card, iconTitle}){
    if (!card) {
        return <p>No card data available</p>;
    }
    const details = card.details.split('\n')

    return (
        <div 
         className="flex flex-col gap-[16px] bg-white rounded-[8px] p-[32px] w-full h-full hover:shadow-lg transform hover:scale-105  transition-all duration-300 ease-in-out">

            <div className="flex flex-row gap-[16px] items-center text-(--dark-blue) ">
                <div>{iconTitle}</div>
                <div>
                    <h2 className="text-[24px] font-bold  ">
                        {card.title}
                    </h2>
                </div>
            </div>
            <div>

                <p className="text-[15px] text-[#166534] leading-loose transition-all duration-300 ease-in-out">
                    {card.description}
                </p>
            </div>
            <div>
                    <ul className="flex flex-col gap-[12px]  ">
                        
                        {
                            details.map((detail, index) =>{
                            return (
                                <li key = {index} className="flex flex-row gap-[8px] text-[15px] text-[#166534]">
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