import Button from '@/components/Button'
import Table from '@/components/Table'
import Loading from '@/components/Loading'
import useProduct from '@/hooks/useProducts'
import {useEffect, useState } from 'react';
import { AddIcon, EditIcon, SubtractIcon, ArrowDownIcon, ArrowUpIcon, SaveIcon } from '@/components/Icon';
import ProductImageCell from '@/components/ProductImageCell'
import AddSale from '@/components/AddSale';
import SwitchButton from "@/components/SwitchButton";

const FlashSale = () => {
    //========================= API ====================

    const { data: productSale, isLoading: isLoadingProductSale } = useProduct.products.getList('','','',true,'','');
    const { data: productData, isLoading: isLoadingProductData } = useProduct.products.getList();
    const {data: productPage, isLoading: isLoadingProductPage} = useProduct.getProductPage()
    const { mutate: updateVisibility, isPending: isPendingUpdateVisibility} = useProduct.products.updateActivateSale();

     //--------------Nút isVisibility--------------
    //Check isVisible
    const [isVisible, setIsVisible] = useState(null);
    useEffect(() => {
        if(productPage) 
        setIsVisible(productPage.on_sale);
    }, [productPage]);
    //Xu ly nut isVisible
    function handleToggle(checked){
        setIsVisible(checked);
        updateVisibility({"status": checked});
    }
   
    const { mutate: updateProductSale, isPending: isPendingUpdateProductSale } = useProduct.products.updateSale();
    const [arrayProduct, setArrayProduct] =useState([]);
   
    const contentSetting = {
        title: `Quản lý danh sách sản phẩm`,
        description: `Chọn các sản phẩm muốn thêm hoặc xóa  khỏi trưng bày sale`,
        type: "sản phẩm",
        header: [
            "Mã sản phẩm",
            "Tên sản phẩm",
            "Loại sản phẩm",
        ]
    }
    const [isModalOpenSetting, setIsModalOpenSetting] = useState(false);

    useEffect(() => {
        
        setArrayProduct(productSale)
    }, [ productSale])

     
   
    
    const handleDeleteProductSale = (item) => {
        const newArr = arrayProduct.filter(data => data.id != item.id);
        setArrayProduct(newArr);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const object =  {
            "data": arrayProduct.map(item => ({
                "id": item.id,
                "discount_percent": item.discount_percent,
                "final_price": item.final_price
            }))
        }
      
        updateProductSale( object)
    }
    const handleChangePrice = (e,id, type)=>{ // Type : discount || finalPrice 
        const value = e.target.value === "" ? "0" :  e.target.value
        if(!/^\d*$/.test(value)) return
        var valueNum =  parseInt(value, 10)
        const product = arrayProduct.find(p=> p.id == id)
        if(valueNum < 0 ) valueNum = 0
        if(type === "discount")
        {
            if(valueNum > 100) valueNum = 100
            product.discount_percent = valueNum;
            product.final_price = Math.round(product.price - product.price *product.discount_percent/100)

        }else if(type === "finalPrice")
        {
            if(valueNum > product.price) valueNum = product.price
            product.final_price = valueNum;
            product.discount_percent = Math.round(100 - (product.final_price / product.price) * 100)

        }
       
        setArrayProduct(prev => prev.map((item)=>(item.id === id ? product: item)))

    }
    const convertProductSaleListToTableData = (arrayProduct) => {
        return (arrayProduct || []).map((item, index) => {
            return [
                {
                    type: "text", 
                    content:item.id
                        
                },
                {
                    type: "component",
                    component: <ProductImageCell imageUrl={item.product_img} productName={item.name}></ProductImageCell>
                },
                {
                    type: "text",
                    content: item.name
                },
                {
                    type: "text",
                    content: Number(item.price).toLocaleString('vi-VN') + ' đ' 
                },
                {
                    type: "component",
                    component: <input type='number' 
                    value={item.discount_percent || 0} 
                    onChange={(e)=>handleChangePrice(e,item.id,"discount")}
                    min = {0} max= {100} 
                    className=' text-right p-2 w-4/5 border border-[#E5E5E5] rounded-[6px]' />
                },
                {
                    type: "component",
                    component: <input 
                    type='number' 
                    onChange={(e)=>handleChangePrice(e,item.id,"finalPrice")}
                    value={!item.final_price?(item.discount_percent === null? item.price:Math.round(item.price - item.price *item.discount_percent/100) ):item.final_price} min = {0} 
                    className='text-right p-2 w-4/5 border border-[#E5E5E5] rounded-[6px]' />
                },
                {
                    type: "component", 
                    component: 
                    
                     
                         <button 
                            className="px-2 py-1 border  border-gray-300 rounded-md cursor-pointer" 
                            onClick={() => handleDeleteProductSale(item)}>      
                            <SubtractIcon />    
                        </button>,
                  
                    
                }
            ]
        });
    };


    const dataTable = convertProductSaleListToTableData(arrayProduct);
    const configProductSale = {
        title: "Sale giảm giá",
        description: `${(arrayProduct || []).length} sản phẩm`,
        propsAddButton: {
            Icon: AddIcon,
            text: "Thêm sản phẩm",
            colorText: "#ffffff",
            colorBackground: "#000000",
            padding: 8,
        },
        propsSaveButton: {
            Icon: SaveIcon,
            text: "Lưu thay đổi",
            colorText: "#ffffff",
            colorBackground: "#000000",
            padding: 8,
        },
        table: {
            columns: ["Mã SP", "Hình ảnh", "Tên sản phẩm", "Giá gốc", "Giảm giá(%)", "Giá cuối", "Bỏ sản phẩm"],
            width: ['10%', '10%', '20%', '15%', '15%', '15%', '12%'],
            data: dataTable
        },
        setIsModalOpenSetting: setIsModalOpenSetting,
        handleSubmit: handleSubmit,

    }

    if(isLoadingProductSale  || isPendingUpdateProductSale || isLoadingProductData || isLoadingProductPage || isPendingUpdateVisibility
    ) 
        return <Loading/>
    console.log(isVisible)
    return (
        <div>
            <div className="flex flex-col p-[24px] bg-white w-full h-full border border-[#E5E7EB] rounded-[8px] mt-[40px]">
                <div className='flex items-center justify-between'>
                    <div>
                        <div className="mb-[4px]">
                            <h1 className="text-[24px] text-black font-semibold">
                                {configProductSale.title}
                            </h1>
                        </div>
                        <div className="mb-[24px]">
                            <p className="text-[14px] text-[#71717A] font-regular">
                                {configProductSale.description}
                            </p>
                        </div>
                    </div>
                    <div className='h-[40px]'>
                        <button type="submit" className='' onClick={() => configProductSale.setIsModalOpenSetting(true)}> 
                            <Button {...configProductSale.propsAddButton} />
                        </button>
                    </div>
                </div>
                <div className='mb-[30px]'>
                    <Table columns={configProductSale.table.columns} data={configProductSale.table.data} isSetting={false} width={configProductSale.table.width} />
                </div>
                <div className='flex justify-between'>
                    <form onSubmit={configProductSale.handleSubmit}>
                    
                    <div className='h-[45px] mt-3'>
                        <button type='submit' className='h-full'> <Button {...configProductSale.propsSaveButton} /></button>
                    </div>
                </form>
                  <div className="flex flex-row gap-5 items-center">
                                <div className="flex flex-col">
                                    <span className="font-bold text-gray-900">Hiển thị bảng Sale và cập nhật giá</span>
                                    <span className="text-gray-500 ">Bật khi áp dụng chế độ giảm giá</span>
                                </div>
                                <SwitchButton 
                                    handleToggle={handleToggle}
                                    currentState={isVisible}
                                />
                </div>
                </div>
            </div>
           
            <AddSale
                isOpen={isModalOpenSetting}
                onClose={() => setIsModalOpenSetting(false)}
                content={contentSetting}
                useData={useProduct.products}
                useDataCategories={useProduct.product_categories}
                onSave={async (changedItems) => {
                    if (changedItems) {

                        const { data } = changedItems;

                        const matchedProduct = productData.find(item => item.id === data.id);
                        if(arrayProduct.some( p=>p.id === data.id )) return
                        if (!matchedProduct) return arrayProduct; // Không tìm thấy thì không làm gì
                                               
                        setArrayProduct(prev =>[...prev, matchedProduct])
                    }
                }}
            />
        </div>
        
    )
}

export default FlashSale