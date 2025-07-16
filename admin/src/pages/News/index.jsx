import { useEffect, useState} from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom'; 
import { useLayout } from '@/layouts/layoutcontext';
import { useQueryClient } from '@tanstack/react-query';
import { CancelPopup } from '@/components/Popup';
import { EditIcon, DeleteIcon } from '@/components/Icon';
import SearchBar from '@/components/Search';
import useNews from '@/hooks/useNews';

// Còn api xóa tin tứcs
export default function News() {

  const queryClient = useQueryClient();
  const { mutateAsync: deleteOne } = useNews.news.deleteOne();
  // Thông tin của popup xác nhận hủy
  const [currentDeleteID, setcurrentDeleteId] = useState(null);
  const [cancelOpen, setCancelOpen] = useState(false);
  const cancelPopupData = {
    open: cancelOpen,
    setOpen: setCancelOpen,
    notification: 'Bạn có chắc chắn muốn xóa tin tức này?',
    subTitle: 'Hành động này sẽ không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?',
    buttonLabel1: 'Hủy',
    buttonLabel2: 'Xóa',
    buttonAction2: async () => 
      {
        await deleteOne(currentDeleteID);
        queryClient.invalidateQueries(['admin_news']);
        setCancelOpen(false)
      }
  };

  // Set prop cho trang
  const navigate = useNavigate();
  const { setLayoutProps } = useLayout();
  useEffect(() => {
    setLayoutProps({
      title: 'Quản lý tin tức',
      description: 'Quản lý danh sách tin tức và bài viết',
      hasButton: true,
      buttonLabel: 'Thêm tin tức',
      buttonAction: () => {
        navigate('/quan-ly-tin-tuc/them-tin-tuc');
      },
    })
  }, [setLayoutProps]);

  // Loading data theo URL
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const filter = searchParams.get('filter') || 'Tất cả thể loại';
  const is_published = searchParams.get('is_published') || 'Tất cả trạng thái';
  const id = searchParams.get('id') || '';
  let news = null;
  let isLoadingNews = false;

  if (id === '') {
    const result = useNews.news.getList(
      query,
      filter === "Tất cả thể loại" ? undefined : filter,
      is_published === 'Đã xuất bản' ? true : (is_published === 'Bản nháp' ? false : undefined),
    );
    news = result.data;
    isLoadingNews = result.isLoading;
  } else {
    const result = useNews.news.getOne(id);
    news = result.data;
    isLoadingNews = result.isLoading;
  }

  const newsList = Array.isArray(news) ? news : news?.results ?? (news ? [news] : []);
  const newsPage = newsList.reduce((acc, item) => {
    const category = item.category || { id: 'unknown', name: 'Không xác định' };
    if (!acc[category.id]) {
      acc[category.id] = {
        category: category,
        news: []
      };
    }
    acc[category.id].news.push(item);
    return acc;
  }, {});

  const {data: newsCategories, isLoading: isLoadingNewsCategories} = useNews.news_categories.getAll();
  const categories = [
    'Tất cả thể loại',
    ...(newsCategories?.map((category) => category.name) ?? []),
  ]
  const display = ['Tất cả trạng thái', 'Đã xuất bản', 'Bản nháp'];

  if (isLoadingNews || isLoadingNewsCategories) 
    return <div>Loading...</div>;

  
  // Handler
  const onSearch = (query, filter, is_published) => {
    const newParams = new URLSearchParams();
    newParams.set('query', query);
    newParams.set('filter', filter);
    newParams.set('is_published', is_published);
    navigate(`/quan-ly-tin-tuc?${newParams.toString()}`);
  }

  const handleEnter = (item) => {
    navigate(`/quan-ly-tin-tuc?id=${item.id}`);
  }

  const handleSearchSuggestion = (query, filter, is_published) => {
    return useNews.getSearchSuggestions(query, filter === 'Tất cả thể loại' ? undefined : filter, is_published);
  };


  // Render
  return (
    <div>
      <div className="flex flex-wrap gap-5 mt-3 mb-4">
        <div className = "bg-white w-[32%] pl-6 py-3 border border-gray-200 rounded-lg shadow-md justify-left">
          <h1 className="text-xl font-semibold text-gray-1300 mt-2">Tổng tin tức</h1>
          <p className="text-[25px] font-bold text-gray-900 pl-1 mt-1">{newsList.length}</p>
          <p className="text-[14px] text-gray-500 mb-2">Bài viết</p>
        </div>

        <div className = "bg-white w-[32%] pl-6 py-3 border border-gray-200 rounded-lg shadow-md justify-left">
          <h1 className="text-xl font-semibold text-gray-1300 mt-2">Đã xuất bản</h1>
          <p className="text-[25px] font-bold text-green-600 pl-1 mt-1">{newsList?.filter(item => item.is_published === true).length ?? 0}</p>
          <p className="text-[14px] text-gray-500 mb-2">Bài viết</p>
        </div>

        <div className = "bg-white w-[32%] pl-6 py-3 border border-gray-200 rounded-lg shadow-md justify-left">
          <h1 className="text-xl font-semibold text-gray-1300 mt-2">Bản nháp</h1>
          <p className="text-[25px] font-bold text-red-500 pl-1 mt-1">{newsList?.filter(item => item.is_published === false).length ?? 0}</p>
          <p className="text-[14px] text-gray-500 mb-2">Bài viết</p>
        </div>
      </div>
      <div className="bg-white p-5 border border-gray-200 rounded-lg shadow-md mb-10 mt-10">
      <SearchBar
        data={{
          hasButtonCategory: true,
          hasButtonDisplay: true,
          placeholder: "Tìm kiếm tin tức...",
          categories: categories,
          displays: display,
          currentQuery: query,
          currentCategory: filter,
          currentDisplay: is_published,
          onSearch: onSearch,
          handleEnter: handleEnter,
          handleSearchSuggestion: handleSearchSuggestion,
        }}
      />
      </div>

      <div>
      {Object.values(newsPage).map(({category, news }) => (
          <div key={category.id} className="mb-6 bg-white p-6 border border-md border-gray-200 rounded-lg shadow-md">
            <h2 className="text-[23px] font-bold text-gray-900 mb-1">{category.name}</h2>
            <p className="text-[14px] text-gray-500">{news.length} tin tức</p>

            <table className='mt-9 w-full table-fixed border-collapse' cellPadding={10}>
              <thead className='text-left border-b border-gray-200 text-[14px] font-normal text-gray-500'>
                <tr>
                  <th className="w-[8%] px-3 py-3">Mã tin tức</th>
                  <th className="w-[10%] px-4 py-3">Ảnh</th>
                  <th className="w-[45%] px-1 py-3">Tiêu đề</th>
                  <th className="w-[11%] px-4 py-3">Trạng thái</th>
                  <th className="w-[11%] px-4 py-3">Ngày xuất bản</th>
                  <th className="w-[11%] px-4 py-3">Thao tác</th>
                </tr>
              </thead>

              <tbody className="text-left">

              {news.map((item) => (
                <tr key={item.id + '-' + category.id} className=" hover:bg-gray-100">
                  <td className="py-4 px-3 text-black-100 font-medium">{item.id}</td>
                  <td className="py-4 px-4">
                    <img src={item.main_img || 'https://via.placeholder.com/50'} className="w-11 h-11 object-cover rounded" />
                  </td>
                  <td className="py-4 px-1 text-black max-w-[530px] overflow-hidden text-ellipsis line-clamp-2">{item.title}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-xl text-[12px] font-semibold ${item.is_published === true ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}>
                      {item.is_published === true ? 'Đã xuất bản' : 'Bản nháp'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-800">{new Date(item.public_date).toLocaleDateString('vi-VN')}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                    <button
                      className="border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200"
                      onClick={() => navigate(`/quan-ly-tin-tuc/chinh-sua-tin-tuc/${item.id}`)}
                    >
                      <EditIcon />
                    </button>

                    <button
                      className="border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200"
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
    <CancelPopup {...cancelPopupData} />
    </div>
  )
}