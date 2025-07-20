import { ArrowLeftOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import useProducts from '@/hooks/useProducts'
import Loading from '@/components/Loading'
import {
    ProductOutlined
} from '@ant-design/icons';
function Picture({ url }) {

    return (
        <div className="h-[845px] flex flex-col ">
            <div className="h-[668px] w-full p-[15px] border-[#E5E7EB] border-[1px] rounded-[8px]">
                <img 
                    src={url}
                    alt={''}
                    className="w-full h-full object-cover rounded-t-[6px]" />
            </div>
        </div>
    )
}
export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    if (id === '') {
        return (<>Không có sản phẩm</>)
    }

    const { data: product, isLoading: isLoadingProduct } = useProducts.products.getOne(id)
    if (isLoadingProduct) {
        return (<Loading />)
    }
    console.log(product)

    const goBack = () => {
        navigate(-1)
    }



  



    return (
        <>
            <div className="container-fluid pt-[30px]">
                <div onClick={goBack} className="flex flex-row w-full h-[20px] my-[15px] gap-[10px] leading-none items-center text-[#14532D] font-medium cursor-pointer">
                    <ArrowLeftOutlined />
                    <span>Quay lại</span>
                </div>
                <div className="grid grid-cols-2 grid-rows-2 gap-[30px]">
                    <div>
                        {product.product_img ? (<Picture url={product.product_img} />)
                            :
                            (<div className="w-full h-[668px] flex items-center justify-center border border-gray-300">
                                <ProductOutlined style={{ fontSize: '48px', color: '#9CA3AF' }} />
                            </div>)
                        }
                            

                    </div>
                    <div className="flex flex-col h-[845px]">
                        <div className="pb-[10px] ">
                            <span className="font-bold text-[30px] leading-none ">
                                {product.name}
                            </span>
                        </div>
                        <div className="border-[#E5E7EB] border-y-[1px] py-[15px] line-clamp-1 text-[23px] text-[#ff0000] font-semibold">
                            {typeof product.price === 'number' ? product.price.toLocaleString('vi-VN') + " ₫" : 'Chưa có giá'}
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
                                    (product.product_features || []).map((hl) => {
                                        return (
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
                                    Object.entries(product.product_specifications).map((spec, index) => {
                                            console.log('hi')
                                        return (
                                            <li key={index} className={` flex flex-row h-[40px]  items-center p-[10px] my-[5px] ${index % 2 == 0 ? 'bg-[#F9FAFB]' : ''}`}>
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