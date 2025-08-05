import { useEffect, useState, useRef } from 'react';
import { useLayout } from '@/layouts/LayoutContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { SettingIcon, DeleteIcon, EditIcon } from '@/components/Icon';
import Notification from '@/components/Notification'
import Setting from '@/components/Setting';
import SearchBar from '@/components/Search';
import SimpleForm from '@/components/SimpleForm';
import useNews from '@/hooks/useNews';
import Loading from '@/components/Loading'
// Còn api thêm loại tin tức, chỉnh sửa loại tin tức, xóa loại tin tức, cài đặt loại tin tức
export default function NewsCategories() {

  // Lay ham tu hook
  const queryClient = useQueryClient();
  const { mutateAsync: createOne, isPending: isPendingCreateCategories } = useNews.news_categories.createOne();
  const { mutateAsync: updateOne, isPending: isPendingUpdateCategories } = useNews.news_categories.updateOne();
  const { mutateAsync: deleteOne, isPending: isPendingCategories } = useNews.news_categories.deleteOne();
  const { mutateAsync: updateCategory, isPending: isPendingUpdateCategory } = useNews.news.updateCategory();

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
    handleSubmitButton: async (data) => {
      await createOne(data);
      queryClient.invalidateQueries(['admin_news_categories']);
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
  const [currentEditId, setCurrentEditId] = useState(null); 
  const searchSettingRef = useRef({
      query: "",
      category: "Tất cả loại",
      display: "Tất cả trạng thái"
  });
  const editFormConfig = {
    isModalOpenSimple: isEditModalOpen,
    setIsModalOpenSimple: setIsEditModalOpen,
    widthModal: 430,
    title: 'Chỉnh sửa loại tin tức',
    description: 'Chỉnh sửa thông tin loại tin tức và màu sắc đại diện',
    contentSubmitButton: "Cập nhật",
    handleSubmitButton: async (data) => {
      await updateOne({...data, id: currentEditId});
      queryClient.invalidateQueries(['admin_news_categories']);
      setIsEditModalOpen(false);
    },
  };

  // Thong tin của popup xác nhận xóa loại tin tức
  const [openNotification, setOpenNotification] = useState(false);
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
    buttonAction2: async () => {
      await deleteOne(currentDeleteID);
      queryClient.invalidateQueries(['admin_news_list'])
      setOpenNotification(false);
    },
  };
  
  // Thông tin cho setting
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [settingFormData, setSettingFormData] = useState({
    isOpen: false,
    onClose: () => {
        setSettingFormData(prev => ({ ...prev, isOpen: false }));
        setSelectedCategory(null); // Reset khi đóng
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
    useDataSuggestion: useNews,
    useDataCategories: useNews.news_categories,
    searchSettingRef: searchSettingRef
  });

  // Set prop cho trang
  const navigate = useNavigate();
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
        const result = useNews.getSearchCategoriesSuggestions(query);
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
  if (isLoadingNewsCategories || isPendingCategories || isPendingCreateCategories || isPendingUpdateCategories || isPendingUpdateCategory) return <Loading/>;


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
    return useNews.getSearchCategoriesSuggestions(query);
  }

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

        <table className='mt-9 w-full table-fixed border-collapse'>
          <thead className='text-left border-b border-gray-200 text-[14px] font-normal text-gray-500'>
            <tr>
              <th className='w-[10%] py-3 pl-4'>Mã loại</th>
              <th className='w-[40%] px-4 py-3'>Tên loại tin tức</th>
              <th className='w-[20%] py-3 px-12'>Màu sắc</th>
              <th className='w-[20%] py-3 px-10'>Số lượng</th>
              <th className='w-[20%] py-3 px-14'>Thao tác</th>
            </tr>
          </thead>
          <tbody className="text-left">
            {newsCategoriesList.map((item, index) => (
               <tr key={item.id} className='border-b border-gray-200 hover:bg-gray-100'>
                <td className='w-[10%] py-5 pl-4 font-medium'>{item.id}</td>
                <td className='w-[30%] py-5 px-4 font-medium'>{query ==='' ? item.name : item.query}</td>
                <td className='w-[20%] py-5 px-8'>
                  <span className='inline-block w-4 py-2 mt-2 mr-2' style={{ backgroundColor: item.rgb_color }}></span>
                  {item.rgb_color}
                </td>
                <td className='w-[20%] py-5 pl-16'>{item.item_count}</td>
                <td className='w-[20%] py-5 pl-4 flex items-center gap-3'>
                  <button className='border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200' 
                    onClick={() => {
                          setSelectedCategory(item);
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
                        }}>
                    <SettingIcon />
                  </button>
                  <button className='border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200' 
                    onClick={() => {
                      setEditFormData(prev => {
                        const newData = [...prev];
                        newData[0] = { ...newData[0], value: item.name };
                        newData[1] = { ...newData[1], value: item.rgb_color };
                        return newData;
                    });   
                    setCurrentEditId(item.id);
                    setIsEditModalOpen(true);
                    }}>
                    <EditIcon />
                  </button>
                  <button className='border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200' onClick={() => 
                    {
                      setCurrentDeleteId(item.id);
                      setOpenNotification(true)
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
      {settingFormData.isOpen && <Setting {...settingFormData} 
        onSave={async (changedItems) => {
          // Map từ { id, state } -> { id, category_id }
          await updateCategory({ changedItems: changedItems });            
        }}/>
      }
    </div>
  )
}
