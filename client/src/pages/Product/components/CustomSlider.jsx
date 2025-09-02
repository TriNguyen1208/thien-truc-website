// src/pages/components/CustomSlider.jsx
import Loading from "@/components/Loading";
import ViewMoreButton from "@/components/ViewMoreButton";
import ProductGrid from './ProductGrid';

export default function CustomSlider({ productsByCat, isLoading, handleViewMore }) {
    if (isLoading) {
        return <Loading />;
    }
    
    return (
        <div className='w-full h-full'>
            {Object.keys(productsByCat || {}).map(key => (
                <div key={key} className='flex flex-col border-[1px] border-[#E5E7EB] rounded-[8px] mb-[20px]'>
                    <div className='border-b-[1px] border-[#E5E7EB] py-[12px] shadow-sm'>
                        <div className='border-l-[5px] border-[#1E2A38] px-[8px] ml-[12px]'>
                            <h1 className='text-[20px] lg:text-[30px] leading-none text-[#1E2A38]'>
                                {key}
                            </h1>
                        </div>
                    </div>
                    <div>
                        <ProductGrid products={productsByCat[key]} />
                    </div>
                    <div className='flex justify-center py-[8px] border-t-[1px] border-[#E5E7EB]'>
                        <div className="h-fit w-fit">
                            <ViewMoreButton content={'Xem Tất Cả Sản Phẩm'} handleClick={() => handleViewMore(key)} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}