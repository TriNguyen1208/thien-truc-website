import React, { useState, useEffect, useOptimistic} from 'react'
import { useLayout } from '@/layouts/layoutcontext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { EditIcon, DeleteIcon } from '@/components/Icon';
import Notification from '../../components/Notification';
import SearchBar from '@/components/Search';
import useProjects from '@/hooks/useProjects';
import Loading from '@/components/Loading'
import { toast } from 'react-toastify';
// Còn sự kiện ấn vào nút trưng bày
const StatusBox = ({ isFeatured }) => {
  return (
    <div
      className={`
        w-5 h-5 flex items-center justify-center rounded-[3px] transition-all duration-200 cursor-pointer
        ${isFeatured === true
          ? 'bg-green-500 text-white'
          : (isFeatured === false ? 'border border-gray-700 bg-white' : 'border border-gray-700 bg-white')}
        hover:shadow hover:scale-105
      `}
    >
      {isFeatured && (
        <svg
          className="w-5 h-5"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 8L7 11L12 5"
            stroke="white"
            strokeWidth="2  "
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};


export default function Project () {
  // Lấy hàm từ hook
  const queryClient = useQueryClient();
  const { mutateAsync: deleteOne } = useProjects.projects.deleteOne();
  const { mutateAsync: updateFeatureOne} = useProjects.projects.updateFeatureOne();

  // Thông tin của popup xác nhận hủy
  const [cancelOpen, setCancelOpen] = useState(false);
  const [currentDeleteID, setcurrentDeleteId] = useState(null);
  const cancelPopupData = {
    open: cancelOpen,
    setOpen: setCancelOpen,
    notification: 'Bạn có chắc chắn muốn xóa dự án này?',
    subTitle: 'Hành động này sẽ không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?',
    buttonLabel1: 'Hủy',
    buttonAction1: ()=>{setCancelOpen(false)},
    buttonLabel2: 'Xóa dự án',
    buttonAction2: async () => 
      {
        await deleteOne(currentDeleteID, {
        onSuccess: (success)=> { toast.success(success ? success.message: "Xóa thành công!")},
        onError:(error)=>{toast.error(error ?  error.message: "Xóa thất bại!") }
        });
        queryClient.invalidateQueries(['admin_projects']);
        setCancelOpen(false)
      }
  };

  // Set prop cho trang
  const navigate = useNavigate();
  const { setLayoutProps } = useLayout();
  useEffect(() => {
      setLayoutProps({
        title: 'Quản lý dự án',
        description: 'Quản lý danh sách dự án của công ty',
        hasButton: true,
        buttonLabel: 'Thêm dự án',
        buttonAction: () => {
          navigate('/quan-ly-du-an/them-du-an');
        },
      })
    }, [setLayoutProps]);

  // Loading data theo URL
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const filter = searchParams.get('filter') || 'Tất cả khu vực';
  const is_featured = searchParams.get('is_featured') || 'Tất cả hiển thị';
  const id = searchParams.get('id') || '';

  let projects = null;
  let isLoadingProjects = false;

  if (id === '') {
    const result = useProjects.projects.getList(
      query,
      filter === "Tất cả khu vực" ? undefined : filter,
      is_featured === 'Trưng bày' ? true : (is_featured === 'Không trưng bày' ? false : undefined),
    );
    projects = result.data;
    isLoadingProjects = result.isLoading;
  } else {
    const result = useProjects.projects.getOne(id);
    projects = result.data;
    isLoadingProjects = result.isLoading;
  }

  const projectsList = Array.isArray(projects) ? projects : projects?.results ?? (projects ? [projects] : []);

  const sortedProjects = [...projectsList].sort((a, b) => a.id.localeCompare(b.id));

  const projectPage = sortedProjects.reduce((acc, project) => {
    const region = project.region || { id: 'unknown', name: 'Không rõ khu vực' };
    if (!acc[region.id]) {
      acc[region.id] = {
        region,
        projects: []
      };
    }
    acc[region.id].projects.push(project);
    return acc;
  }, {});

  const { data: projectRegions, isLoading: isLoadingProjectRegions } = useProjects.project_regions.getAll();
  const regions = [
    'Tất cả khu vực',
    ...(projectRegions?.map((filter) => filter.name) ?? []),
  ]
  const display = ['Tất cả hiển thị', 'Trưng bày', 'Không trưng bày'];
  if (isLoadingProjects || isLoadingProjectRegions) {
    return <Loading/>;
  }


  // Handler
  const onSearch = (query, filter, is_featured) => {
    const newParams = new URLSearchParams();
    newParams.set('query', query);
    newParams.set('filter', filter);
    newParams.set('is_featured', is_featured);
    navigate(`/quan-ly-du-an?${newParams.toString()}`);
  };

  const handleButton = (item) => {
    navigate(`/quan-ly-du-an?id=${item.id}`);
  };

  const handleSearchSuggestions = (query, filter, is_featured) => {
    return useProjects.getSearchSuggestions(query, filter === 'Tất cả khu vực' ? undefined : filter, is_featured);
  }

  return (
    <div>
      <div className='flex justify-between items-center mb-6 bg-white p-5 border border-gray-200 rounded-lg shadow-md'>
        <SearchBar
                data={{
                  hasButtonCategory: true,
                  hasButtonDisplay: true,
                  placeholder: "Tìm kiếm dự án theo tên...",
                  categories: regions,
                  displays: display,
                  currentQuery: query,
                  currentCategory: filter,
                  currentDisplay: is_featured,
                  onSearch: onSearch, 
                  handleEnter: handleButton,
                  handleSearchSuggestion: handleSearchSuggestions,
                }}
              />
      </div>

      <div>
        {Object.values(projectPage).map(({region, projects}) => (
          <div key = {region.id} className="mb-10 bg-white p-5 border border-md border-gray-200 rounded-lg shadow-md">
            <h2 className="text-[23px] font-bold text-gray-900 mb-1">{region.name}</h2>
            <p className="text-[14px] text-gray-500">{projects.length} dự án</p>
            <table className='mt-9 w-full table-fixed border-collapse' cellPadding={10}>
                <thead className='text-left border-b border-gray-200 text-[14px] font-normal text-gray-500'>
                  <tr>
                    <th className="w-[8%] px-3 py-3">Mã dự án</th>
                    <th className="w-[10%] px-4 py-3">Hình ảnh</th>
                    <th className="w-[35%] px-1 py-3">Tên dự án</th>
                    <th className="w-[16%] px-4 py-3">Vị trí</th>
                    <th className="w-[11%] px-4 py-3">Hoàn thành</th>
                    <th className="w-[10%] px-4 py-3">Trưng bày</th>
                    <th className="w-[10%] px-4 py-3">Thao tác</th>
                  </tr>
                </thead>
            
                <tbody className="text-left">

                {projects.map((item) => (
                  <tr key={item.id + '-' + region.id} className=" border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-4 px-3 text-black-100 font-medium">{item.id}</td>
                    <td className="py-4 px-4">
                      <img src={item.main_img || 'https://via.placeholder.com/50'} className="w-11 h-11 object-cover rounded" />
                    </td>
                    <td className="py-4 px-1 text-black max-w-[530px] ">
                         <div className="line-clamp-2 overflow-hidden text-ellipsis">
                          {item.title}
                        </div>
                      </td>
                    <td className="py-4 px-4 text-gray-800">{item.province}</td>
                    <td className="py-4 px-4 text-gray-800">{new Date(item.complete_time).toLocaleDateString('vi-VN')}</td>
                    <td className="py-4 px-9 item-center">
                      <button
                        onClick={() => {
                          updateFeatureOne({ id: item.id, status: !item.is_featured });
                        }}
                      >
                        <StatusBox isFeatured={item.is_featured} />
                      </button>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                      <button
                        className="border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
                        onClick={() => navigate(`/quan-ly-du-an/chinh-sua-du-an/${item.id}`)}
                      >
                        <EditIcon />
                      </button>
  
                      <button
                        className="border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
                        onClick={() => {
                          setcurrentDeleteId(item.id);
                          setCancelOpen(true);
                        }}
                      >
                        <DeleteIcon />
                      </button>
                      </div>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
          </div>
        ))}
      </div>
      <Notification {...cancelPopupData} />
    </div>
  );
}