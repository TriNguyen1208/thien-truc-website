import useProducts from '@/redux/hooks/useProducts'
import ProductDetail from '../ProductDetail';
export default function Product(){
        const { data: product, isLoading: isLoadingProduct } = useProducts.getAll() 
        if (isLoadingProduct) {
            return <p>Loading...</p>;
        }
       
    return (
        <>
        
            <ProductDetail product={product.product_prices[0].product} price={product.product_prices[0]}/>
        </>
    )
}