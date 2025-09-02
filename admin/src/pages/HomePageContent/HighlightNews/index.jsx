import React from 'react'
import Button from '@/components/Button'
import Table from '@/components/Table'
import Loading from '@/components/Loading'
import useHome from '../../../hooks/useHome'
import useNews from '../../../hooks/useNews'
import { useNavigate } from 'react-router-dom'
import {useEffect, useState, useRef } from 'react';
import { AddIcon, EditIcon, SubtractIcon, ArrowDownIcon, ArrowUpIcon, SaveIcon, DeleteIcon,UploadIcon } from '@/components/Icon';
import ProductImageCell from '@/components/ProductImageCell'
import AddHighlight from '@/components/AddHighlight';

const HighlightNews = () => {
    //========================= API ====================
    const { data: homePageData, isLoading: isLoadingHomePageData, isFetching: isFetchingHomePageData } = useHome.getHomePage();
    const { data: highlightNewsData, isLoading: isLoadingHighlightNews, isFetching: isFetchingHighlightNews  } = useNews.news.getAllFeatured();
    const { data: newsData, isLoading: isLoadingNewsData } = useNews.news.getList();
    
    //Thao tác cập nhật tin tức nổi bật
    const { mutate: updateFeatureNews, isPending: isPendingUpdateFeatureNews } = useNews.news.updateFeaturedNews();
    
    const navigate = useNavigate();
    const [arrayHighlightNews, setArrayHighlightNews] = useState([]);
    const [isModalOpenAddHighlightNews, setIsModalOpenAddHighlightNews] = useState(false);
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


    const handleSubmitButtonAddHighlightNews = (valueForm) => {
        setIsModalOpenAddHighlightNews(false)
    }
    const handleCancelButtonAddHighlightNews = () => {
        setIsModalOpenAddHighlightNews(false)
    }
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
    const convertHighlightNewsListToTableData = (highlightNewsList) => {
        return (highlightNewsList || []).map((item, index) => {
            return [
                {
                    type: "component", 
                    component: 
                        <div className='flex flex-col gap-2'>
                            <button
                                className={`px-3 border border-gray-300 rounded-sm w-[50px] cursor-pointer`}
                                onClick={() => handleMoveUp(index)}
                                disabled={index === 0}
                            >
                                <ArrowUpIcon className={index === 0 ? "text-gray-300" : "text-gray-600"} />
                            </button>
                            <button
                                className={`px-3 border border-gray-300 rounded-sm w-[50px] cursor-pointer`}
                                onClick={() => handleMoveDown(index)}
                                disabled={index === highlightNewsList.length - 1}
                            >
                                <ArrowDownIcon className={index === highlightNewsList.length - 1 ? "text-gray-300" : "text-gray-600"} />
                            </button>
                        </div>
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
                    content: item.title
                },
                {
                    type: "text",
                    content: item.name
                },
                {
                    type: "text",
                    content: item.date
                },
                {
                    type: "array-components", 
                    components: 
                    [
                        <button 
                            className="px-3 py-2 border  border-gray-300 rounded-md cursor-pointer" 
                            onClick={() => navigate(`/quan-ly-tin-tuc/chinh-sua-tin-tuc/${item.id}`)}    
                        >      
                            <EditIcon />    
                        </button>,
                        <button 
                            className="px-2 py-1 border  border-gray-300 rounded-md cursor-pointer" 
                            onClick={() => handleDeleteFeatureNews(item)}>      
                            <SubtractIcon />    
                        </button>,
                    ]
                }
            ]
        });
    };
    const dataTable = convertHighlightNewsListToTableData(arrayHighlightNews);
    const configHighlightNews = {
        title: "Danh sách tin tức nổi bật",
        description: `${arrayHighlightNews.length} tin tức`,
        propsAddButton: {
            Icon: AddIcon,
            text: "Thêm tin tức",
            colorText: "#ffffff",
            colorBackground: "#000000",
            padding: 8,
        },
        propsSaveButton: {
            Icon: SaveIcon,
            text: "Lưu tin tức nổi bật",
            colorText: "#ffffff",
            colorBackground: "#000000",
            padding: 8,
        },
        table: {
            columns: ["Thứ tự", "Mã tin tức", "Ảnh", "Tiêu đề", "Loại tin tức", "Ngày xuất bản", "Thao tác"],
            width: ['10%', '13%', '8%', '25%', '14%', '17%', '20%'],
            data: dataTable
        },
        setIsModalOpenSetting: setIsModalOpenSetting,
        handleSubmit: handleSubmit,
        switchTime: switchTime,
        handleChangeSwitchTime: handleChangeSwitchTime
    }
    if(isLoadingHighlightNews || isLoadingHomePageData || isLoadingNewsData
         || isFetchingHighlightNews || isFetchingHomePageData || isPendingUpdateFeatureNews
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
                    <div className='flex items-center gap-2'>
                        <span className="text-gray-700">Thời gian chuyển gửi của tin tức:</span>
                        <input
                            type="text"
                            required={true}
                            value={configHighlightNews.switchTime}
                            onChange={configHighlightNews.handleChangeSwitchTime}
                            placeholder="2.00"
                            className='w-[70px] border border-gray-300 rounded-sm px-2'
                        />
                        <span className="text-gray-600">giây</span>
                    </div>
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

export default HighlightNews