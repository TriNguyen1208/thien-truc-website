import React, { useState, useEffect, useRef} from 'react'
import { useLayout } from '@/layouts/LayoutContext';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { EditIcon, DeleteIcon } from '@/components/Icon';
import Notification from '../../components/Notification';
import SearchBar from '@/components/Search';
import useProjects from '@/hooks/useProjects';
import Loading from '@/components/Loading'
import Table from '@/components/Table';
import ProductImageCell from '@/components/ProductImageCell';
// Còn sự kiện ấn vào nút trưng bày

export default function Project () {
  //Handle scroll to new project
  const location = useLocation();
  const {createId} = location.state || {}
  const refs = useRef({})

  // Lấy hàm từ hook
  const queryClient = useQueryClient();
  const { mutateAsync: deleteOne, isPending: isPendingDeleting} = useProjects.projects.deleteOne();
  const { mutateAsync: updateFeatureOne, isPending: isPendingUpdate} = useProjects.projects.updateFeatureOne();

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

  const sortedProjects = [...projectsList].sort((a, b) => {
    const dateA = a.complete_time ? new Date(a.complete_time) : new Date(0); 
    const dateB = b.complete_time ? new Date(b.complete_time) : new Date(0);
    if (dateB - dateA !== 0) 
      return dateB - dateA;

    return a.id.localeCompare(b.id);
  });

  const projectPageObj = sortedProjects.reduce((acc, project) => {
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

  // Sắp xếp theo alphabet của region.name
  const projectPage = Object.values(projectPageObj).sort((a, b) =>
    a.region.id.localeCompare(b.region.id)
  );

  const { data: projectRegions, isLoading: isLoadingProjectRegions } = useProjects.project_regions.getAll();
  const regions = [
    'Tất cả khu vực',
    ...(projectRegions?.map((filter) => filter.name) ?? []),
  ]
  const display = ['Tất cả hiển thị', 'Trưng bày', 'Không trưng bày'];
  if (isLoadingProjects || isLoadingProjectRegions || isPendingDeleting) {
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
  const columnWidths = ['9%', '10%', '32%', '13%', '11%', '10%', '13%'];

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
                { type: "text", content: 
                    <div ref={(el) => {
                      refs.current[item.id] = el
                      if (item.id === createId && el) {
                        el.scrollIntoView({ behavior: "smooth", block: "center" });
                        navigate(location.pathname, { replace: true, state: {} });
                      }
                    }}>
                      {item.id}
                    </div> 
                },
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
                    <div className="ml-[30px]">
                    <input
                      type="checkbox"
                      checked={item.is_featured}
                      onChange={() => {
                        updateFeatureOne({
                          id: item.id,
                          status: !item.is_featured,
                        });
                      }}
                      disabled={isPendingUpdate}
                      className={`
                        w-5 h-5 appearance-none cursor-pointer rounded-[3px]
                        transition-all duration-200
                        border border-gray-400
                        checked:bg-green-500
                        hover:shadow hover:scale-105
                        absolute top-6 left-10
                      `}
                    />
                    {item.is_featured && (
                      <svg
                        className="absolute top-[24px] left-[40px] w-5 h-5 text-white pointer-events-none"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 8L7 11L12 5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    {/* {isPending ? "Đang cập nhật..." : "Đổi trạng thái"} */}
                  </div>
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
