import GreenButton from "@/components/GreenButton";
import { FeatureDotIcon } from "../Icon";
import {
    ProductOutlined
} from '@ant-design/icons';
import LazyLoad from 'react-lazyload';
function handleDisplayHighlights(product) {
    const numberOfHighlights = Math.min(product.highlight_features.length, 3);
    const clampClass =
        numberOfHighlights === 0 ? 'line-clamp-6' :
            numberOfHighlights === 1 ? 'line-clamp-5' :
                numberOfHighlights === 2 ? 'line-clamp-4' :
                    numberOfHighlights === 3 ? 'line-clamp-3' :
                        'line-clamp-1';
    return (
        <div className="flex flex-col  pb-[4px]">

            <div className={`${clampClass} whitespace-pre-wrap text-[clamp(12px,3vw,16px)] sm:text-[clamp(12px,1.5vw,16px)] md:text-[clamp(13px,1.7vw,16px)] mb-2 sm:mb-1`}>
                {product.description}
            </div>
            {
                Array.from({ length: numberOfHighlights }).map((_, index) => (
                    <div key={index} className="flex flex-row items-center gap-x-2 leading-tight " >
                        <div><FeatureDotIcon/> </div>
                        <p className="  truncate overflow-hidden whitespace-nowrap  text-[clamp(12px,3vw,16px)] sm:text-[clamp(12px,1.7vw,14px)] md:text-[clamp(13px,1.9vw,16px)] text-[#374151]">  
                            {product.highlight_features[index]} 
                            </p>

                    </div>
                ))
            }
        </div>
    )
}
function ItemProduct({product, handleClick , width = "w-full", height = "h-full"}) {
    return (
        <div
            className="flex flex-col overflow-hidden h-full border border-[#E5E7EB] rounded-[8px]  bg-white hover:shadow-2xl transform hover:-translate-y-[2px] transition-all duration-300 ease-in-out leading-none"
            style={{ width, height }}
        >
            <div className="w-full aspect-square  bg-[#F3F4F6] rounded-t-[6px] p-[8px] overflow-hidden">
                {product.product_img ? ( 
                <LazyLoad
                    height={200}
                    offset={100}
                    throttle={100}
                    once
                    placeholder={<div className="w-full h-full bg-gray-200 rounded-t-lg overflow-hidden"></div>}
                    style={{width: '100%', height: '100%'}}
                >
                    <img
                        src={product.product_img}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-t-[6px]"
                    />
                </LazyLoad>    
                    ) : ( <div className="w-full h-full flex items-center justify-center">
                    <ProductOutlined style={{ fontSize: '48px', color: '#9CA3AF' }} />
                </div>)}
            </div>
            <div className="flex flex-col w-full gap-2 sm:gap-0.5 md:gap-1 xl:gap-1.5 p-[8px] lg:px-4 lg:pt-4 ">
                <div >
                    <h2 className="line-clamp-2  text-[clamp(14px,3vw,18px)] sm:text-[clamp(13px,1.7vw,16px)] md:text-[clamp(14px,1.9vw,16px)] xl:text-[clamp(16px,2vw,18px)] text-black ">
                        {product.name}   
                    </h2>
                </div>
                <div className="line-clamp-1 text-[clamp(14px,3vw,18px)] sm:text-[clamp(13px,1.7vw,15px)] md:text-[clamp(14px,1.9vw,18px)] xl:text-[clamp(16px,2vw,18px)] text-[#ff0000] font-semibold">
                   {typeof product.price === "number" ? product.price.toLocaleString("vi-VN") + " ₫" : "Chưa có giá"}
                </div>

                {handleDisplayHighlights(product)}
            </div>
    
        </div>
    );
}
export default ItemProduct;