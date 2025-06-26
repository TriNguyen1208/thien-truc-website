import useProducts from '@/redux/hooks/useProducts'
import ItemProduct from '../../components/ItemProduct'
export default function Product(){
      const { data: product, isLoading: isLoadingPage } = useProducts.getAll()
      if(isLoadingPage)
        {
            return(<></>)
        }
        console.log(product)
     
    return (
        <>
            <div className='w-[324px] h-[620px]'>
                <ItemProduct product={product.products[0]} prices={product.product_prices}  highLightFeatures={product.product_highlight_features} />
            </div>
            <p>Đây là nội dung trang sản phẩm.</p>
        </>
    )
}