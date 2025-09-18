import Button from '@/components/Button'
import Table from '@/components/Table'
import Loading from '@/components/Loading'
import useHome from '@/hooks/useHome'
import useNews from '@/hooks/useNews'
import { useNavigate } from 'react-router-dom'
import {useEffect, useState } from 'react';
import { AddIcon, EditIcon, SubtractIcon, ArrowDownIcon, ArrowUpIcon, SaveIcon } from '@/components/Icon';
import ProductImageCell from '@/components/ProductImageCell'
import AddHighlight from '@/components/AddHighlight';

const FlashSale = () => {
    //========================= API ====================
    const { data: homePageData, isLoading: isLoadingHomePageData } = useHome.getHomePage();
    const { data: highlightNewsData, isLoading: isLoadingHighlightNews } = useNews.news.getAllFeatured();
    const { data: newsData, isLoading: isLoadingNewsData } = useNews.news.getList();
    const listProduct = [
  {
    id: "SP001",
    price: 100000,
    discount: 10, // 10%
    finalPrice: 90000,
  },
  {
    id: "SP002",
    price: 250000,
    discount: 0,
    finalPrice: 25000,
  },
  {
    id: "SP003",
    price: 500000,
    discount: 15,
    finalPrice: 425000,
  },
  {
    id: "SP004",
    price: 10,
    discount: 5,
    finalPrice: 71250,
  },
  {
    id: "SP005",
    price: 320000,
    discount: 25,
    finalPrice: 240000,
  },
];
    //Thao tác cập nhật tin tức nổi bật
    const { mutate: updateFeatureNews, isPending: isPendingUpdateFeatureNews } = useNews.news.updateFeaturedNews();
    
    const navigate = useNavigate();
    const [arrayHighlightNews, setArrayHighlightNews] = useState([]); // Xoa
    const [arrayProduct, setArrayProduct] =useState([]);
    const [switchTime, setSwitchTime] = useState(0);
    const contentSetting = {
        title: `Quản lý danh sách tin tức`,
        description: `Chọn các tin tức muốn thêm hoặc xóa  khỏi loại tin tức`,
        type: "tin tức",
        header: [
            "Mã tin tức",
            "Tên tin tức",
            "Loại tin tức",
        ]
    }
    const [isModalOpenSetting, setIsModalOpenSetting] = useState(false);

    useEffect(() => {
        setArrayHighlightNews(highlightNewsData?.featured_news ?? []);
        setSwitchTime(highlightNewsData?.switch_time ?? 0);
        setArrayProduct(listProduct)
    }, [highlightNewsData, homePageData])

    // Thêm function để xử lý việc di chuyển phần tử trong mảng
    const moveArrayElement = (array, fromIndex, toIndex) => {
        const newArray = [...array];
        const element = newArray.splice(fromIndex, 1)[0];
        newArray.splice(toIndex, 0, element);
        return newArray;
    };

    // Xử lý khi click nút ArrowUp
    const handleMoveUp = (currentIndex) => {
        if (currentIndex > 0) {
            const newArray = moveArrayElement(arrayHighlightNews, currentIndex, currentIndex - 1);
            setArrayHighlightNews(newArray);
        }
    };
    // Xử lý khi click nút ArrowDown
    const handleMoveDown = (currentIndex) => {
        if (currentIndex < arrayHighlightNews.length - 1) {
            const newArray = moveArrayElement(arrayHighlightNews, currentIndex, currentIndex + 1);
            setArrayHighlightNews(newArray);
        }
    };
    const handleChangeSwitchTime = (e) => {
        const value = e.target.value;

        if (value === '') {
            setSwitchTime('');
            return;
        }

        const numberRegex = /^\d+(\.\d{0,2})?$/;

        // Kiểm tra nếu giá trị hợp lệ
        if (numberRegex.test(value)) {
            setSwitchTime(value);
        }
    };
    const handleDeleteFeatureNews = (item) => {
        const newArr = arrayHighlightNews.filter(data => data.id != item.id);
        setArrayHighlightNews(newArr);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const object = {
            switch_time: switchTime,
            news_ids: arrayHighlightNews.map(item => item.id),
        };
        updateFeatureNews(object);
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
            product.discount = valueNum;
            product.finalPrice = Math.round(product.price - product.price *product.discount/100)

        }else if(type === "finalPrice")
        {
            if(valueNum > product.price) valueNum = product.price
            product.finalPrice = valueNum;
            product.discount = 100 - (product.finalPrice / product.price) * 100

        }
        setArrayProduct(prev => prev.map((item)=>(item.id === id ? product: item)))

    }
    const convertHighlightNewsListToTableData = (arrayProduct) => {
        return (arrayProduct || []).map((item, index) => {
            return [
                {
                    type: "text", 
                    content:item.id
              
                        
                },
                {
                    type: "text",
                    content: item.id
                },
                {
                    type: "component",
                    component: <ProductImageCell imageUrl={item.img} productName={item.name}></ProductImageCell>
                },
                {
                    type: "text",
                    content: item.price
                },
                {
                    type: "component",
                    component: <input type='number' 
                    value={item.discount} 
                    onChange={(e)=>handleChangePrice(e,item.id,"discount")}
                    min = {0} max= {100} 
                    className=' text-right p-2 w-4/5 border border-[#E5E5E5] rounded-[6px]' />
                },
                {
                    type: "component",
                    component: <input 
                    type='number' 
                    onChange={(e)=>handleChangePrice(e,item.id,"finalPrice")}
                    value={item.finalPrice} min = {0} 
                    className='text-right p-2 w-4/5 border border-[#E5E5E5] rounded-[6px]' />
                },
                {
                    type: "component", 
                    component: 
                    
                     
                         <button 
                            className="px-2 py-1 border  border-gray-300 rounded-md cursor-pointer" 
                            onClick={() => handleDeleteFeatureNews(item)}>      
                            <SubtractIcon />    
                        </button>,
                  
                    
                }
            ]
        });
    };
    

    const dataTable = convertHighlightNewsListToTableData(arrayProduct);
    const configHighlightNews = {
        title: "Sale giảm giá",
        description: `${arrayHighlightNews.length} sản phẩm`,
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
        switchTime: switchTime,
        handleChangeSwitchTime: handleChangeSwitchTime
    }

    if(isLoadingHighlightNews || isLoadingHomePageData || isLoadingNewsData || isPendingUpdateFeatureNews
    ) 
        return <Loading/>
    return (
        <div>
            <div className="flex flex-col p-[24px] bg-white w-full h-full border border-[#E5E7EB] rounded-[8px] mt-[40px]">
                <div className='flex items-center justify-between'>
                    <div>
                        <div className="mb-[4px]">
                            <h1 className="text-[24px] text-black font-semibold">
                                {configHighlightNews.title}
                            </h1>
                        </div>
                        <div className="mb-[24px]">
                            <p className="text-[14px] text-[#71717A] font-regular">
                                {configHighlightNews.description}
                            </p>
                        </div>
                    </div>
                    <div className='h-[40px]'>
                        <button type="submit" className='' onClick={() => configHighlightNews.setIsModalOpenSetting(true)}> 
                            <Button {...configHighlightNews.propsAddButton} />
                        </button>
                    </div>
                </div>
                <div className='mb-[30px]'>
                    <Table columns={configHighlightNews.table.columns} data={configHighlightNews.table.data} isSetting={false} width={configHighlightNews.table.width} />
                </div>
                <form onSubmit={configHighlightNews.handleSubmit}>
                    
                    <div className='h-[45px] mt-3'>
                        <button type='submit' className='h-full'> <Button {...configHighlightNews.propsSaveButton} /></button>
                    </div>
                </form>
            </div>
            <AddHighlight
                isOpen={isModalOpenSetting}
                onClose={() => setIsModalOpenSetting(false)}
                content={contentSetting}
                useData={useNews.news}
                useDataCategories={useNews.news_categories}
                onSave={async (changedItems) => {
                    if (changedItems) {

                        const { data, isCheckbox } = changedItems;

                        const matchedNews = newsData.find(item => item.id === data.id);
                        if (!matchedNews) return arrayHighlightNews; // Không tìm thấy thì không làm gì

                        const newHighlightItem = {
                            id: matchedNews.id,
                            img: matchedNews.main_img,
                            name: matchedNews.category.name,
                            title: matchedNews.title,
                            date: matchedNews.public_date,
                        }
                        const filtered = arrayHighlightNews.filter(item => item.id !== data.id);

                        let newArray;
                        if (isCheckbox) {
                            newArray = [newHighlightItem, ...filtered];
                        } else {
                            newArray = [...filtered, newHighlightItem];
                        }
                        setArrayHighlightNews(newArray.map((item, index) => ({
                            ...item,
                            sort: index + 1,
                        })))
                    }
                }}
            />
        </div>
        
    )
}

export default FlashSale