import React, { useEffect } from 'react'
import EditBanner from "../../components/EditBanner"
import FeatureCard from '../../components/FeatureCard';
import Button from '@/components/Button'
import { AddIcon, EditIcon, SubtractIcon, ArrowDownIcon, ArrowUpIcon, SaveIcon, DeleteIcon } from '../../components/Icon';
import SimpleForm from '../../components/SimpleForm'
import { useState } from 'react';
import Notification from '@/components/Notification'
import Table from "../../components/Table"
import SearchBar from '../../components/Search'
import ProductImageCell from '../../components/ProductImageCell'
import useHome from '../../hooks/useHome';
import useNews from '../../hooks/useNews';
import AddHighlight from '../../components/AddHighlight';
import Loading from '@/components/Loading'
import { useNavigate } from 'react-router-dom';
import { useLayout } from "@/layouts/LayoutContext"
import { notification } from 'antd';
import UploadImage from '@/components/UploadImage'
import changeToFormData from '../../utils/changeToFormData';
const HomePageContent = () => {
    const { setLayoutProps } = useLayout()
    useEffect(() => {
      setLayoutProps({
        title: "Nội dung Trang chủ",
        description: "Quản lý nội dung hiển trị trên trang chủ",
        hasButton: false,
      })
    }, []);

  const navigate = useNavigate();
  const [isModalOpenAddHighlightFeature, setIsModalOpenAddHighlightFeature] = useState(false);
  const [isModalOpenEditHighlightFeature, setIsModalOpenEditHighlightFeature] = useState(false);
  const [isOpenCancelHighlightFeature, setIsOpenCancelHighlightFeature] = useState(false);
  const [idCurrentEditHighlightFeature, setIdCurrentEditHighlightFeature] = useState(null);
  const [highlightFeatureToDelete, setHighlightFeatureToDelete] = useState(null);
  const [arrayHighlightNews, setArrayHighlightNews] = useState([]);
  const [isModalOpenSetting, setIsModalOpenSetting] = useState(false);
  const [isModalOpenAddHighlightNews, setIsModalOpenAddHighlightNews] = useState(false);
  const [itemAddHighlightNews, setIsItemAddHighlightNews] = useState(null);
  const [dataEditHighlightFeature, setDataEditHighlightFeature] = useState([
    { name: 'figures', label: 'Số liệu', type: 'text', width: 12, isRequired: false, placeholder: "VD: 100+", maxLength: 10 },
    { name: 'achievementName', label: 'Tên thành tựu', type: 'text', width: 12, isRequired: false, placeholder: "VD: dự án hoàn thành", maxLength: 50 },
  ]);
  const [switchTime, setSwitchTime] = useState(0);

  const [contentSetting, setContentSetting] = useState({
    title: `Quản lý danh sách tin tức`,
    description: `Chọn các tin tức muốn thêm hoặc xóa  khỏi loại tin tức`,
    type: "tin tức",
    header: [
      "Mã tin tức",
      "Tên tin tức",
      "Loại tin tức",
    ]
  });


  const { data: homePageData, isLoading: isLoadingHomePageData, isFetching: isFetchingHomePageData } = useHome.getHomePage();
  const { mutate: updateBanner, isPending: isPendingUpdateBanner } = useHome.updateHomePage.updateBanner();
  const { mutate: updateAboutUs, isPending: isPendingUpdateAboutUs } = useHome.updateHomePage.updateAboutUs();
  const {mutate: updateImageAboutUs, isPending: isPendingUpdateImageAboutUs} = useHome.updateHomePage.updateImageAboutUs();

  const { data: highlightFeatureData, isLoading: isLoadingHighlightFeature } = useHome.highlight_stats_about_us.getAll();
  const { mutate: updateHighlightFeature, isPending: isPendingUpdateHighlightFeature } = useHome.highlight_stats_about_us.updateOne();
  const { mutate: createHighlightFeature, isPending: isPendingCreateHighlightFeature } = useHome.highlight_stats_about_us.createOne();
  const { mutate: deleteHighlightFeature, isPending: isPendingDeleteHighlightFeature } = useHome.highlight_stats_about_us.deleteOne();

  const { data: highlightNewsData, isLoading: isLoadingHighlightNews } = useNews.getFeatureNews();
  const { mutate: updateFeatureNews, isPending: isPendingUpdateFeatureNews } = useNews.updateFeatureNews();
  const { data: newsData, isLoading: isLoadingNewsData } = useNews.news.getList();

  const [aboutusNotification, setAboutusNotification] = useState(false)
  const [valuesAboutus, setValuesAboutus] = useState(null)
  const [homeNotification, setHomeNotification] = useState(false)
  const [valuesHome, setValuesHome] = useState(null)
  const [valuesImageAboutus, setValuesImageAboutus] = useState(null); //giong form
  const [initialValuesImageAboutus, setInitialValuesImageAboutus] = useState(null);
  const [imageNotification, setImageNotification] = useState(false);
  
  useEffect(() => {
    if(isLoadingHomePageData || isFetchingHomePageData){
      return;
    }
    const initialImage = {
      aboutus_img: homePageData?.aboutus_img ?? "",
    }
    setValuesImageAboutus(initialImage);
    setInitialValuesImageAboutus(initialImage);
  }, [isLoadingHomePageData, isFetchingHomePageData])

  useEffect(() => {
    setArrayHighlightNews(highlightNewsData?.featured_news ?? []);
    setSwitchTime(highlightNewsData?.switch_time ?? 0);
  }, [highlightNewsData])
  if (isLoadingHighlightFeature || isPendingUpdateHighlightFeature || isPendingUpdateImageAboutUs ||
    isPendingCreateHighlightFeature || isPendingDeleteHighlightFeature ||
    isLoadingHighlightNews || isLoadingHomePageData || isPendingUpdateBanner ||
    isPendingUpdateAboutUs || isLoadingNewsData || isPendingUpdateFeatureNews || isFetchingHomePageData ) {
    return (
     <Loading/>
    )
  }







  // ============= BANNER TRANG CHU ===================== 

  const handleCancleHome= ()=>{
    setHomeNotification(false)
  }
  const handleConfirmHome= ()=>{
    updateBanner(valuesHome)
    setHomeNotification(false)
  }
  const configHomePage = {
    title: "Banner Trang chủ",
    description: "Chỉnh sửa tiêu đề và mô tả banner",
    listInput: [
      { name: "Tiêu đề Banner", label: 'Tiêu đề Banner', placeholder: 'Nhập tiêu đề...', contentCurrent: homePageData.banner_title, isRequire: true, rows: 1, maxLength: 100 },
      { name: "Mô tả Banner", label: 'Mô tả Banner', placeholder: 'Nhập mô tả...', contentCurrent: homePageData.banner_description, isRequire: true, rows: 3, maxLength: 300 },
    ],
    notificationProps:{
     open: homeNotification, 
     setOpen: setHomeNotification, 
     notification: "Xác nhận lưu thay đổi!", 
     subTitle:"Bạn có chắc chắn muốn lưu thay đổi.", 
     buttonLabel1:"Hủy", 
     buttonAction1: handleCancleHome, 
     buttonLabel2: "Xác nhận", 
     buttonAction2: handleConfirmHome
    },
    handleSave: (values) => {
      setValuesHome(values)
      setHomeNotification(true)
      // Gửi dữ liệu lên server hoặc cập nhật state
    }
  }


  // ============= BANNER ABOUT US  ===================== 
   const handleCancleAboutus= ()=>{
    setAboutusNotification(false)
  }
  const handleConfirmAboutus= ()=>{
    updateAboutUs(valuesAboutus)
    setAboutusNotification(false)
  }
  const handleButtonImage = () => {
    const formData = changeToFormData(valuesImageAboutus);
    for(const [key, value] of formData.entries()){
      console.log(key, value);
      if(value == ''){
        alert("Chưa nhập dữ liệu bắt buộc");
        return;
      }
    }
    updateImageAboutUs(formData);
    setImageNotification(false);
  }
  const configAboutUs = {
    title: "Giới thiệu về công ty Thiên Trúc",
    description: "Đoạn văn và ảnh đại diện công ty",
    listInput: [
      { name: "Nội dung giới thiệu", label: 'Nội dung giới thiệu', placeholder: 'Nhập tiêu đề...', contentCurrent: homePageData.aboutus_content, isRequire: true, rows: 1 },
    ],
    notificationProps:{
     open: aboutusNotification, 
     setOpen: setAboutusNotification, 
     notification: "Xác nhận lưu thay đổi!", 
     subTitle:"Bạn có chắc chắn muốn lưu thay đổi.", 
     buttonLabel1:"Hủy", 
     buttonAction1: handleCancleAboutus, 
     buttonLabel2: "Xác nhận", 
     buttonAction2: handleConfirmAboutus
    },
    handleSave: (values) => {
      setValuesAboutus(values)
      setAboutusNotification(true)
      // Gửi dữ liệu lên server hoặc cập nhật state
    }
  }
  const saveImage = {
    open: imageNotification,
    setOpen: setImageNotification,
    notification: 'Xác nhận lưu thay đổi!',
    subTitle: 'Bạn có chắc chắn muốn lưu thay đổi.',
    buttonLabel1: 'Hủy',
    buttonAction1: ()=>{setImageNotification(false)},
    buttonLabel2: 'Lưu',
    buttonAction2: handleButtonImage
  }
  
  // ===================== HIGHLIGHT FEATURE =================== 
  const limitHighlightFeature = 3


  const handleSubmitButtonAddHighlightFeature = (valueForm) => {
    createHighlightFeature(valueForm);
    setIsModalOpenAddHighlightFeature(false)
  }
  const handleCancelButtonAddHighlightFeature = () => {
    setIsModalOpenAddHighlightFeature(false)
  }
  const handleSubmitButtonEditHighlightFeature = (valueForm) => {
    updateHighlightFeature({
      id: idCurrentEditHighlightFeature,
      data: valueForm,
    })
    setIsModalOpenEditHighlightFeature(false)
  }
  const handleCancelButtonEditHighlightFeature = () => {
    setIsModalOpenEditHighlightFeature(false)
  }
  const configHighlightFeature = {
    title: "Thông số nổi bật của công ty",
    description: "Tối đa 3 thành tựu nổi bật",
    propsAddButton: {
      Icon: AddIcon,
      text: "Thêm thông số",
      colorText: "#ffffff",
      colorBackground: "#000000",
      padding: 8,
    },
    propsSaveButton: {
      Icon: SaveIcon,
      text: "Lưu thông số ",
      colorText: "#ffffff",
      colorBackground: "#000000",
      padding: 8,
    },
    arrayFeatureCard: highlightFeatureData,
    configAddHighlightFeature: {
      title: "Thêm thông số mới",
      description: "Điền thông tin thành tựu nổi bật của công ty",
      contentCancelButton: "Hủy",
      contentSubmitButton: "Thêm mới",
      widthModal: 550,
      isModalOpenSimple: isModalOpenAddHighlightFeature,
      handleSubmitButton: handleSubmitButtonAddHighlightFeature,
      handleCancelButton: handleCancelButtonAddHighlightFeature,
      setIsModalOpenSimple: setIsModalOpenAddHighlightFeature,
    },
    dataAddHighlightFeature: [
      { name: 'figures', label: 'Số liệu', type: 'text', width: 12, isRequired: false, placeholder: "VD: 100+", maxLength: 10 },
      { name: 'achievementName', label: 'Tên thành tựu', type: 'text', width: 12, isRequired: false, placeholder: "VD: dự án hoàn thành", maxLength: 50 },
    ],
    configEditHighlightFeature: {
      title: "Chỉnh sửa thông số",
      description: "Điền thông tin thành tựu nổi bật của công ty",
      contentCancelButton: "Hủy",
      contentSubmitButton: "Cập nhật",
      widthModal: 550,
      isModalOpenSimple: isModalOpenEditHighlightFeature,
      handleSubmitButton: handleSubmitButtonEditHighlightFeature,
      handleCancelButton: handleCancelButtonEditHighlightFeature,
      setIsModalOpenSimple: setIsModalOpenEditHighlightFeature,
    },
    cancelPopub: {
      open: isOpenCancelHighlightFeature,
      setOpen: setIsOpenCancelHighlightFeature,
      notification: "Xác nhận xóa",
      subTitle: "Bạn có chắc chắn muốn xóa thông số nổi bật này ? ",
      buttonAction1:()=>{
        setIsOpenCancelHighlightFeature(false);
      },
      buttonAction2: () => {
        if (highlightFeatureToDelete) {
          deleteHighlightFeature(highlightFeatureToDelete.id);
          setIsOpenCancelHighlightFeature(false);
        }
      },
    }
  }
  const handleEditButton = (item) => {

    const updatedForm = [
      { ...dataEditHighlightFeature[0], value: item.number_text },
      { ...dataEditHighlightFeature[1], value: item.label }
    ];
    setDataEditHighlightFeature(updatedForm);
    setIsModalOpenEditHighlightFeature(true);
    setIdCurrentEditHighlightFeature(item.id);
  }
  const handleDeleteButton = (item) => {
    setIsOpenCancelHighlightFeature(true);
    setHighlightFeatureToDelete(item);
  }

  // ===================== HIGHLIGHT NEWS =================== 

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
    configAddHighlightNews: {
      title: "Thêm tin tức nổi bật",
      description: "Điền thông tin thành tựu nổi bật của công ty",
      contentCancelButton: "Hủy",
      contentSubmitButton: "Thêm mới",
      widthModal: 700,
      isModalOpenSimple: isModalOpenAddHighlightNews,
      handleSubmitButton: handleSubmitButtonAddHighlightNews,
      handleCancelButton: handleCancelButtonAddHighlightNews,
      setIsModalOpenSimple: setIsModalOpenAddHighlightNews,
    },
    dataAddHighlightNews: [
      {
        name: 'search',
        label: 'Tìm kiếm sản phẩm',
        width: 12,
        customInput: ({ value }) => (
          <div onClick={(e) => e.stopPropagation()}>

            <SearchBar
              data={{
                hasButtonCategory: true,
                categories: ["Tất cả danh mục", "Điện thoại", "Sản phẩm"],
                currentCategory: "Tất cả danh mục",
                placeholder: "Tìm kiếm...",
                currentQuery: value,
                handleEnter: (id) => {
                },
                onSearch: (query, category, display) => {
                },
                handleSearchSuggestion: (query) => {
                  return useNews.getSearchSuggestions(query);
                }
              }}
            />
          </div>
        )
      },
      { name: 'putOnTop', label: 'Đặt lên đầu', type: 'checkbox', width: 12 }
    ],
    data: arrayHighlightNews,
    table: {
      columns: ["Thứ tự", "Mã tin tức", "Ảnh", "Tiêu đề", "Loại tin tức", "Ngày xuất bản", "Thao tác"],
      width: ['10%', '13%', '8%', '25%', '14%', '17%', '20%']

    }
  }
  const handleDeleteFeatureNews = (item) => {
    const newArr = arrayHighlightNews.filter(data => data.id != item.id);
    setArrayHighlightNews(newArr);
  }
  const convertHighlightNewsListToTableData = (highlightNewsList) => {
    return highlightNewsList.map((item, index) => {
      return [
        {
          type: "component", component: <div className='flex flex-col gap-2'>
            <button
              // className={`px-3 border border-gray-300 rounded-sm w-[50px] ${index === 0 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-gray-100'}`}
              className={`px-3 border border-gray-300 rounded-sm w-[50px]`}
              onClick={() => handleMoveUp(index)}
              disabled={index === 0}
            >
              <ArrowUpIcon className={index === 0 ? "text-gray-300" : "text-gray-600"} />
            </button>
            <button
              className={`px-3 border border-gray-300 rounded-sm w-[50px]`}
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
          type: "array-components", components: [
            <button className="px-3 py-2 border  border-gray-300 rounded-md cursor-pointer" onClick={() => navigate(`/quan-ly-tin-tuc/chinh-sua-tin-tuc/${item.id}`)}    >      <EditIcon />    </button>,
            <button className="px-2 py-1 border  border-gray-300 rounded-md cursor-pointer" onClick={() => handleDeleteFeatureNews(item)}>      <SubtractIcon />    </button>,
          ]
        }
      ]
    });
  };
  const dataTable = convertHighlightNewsListToTableData(configHighlightNews.data);
  const propsButton ={
      Icon: SaveIcon,
      text: "Lưu thay đổi",
      colorText: "#ffffff",
      colorBackground: "#000000",
      padding : 10,
  }
  return (
    <>
      <EditBanner
        title={configHomePage.title}
        description={configHomePage.description}
        listInput={configHomePage.listInput}
        saveButton={configHomePage.handleSave}
      />
      <div className='mt-[40px]'></div>
      <EditBanner
        title={configAboutUs.title}
        description={configAboutUs.description}
        listInput={configAboutUs.listInput}
        saveButton={configAboutUs.handleSave}
      />
      <form onSubmit={(e) => {e.preventDefault(), setImageNotification(true)}} className='flex flex-col p-[24px] bg-white w-full h-full border-b border-l border-r border-b-[#E5E7EB] border-r-[#E5E7EB] border-l-[#E5E7EB] rounded-[8px]'>
        <div className="flex flex-col mb-[16px]">
          <label className="mb-[8px] font-medium">Ảnh giới thiệu công ty Thiên Trúc <span className='text-red-500 ml-1'>*</span></label>
          <div className=''>
            <UploadImage form={valuesImageAboutus} setForm={setValuesImageAboutus} initialForm={initialValuesImageAboutus} keyImage="aboutus_img"/>
          </div>
        </div>
        <div className='h-40[px]'>
            <button type='submit'> <Button {...propsButton}/></button>
        </div>                
      </form>
      <div className="flex flex-col p-[24px] bg-white w-full h-full border border-[#E5E7EB] rounded-[8px] mt-[40px]">
        <div className='flex items-center justify-between'>
          <div>
            <div className="mb-[4px]">
              <h1 className="text-[24px] text-black font-semibold">
                {configHighlightFeature.title}
              </h1>
            </div>
            <div className="mb-[24px]">
              <p className="text-[14px] text-[#71717A] font-regular">
                {configHighlightFeature.description}
              </p>
            </div>
          </div>
          <div className=' h-40[px]'>
            <button type="submit"
              className=''
              onClick={() => {
                setIsModalOpenAddHighlightFeature(true)

              }}
              disabled={configHighlightFeature.arrayFeatureCard.length >= limitHighlightFeature}>
              <Button
                {...configHighlightFeature.propsAddButton}
                disable={configHighlightFeature.arrayFeatureCard.length >= limitHighlightFeature}
              />

            </button>
          </div>
        </div>
        <div className='grid grid-cols-12 gap-6 mb-[25px]'>
          {(configHighlightFeature.arrayFeatureCard || []).map((item, index) =>
            <div className='col-span-4' key={index}>
              <FeatureCard
                title={item.number_text}
                description={item.label}
                buttonEdit={
                  <button onClick={() => handleEditButton(item)}>
                    <EditIcon />
                  </button>
                }
                buttonDelete={
                  <button onClick={() => handleDeleteButton(item)}>
                    <DeleteIcon />
                  </button>
                }
              />
            </div>)}

        </div>

      </div>
      <div className="flex flex-col p-[24px] bg-white w-full h-full border border-[#E5E7EB] rounded-[8px] mt-[40px]">
        <div className='flex items-center justify-between mb-[30px]'>
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
            <button type="submit" className='' onClick={() => setIsModalOpenSetting(true)}> <Button {...configHighlightNews.propsAddButton} /></button>
          </div>

        </div>
        <div className='mb-[30px]'>
          <Table columns={configHighlightNews.table.columns} data={dataTable} isSetting={false} width = {configHighlightNews.table.width} />
        </div>
        <form onSubmit={(e) => {
          e.preventDefault();
          const object = {
            switch_time: switchTime,
            news_ids: arrayHighlightNews.map(item => item.id),
          };

          updateFeatureNews(object);
        }}>

          <div className='flex items-center gap-2'>
            <span className="text-gray-700">Thời gian chuyển gửi của tin tức:</span>

            <input
              type="text"
              required={true}
              value={switchTime}
              onChange={handleChangeSwitchTime}
              placeholder="2.00"
              className='w-[70px] border border-gray-300 rounded-sm px-2'
            />
            <span className="text-gray-600">giây</span>
          </div>
          <button
            type='submit'
            className="flex items-center gap-4 w-[200px] px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors mt-[30px]"

          >
            <span>
              <SaveIcon />
            </span>
            <span>
              Lưu tin tức nổi bật

            </span>

          </button>
        </form>
      </div>
      <SimpleForm data={configHighlightFeature.dataAddHighlightFeature} config={configHighlightFeature.configAddHighlightFeature} />
      <SimpleForm data={dataEditHighlightFeature} config={configHighlightFeature.configEditHighlightFeature} />
      <SimpleForm data={configHighlightNews.dataAddHighlightNews} config={configHighlightNews.configAddHighlightNews} />
      <Notification
        open={configHighlightFeature.cancelPopub.open}
        setOpen={configHighlightFeature.cancelPopub.setOpen}
        notification={configHighlightFeature.cancelPopub.notification}
        buttonAction1 = {configHighlightFeature.cancelPopub.buttonAction1}
        subTitle={configHighlightFeature.cancelPopub.subTitle}
        buttonAction2={configHighlightFeature.cancelPopub.buttonAction2}
      />
      <Notification  {...configHomePage.notificationProps}/>
      <Notification  {...configAboutUs.notificationProps}/>
      <Notification  {...saveImage}/>
      <AddHighlight
        isOpen={isModalOpenSetting}
        onClose={() => setIsModalOpenSetting(false)}
        content={contentSetting}
        useData={useNews.news}
        useDataSuggestion={useNews}
        useDataCategories={useNews.news_categories}
        onSave={async (changedItems) => {
          setIsItemAddHighlightNews(changedItems);
          // var newItemObject  = null;
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
    </>
  );
}

export default HomePageContent