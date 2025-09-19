import { Link } from "react-router-dom";
import ItemProduct from "@/components/ItemProduct";
const ProductItem = (product) => {
    return (
        <Link to={`/san-pham/${product.id}`} className="flex w-full justify-center min-[450px]:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 px-2">
            <div className='aspect-[4/8] max-h-[400px] min-[450px]:max-h-[460px] w-full max-w-[230px] sm:max-h-[380px] md:max-h-[420px] lg:max-w-[280px] lg:max-h-[470px] xl:max-h-[500px]'>
                <ItemProduct product={product} />
            </div>
        </Link>
    )
};
export default ProductItem