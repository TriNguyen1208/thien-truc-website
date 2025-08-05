  import { React, useState, useEffect, useRef} from 'react'
  import { useNavigate, useSearchParams } from 'react-router-dom';
  import { useLayout } from '@/layouts/LayoutContext';
  import { EditIcon, DeleteIcon, SettingIcon } from '@/components/Icon';
  import { useQueryClient } from '@tanstack/react-query';
  import Setting from '@/components/Setting';
  import SearchBar from '@/components/Search';
  import SimpleForm from '@/components/SimpleForm';
  import useProjects from '@/hooks/useProjects';
  import Notification from '@/components/Notification'
  import { toast } from 'react-toastify';
  import Loading from '@/components/Loading'
  // Còn sự kiện  sự kiện lưu thay đổi trong cài đặt loại tin tức
  export default function ProjectCategories () {
    // Lấy hàm từ hook
    const queryClient = useQueryClient();
    const { mutateAsync: createOne, isPending: isPendingCreateOne } = useProjects.project_regions.createOne();
    const { mutateAsync: updateOne, isPending: isPendingUpdateOne } = useProjects.project_regions.updateOne();
    const { mutateAsync: deleteOne, isPending: isPendingDeleteOne } = useProjects.project_regions.deleteOne();
    const { mutateAsync: updateRegion, isPending: isPendingUpdateRegion } = useProjects.projects.updateRegion();

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
      handleSubmitButton: async (data) => {
        await createOne(data, {
          onSuccess: (success)=> { toast.success(success ? success.message: "Thêm thành công!")},
          onError:(error)=>{toast.error(error ?  error.message: "Thêm thất bại!") }
        });
        queryClient.invalidateQueries(['admin_project_regions']);
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
    const [currentEditId, setCurrentEditId] = useState(null);
    const formEditConfig = {
      isModalOpenSimple: isModalEditOpen,
      setIsModalOpenSimple: setIsModalEditOpen,
      widthModal: 430,
      title: 'Chỉnh sửa khu vực',
      description: 'Chỉnh sửa thông tin khu vực và màu sắc đại diện',
      contentSubmitButton: 'Cập nhật',
      handleSubmitButton: async (data) => {
        await updateOne({...data, id: currentEditId},{
          onSuccess: (success)=> { toast.success(success ? success.message: "Cập nhật thành công!")},
          onError:(error)=>{toast.error(error ?  error.message: "Cập nhật thất bại!") }
        });
        queryClient.invalidateQueries(['admin_project_regions']);
        setIsModalEditOpen(false);
      },
    };

    // Thông tin của pop up xóa loại dự án
    const [openNotificaton, setOpenNotificaton] = useState(false);
    const[currentDeleteID, setCurrentDeleteId] = useState(null);
    const notificationProps = {
      open: openNotificaton,
      setOpen: setOpenNotificaton,
      notification: 'Bạn có chắc chắn muốn xoá khu vực này?',
      subTitle: 'Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xoá khu vực này?',
      buttonLabel1: 'Hủy',
      buttonLabel2: 'Xoá',
      buttonAction1: ()=>{setOpenNotificaton(false)},
      buttonAction2: async () => {
        await deleteOne(currentDeleteID, {
            onSuccess: (success)=> { toast.success(success ? success.message: "Xóa thành công!")},
            onError:(error)=>{toast.error(error ?  error.message: "Xóa thất bại!") }
        });
        queryClient.invalidateQueries(['admin_project_list'])
        setOpenNotificaton(false)
      }
    }

    // Thông tin của form cài đặt loại dự án
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
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
      useDataSuggestion: useProjects,
      useDataCategories: useProjects.project_regions,
      searchSettingRef: searchSettingRef
    });


    // Thiết lập prop cho trang
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
        const result = useProjects.getSearchCategoriesSuggestions(query);
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
    if (isLoadingProjectRegions || isPendingCreateOne || isPendingDeleteOne || isPendingUpdateOne || isPendingUpdateRegion) return <Loading/>;



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
      return useProjects.getSearchCategoriesSuggestions(query);
    }



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

          <table className='w-full mt-6'>
            <thead className='text-left text-gray-500 font-normal text-[15px] border-b border-gray-200'>
              <tr>
                <th className='w-[13%] py-3 pl-5'>Mã khu vực</th>
                <th className='w-[30%] px-4 py-3'>Tên khu vực</th>
                <th className='w-[20%] py-3 px-4'>Màu sắc</th>
                <th className='w-[22%] py-3 px-4'>Số lượng</th>
                <th className='w-[20%] py-3 px-4'>Thao tác</th>
              </tr>
            </thead>

            <tbody>
                {projectRegionsList.map((item, index) => (
                  <tr key={item.id} className='border-b border-gray-200 hover:bg-gray-100'>
                    <td className='w-[10%] py-5 pl-7 font-medium'>{item.id}</td>
                    <td className='w-[30%] py-5 px-4 font-medium'>{query === '' ? item.name : item.query}</td>
                    <td className='w-[20%] py-5 px-4'>
                      <span className='inline-block w-4 py-2 mt-2 mr-2' style={{ backgroundColor: item.rgb_color }}></span>
                      {item.rgb_color}
                    </td>
                    <td className='w-[20%] py-5 pl-10'>{item.item_count}</td>
                    <td className='w-[20%] py-5 flex items-center gap-3'>
                      <button className='border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200' 
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
                          }}>
                        <SettingIcon />
                      </button>
                      <button className='border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200' 
                              onClick={() => {
                                  setFormEditData(prev => {
                                    const newData = [...prev];
                                    newData[0] = { ...newData[0], value: item.name };
                                    newData[1] = { ...newData[1], value: item.rgb_color };
                                    return newData;
                                });
                                setCurrentEditId(item.id);
                                setIsModalEditOpen(true);
                              }}>
                        <EditIcon />
                      </button>
                      <button className='border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200' onClick={() => 
                      {
                        setCurrentDeleteId(item.id)
                        setOpenNotificaton(true)
                      }
                      }>
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
          </table>
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
        {settingFormData.isOpen && <Setting {...settingFormData}
           onSave={async (changedItems) => {
            await updateRegion({ changedItems: changedItems });
          }}
        />}
      </div>
    );
  }
