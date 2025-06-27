// import useProducts from '@/redux/hooks/useProducts'
import Form from "../../components/Form"
export default function Product(){
    //     const { data: product, isLoading: isLoadingProduct } = useProducts.getAll() 
    //     if (isLoadingProduct) {
    //         return <p>Loading...</p>;
    //     }
    //    console.log(product)
    const data = {
        title: "Tri",
        type: 'lien-he'
    }
    return (
        <>
            <Form data = {data}/>
            <p>Đây là nội dung trang sản phẩm.</p>
        </>
    )
}