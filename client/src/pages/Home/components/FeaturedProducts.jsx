import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import useProducts from "@/hooks/useProducts";
import PostCategory from "@/components/PostCategory";
import ItemProduct from "@/components/ItemProduct";
import CustomSlider from "./CustomSlider";
import ProductItem from "./ProductItem";
// Component hiển thị một sản phẩm
// Dữ liệu sản phẩm

// Component hiển thị danh sách sản phẩm nổi bật
export default function FeaturedProducts() {
    // Lấy danh sách sản phẩm nổi bật
    const { data: highlightProduct, isLoading } = useProducts.getHighlightProducts();

    if (isLoading) return <div className="text-center p-10">Đang tải sản phẩm...</div>;
    
    return (
        <section className="container-fluid py-[70px] bg-[var(--light-green-banner)]">
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