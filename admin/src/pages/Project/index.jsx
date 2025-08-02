import React, { useState, useEffect, useOptimistic} from 'react'
import { useLayout } from '@/layouts/layoutcontext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { EditIcon, DeleteIcon } from '@/components/Icon';
import Notification from '../../components/Notification';
import SearchBar from '@/components/Search';
import useProjects from '@/hooks/useProjects';
import Loading from '@/components/Loading'
import Table from '@/components/Table';
import ProductImageCell from '@/components/ProductImageCell';
// Còn sự kiện ấn vào nút trưng bày
const StatusBox = ({ isFeatured }) => {
  return (
    <div
      className={`flex items-center justify-center w-full h-full cursor-pointer`}
    >
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
        await deleteOne(currentDeleteID);
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
  const columnWidths = ['9%', '10%', '32%', '13%', '12%', '9%', '13%'];

  // Định nghĩa tiêu đề cột
  const columns = ["Mã dự án", "Hình ảnh", "Tên dự án", "Vị trí", "Hoàn thành", "Trưng bày", "Thao tác"];

  return (
    <div>
      <div className='flex justify-between items-center mb-6 bg-white p-5 border border-gray-200 rounded-lg shadow-md'>
        <SearchBar
                data={{
                  hasButtonCategory: true,
                  hasButtonDisplay: true,
                  placeholder: "Tìm kiếm theo tên dự án",
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
            <Table
              columns={columns}
              data={projects.map(item => [
                { type: "text", content: item.id },
                {
                  type: "component",
                  component: (
                    <ProductImageCell
                      imageUrl={item.main_img || ""}
                      productName={item.name}
                    />
                  ),
                },
                { type: "text", content: item.title },
                { type: "text", content: item.province || 'Cập nhật sau' },
                { type: "text", content: item.complete_time ? new Date(item.complete_time).toLocaleDateString('vi-VN') : 'Cập nhật sau' },
                {
                  type: "component",
                  component: (
                    <StatusBox
                      isFeatured={item.is_featured}
                      onClick={() => updateFeatureOne({ id: item.id, status: !item.is_featured })}
                    />
                  ),
                },
                {
                  type: "array-components",
                  components: [
                    <button
                      key="edit"
                      className="border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
                      onClick={() => navigate(`/quan-ly-du-an/chinh-sua-du-an/${item.id}`)}
                    >
                      <EditIcon />
                    </button>,
                    <button
                      key="delete"
                      className="border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
                      onClick={() => {
                        setcurrentDeleteId(item.id);
                        setCancelOpen(true);
                      }}
                    >
                      <DeleteIcon />
                    </button>,
                  ],
                },
              ])}
              width={columnWidths}
              isSetting={false}
            />
          </div>
        ))}
      </div>
      <Notification {...cancelPopupData} />
    </div>
  );
}