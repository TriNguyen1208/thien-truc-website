// src/pages/components/ProductToolbar.jsx
import Paging from "@/components/Paging";
import Loading from "@/components/Loading";
import ProductGrid from './ProductGrid';
import { ArrowLeftOutlined } from '@ant-design/icons';

const ITEMS_PER_PAGE = 12;
const DisplayProduct = (query, categoryName, products, numberPages, handlePageChange, page) => {
    return (
        <div>
            <div className='py-[12px]'>
                {query === '' && (
                    <div className='border-l-[5px] border-[#1E2A38] px-[8px] ml-[12px]'>
                        <h1 className='text-[20px] lg:text-[30px] leading-none text-[#1E2A38]'>
                            {categoryName}
                        </h1>
                    </div>
                )}
            </div>
            {products && products.length > 0 ? (
                <>
                    <ProductGrid products={products} />
                    <div className='flex justify-center py-[8px] border-t-[1px] border-b-[1px] border-[#E5E7EB]'>
                        <Paging 
                            data={{ numberPagination: numberPages }} 
                            onPageChange={handlePageChange} 
                            currentPage={page} 
                        /> 
                    </div>
                </>
            ) : (
                <div className='mb-[20px] text-center p-4'>Không có sản phẩm nào.</div>
            )}
        </div>
    )
}
export default function ProductToolbar({ products, isLoading, categoryName, query, totalCount, page, goBack, updateParams, scrollTargetRef, isSale }) {
    if (isLoading) {
        return <Loading />;
    }

    const numberPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
    
    const handlePageChange = (newPage) => updateParams({ page: newPage.toString() }, scrollTargetRef);

    return (
        <div className='flex flex-col'>
            {(categoryName !== 'Tất cả sản phẩm' || query !== '') && (
                <div onClick={goBack} className='flex flex-row text-[#16A34A] my-[10px] text-[15px] gap-[10px] cursor-pointer hover:text-[#0B4A24] transition-all duration-300 ease-in-out'>
                    <ArrowLeftOutlined /> <p>Quay Lại</p>
                </div>
            )}
            {isSale ? 
                <div className="bg-white mb-10">
                    <div className=" bg-[var(--light-green-banner)] rounded-2xl pt-10">
                        <div className="flex flex-row justify-center items-center gap-3">
                            <span className="text-3xl sm:text-5xl font-bold text-[#ef4444]">SALE</span>
                            <span className="text-3xl sm:text-5xl font-extrabold text-[#10b981]">GIẢM GIÁ %</span>
                        </div>
                        {DisplayProduct(query, categoryName, products, numberPages, handlePageChange, page)}
                    </div>
                </div> : 
                <div className='flex flex-col border-[1px] border-[#E5E7EB] rounded-[8px] mb-[20px]'>
                    {DisplayProduct(query, categoryName, products, numberPages, handlePageChange, page)}
                </div>
            }
            

            
        </div>
    );
}