import {ArrowLeftOutlined} from '@ant-design/icons'
import  {useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import useProducts from '@/hooks/useProducts'
import Loading from '@/components/Loading'

function ListPicture({urls, id}){

    return( urls.length != 0?
        <div className="h-[845px] flex flex-col ">
                        <div data-index = {id} className="h-[668px] w-full p-[15px] border-[#E5E7EB] border-[1px] rounded-[8px]">
                            <img data-index = {id}
                            src={urls[id]} 
                            alt={''}
                            className="w-full h-full object-cover rounded-t-[6px]"/>

                        </div>
                        <div className='h-[150px] grid grid-cols-4 gap-[10px] mt-[10px]'>
                            {
                                urls.map((url, index) =>{
                                    return( id != index ? 
                                        <div key={index} data-index = {index} className='h-[170px] w-[170px] overflow-hidden p-[10px]  border-[#E5E7EB] border-[1px] rounded-[8px] cursor-pointer '>
                                            <img data-index = {index}
                                            src={url} 
                                            alt={''}
                                            className="w-full h-full object-cover "/>
                                        </div>
                                        :(null)
                                        
                                    )
                                })
                            }
                            
                        </div>
                    </div> : (
                        <div className="h-[668px] w-full bg-gray-200 flex items-center justify-center border border-dashed border-gray-400 rounded-md">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 5h18M3 19h18M4 7h16v10H4V7zm4 4a2 2 0 100-4 2 2 0 000 4z"
                            />
                        </svg>
                            </div>
                    )
     )
}
export default function ProductDetail(){
    const{id} = useParams();
    const [selectPicture, setSelectPicture] = useState(0);
    const navigate = useNavigate();
    if(id ==='')
    {
        return(<>Không có sản phẩm</>)
    }

    const {data : product, isLoading : isLoadingProduct} = useProducts.products.getOne(id)
    if(isLoadingProduct)
    {
        return(<Loading/>)
    }
    console.log(product)
    
    const goBack = ()=>{
        navigate('/san-pham')
    }
    
    const listPicture = [
        "https://khoinguonsangtao.vn/wp-content/uploads/2022/09/hinh-anh-gai-xinh-cap-2-3.jpg",
        'https://tse2.mm.bing.net/th?id=OIP.PthCEIQk0yqgru8L_e4r8gHaJP&pid=Api&P=0&h=180',
        "https://tse2.mm.bing.net/th?id=OIP.BCnlaNQFI8ofLz6aPHV8fwHaGh&pid=Api&P=0&h=180",
        "https://www.ldg.com.vn/media/uploads/uploads/27130501-gai-xinh-che-mat-anh-avatar-dep-cho-con-gai-1.jpg",
        "https://tse4.mm.bing.net/th?id=OIP.Vuy4J9rJfgqqwk_heaKCygHaE8&pid=Api&P=0&h=180",
    ]
    const pickPicture = (e)=>{
        if(e)
        {
            if(e.target.dataset.index)
            {
                setSelectPicture(e.target.dataset.index)
            }
        }
    }
   
    
  
    return (
        <>
            <div className="container-fluid pt-[30px]">
                <div onClick={goBack} className="flex flex-row w-full h-[20px] my-[15px] gap-[10px] leading-none items-center text-[#14532D] font-medium cursor-pointer">
                     <ArrowLeftOutlined />
                    <span>Quay lại danh sách sản phẩm</span>
                </div>
                <div className="grid grid-cols-2 grid-rows-2 gap-[30px]">
                    <div onClick = {pickPicture}>
                    <ListPicture urls = {product.product_img || listPicture} id = {selectPicture}/>
                   </div>
                    <div className="flex flex-col h-[845px]">
                        <div className="pb-[10px] ">
                            <span className="font-bold text-[30px] leading-none ">
                            {product.name}
                            </span>
                        </div>
                        <div className="border-[#E5E7EB] border-y-[1px] py-[15px] line-clamp-1 text-[23px] text-[#ff0000] font-semibold">
                              {typeof product.price === 'number' ? product.price.toLocaleString('vi-VN') + " ₫": 'Chưa có giá' }
                        </div>
                         <div className="py-[10px]">
                            <span className="text-[16px]">
                            {product.description}
                            </span>
                         </div>
                    </div>
                    <div className="h-[566px] p-[20px] border-[#E5E7EB] border-[1px] rounded-[8px]">
                        <div className="border-l-[5px] border-[#14532D] px-[20px] my-[20px]">
                            <span className="text-[#14532D] text-[20px] font-bold">
                                Tính năng nổi bật 
                            </span>
                        </div>
                        <div>
                            <ul>
                               {
                                 (product.product_features || []).map((hl)=>{
                                    return(
                                        <li className='my-[10px]'>
                                            {hl}
                                        </li>
                                    )
                                })
                               }
                            </ul>
                        </div>
                    </div>
                       <div className="h-[566px] p-[20px] border-[#E5E7EB] border-[1px] rounded-[8px]">
                        <div className="border-l-[5px] border-[#14532D] px-[20px] my-[20px]">
                            <span className="text-[#14532D] text-[20px] font-bold">
                               Thông số kỹ thuật
                            </span>
                        </div>
                        <div className="overflow-hidden">
                            <ul>
                                {
                                    Object.entries(product.product_specifications).map((spec,index)=>{
                                        
                                        return(
                                            <li key={index} className={` flex flex-row h-[40px]  items-center p-[10px] my-[5px] ${index %2 == 0? 'bg-[#F9FAFB]': '' }` }>
                                                    <div className="w-[33%]">{spec[0]}</div>
                                                    <div className="w-[67%]">{spec[1]}</div>
                                            </li>
                                        )
                                    })
                                }
                              
                               
                            </ul>
                        </div>
                    </div>
                    

                </div>
            </div>
        </>
    )
}