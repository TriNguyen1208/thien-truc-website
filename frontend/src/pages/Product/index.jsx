import useProducts from '@/redux/hooks/useProducts'
import{useRef} from 'react'
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
import Loading from '@/components/Loading'
import Paging from '@/components/Paging'
function GoBackListProduct({goBack ,id ,query}){
    return( id != 0 || query != '' ?
        <div onClick={goBack} className='flex flex-row text-[#16A34A] my-[10px] text-[15px] gap-[10px] cursor-pointer hover:text-[#0B4A24] transition-all duration-300 ease-in-out '>
           <ArrowLeftOutlined /> <p className=''>Quay Lại</p>
        </div> : <div></div>
    )
}
function DisplayByCategories({data,categories, handleViewMore}){
 
    return(
        Object.entries(data).map((objectCategory,index)=>{
           
                const props = {
                    category: objectCategory[0],
                    products: objectCategory[1],
                    idCategory: categories.indexOf(objectCategory[0]) ,
                    highLightFeatures: [],
                    handleViewMore: handleViewMore

                }
                return(<Category {...props}/>)
            })
    )
}

function DisplayProduct({categories, idCategorySelected,query, handleViewMore })
{   let filter
   
    if(idCategorySelected === 0)
    {
        filter = ''
    }else{
        filter = categories[idCategorySelected] 
    }
    const {data: dataAll , isLoading : isLoadingProduct} =  useProducts.products.getList(query, filter , 1)
    if(isLoadingProduct)
    {
        return(<Loading/>)
    }
   
    return(!Array.isArray(dataAll.results) ?
      (<DisplayByCategories data={dataAll.results} categories={categories} handleViewMore ={handleViewMore}/>):
      query == '' ?
      (<Category category={filter} allCategories={false} products={dataAll.results} highLightFeatures ={[]} />) :
      (<ListProduct products={dataAll.results} highLightFeatures={[]} /> )
    )
}
function ListProduct({products, highLightFeatures})
{
    return(
        <div className='grid grid-cols-4 py-[20px] mx-[30px] gap-y-[20px]'>            
                                    {
                                        products.map((product, i) =>{
                                             return( 
                                                <div key={i} className='w-[330px] h-[620px]'>
                                                    <ItemProduct  product = { products[i]}
                                                    highLightFeatures = {highLightFeatures}
                                                    />                                    
                                                </div>
                                                 
                                            )
                                        })
                                    }   
             
          
        </div>
    )
}
function Category({category,allCategories = true, idCategory = 0, products, highLightFeatures,handleViewMore = null  })
{
    return(

        <div  className='flex flex-col border-[1px] border-[#E5E7EB] rounded-[8px] pt-[20px] mb-[20px]'>
                                <div className='border-b-[1px] border-[#E5E7EB] pb-[20px] shadow-sm'>
                                        <div className='border-l-[5px] border-[#1E2A38] px-[16px] ml-[30px]'>
                                            <h1 className='text-[30px] leading-none text-[#1E2A38]'>
                                                {category}
                                            </h1>
                                        </div>
                                </div>
                                <ListProduct products={products} highLightFeatures={highLightFeatures}/>
                                
                                <div className='flex justify-center py-[20px] border-t-[1px] border-[#E5E7EB]'>
                                    <div  className="h-fit w-fit">     
                                        { 
                                           allCategories ?<ViewMoreButton  content = {'Xem Tất Cả Sản Phẩm'} handleClick = {()=>handleViewMore(idCategory)}/>  
                                         :<Paging data = {1} onPageChange = {null} />          
                                        }
                                                              
                                    </div>

                                </div>

                            </div>
    )
}

export default function Product(){
    
    const [idCategory, setIdCategory] = useState(0)
    const [querySearch, setQuerySearch] = useState('')
    const scrollTargetRef = useRef(null)
    const { data: productPage, isLoading: isLoadingPage } = useProducts.getProductPage() 
    const { data: productCategories, isLoading: isLoadingCategories } = useProducts.product_categories.getAll() 
    
    
    if(isLoadingPage || isLoadingCategories )
    {
        return (<div key = {1}>
            <Loading/>
        </div>)
    }
       
 
    const handleSearchSuggestion = (query, filter) => {
        return useProducts.getSearchSuggestions(query, filter)
    }
    
   const handleViewMore = (idCategory)=>{
        setIdCategory(idCategory)
        setTimeout(() => {
        scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
   }
   
    const goBack = ()=>{
        setQuerySearch('')
        setIdCategory(0)
         setTimeout(() => {
        scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
        
    }
     const categories = productCategories.map((category) => {
         return (category.name)
        }) 
    categories.unshift("Tất cả sản phẩm")
    const handleSearch = (category, query) => {
        setIdCategory(categories.indexOf(category))
        setQuerySearch(query)
         setTimeout(() => {
        scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
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
  
    
 

    return (
        
        <>
        <Banner data = {banner1}/>
        <Banner data = {banner2}/>
        <div className="container-fluid flex flex-col ">
            <div className='flex flex-grow justify-between py-[45px]  '>
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
        <div ref={scrollTargetRef}  ></div>     
        <div className='my-[40px]'>
             <GoBackListProduct goBack={goBack} id = {idCategory} query={querySearch}/>   
        </div>
        <DisplayProduct categories={categories} idCategorySelected={idCategory} query={querySearch} handleViewMore = {handleViewMore}/>
        
        </div>
       
        </>
    )
}