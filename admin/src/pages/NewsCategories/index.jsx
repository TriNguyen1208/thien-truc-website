import { useEffect, useState, useRef } from 'react';
import { useLayout } from '@/layouts/LayoutContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { SettingIcon, DeleteIcon, EditIcon } from '@/components/Icon';
import Notification from '@/components/Notification'
import Setting from '@/components/Setting';
import SearchBar from '@/components/Search';
import SimpleForm from '@/components/SimpleForm';
import useNews from '@/hooks/useNews';
import Loading from '@/components/Loading'
import Table from '@/components/Table';

export default function NewsCategories() {
    //===========================API=====================
    const { mutateAsync: createOne, isPending: isPendingCreateCategories } = useNews.news_categories.createOne();
    const { mutateAsync: updateOne, isPending: isPendingUpdateCategories } = useNews.news_categories.updateOne();
    const { mutateAsync: deleteOne, isPending: isPendingCategories } = useNews.news_categories.deleteOne();
    const { mutateAsync: updateCategory, isPending: isPendingUpdateCategory } = useNews.news.updateCategory();

    const navigate = useNavigate();
    // Setlayout cho trang
    const { setLayoutProps } = useLayout();
    useEffect(() => {
        setLayoutProps({
            title: 'Quản lý loại tin tức',
            description: 'Quản lý các danh mục tin tức',
            hasButton: true,
            buttonLabel: 'Thêm loại tin tức',
            buttonAction: () => {
                setIsAddModalOpen(true);
            },
        })
    }, []);
    //Lưu trạng thái của setting    
    const searchSettingRef = useRef({
        query: "",
        category: "Tất cả loại",
        display: "Tất cả trạng thái"
    });
    const [settingFormData, setSettingFormData] = useState({
        isOpen: false,
        onClose: () => {
            setSettingFormData(prev => ({ ...prev, isOpen: false }));
            searchSettingRef.current = {
                query: "",
                category: "Tất cả loại",
                display: "Tất cả trạng thái"
            }
        },
        content: {
            title: 'Quản lý danh sách thuộc loại',
            description: 'Chọn các tin tức muốn thêm vào loại',
            type: 'tin tức',
            category: '', 
            category_id: '',
            header: ['Mã tin tức', 'Tên tin tức', 'Loại tin tức', 'Trạng thái']
        },
        useData: useNews.news,
        useDataCategories: useNews.news_categories,
        searchSettingRef: searchSettingRef
    });

    // Thông tin của form thêm loại tin tức
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const addFormData = [
        {
            name: 'name',
            type: 'text',
            label: 'Tên loại tin tức',
            isRequired: true,
            width: 12,
            placeholder: 'VD: Tin công ty, Tin ngành...'
        },
        {
            name: 'rgb_color',
            type: 'color',
            label: 'Màu sắc đại diện',
            isRequired: true,
            width: 12,
            value: '#3B82F6',
        }
    ];
    const addFormConfig = {
        isModalOpenSimple: isAddModalOpen,
        setIsModalOpenSimple: setIsAddModalOpen,
        widthModal: 430,
        title: 'Thêm loại tin tức mới',
        description: 'Thêm loại tin tức và màu sắc đại diện',
        handleSubmitButton: (data) => {
            createOne(data);
            setIsAddModalOpen(false);
        },
    };

    // Thông tin của form chỉnh sửa loại tin tức
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editFormData, setEditFormData] = useState([
        {
            name: 'name',
            type: 'text',
            label: 'Tên loại tin tức',
            isRequired: true,
            width: 12,
            value: 'VD: Tin công ty, Tin ngành...',
        },
        {
            name: 'rgb_color',
            type: 'color',
            label: 'Màu sắc đại diện',
            isRequired: true,
            width: 12,
            value: '#3B82F6',
        }
    ]);
    //Lấy id của edit hiện tại
    const [currentEditId, setCurrentEditId] = useState(null); 

    const editFormConfig = {
        isModalOpenSimple: isEditModalOpen,
        setIsModalOpenSimple: setIsEditModalOpen,
        widthModal: 430,
        title: 'Chỉnh sửa loại tin tức',
        description: 'Chỉnh sửa thông tin loại tin tức và màu sắc đại diện',
        contentSubmitButton: "Cập nhật",
        handleSubmitButton: (data) => {
            updateOne({...data, id: currentEditId});
            setIsEditModalOpen(false);
        },
    };

    // Thong tin của popup xác nhận xóa loại tin tức
    const [openNotification, setOpenNotification] = useState(false);
    //Lấy id của delete
    const[currentDeleteID, setCurrentDeleteId] = useState(null);

    const notificationProps = {
        open: openNotification,
        setOpen: setOpenNotification,
        notification: 'Bạn có chắc chắn muốn xóa loại tin tức này?',
        subTitle: 'Hành động này sẽ không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?',
        buttonLabel1: 'Hủy',
        buttonAction1: ()=>{
            setOpenNotification(false);
        },
        buttonLabel2: 'Xóa',
        buttonAction2: () => {
            deleteOne(currentDeleteID);
            setOpenNotification(false);
        },
    };    

    

    // Loading data theo URL
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';
    const id = searchParams.get('id') || '';
    
    let newsCategories = null;
    let isLoadingNewsCategories = false;
        if (id === '') {
            if (query === '') {
                const result = useNews.news_categories.getAll();
                newsCategories = result.data;
                isLoadingNewsCategories = result.isLoading;
            } else {
                const result = useNews.news_categories.getSearchSuggestions(query);
                newsCategories = result.data;
                isLoadingNewsCategories = result.isLoading;
            }
        } else {
            const result = useNews.news_categories.getOne(id);
            newsCategories = result.data;
            isLoadingNewsCategories = result.isLoading;
        }
    const unnewsCategoriesList = Array.isArray(newsCategories) ? newsCategories : newsCategories?.results ?? (newsCategories ? [newsCategories] : []);
    const newsCategoriesList = unnewsCategoriesList.sort((a, b) => a.id.localeCompare(b.id));
    // Handler cho tìm kiếm và điều hướng
    const onSearch = (query) => {
        const newParams = new URLSearchParams();
        newParams.set('query', query);
        navigate(`/quan-ly-loai-tin-tuc?${newParams.toString()}`);
    };
    const handleEnter = (item) => {
        navigate(`/quan-ly-loai-tin-tuc?id=${item.id}`);
    };
    const handleSearchSuggestions = (query) => {
        return useNews.news_categories.getSearchSuggestions(query);
    }

    //========================Table=====================
    const widthTable = ["20%", "30%", "20%", "10%", "20%"];
    const columnsTable = ["Mã loại", "Tên loại tin tức", "Màu sắc", "Số lượng", "Thao tác"];
    const convertToDataTable = (newsCategoriesList) => {
        return newsCategoriesList.map((item) => {
            return [
                { 
                    type: "text", 
                    content: `${item.id}` 
                }, // STT
                {
                    type: "text",
                    content: `${query ==='' ? item.name : item.query}`
                },
                {
                    type: "component",
                    component: 
                        <>
                            <span className='inline-block w-4 py-2 mt-2 mr-2' style={{ backgroundColor: item.rgb_color }}></span>
                            <span>{item.rgb_color}</span>
                        </>
                },
                {
                    type: "text",
                    content: `${item.item_count}`
                },
                {
                    type: "array-components",
                    components: [
                        <button 
                            className='border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200 cursor-pointer' 
                            onClick={() => {
                                setSettingFormData(prev => ({
                                    ...prev,
                                    isOpen: true,
                                    content: {
                                        ...prev.content,
                                        category: item.name,
                                        category_id: item.id,
                                        title: `Quản lý tin tức thuộc loại: ${item.name}`,
                                        description: `Chọn hoặc bỏ chọn các tin tức thuộc loại ${item.name}`
                                    }
                                }));
                            }}
                        >
                            <SettingIcon />
                        </button>,
                        <button 
                            className='border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200 cursor-pointer' 
                            onClick={() => {
                                setEditFormData(prev => {
                                    const newData = [...prev];
                                    newData[0] = { ...newData[0], value: item.name };
                                    newData[1] = { ...newData[1], value: item.rgb_color };
                                    return newData;
                                });   
                                setCurrentEditId(item.id);
                                setIsEditModalOpen(true);
                            }}
                        >
                            <EditIcon />
                        </button>,
                        <button 
                            className='border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200 cursor-pointer' 
                            onClick={() => {
                                setCurrentDeleteId(item.id);
                                setOpenNotification(true)
                            }}
                        >
                            <DeleteIcon />
                        </button>
                    ]
                }
            ]
        })
    }
    const dataTable = convertToDataTable(newsCategoriesList)
    if (isLoadingNewsCategories || isPendingCategories || isPendingCreateCategories || isPendingUpdateCategories || isPendingUpdateCategory) 
        return <Loading/>;
    // Render
    return (
        <div>
            <div className='p-5 bg-white border-b border-gray-200 shadow-sm rounded-t-lg mb-6'>
                <SearchBar
                    data={{
                        hasButtonCategory: false,
                        hasButtonDisplay: false,
                        placeholder: "Tìm kiếm theo tên loại tin tức",
                        currentQuery: query,
                        onSearch: onSearch, 
                        handleEnter: handleEnter,
                        handleSearchSuggestion: handleSearchSuggestions,
                    }}
                />
            </div>
            <div className='bg-white p-6 border border-gray-200 shadow-sm rounded-lg'>
                <h1 className='text-2xl font-bold text-gray-800 text-left'>Danh sách loại tin tức</h1>
                <p className='text-gray-500 text-[14px]'>Tổng cộng {newsCategories.length} loại tin tức</p>
                <Table columns={columnsTable} data={dataTable} isSetting={false} width={widthTable} />
            </div>
            <SimpleForm
                data={addFormData}
                config={addFormConfig}
            />
            <SimpleForm
                data={editFormData}
                config={editFormConfig}
            />
            <Notification
                {...notificationProps}
            />
            {
                settingFormData.isOpen && <Setting {...settingFormData} 
                    onSave={(changedItems) => {
                        updateCategory({ changedItems: changedItems });            
                    }}
                />
            }
        </div>
    )
}
