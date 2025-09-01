import React from 'react'
import Table from '../../../components/Table'
import Button from '@/components/Button'
import Loading from '@/components/Loading'
import useHome from '../../../hooks/useHome'
import {useEffect, useState, useRef } from 'react';
import { AddIcon, EditIcon, SubtractIcon, ArrowDownIcon, ArrowUpIcon, SaveIcon, DeleteIcon,UploadIcon } from '@/components/Icon';
import Notification from '@/components/Notification'
import ProductImageCell from '@/components/ProductImageCell'

const BannerImages = () => {
    const { mutate: updateBannerImages, isPending: isPendingUpdateBannerImages } = useHome.updateHomePage.bannerImages();
    const { data: homePageData, isLoading: isLoadingHomePageData, isFetching: isFetchingHomePageData } = useHome.getHomePage();
    
    const [switchTimePictures, setSwitchTimePictures] = useState(0);
    const [uploadImage, setUploadImage] = useState([])
    const [arrayHighlightPictures, setArrayHighlightPictures] = useState([]);
    const [nextImageId, setNextImageId] = useState(0);
    
    const fileInputRefs = useRef([]);
    useEffect(() => {
        if(homePageData?.banner_images){
            setArrayHighlightPictures(homePageData.banner_images.map((url,index)=>{
                return({
                    id: index,
                    url: url
                })
            }))
            setNextImageId(homePageData.banner_images.length)
        }
        setSwitchTimePictures(homePageData?.banner_switch_time ?? 0)
    }, [homePageData])
    // Thêm function để xử lý việc di chuyển phần tử trong mảng
    const moveArrayElementPictures = (array, fromIndex, toIndex) => {
        const newArray = [...array];
        const element = newArray.splice(fromIndex, 1)[0];
        newArray.splice(toIndex, 0, element);
        return newArray;
    };

    // Xử lý khi click nút ArrowUp
    const handleMoveUpPictures = (currentIndex) => {
        if (currentIndex > 0) {
            const newArray = moveArrayElementPictures(arrayHighlightPictures, currentIndex, currentIndex - 1);
            setArrayHighlightPictures(newArray);
        }
    };

    // Xử lý khi click nút ArrowDown
    const handleMoveDownPictures = (currentIndex) => {
        if (currentIndex < arrayHighlightPictures.length - 1) {
            const newArray = moveArrayElementPictures(arrayHighlightPictures, currentIndex, currentIndex + 1);
            setArrayHighlightPictures(newArray);
        }
    };
    const handleChangeSwitchTimePictures = (e) => {
        const value = e.target.value;
        if (value === '') {
            setSwitchTimePictures('');
            return;
        }
        const numberRegex = /^\d+(\.\d{0,2})?$/;
        // Kiểm tra nếu giá trị hợp lệ
        if (numberRegex.test(value)) {
            setSwitchTimePictures(value);
        }
    };

    const handleAddPicture = () => {
        setArrayHighlightPictures(pre=> [...pre,{id: nextImageId, url: ""}])
        setNextImageId(prev => prev  + 1)
    }
    const handleDeleteFeaturePictures = (id) => {
        const newArr = arrayHighlightPictures.filter(data => data.id != id);
        setArrayHighlightPictures(newArr);
        setUploadImage(prev => (prev.filter(data=>data.id != id)))
    }
    const handleUrlChange = (id, value) => {
        setArrayHighlightPictures(prev => prev.map(image => image.id === id ? { ...image, url: value } : image));
        setUploadImage(prev => (prev.filter(data=>data.id != id)))
    };
    const handleImageUpload = (id, file) => {
        if (file) {
            if(uploadImage.some(item => item.id === id)){
                setUploadImage(prev => prev.map(image => image.id === id ? { id: id, name:file.name, file: file } :image));
            }else{
                setUploadImage(prev=>[...prev, {id: id, name:file.name, file: file}]);
            }
        }
    };
    const convertHighlightPicturesListToTableData = (highlightPicturesList) => {
        return (highlightPicturesList || []).map((item, index) => {
            return [
                {
                    type: "component", 
                    component: 
                        <div className='flex flex-col gap-2'>
                            <button
                                className={`px-3 border border-gray-300 rounded-sm w-[50px]`}
                                onClick={() => handleMoveUpPictures(index)}
                                disabled={index === 0}
                            >
                                <ArrowUpIcon className={index === 0 ? "text-gray-300" : "text-gray-600"} />
                            </button>
                            <button
                                className={`px-3 border border-gray-300 rounded-sm w-[50px]`}
                                onClick={() => handleMoveDownPictures(index)}
                                disabled={index === highlightPicturesList.length - 1}
                            >
                                <ArrowDownIcon className={index === highlightPicturesList.length - 1 ? "text-gray-300" : "text-gray-600"} />
                            </button>
                        </div>
                },
                {
                    type: "component",
                    component: 
                        <ProductImageCell imageUrl={item.url} productName={item}/>
                },
                {
                    type: "array-components", 
                    components: 
                        [  
                            <input
                                type="url"
                                value={item.url}
                                onChange={(e)=>handleUrlChange(item.id, e.target.value)}
                                placeholder="Nhập link ảnh"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md w-full"
                            />,
                            <div className=' '>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={el => fileInputRefs.current[item.id] = el}
                                    className="hidden"
                                    onChange={(e) => handleImageUpload(item.id, e.target.files[0])}
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRefs.current[item.id]?.click()}
                                    disabled={item.url === "" && !uploadImage.some(it => it.id === item.id) ? false: true}
                                    className="flex h-full px-4 py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 disabled:bg-gray-300 cursor-pointer"

                                >
                                    <div>
                                        <UploadIcon />
                                    </div>
                                    <div className="ml-[15px]">
                                        Upload ảnh
                                    </div>
                                </button>
                            </div>,
                            <div className={`text-xs text-gray-700 break-all relative  ${uploadImage.some(it => it.id == item.id)? "border border-gray-200 rounded-md flex justify-between items-center p-1":""}`}>
                                {uploadImage.some(it => it.id == item.id) ? 
                                    <div >
                                        URL: {uploadImage.find(it => it.id === item.id).name}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setUploadImage(prev => (prev.filter(data=>data.id != item.id)))
                                            }}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                        >
                                            ×
                                        </button>
                                    </div> : <></>
                                }
                                </div>              
                        ]
                },
                {
                    type: "component", 
                    component: 
                        <button 
                            className="px-2 py-1 border  border-gray-300 rounded-md cursor-pointer" 
                            onClick={() => handleDeleteFeaturePictures(item.id)}
                        >      
                            <SubtractIcon />    
                        </button>,
                }
            ]
        });
    };
    const dataTablePictures = convertHighlightPicturesListToTableData(arrayHighlightPictures);
    function handleSubmitBannerImage (e) {
        e.preventDefault();
        const hasEmptyUrl = arrayHighlightPictures.some(item => !item.url && !uploadImage.some(it => it.id === item.id));
        if (hasEmptyUrl) {
            alert("Bạn phải nhập URL hoặc upload ảnh cho tất cả các ảnh!");
            return;
        }
        const data = {
            image_urls: arrayHighlightPictures.map((item)=>(item.url === "" ? null : item.url )),
            switch_time:switchTimePictures
        }
        const files = uploadImage.map((item)=>(item.file))
        const formData = new FormData();
        //Check phải nhập ít nhất 1 ảnh
        if(files.length == 0 && data.image_urls.length == 0){
            alert("Bạn phải nhập ít nhất 1 ảnh!");
            return;
        }
        // Gửi switch_time (bắt buộc phải là string khi qua multipart)
        formData.append("switch_time", data.switch_time);

        // Gửi mảng image_urls
        data.image_urls.forEach((url, idx) => {
            formData.append("image_urls", url); 
        });

        // Gửi file upload
        files.forEach((file) => {
            formData.append("banner_images", file); // key phải trùng với backend multer
        });
        updateBannerImages(formData)
        setUploadImage([])
    }
    const configHighlightPictures = {
        title: "Danh sách ảnh Banner Trang chủ",
        description: `${arrayHighlightPictures.length} ảnh`,
        propsAddButton: {
            Icon: AddIcon,
            text: "Thêm ảnh",
            colorText: "#ffffff",
            colorBackground: "#000000",
            padding: 8,
        },
        table: {
            columns: ["Thứ tự", "Ảnh",  "Chọn ảnh", "Thao tác"],
            width: ['10%', '13%',  '67%', '10%'],
            data: dataTablePictures
        },
        handleAddPicture: handleAddPicture,
        handleSubmitBannerImage: handleSubmitBannerImage,
        switchTimePictures: switchTimePictures,
        handleChangeSwitchTimePictures: handleChangeSwitchTimePictures
    }
    if(isPendingUpdateBannerImages || isLoadingHomePageData || isFetchingHomePageData){
        return <Loading/>
    }
    return (
        <div>
            <div className="flex flex-col p-[24px] bg-white w-full h-full border border-[#E5E7EB] rounded-[8px] my-[40px]">
                <div className='flex items-center justify-between mb-[30px]'>
                    <div>
                        <div className="mb-[4px]">
                            <h1 className="text-[24px] text-black font-semibold">
                                {configHighlightPictures.title}
                            </h1>
                        </div>
                        <div className="mb-[24px]">
                            <p className="text-[14px] text-[#71717A] font-regular">
                                {configHighlightPictures.description}
                            </p>
                        </div>
                    </div>
                    <div className='h-[40px]'>
                        <button 
                            type="submit" 
                            onClick={configHighlightPictures.handleAddPicture}
                        > 
                            <Button {...configHighlightPictures.propsAddButton} />
                        </button>
                    </div>
                </div>
                <div className='mb-[30px]'>
                    <Table 
                        columns={configHighlightPictures.table.columns}
                        data={configHighlightPictures.table.data} 
                        isSetting={false}
                        width={configHighlightPictures.table.width} 
                    />
                </div>
                <form onSubmit={configHighlightPictures.handleSubmitBannerImage}>
                    <div className='flex items-center gap-2'>
                        <span className="text-gray-700">Thời gian chuyển của ảnh:</span>
                        <input
                            type="text"
                            required={true}
                            value={configHighlightPictures.switchTimePictures}
                            onChange={configHighlightPictures.handleChangeSwitchTimePictures}
                            placeholder="2.00"
                            className='w-[70px] border border-gray-300 rounded-sm px-2'
                        />
                        <span className="text-gray-600">giây</span>
                    </div>
                    <button
                        type='submit'
                        className="flex items-center gap-4 w-[200px] px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors mt-[30px]"
                    >
                        <span><SaveIcon /></span>
                        <span>Lưu ảnh nổi bật</span>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default BannerImages