import GreenButton from "../GreenButton";

function handleDisplayHighlights(product, numberOfHighlights) 
{   
    const clampClass =
        numberOfHighlights === 0 ? 'line-clamp-5' :
        numberOfHighlights === 1 ? 'line-clamp-4' :
        numberOfHighlights === 2 ? 'line-clamp-3' :
        numberOfHighlights === 3 ? 'line-clamp-2' :
        'line-clamp-1';
    return(
            <div className = "flex flex-col gap-y-[4px]">
                
                <div className = {`${clampClass} text-[14px]`}>
                {product.description } 
            </div>
                {
                Array.from({ length: numberOfHighlights }).map((_, index) => (
                    <div key={index} className="truncate overflow-hidden whitespace-nowrap text-[14px] text-[#374151]">
                    <p className = " truncate overflow-hidden whitespace-nowrap  text-[14px] text-[#374151]">Không nhấp nháy  nháy nháy nháy nháy nháy nháy nháy nháy nháy nháy nháy nháy</p>
                    
                </div>
                ))
                }   
            </div>  
    )
}
function ItemProduct({product, handleClick, width="324px", height="620px"}) {
    const numberOfHighlights = 3; // Số lượng highlight cần hiển thị
    return (
        <div 
            className="flex flex-col border p-[8px] border-[#E5E7EB] rounded-[8px]  bg-white hover:shadow-2xl transform hover:-translate-y-[2px] transition-all duration-300 ease-in-out"
            style={{width, height}}
        >
            <div className = "w-[full] h-[322px]  bg-[#F3F4F6] rounded-t-[6px]">
                <img
                    src={product.img || "https://khoinguonsangtao.vn/wp-content/uploads/2022/09/hinh-anh-gai-xinh-cap-2-3.jpg"} 
                    alt={product.name}
                    className="w-full h-full object-cover rounded-t-[6px]"
                />
            </div>
            <div className = "flex flex-col gap-y-[4px] w-full  p-[16px]">
                <div >
                    <h2 className = "line-clamp-2  text-[20px] text-black "> 
                    {product.name}
                 Đây là tên sản phẩm thử nghiệm cho độ dài của tên sản phẩm nha mọi người
                  
                    </h2>
                </div>
                <div className="line-clamp-1 text-[23px] text-[#ff0000] font-semibold">
                   {typeof product.price === "number" ? product.price.toLocaleString("vi-VN") + " ₫" : ""}
                </div>
                
                {handleDisplayHighlights(product, numberOfHighlights)}
            </div>
            <div className="relative">
                <div className="absolute top-5 w-full flex justify-center">
                    <GreenButton content="Xem thêm" handleClick={handleClick} />
                </div>
            </div>
        </div>
    );
}
export default ItemProduct;