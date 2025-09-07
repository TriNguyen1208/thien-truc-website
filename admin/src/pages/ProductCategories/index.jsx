import { useEffect, useState, useRef } from 'react';
import { useLayout } from '@/layouts/LayoutContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { SettingIcon, DeleteIcon, EditIcon } from '@/components/Icon';
import Notification from '@/components/Notification'
import Setting from '@/components/Setting';
import SearchBar from '@/components/Search';
import SimpleForm from '@/components/SimpleForm';
import useProducts from '@/hooks/useProducts';
import Loading from '@/components/Loading'
import Table from '@/components/Table';

export default function ProductCategories() {
    //===========================API=====================
    const { mutateAsync: createOne, isPending: isPendingCreateCategories } = useProducts.product_categories.createOne();
    const { mutateAsync: updateOne, isPending: isPendingUpdateCategories } = useProducts.product_categories.updateOne();
    const { mutateAsync: deleteOne, isPending: isPendingCategories } = useProducts.product_categories.deleteOne();
    const { mutateAsync: updateCategory, isPending: isPendingUpdateCategory } = useProducts.products.updateCategory();

    const navigate = useNavigate();
    // Setlayout cho trang
    const { setLayoutProps } = useLayout();
    useEffect(() => {
        setLayoutProps({
            title: 'Quản lý loại sản phẩm',
            description: 'Quản lý danh sách loại sản phẩm',
            hasButton: true,
            buttonLabel: 'Thêm loại sản phẩm',
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
            title: 'Quản lý sản phẩm thuộc loại',
            description: 'Chọn các sản phẩm muốn thêm vào loại',
            type: 'sản phẩm',
            category: '', 
            category_id: '',
            header: ['Mã sản phẩm', 'Tên sản phẩm', 'Danh mục', 'Trạng thái']
        },
        useData: useProducts.products,
        useDataCategories: useProducts.product_categories,
        searchSettingRef: searchSettingRef
    });

    // Thông tin của form thêm loại sản phẩm
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const addFormData = [
        {
            name: 'name',
            type: 'text',
            label: 'Tên loại sản phẩm',
            isRequired: true,
            width: 12,
            placeholder: 'VD: Cable, Mainboard,...'
        },
    ];
    const addFormConfig = {
        isModalOpenSimple: isAddModalOpen,
        setIsModalOpenSimple: setIsAddModalOpen,
        widthModal: 430,
        title: 'Thêm loại sản phẩm mới',
        description: 'Thêm loại sản phẩm',
        handleSubmitButton: (data) => {
            createOne(data);
            setIsAddModalOpen(false);
        },
    };

    // Thông tin của form chỉnh sửa loại sản phẩm
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editFormData, setEditFormData] = useState([
        {
            name: 'name',
            type: 'text',
            label: 'Tên loại sản phẩm',
            isRequired: true,
            width: 12,
            value: 'VD: Cable, Mainboard,...',
        }
    ]);
    //Lấy id của edit hiện tại
    const [currentEditId, setCurrentEditId] = useState(null); 

    const editFormConfig = {
        isModalOpenSimple: isEditModalOpen,
        setIsModalOpenSimple: setIsEditModalOpen,
        widthModal: 430,
        title: 'Chỉnh sửa loại sản phẩm',
        description: 'Chỉnh sửa thông tin loại sản phẩm',
        contentSubmitButton: "Cập nhật",
        handleSubmitButton: (data) => {
            updateOne({id: currentEditId, data});
            setIsEditModalOpen(false);
        },
    };

    // Thong tin của popup xác nhận xóa loại sản phẩm
    const [openNotification, setOpenNotification] = useState(false);
    //Lấy id của delete
    const[currentDeleteID, setCurrentDeleteId] = useState(null);

    const notificationProps = {
        open: openNotification,
        setOpen: setOpenNotification,
        notification: 'Bạn có chắc chắn muốn xóa loại sản phẩm này?',
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
    
    let productsCategories = null;
    let isLoadingProductsCategories = false;
        if (id === '') {
            if (query === '') {
                const result = useProducts.product_categories.getAll();
                productsCategories = result.data;
                isLoadingProductsCategories = result.isLoading;
            } else {
                const result = useProducts.product_categories.getSearchSuggestions(query);
                productsCategories = result.data;
                isLoadingProductsCategories = result.isLoading;
            }
        } else {
            const result = useProducts.product_categories.getOne(id);
            productsCategories = result.data;
            isLoadingProductsCategories = result.isLoading;
        }
    const unproductsCategoriesList = Array.isArray(productsCategories) ? productsCategories : productsCategories?.results ?? (productsCategories ? [productsCategories] : []);
    const productsCategoriesList = unproductsCategoriesList.sort((a, b) => a.id.localeCompare(b.id));
    // Handler cho tìm kiếm và điều hướng
    const onSearch = (query) => {
        const newParams = new URLSearchParams();
        newParams.set('query', query);
        navigate(`/quan-ly-loai-san-pham?${newParams.toString()}`);
    };
    const handleEnter = (item) => {
        navigate(`/quan-ly-loai-san-pham?id=${item.id}`);
    };
    const handleSearchSuggestions = (query) => {
        return useProducts.product_categories.getSearchSuggestions(query);
    }

    //========================Table=====================
    const widthTable = ["20%", "40%", "20%", "20%"];
    const columnsTable = ["Mã loại sản phẩm", "Tên loại sản phẩm", "Số lượng", "Thao tác"];
    const convertToDataTable = (productsCategoriesList) => {
        return productsCategoriesList.map((item) => {
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
                                        category: item.name ?? item.query,
                                        category_id: item.id,
                                        title: `Quản lý sản phẩm thuộc loại: ${item.name ?? item.query}`,
                                        description: `Chọn hoặc bỏ chọn các sản phẩm thuộc loại ${item.name ?? item.query}`
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
    const dataTable = convertToDataTable(productsCategoriesList)
    if (isLoadingProductsCategories || isPendingCategories || isPendingCreateCategories || isPendingUpdateCategories || isPendingUpdateCategory) 
        return <Loading/>;
    // Render
    return (
        <div>
            <div className='p-5 bg-white border-b border-gray-200 shadow-sm rounded-t-lg mb-6'>
                <SearchBar
                    data={{
                        hasButtonCategory: false,
                        hasButtonDisplay: false,
                        placeholder: "Tìm kiếm theo tên loại sản phẩm",
                        currentQuery: query,
                        onSearch: onSearch, 
                        handleEnter: handleEnter,
                        handleSearchSuggestion: handleSearchSuggestions,
                    }}
                />
            </div>
            <div className='bg-white p-6 border border-gray-200 shadow-sm rounded-lg'>
                <h1 className='text-2xl font-bold text-gray-800 text-left'>Danh sách loại sản phẩm</h1>
                <p className='text-gray-500 text-[14px]'>Tổng cộng {productsCategories.length} loại sản phẩm</p>
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
