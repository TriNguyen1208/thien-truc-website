import useProducts from '@/redux/hooks/useProducts'
import Banner from '@/components/Banner'
import CenterCard from '../../components/CenterCard'
import { TruckOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { CreditCardOutlined } from '@ant-design/icons';
import { SafetyOutlined } from '@ant-design/icons';
import {ArrowLeftOutlined} from '@ant-design/icons'
import ItemProduct from '@/components/ItemProduct'
import ViewMoreButton from '@/components/ViewMoreButton'
import { useState } from 'react';
import { useEffect } from 'react';
function GoBackListProduct({goBack ,id}){
    return( id != 0 ?
        <div onClick={goBack} className='flex flex-row text-[#16A34A] my-[10px] text-[15px] gap-[10px] cursor-pointer hover:text-[#0B4A24] transition-all duration-300 ease-in-out '>
           <ArrowLeftOutlined /> <p className=''>Quay Lại</p>
        </div> : <div></div>
    )
}
function DisplayProduct({categories, idCategorySlected})
{
    return(idCategorySlected === 0?
      (   productCategories.map((category, index)=>{
                    if(index === idCategory - 1 || idCategory === 0)
                     {
                        const props = {
                            category : category,
                            products :productByCategory.get(category.id),
                            prices : productPrices,
                            hightLightFeatures: productsHlFeatures,
                            isClick: isClick.get(category.id),
                            handleViewAll: handleViewAll
                        }
                        
                        return( productByCategory.get(category.id).length > 0 
                        ?(<Category  key = {index} {...props}/>)
                        :(<div key = {index}></div>)
                        )
                     }
                    }
            )
        ):(<></>)
    )
}
function Category({category, products,prices, hightLightFeatures ,isClick ,handleViewAll})
{
    return(

        <div  className='flex flex-col border-[1px] border-[#E5E7EB] rounded-[8px] pt-[20px] mb-[20px]'>
                                <div className='border-b-[1px] border-[#E5E7EB] pb-[20px] shadow-sm'>
                                        <div className='border-l-[5px] px-[16px] ml-[30px]'>
                                            <h1 className='text-[30px] leading-none'>
                                                {category.name}
                                            </h1>
                                        </div>
                                </div>
                                
                                <div className='grid grid-cols-4 py-[20px] mx-[30px] gap-y-[20px]'>            
                                    {
                                    Array.from({ length: Math.min(isClick === false ? 4 : products.length 
                                        ,products.length ) }).map((_,i) => {
                                  
                                        
                                            return( 
                                                <div key={i} className='w-[330px] h-[620px]'>
                                                    <ItemProduct  product = { products[i]}
                                                    prices = {prices}
                                                    highLightFeatures = {hightLightFeatures}
                                                    />                                    
                                                </div>
                                            )
                                        })
                                    }                         
                                </div>
                                <div className='flex justify-center py-[20px] border-t-[1px] border-[#E5E7EB]'>
                                    <div onClick = {()=>handleViewAll(category.id,products.length)} className="h-fit w-fit">
                                        <ViewMoreButton  content = {isClick ? 'Rút Gọn' :'Xem Tất Cả Sản Phẩm'}/>
                                    </div>
                                </div>

                            </div>
    )
}

export default function Product(){
    
    const { data: productPage, isLoading: isLoadingPage } = useProducts.getProductPage() 
    const { data: productCategories, isLoading: isLoadingCategories } = useProducts.product_categories.getAll() 
    const { data: productPrices, isLoading: isLoadingPrices } = useProducts.product_prices.getAll() 
    const { data: products, isLoading: isLoadingProducts } = useProducts.products.getAll() 
    const { data: productsHlFeatures, isLoading: isLoadingProductsHlFeatures } = useProducts.product_highlight_features.getAll() 
    const [isClick, setIsClick] = useState(new Map())
    const [idCategory, setIdCategory] = useState(0)
    
    useEffect(() => {
        if (productCategories) {      
            const initialClick = new Map(
                productCategories.map(category => [category.id, false])
            );
           
            setIsClick(initialClick)
        }
    }, [productCategories]);
    const handleSearchSuggestion = (query, filter) => {
        return useProducts.getSearchSuggestions(query, filter)
    }
    
    const handleViewAll = (categoryId, fullLength) => {
        setIsClick(pre =>{
            
            if (fullLength > 4 && isClick.get(categoryId) === false ){
                const newMap = new Map(pre);
                newMap.set(categoryId, true);
                return newMap;
            } 

            if (isClick.get(categoryId) === true)
            {
               
                const newMap = new Map(pre);
                newMap.set(categoryId, false);
                return newMap;
            }
            return pre
        })
        
    };   
     if (isLoadingPage || isLoadingCategories || isLoadingPrices || isLoadingProducts || isLoadingProductsHlFeatures) {
        return <p>Loading...</p>;
    }
    const goBack = ()=>{
        console.log('qualai')
    }
    const categories = productCategories.map((category) => {
         return (category.name)
        }) 
    categories.unshift("Tất cả sản phẩm")
    const handleSearch = (category, query) => {

        setIdCategory(categories.indexOf(category))
    }
    const banner1 = {
        title : productPage.banner_title,
        description: productPage.banner_description,
        colorBackground : "var(--gradient-banner)",
        colorText : "#ffffff",
        hasButton : false,
        hasSearch : true,
        contentButton : null,
        handleButton : handleSearch,
        categories : categories,
        contentPlaceholder : 'Tìm kiếm sản phẩm...',
        handleSearchSuggestion: handleSearchSuggestion
    }
    
    const banner2 = {
        title : 'Xem Bảng Giá Ngay',
        description: 'Xem chi tiết giá lắp đặt các thiết bị điện tử và giải pháp thi công tại Thiên Trúc',
        colorBackground : "#F0FDF4",
        colorText : "#000000",
        hasButton : true,
        hasSearch : false,
        contentButton : 'Tới Bảng Giá',
        handleButton : () => {},
        categories : null,
        contentPlaceholder : null,
        handleSearchSuggestion: null

    }
    const contentCenterCards = [
        {   
            icon: TruckOutlined ,
            title: "Giao Hàng Nhanh",
            description: "Miễn phí với đơn hàng trên 1 triệu."
        },
        {
            icon: UserOutlined,
            title: "Tư vấn chuyên nghiệp",
            description: "Đội ngũ kỹ thuật viên giàu kinh nghiệm."
        },
        {
            icon: SafetyOutlined ,
            title: '100% Chính Hãng',
            description: "Cam kết sản phẩm chính hãng."
        },
        {
            icon: CreditCardOutlined,
            title: "Thanh Toán Linh Hoạt",
            description: "Nhiều phương thức thanh toán."
        }

   ]
  
    
 
    const productByCategory = new Map(
            productCategories.map((category)=>{
            const pros = products.filter((pro,)=>{
                    return pro.category.id === category.id ? pro :null
            })
            return [category.id,pros]
        })
    )
   
   
    return (
        
        <>
        <Banner data = {banner1}/>
        <Banner data = {banner2}/>
        <div className="container-fluid flex flex-col">
            <div className='flex flex-grow justify-between py-[45px] '>
            {
                contentCenterCards.map((card, index) => {
                    
                    return(
                        <div key = {index} className='w-[340px] h-[162px]'>
                        <CenterCard data={card}/>
                        </div>   
                    )
                })
            }
            </div> 
           
         <GoBackListProduct goBack={goBack} id = {idCategory}/>   
        
       
        </div>
       
        </>
    )
}