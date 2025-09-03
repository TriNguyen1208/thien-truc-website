import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import useProducts from "@/hooks/useProducts";
import PostCategory from "@/components/PostCategory";
import ItemProduct from "@/components/ItemProduct";
import CustomSlider from "./CustomSlider";

// Component hiển thị một sản phẩm
// Dữ liệu sản phẩm
const ProductItem = (product) => {
    return (
        <Link to={`/san-pham/${product.id}`} className="flex w-full justify-center min-[450px]:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 px-2">
            <div className='aspect-[4/8] max-h-[400px] min-[450px]:max-h-[460px] w-full max-w-[230px] sm:max-h-[380px] md:max-h-[420px] lg:max-w-[280px] lg:max-h-[470px] xl:max-h-[500px]'>
                <ItemProduct product={product} />
            </div>
        </Link>
    )
};

// Component hiển thị danh sách sản phẩm nổi bật
export default function FeaturedProducts() {
    // Lấy danh sách sản phẩm nổi bật
    const { data: highlightProduct, isLoading } = useProducts.getHighlightProducts();

    if (isLoading) return <div className="text-center p-10">Đang tải sản phẩm...</div>;
    
    return (
        <section className="container-fluid py-[70px]">
            <div className="text-center">
                <h2 className="text-[35px] font-[600] text-[var(--dark-green)] mb-[20px]">
                    Sản phẩm nổi bật
                </h2>
                <p className="text-[20px] inline-block max-w-[900px] mb-[30px]">
                    Khám phá các giải pháp chiếu sáng LED cao cấp của chúng tôi, được thiết kế để đạt hiệu quả, độ bền và hiệu suất vượt trội.
                </p>
            </div>
            <CustomSlider
                data={highlightProduct}
                renderItem={(item) => <ProductItem key={item.id} {...item} />}
                itemsPerView={{ mobile: 1, sm: 2, md: 3, lg: 4 }}
            />
        </section>
    );
}