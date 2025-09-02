  import { React, useState, useEffect, useRef} from 'react'
  import { useNavigate, useSearchParams } from 'react-router-dom';
  import { useLayout } from '@/layouts/LayoutContext';
  import { EditIcon, DeleteIcon, SettingIcon } from '@/components/Icon';
  import { useQueryClient } from '@tanstack/react-query';
  import Setting from '@/components/Setting';
  import SearchBar from '@/components/Search';
  import SimpleForm from '@/components/SimpleForm';
  import useProjects from '../../hooks/useProjects';
  import Notification from '@/components/Notification'
  import { toast } from 'react-toastify';
  import Loading from '@/components/Loading'
  import Table from '../../components/Table';
  // Còn sự kiện  sự kiện lưu thay đổi trong cài đặt loại tin tức
  export default function ProjectCategories () {
    //====================== API =========================
    const { mutateAsync: createOne, isPending: isPendingCreateOne } = useProjects.project_regions.createOne();
    const { mutateAsync: updateOne, isPending: isPendingUpdateOne } = useProjects.project_regions.updateOne();
    const { mutateAsync: deleteOne, isPending: isPendingDeleteOne } = useProjects.project_regions.deleteOne();
    const { mutateAsync: updateRegion, isPending: isPendingUpdateRegion } = useProjects.projects.updateRegion();

    // Set layout cho trang
    const navigate = useNavigate();
    const { setLayoutProps } = useLayout();
    useEffect(() => {
        setLayoutProps({
            title: 'Quản lý khu vực dự án',
            description: 'Quản lý các khu vực dự án',
            hasButton: true,
            buttonLabel: 'Thêm khu vực',
            buttonAction: () => {
                setIsModalOpen(true);
            },
        })
    }, [setLayoutProps]);

    //Lưu trạng thái của setting   
    const searchSettingRef = useRef({
        query: "",
        category: "Tất cả loại",
        display: "Tất cả trạng thái"
    })
    const [settingFormData, setSettingFormData] = useState({
        isOpen: false,
        onClose: () => {
            setSettingFormData(prev => ({ ...prev, isOpen: false }))
            searchSettingRef.current = {
            query: "",
            category: "Tất cả loại",
            display: "Tất cả trạng thái"
            }
        },
        content: {
            title: 'Quản lý danh sách thuộc loại',
            description: 'Chọn các tin tức muốn thêm hoặc xóa khỏi loại',
            type: 'tin tức',
            category: '',
            category_id: '',
            header: ['Mã tin tức', 'Tên tin tức', 'Loại tin tức', 'Trạng thái']
        },
        useData: useProjects.projects,
        useDataCategories: useProjects.project_regions,
        searchSettingRef: searchSettingRef
    });

    // Thông tin của form thêm loại dự án
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formData = [
        {
            name: 'name',
            label: 'Tên khu vực',
            type: 'text',
            isRequired: true,
            width: 12,
            placeholder: 'VD: Miền Nam, Tây Nguyên...'
        },
        {
            name: 'rgb_color',
            label: 'Màu sắc đại diện',
            type: 'color',
            isRequired: true,
            width: 12,
            value: '#3B82F6',
        }
    ];
    const formConfig = {
        isModalOpenSimple: isModalOpen,
        setIsModalOpenSimple: setIsModalOpen,
        widthModal: 430,
        title: 'Thêm khu vực mới',
        description: 'Thêm khu vực và màu sắc đại diện',
        contentSubmitButton :'Thêm mới',
        handleSubmitButton: (data) => {
            createOne(data);
            setIsModalOpen(false);
        },
    };

    // Thông tin của form chỉnh sửa loại dự án
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [formEditData, setFormEditData] = useState([
        {
            name: 'name',
            label: 'Tên khu vực',
            type: 'text',
            isRequired: true,
            width: 12,
            value: '',
        },
        {
            name: 'rgb_color',
            label: 'Màu sắc đại diện',
            type: 'color',
            isRequired: true,
            width: 12,
            value: '#3B82F6',
        }
    ])
    //Lấy id của edit hiện tại
    const [currentEditId, setCurrentEditId] = useState(null);

    //Form của edit loại dự án
    const formEditConfig = {
        isModalOpenSimple: isModalEditOpen,
        setIsModalOpenSimple: setIsModalEditOpen,
        widthModal: 430,
        title: 'Chỉnh sửa khu vực',
        description: 'Chỉnh sửa thông tin khu vực và màu sắc đại diện',
        contentSubmitButton: 'Cập nhật',
        handleSubmitButton: (data) => {
            updateOne({...data, id: currentEditId});
            setIsModalEditOpen(false);
        },
    };

    // Thông tin của pop up xóa loại dự án
    const [openNotificaton, setOpenNotificaton] = useState(false);
    //Lấy id của delete
    const[currentDeleteID, setCurrentDeleteId] = useState(null);

    const notificationProps = {
        open: openNotificaton,
        setOpen: setOpenNotificaton,
        notification: 'Bạn có chắc chắn muốn xoá khu vực này?',
        subTitle: 'Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xoá khu vực này?',
        buttonLabel1: 'Hủy',
        buttonLabel2: 'Xoá',
        buttonAction1: ()=>{setOpenNotificaton(false)},
        buttonAction2: () => {
            deleteOne(currentDeleteID);
            setOpenNotificaton(false)
        }
    }
    
    // Lấy danh sách khu vực dự án theo URL
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';
    const id = searchParams.get('id') || '';

    let projectRegions = null;
    let isLoadingProjectRegions = false;
    if (id === '') {
        if (query === '') {
            const result = useProjects.project_regions.getAll();
            projectRegions = result.data;
            isLoadingProjectRegions = result.isLoading;
        } else {
            const result = useProjects.projects.getSearchSuggestions(query);
            projectRegions = result.data;
            isLoadingProjectRegions = result.isLoading;
        }
    } else {
        const result = useProjects.project_regions.getOne(id);
        projectRegions = result.data;
        isLoadingProjectRegions = result.isLoading;
    }

    const unprojectRegionsList = Array.isArray(projectRegions) ? projectRegions : projectRegions?.results ?? (projectRegions ? [projectRegions] : []);
    const projectRegionsList = unprojectRegionsList.sort((a, b) => a.id.localeCompare(b.id));

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
    const widthTable = ["20%", "30%", "20%", "10%", "20%"];
    const columnsTable = ["Mã loại", "Tên loại tin tức", "Màu sắc", "Số lượng", "Thao tác"];
    const convertToDataTable = (projectRegionsList) => {
        return projectRegionsList.map((item) => {
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
                                setSelectedCategoryId(item.id);
                                setSettingFormData(prev => ({
                                    ...prev,
                                    isOpen: true,
                                    content: {
                                        ...prev.content,
                                        category: item.name,
                                        category_id: item.id,
                                        title: `Quản lý dự án thuộc loại: ${item.name}`,
                                        description: `Chọn hoặc bỏ chọn các dự án thuộc loại ${item.name}`
                                    }
                                }));
                            }}
                        >
                            <SettingIcon />
                        </button>,
                        <button 
                            className='border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200 cursor-pointer' 
                            onClick={() => {
                                setFormEditData(prev => {
                                    const newData = [...prev];
                                    newData[0] = { ...newData[0], value: item.name };
                                    newData[1] = { ...newData[1], value: item.rgb_color };
                                    return newData;
                                });
                                setCurrentEditId(item.id);
                                setIsModalEditOpen(true);
                            }}
                        >
                            <EditIcon />
                        </button>,
                        <button 
                            className='border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200 cursor-pointer'
                            onClick={() => {
                                setCurrentDeleteId(item.id)
                                setOpenNotificaton(true)
                            }}
                        >
                            <DeleteIcon />
                        </button>
                    ]
                }
            ]
        })
    }
    const dataTable = convertToDataTable(projectRegionsList)

    if (isLoadingProjectRegions || isPendingCreateOne || isPendingDeleteOne || isPendingUpdateOne || isPendingUpdateRegion) 
        return <Loading/>;

    // Render giao diện
    return (
        <div>
            <div className='flex justify-between items-center mb-6 p-5 bg-white rounded-lg shadow border border-gray-200'>
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
            <div className='bg-white p-5 border border-gray-200 rounded-lg shadow-md'>
                <h1 className='text-xl font-semibold text-gray-900 mb-4'>Danh sách khu vực dự án</h1>
                <p className='text-gray-600 mb-4'>Tổng cộng {projectRegions.length} khu vực</p>
                <Table columns={columnsTable} data={dataTable} isSetting={false} width={widthTable} />
            </div>
            <SimpleForm
                data={formData}
                config={formConfig}
            />
            <SimpleForm
                data={formEditData}
                config={formEditConfig}
            />
            <Notification {...notificationProps} />
            {
                settingFormData.isOpen && 
                    <Setting {...settingFormData}
                        onSave={async (changedItems) => {
                            await updateRegion({ changedItems: changedItems });
                        }}
                    />
            }
        </div>
    );
  }
