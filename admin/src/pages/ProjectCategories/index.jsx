import { useEffect, useState, useRef } from 'react';
import { useLayout } from '@/layouts/LayoutContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { SettingIcon, DeleteIcon, EditIcon } from '@/components/Icon';
import Notification from '@/components/Notification'
import Setting from '@/components/Setting';
import SearchBar from '@/components/Search';
import SimpleForm from '@/components/SimpleForm';
import useProjects from '../../hooks/useProjects';
import Loading from '@/components/Loading'
import Table from '@/components/Table';

export default function ProjectCategories() {
    //===========================API=====================
    const { mutateAsync: createOne, isPending: isPendingCreateCategories } = useProjects.project_regions.createOne();
    const { mutateAsync: updateOne, isPending: isPendingUpdateCategories } = useProjects.project_regions.updateOne();
    const { mutateAsync: deleteOne, isPending: isPendingCategories } = useProjects.project_regions.deleteOne();
    const { mutateAsync: updateRegion, isPending: isPendingUpdateRegion } = useProjects.projects.updateRegion();

    const navigate = useNavigate();
    // Setlayout cho trang
    const { setLayoutProps } = useLayout();
    useEffect(() => {
        setLayoutProps({
            title: 'Quản lý khu vực dự án',
            description: 'Quản lý các khu vực dự án',
            hasButton: true,
            buttonLabel: 'Thêm khu vực dự án',
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
            title: 'Quản lý danh sách thuộc khu vực',
            description: 'Chọn các dự án muốn thêm vào khu vực',
            type: 'dự án',
            category: '', 
            category_id: '',
            header: ['Mã khu vực', 'Tên khu vực', 'Loại khu vực', 'Trạng thái']
        },
        useData: useProjects.projects,
        useDataCategories: useProjects.project_regions,
        searchSettingRef: searchSettingRef
    });

    // Thông tin của form thêm loại dự án
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const addFormData = [
        {
            name: 'name',
            type: 'text',
            label: 'Tên khu vực dự án',
            isRequired: true,
            width: 12,
            placeholder: 'VD: Miền Nam, Tây Nguyên...'
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
        title: 'Thêm khu vực dự án mới',
        description: 'Thêm khu vực dự án và màu sắc đại diện',
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
            label: 'Tên khu vực dự án',
            isRequired: true,
            width: 12,
            value: 'VD: Miền Nam, Tây Nguyên...',
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
        title: 'Chỉnh sửa khu vực dự án',
        description: 'Chỉnh sửa thông tin khu vực dự án và màu sắc đại diện',
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
        notification: 'Bạn có chắc chắn muốn xóa khu vực dự án này?',
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
    
    let projectsRegions = null;
    let isLoadingProjectsRegions = false;
        if (id === '') {
            if (query === '') {
                const result = useProjects.project_regions.getAll();
                projectsRegions = result.data;
                isLoadingProjectsRegions = result.isLoading;
            } else {
                const result = useProjects.project_regions.getSearchSuggestions(query);
                projectsRegions = result.data;
                isLoadingProjectsRegions = result.isLoading;
            }
        } else {
            const result = useProjects.project_regions.getOne(id);
            projectsRegions = result.data;
            isLoadingProjectsRegions = result.isLoading;
        }
    const unprojectsRegionsList = Array.isArray(projectsRegions) ? projectsRegions : projectsRegions?.results ?? (projectsRegions ? [projectsRegions] : []);
    const projectsRegionsList = unprojectsRegionsList.sort((a, b) => a.id.localeCompare(b.id));
    // Handler cho tìm kiếm và điều hướng
    const onSearch = (query) => {
        const newParams = new URLSearchParams();
        newParams.set('query', query);
        navigate(`/quan-ly-khu-vuc-du-an?${newParams.toString()}`);
    };
    const handleEnter = (item) => {
        navigate(`/quan-ly-khu-vuc-du-an?id=${item.id}`);
    };
    const handleSearchSuggestions = (query) => {
        return useProjects.project_regions.getSearchSuggestions(query);
    }

    //========================Table=====================
    const widthTable = ["20%", "30%", "20%", "10%", "20%"];
    const columnsTable = ["Mã khu vực", "Tên khu vực", "Màu sắc", "Số lượng", "Thao tác"];
    const convertToDataTable = (projectsRegionsList) => {
        return projectsRegionsList.map((item) => {
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
                                        title: `Quản lý dự án thuộc khu vực: ${item.name}`,
                                        description: `Chọn hoặc bỏ chọn các dự án thuộc khu vực ${item.name}`
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
    const dataTable = convertToDataTable(projectsRegionsList)
    if (isLoadingProjectsRegions || isPendingCategories || isPendingCreateCategories || isPendingUpdateCategories || isPendingUpdateRegion) 
        return <Loading/>;
    // Render
    return (
        <div>
            <div className='p-5 bg-white border-b border-gray-200 shadow-sm rounded-t-lg mb-6'>
                <SearchBar
                    data={{
                        hasButtonCategory: false,
                        hasButtonDisplay: false,
                        placeholder: "Tìm kiếm theo tên khu vực dự án",
                        currentQuery: query,
                        onSearch: onSearch, 
                        handleEnter: handleEnter,
                        handleSearchSuggestion: handleSearchSuggestions,
                    }}
                />
            </div>
            <div className='bg-white p-6 border border-gray-200 shadow-sm rounded-lg'>
                <h1 className='text-2xl font-bold text-gray-800 text-left'>Danh sách khu vực dự án</h1>
                <p className='text-gray-500 text-[14px]'>Tổng cộng {projectsRegions.length} khu vực dự án</p>
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
                        updateRegion({ changedItems: changedItems });            
                    }}
                />
            }
        </div>
    )
}
