import { useState } from 'react'
import { useParams, useNavigate, useNavigation } from 'react-router-dom';
import useProducts from '@/hooks/useProducts'
import Loading from '@/components/Loading'
import {
    ProductOutlined
} from '@ant-design/icons';
import LazyLoad from 'react-lazyload';
import BackButton from '../../components/BackButton';
import ComingSoon from '@/pages/ComingSoon'

function Picture({ url }) {

    return (
        <div className=" flex flex-col ">
            <div className=" w-full p-[15px] border-[#E5E7EB] border-[1px] rounded-[8px]">
                <LazyLoad
                    height={200}
                    offset={100}
                    throttle={100}
                    once
                    placeholder={<div className="w-full h-full bg-gray-200 rounded-t-lg overflow-hidden"></div>}
                    style={{width: '100%', height: '100%'}}
                >
                    <img 
                        src={url}
                        alt={''}
                        className="w-full h-full object-cover rounded-t-[6px]"/>
                </LazyLoad>
            </div>
        </div>
    )
}
export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const navigation = useNavigation();
    if (id === '') {
        return (<>Không có sản phẩm</>)
    }

    const { data: product, isLoading: isLoadingProduct } = useProducts.products.getOne(id)
    if (isLoadingProduct) {
        return (<Loading />)
    }
    return (
        <>
            {navigation.state == 'loading' && <Loading/>}
            {product.is_visible ? <div className="container-fluid py-[30px]">
                <BackButton content="Quay lại danh sách sản phẩm"/>
                <div className="grid grid-cols-1 gap-[30px] lg:grid-cols-2">
                    <div>
                        {product.product_img ? (<Picture url={product.product_img} />)
                            :
                            (<div className="w-full aspect-square flex items-center justify-center border border-gray-300">
                                <ProductOutlined style={{ fontSize: '48px', color: '#9CA3AF' }} />
                            </div>)
                        }
                            

                    </div>
                    <div className="flex flex-col">
                        <div className="pb-[10px] ">
                            <span className="font-bold text-[20px] sm:text-[24px]  leading-none ">
                                {product.name}
                            </span>
                        </div>
                        <div className="border-[#E5E7EB] border-y-[1px] py-[15px]  my-[15px] line-clamp-1 text-[23px] text-[#ff0000] font-semibold">
                            {typeof product.price === 'number' ? product.price.toLocaleString('vi-VN') + " ₫" : 'Chưa có giá'}
                        </div>
                        <div className="py-[10px]">
                            <span className="text-[16px] whitespace-pre-wrap">
                                {product.description}
                            </span>
                        </div>
                    </div>
                    <div className="p-[20px] border-[#E5E7EB] border-[1px] rounded-[8px]">
                        <div className="border-l-[5px] border-[#14532D] px-[20px] my-[20px]">
                            <span className="text-[#14532D] text-[20px] font-bold">
                                Tính năng nổi bật
                            </span>
                        </div>
                        <div>
                            <ul>
                                {
                                    (product.product_features || []).map((hl,index) => {
                                        return (
                                            <li className={` flex flex-row h-[40px]  items-center p-[10px] my-[5px] ${index % 2 == 0 ? 'bg-[#F9FAFB]' : ''}`}>
                                                {hl}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="p-[20px] border-[#E5E7EB] border-[1px] rounded-[8px]">
                        <div className="border-l-[5px] border-[#14532D] px-[20px] my-[20px]">
                            <span className="text-[#14532D] text-[20px] font-bold">
                                Thông số kỹ thuật
                            </span>
                        </div>
                        <div className="overflow-hidden">
                            <ul>
                                {
                                    Object.entries(product.product_specifications).map((spec, index) => {
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
            </div>: <ComingSoon/>}
        </>
    )
}