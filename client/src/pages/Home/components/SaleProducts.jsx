import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import useProducts from "@/hooks/useProducts"
import PostCategory from "@/components/PostCategory";
import ItemProduct from "@/components/ItemProduct";
import CustomSlider from "./CustomSlider";
import ProductItem from "./ProductItem";
import ViewMoreButton from '@/components/ViewMoreButton'
// Component hiển thị một sản phẩm
// Dữ liệu sản phẩm
// Component hiển thị danh sách sản phẩm nổi bật
export default function SaleProducts() {
    const navigate = useNavigate();
    //function
    const handleViewMore = () => {
        navigate('san-pham?is_sale=true&page=1')
    }
    // Lấy danh sách sản phẩm nổi bật
    const { data: saleProducts, isLoading } = useProducts.products.getList('', '', '', true, '', '');

    if (isLoading) return <div className="text-center p-10">Đang tải sản phẩm...</div>;
    
    return (
        <section className="bg-white  border-2 border-[#16A34A]">
            <div className=" bg-[var(--light-green-banner)] rounded-2xl py-17">
                <div className="flex flex-row justify-center items-center gap-3 mb-10">
                    <span className="text-3xl sm:text-5xl font-bold text-[#ef4444]">SALE</span>
                    <span className="text-3xl sm:text-5xl font-extrabold text-[#10b981]">GIẢM GIÁ %</span>
                </div>
                <CustomSlider
                    data={saleProducts}
                    renderItem={(item) => <ProductItem key={item.id} {...item} />}
                    itemsPerView={{ mobile: 1, sm: 2, md: 3, lg: 4 }}
                />
                <div className='flex justify-center pt-10'>
                    <div className="h-fit w-fit">
                        <ViewMoreButton content={'Xem tất cả sản phẩm'} handleClick={() => handleViewMore()} />
                    </div>
                </div>
            </div>
        </section>
    );
}