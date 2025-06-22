import useProducts from '@/redux/hooks/useProducts'
export default function Product(){
        const { data: product, isLoading: isLoadingProduct } = useProducts.getAll() 
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