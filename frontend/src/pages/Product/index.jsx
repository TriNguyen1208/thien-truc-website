import useProducts from '@/redux/hooks/useProducts'
export default function Product(){
        const { data: product, isLoading: isLoadingProduct } = useProducts.getAll() // Assuming 1 is the product ID you want to fetch
        if (isLoadingProduct) {
            return <p>Loading...</p>;
        }
       console.log(product)
    return (
        <>
        
            <p>Đây là nội dung trang sản phẩm.</p>
        </>
    )
}