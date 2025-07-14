import { React, useState, useEffect} from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLayout } from '@/layouts/layoutcontext';
import { EditIcon, DeleteIcon, SettingIcon } from '@/components/Icon';
import SearchBar from '@/components/Search';
import SimpleForm from '@/components/SimpleForm';
import useProjects from '@/hooks/useProjects';
import {CancelPopup} from '@/components/Popup';
// Còn sự kiện submit button thêm khu vực, sự kiện submit button chỉnh sửa khu vực, sự kiện xóa khu vực, sự kiện lưu thay đổi trong cài đặt loại tin tức

export default function ProjectCategories () {
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
    handleSubmitButton: async (data) => {
      console.log('Form submit data:', data);
      // Gọi API tạo khu vực ở đây nếu cần
      // await useProjects.project_regions.create(data);
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
      placeholder: 'VD: Miền Nam, Tây Nguyên...',
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
  const formEditConfig = {
    isModalOpenSimple: isModalEditOpen,
    setIsModalOpenSimple: setIsModalEditOpen,
    widthModal: 430,
    title: 'Chỉnh sửa khu vực',
    description: 'Chỉnh sửa thông tin khu vực và màu sắc đại diện',
    handleSubmitButton: async (data) => {
      console.log('Form edit submit data:', data);
      // Gọi API cập nhật khu vực ở đây nếu cần
      // await useProjects.project_regions.update(data);
      setIsModalEditOpen(false);
    },
  };

  // Thông tin của pop up xóa loại dự án
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const formDelete = {
    open: isModalDeleteOpen,
    setOpen: setIsModalDeleteOpen,
    notification: 'Bạn có chắc chắn muốn xoá khu vực này?',
    subTitle: 'Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xoá khu vực này?',
    buttonLabel1: 'Hủy',
    buttonLabel2: 'Xoá',
    buttonAction2: () => {
      console.log('Xoá khu vực');
      setIsModalDeleteOpen(false);
    }
  }

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

  const projectRegionsList = Array.isArray(projectRegions) ? projectRegions : projectRegions?.results ?? (projectRegions ? [projectRegions] : []);
  if (isLoadingProjectRegions) return <div>Loading...</div>;



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
            placeholder: "Tìm kiếm theo tên khu vực...",
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
              <th className='w-[13%] py-3 pl-5'>STT</th>
              <th className='w-[30%] px-4 py-3'>Tên khu vực</th>
              <th className='w-[20%] py-3 px-4'>Màu sắc</th>
              <th className='w-[22%] py-3 px-4'>Số lượng</th>
              <th className='w-[20%] py-3 px-4'>Thao tác</th>
            </tr>
          </thead>

           <tbody>
              {projectRegionsList.map((item, index) => (
                <tr key={item.id} className='border-b border-gray-200 hover:bg-gray-100'>
                  <td className='w-[10%] py-5 pl-7'>{index + 1}</td>
                  <td className='w-[30%] py-5 px-4 font-medium'>{query === '' ? item.name : item.query}</td>
                  <td className='w-[20%] py-5 px-4'>
                    <span className='inline-block w-4 py-2 mt-2 mr-2' style={{ backgroundColor: item.rgb_color }}></span>
                    {item.rgb_color}
                  </td>
                  <td className='w-[20%] py-5 pl-10'>{item.item_count}</td>
                  <td className='w-[20%] py-5 flex items-center gap-3'>
                    <button className='border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200' onClick={() => console.log('Cài đặt loại tin tức', item.id)}>
                      <SettingIcon />
                    </button>
                    <button className='border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200' 
                            onClick={() => {
                                setFormEditData(prev => {
                                  const newData = [...prev];
                                  newData[0] = { ...newData[0], placeholder: item.name };
                                  newData[1] = { ...newData[1], value: item.rgb_color };
                                  return newData;
                              });
                              setIsModalEditOpen(true);
                            }}>
                      <EditIcon />
                    </button>
                    <button className='border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200' onClick={() => 
                      setIsModalDeleteOpen(true)
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
      <CancelPopup {...formDelete} />
    </div>
  );
}