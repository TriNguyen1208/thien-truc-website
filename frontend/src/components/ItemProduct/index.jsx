import GreenButton from "../GreenButton";

function handleDisplayHighlights(product, highLightFeature) {
    const numberOfHighlights = Math.min(highLightFeature.length, 3);
    const clampClass =
        numberOfHighlights === 0 ? 'line-clamp-5' :
            numberOfHighlights === 1 ? 'line-clamp-4' :
                numberOfHighlights === 2 ? 'line-clamp-3' :
                    numberOfHighlights === 3 ? 'line-clamp-2' :
                        'line-clamp-1';
    return (
        <div className="flex flex-col gap-y-[4px]">

            <div className={`${clampClass} text-[14px]`}>
                {product.description}
            </div>
            {
                Array.from({ length: numberOfHighlights }).map((_, index) => (
                    <div key={index} className="truncate overflow-hidden whitespace-nowrap text-[14px] text-[#374151]">
                        <p className=" truncate overflow-hidden whitespace-nowrap  text-[14px] text-[#374151]">{highLightFeature[index]}</p>

                    </div>
                ))
            }
        </div>
    )
}
function ItemProduct({ product, prices, highLightFeatures, handleClick, width = "w-full", height = "h-full" }) {
    const highLightFeature = Array.isArray(highLightFeatures) && product?.id
        ? highLightFeatures.filter((hl) => hl.product_id == product.id)
        : [];
    const price = (Array.isArray(prices) && product?.id)
        ? prices.filter(pr => pr.product?.id == product.id)[0]
        : undefined;

    return (
        <div
            className="flex flex-col w-full h-full border border-[#E5E7EB] rounded-[8px]  bg-white hover:shadow-2xl transform hover:-translate-y-[2px] transition-all duration-300 ease-in-out"
            style={{ width, height }}
        >
            <div className="w-[full] h-[322px]  bg-[#F3F4F6] rounded-t-[6px] p-[8px]">
                <img
                    src={product.img || "https://khoinguonsangtao.vn/wp-content/uploads/2022/09/hinh-anh-gai-xinh-cap-2-3.jpg"}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-t-[6px]"
                />
            </div>
            <div className="flex flex-col gap-y-[4px] w-full  p-[16px]">
                <div >
                    <h2 className="line-clamp-2  text-[20px] text-black ">
                        {product.name}
                    </h2>
                </div>
                <div className="line-clamp-1 text-[23px] text-[#ff0000] font-semibold">
                    {price && typeof price.price === "number"
                        ? price.price.toLocaleString("vi-VN") + " ₫"
                        : "Chưa có giá"}
                </div>

                {handleDisplayHighlights(product, highLightFeature)}
            </div>
            <div className="mt-auto mb-[0px] p-[8px] w-full flex justify-center">
                <GreenButton content="Xem thêm" handleClick={handleClick} />
            </div>
        </div>
    );
}
export default ItemProduct;