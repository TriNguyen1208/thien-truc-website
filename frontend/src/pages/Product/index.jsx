<<<<<<< HEAD
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
=======
import LabelProject from "../../components/LabelProject";
import ViewMoreButton from "../../components/ViewMoreButton";
export default function Product() {
  return (
    <>
      <div> Đây là trang sản phẩm</div>
    </>
  );
>>>>>>> origin/feature/components/header-footer-labelProject-viewMoreButtom
}