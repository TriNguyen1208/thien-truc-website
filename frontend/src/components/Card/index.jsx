

function Card({card}){
    if (!card) {
        return <p>No card data available</p>;
    }
    const details = card.details.split('\n')

    return (
        <div className="flex flex-col gap-[16px] rounded-[8px] p-[32px] w-full h-[360px] hover:shadow-lg transform hover:scale-105  transition-all duration-300 ease-in-out">

            <div className="flex flex-row gap-[16px] items-center ">
                <div>ICON</div>
                <div>
                    <h2 className="text-[24px] text-(--dark-blue) ">
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
                            details.map((detail) =>{
                            return (
                                <li className="flex flex-row gap-[4px] text-[15px] text-[#166534]">
                                <div>
                                    icon
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