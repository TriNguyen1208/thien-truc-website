import { useEffect, useState } from 'react';
import { useLayout } from '@/layouts/layoutcontext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { SettingIcon, DeleteIcon, EditIcon } from '@/components/Icon';
import { CancelPopup } from '@/components/Popup';
import Setting from '@/components/Setting';
import SearchBar from '@/components/Search';
import SimpleForm from '@/components/SimpleForm';
import useNews from '@/hooks/useNews';
import { toast } from 'react-toastify';
import Loading from '@/components/Loading'
// Còn api thêm loại tin tức, chỉnh sửa loại tin tức, xóa loại tin tức, cài đặt loại tin tức
export default function NewsCategories() {

  // Lay ham tu hook
  const queryClient = useQueryClient();
  const { mutateAsync: createOne } = useNews.news_categories.createOne();
  const { mutateAsync: updateOne } = useNews.news_categories.updateOne();
  const { mutateAsync: deleteOne } = useNews.news_categories.deleteOne();
  const { mutateAsync: updateCategory } = useNews.news.updateCategory();

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
      placeholder: 'VD: Tin công ty, Tin ngành...',
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
  const editFormConfig = {
    isModalOpenSimple: isEditModalOpen,
    setIsModalOpenSimple: setIsEditModalOpen,
    widthModal: 430,
    title: 'Chỉnh sửa loại tin tức',
    description: 'Chỉnh sửa thông tin loại tin tức và màu sắc đại diện',
    handleSubmitButton: async (data) => {
      await updateOne({...data, id: currentEditId});
      queryClient.invalidateQueries(['admin_news_categories']);
      setIsEditModalOpen(false);
    },
  };

  // Thong tin của popup xác nhận xóa loại tin tức
  const [cancelOpen, setCancelOpen] = useState(false);
  const[currentDeleteID, setCurrentDeleteId] = useState(null);
  const cancelPopupData = {
    open: cancelOpen,
    setOpen: setCancelOpen,
    notification: 'Bạn có chắc chắn muốn xóa loại tin tức này?',
    subTitle: 'Hành động này sẽ không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?',
    buttonLabel1: 'Hủy',
    buttonLabel2: 'Xóa',
    buttonAction2: async () => {
      await deleteOne(currentDeleteID);
      queryClient.invalidateQueries(['admin_news_list'])
      setCancelOpen(false);
    },
  };
  
  // Thông tin cho setting
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [settingFormData, setSettingFormData] = useState({
    isOpen: false,
    onClose: () => setSettingFormData(prev => ({ ...prev, isOpen: false })),
    content: {
      title: 'Quản lý danh sách thuộc loại',
      description: 'Chọn các tin tức muốn thêm hoặc xóa khỏi loại',
      type: 'tin tức',
      category: '',
      header: ['', 'Mã tin tức', 'Tên tin tức', 'Loại tin tức', 'Trạng thái']
    },
    useData: useNews.news,
    useDataSuggestion: useNews,
    useDataCategories: useNews.news_categories,
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
  const newsCategoriesList = Array.isArray(newsCategories) ? newsCategories : newsCategories?.results ?? (newsCategories ? [newsCategories] : []);
  if (isLoadingNewsCategories) return <Loading/>;


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
      <div className='p-4 bg-white border-b border-gray-200 shadow-sm rounded-t-lg mb-6'>
        <SearchBar
          data={{
          hasButtonCategory: false,
          hasButtonDisplay: false,
          placeholder: "Tìm kiếm theo tên loại tin tức...",
          currentQuery: query,
          onSearch: onSearch, 
          handleEnter: handleEnter,
          handleSearchSuggestion: handleSearchSuggestions,
        }}
        />
      </div>
      <div className='bg-white py-5 border border-gray-200 shadow-sm rounded-lg'>
        <h1 className='text-2xl font-bold text-gray-800 text-left pl-6'>Danh sách loại tin tức</h1>
        <p className='text-gray-500 text-[14px] pl-6'>Tổng cộng {newsCategories.length} loại tin tức</p>

        <table className='w-full mt-6'>
          <thead className='text-left text-gray-500 font-normal text-[15px] border-b border-gray-200'>
            <tr>
              <th className='w-[10%] py-3 pl-10'>STT</th>
              <th className='w-[30%] px-4 py-3'>Tên loại tin tức</th>
              <th className='w-[20%] py-3 px-4'>Màu sắc</th>
              <th className='w-[20%] py-3 px-4'>Số lượng</th>
              <th className='w-[20%] py-3 px-4'>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {newsCategoriesList.map((item, index) => (
               <tr key={item.id} className='border-b border-gray-200 hover:bg-gray-100'>
                <td className='w-[10%] py-5 pl-12'>{index + 1}</td>
                <td className='w-[30%] py-5 px-4 font-medium'>{query ==='' ? item.name : item.query}</td>
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
                            content: { ...prev.content, category: item.name }
                          }));
                        }}>
                    <SettingIcon />
                  </button>
                  <button className='border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200' 
                    onClick={() => {
                      setEditFormData(prev => {
                        const newData = [...prev];
                        newData[0] = { ...newData[0], placeholder: item.name };
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
                      setCancelOpen(true)
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
      <CancelPopup
        {...cancelPopupData}
      />
     <Setting {...settingFormData} 
        onSave={async (changedItems) => {
          // Map từ { id, state } -> { id, category_id }
          const mappedItems = changedItems
            .map(item => ({
              id: item.id,
              category_id: selectedCategoryId
            }));

            try {
              await updateCategory({ changedItems: mappedItems });
              toast.success("Cập nhật khu vực thành công");
              queryClient.invalidateQueries(['admin_news_list']);
            } catch (err) {
              toast.error("Cập nhật khu vực thất bại");
              console.error("Lỗi khi cập nhật:", err);
            }
        }}/>
    </div>
  )
}
