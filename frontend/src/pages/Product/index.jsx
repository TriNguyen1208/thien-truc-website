import useProducts from '@/redux/hooks/useProducts'
import Banner from '@/components/Banner'
import CenterCard from '../../components/CenterCard'
import { TruckOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { CreditCardOutlined } from '@ant-design/icons';
import { SafetyOutlined } from '@ant-design/icons';
import ItemProduct from '@/components/ItemProduct'
import ViewMoreButton from '@/components/ViewMoreButton'
import { useState } from 'react';
import { useEffect } from 'react';

export default function Product(){
    
    
    const { data: product, isLoading: isLoadingProduct } = useProducts.getAll() 
    const [isClick, setIsClick] = useState(new Map())
    useEffect(() => {
        if (product && product.product_categories) {      
            const initialClick = new Map(
                product.product_categories.map(category => [category.id, false])
            );
           
            setIsClick(initialClick)
        }
    }, [product]);

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
     if (isLoadingProduct) {
        return <p>Loading...</p>;
    }

    const categories = product.product_categories.map((category) => {
         return (category.name)
        }) 
       const banner1 = {
        title : product.product_page.banner_title,
        description: product.product_page.banner_description,
        colorBackground : "var(--gradient-banner)",
        colorText : "#ffffff",
        hasButton : false,
        hasSearch : true,
        contentButton : null,
        handleButton : null,
        categories : categories,
        contentPlaceholder : 'Tìm kiếm sản phẩm...'
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
        contentPlaceholder : null
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
            title: "100̀% Chính Hãng",
            description: "Cam kết sản phẩm chính hãng."
        },
        {
            icon: CreditCardOutlined,
            title: "Thanh Toán Linh Hoạt",
            description: "Nhiều phương thức thanh toán."
        }

   ]
  
    
 
    const productByCategory = new Map(
            product.product_categories.map((category, indexC)=>{
            const products = product.products.filter((pro,)=>{
                    return pro.category.id === category.id ? pro :null
            })
            return [category.id,products]
        })
    )
   const idSelected = 0
   
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
                        <CenterCard {...card}/>
                        </div>   
                    )
                   
                })
            }
            
        </div> 
        {
            
            
            product.product_categories.map((category, index)=>{
                if(idSelected != 0)
                {
                    if(index === idSelected - 1 )
                     {
                        return( productByCategory.get(category.id).length > 0 ?
                (<div key = {index} className='flex flex-col border-[1px] border-[#E5E7EB] rounded-[8px] pt-[20px] mb-[20px]'>
                    <div className='border-b-[1px] border-[#E5E7EB] pb-[20px] shadow-sm'>
                            <div className='border-l-[5px] px-[16px] ml-[30px]'>
                                <h1 className='text-[30px] leading-none'>
                                    {category.name}
                                </h1>
                            </div>
                    </div>
                    <div className='grid grid-cols-4 py-[20px]  mx-[30px] gap-y-[20px]'>
                          
                        {
                         Array.from({ length: Math.min(isClick.get(category.id) === false ? 4 : productByCategory.get(category.id).length 
                            ,productByCategory.get(category.id).length ) }).map((_,i) => {
                            
                                return( 
                                    <div key={i} className='w-[330px]'>
                                    <ItemProduct  product = { productByCategory.get(category.id)[i]}
                                     price = {product.product_prices[productByCategory.get(category.id)[i].id - 1] ? 
                                     product.product_prices[productByCategory.get(category.id)[i].id - 1].price: 'Chưa có'} />
                                    </div>
                                )
                             })
                        }                         
                    </div>
                    <div className='flex justify-center py-[20px] border-t-[1px] border-[#E5E7EB]'>
                           <div onClick = {()=>handleViewAll(category.id,productByCategory.get(category.id).length)} className="h-fit w-fit">
                             <ViewMoreButton  data = {isClick.get(category.id) ? 'Rút Gọn' :'Xem Tất Cả Sản Phẩm'}/>
                           </div>
                    </div>

            </div>):(<div key ={index}></div>)
                )
                     }
                }else
                {

                    return( productByCategory.get(category.id).length > 0 ?
                    (<div key = {index} className='flex flex-col border-[1px] border-[#E5E7EB] rounded-[8px] pt-[20px] mb-[20px]'>
                        <div className='border-b-[1px] border-[#E5E7EB] pb-[20px] shadow-sm'>
                                <div className='border-l-[5px] px-[16px] ml-[30px]'>
                                    <h1 className='text-[30px] leading-none'>
                                        {category.name}
                                    </h1>
                                </div>
                        </div>
                        <div className='grid grid-cols-4 py-[20px]  mx-[30px] gap-y-[20px]'>
                              
                            {
                             Array.from({ length: Math.min(isClick.get(category.id) === false ? 4 : productByCategory.get(category.id).length 
                                ,productByCategory.get(category.id).length ) }).map((_,i) => {
                                
                                    return( 
                                        <div key={i} className='w-[330px]'>
                                        <ItemProduct  product = { productByCategory.get(category.id)[i]}
                                         price = {product.product_prices[productByCategory.get(category.id)[i].id - 1] ? 
                                         product.product_prices[productByCategory.get(category.id)[i].id - 1].price: 'Chưa có'} />
                                        </div>
                                    )
                                 })
                            }                         
                        </div>
                        <div className='flex justify-center py-[20px] border-t-[1px] border-[#E5E7EB]'>
                               <div onClick = {()=>handleViewAll(category.id,productByCategory.get(category.id).length)} className="h-fit w-fit">
                                 <ViewMoreButton  data = {isClick.get(category.id) ? 'Rút Gọn' :'Xem Tất Cả Sản Phẩm'}/>
                               </div>
                        </div>
    
                </div>):(<div key ={index}></div>)
                    )
                }
            })
        }
       
        </div>
       
          
        </>
    )
}