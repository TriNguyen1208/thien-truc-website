// src/pages/components/ProductToolbar.jsx
import Paging from "@/components/Paging";
import Loading from "@/components/Loading";
import ProductGrid from './ProductGrid';
import { ArrowLeftOutlined } from '@ant-design/icons';

const ITEMS_PER_PAGE = 12;

export default function ProductToolbar({ products, isLoading, categoryName, query, totalCount, page, goBack, updateParams, scrollTargetRef }) {
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
            <div className='flex flex-col border-[1px] border-[#E5E7EB] rounded-[8px] mb-[20px]'>
                <div className='border-b-[1px] border-[#E5E7EB] py-[12px] shadow-sm'>
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
                        <div className='flex justify-center py-[8px] border-t-[1px] border-[#E5E7EB]'>
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
        </div>
    );
}