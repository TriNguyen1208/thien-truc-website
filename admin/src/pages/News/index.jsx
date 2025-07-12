import React from 'react'
import { useEffect } from 'react';
import { useLayout } from '@/layouts/layoutcontext';
import { useSearchParams } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';
import useNews from '@/hooks/useNews';
import { EditIcon, DeleteIcon } from '@/components/Icon';
import SearchBar from '@/components/Search';

function normalizeNewsData(data) {
  if (Array.isArray(data)) return data;
  return data?.results ?? [];
}

export default function News() {

  const navigate = useNavigate();
  const { setLayoutProps } = useLayout();
  useEffect(() => {
    setLayoutProps({
      title: 'Quản lý tin tức',
      description: 'Quản lý danh sách tin tức và bài viết',
      hasButton: true,
      buttonLabel: 'Thêm tin tức',
      buttonAction: () => {
        console.log('Thêm sản phẩm mới');
      },
    })
  }, [setLayoutProps]);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const is_published = searchParams.get('is_published') || '';

  const { data: newsfilter, isLoading: isLoadingfilter } = useNews.news_categories.getAll();
  const newsCategory = [
    'Tất cả thể loại',
    ...(newsfilter?.map((filter) => filter.name) ?? []),
  ]
  const rawFilter = searchParams.get('filter');
  const categories = newsfilter?.map((filter) => filter.name) ?? [];
  const filter = rawFilter && categories.includes(rawFilter) ? rawFilter : "Tất cả thể loại";
  const { data: rawnewsPage, isLoading: isLoadingNewsPage } = useNews.news.getList(query, filter === "Tất cả thể loại" ? undefined : filter, is_published);

  if (isLoadingNewsPage || isLoadingfilter) return <div>Loading...</div>;

  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    if (key !== 'page') newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handleButton = (query, filter) => {
    const newParams = new URLSearchParams();
    newParams.set('query', query);
    newParams.set('filter', filter);
    newParams.set('is_published', is_published);
    setSearchParams(newParams);
  }

  const handleSearchSuggestion = (query, category) => {
    return useNews.news.getList(
      query,
      category === "Tất cả thể loại" ? undefined : category,
      is_published
    );
  };

  const rawResults = Array.isArray(rawnewsPage)
  ? rawnewsPage
  : (rawnewsPage?.results ?? []);

  const newsPage = rawResults.reduce((acc, item) => {
  const categoryId = item.category?.id;
  if (!categoryId) return acc;

  if (!acc[categoryId]) {
    acc[categoryId] = {
      category: item.category,
      news: []
    };
  }
    acc[categoryId].news.push(item);
    return acc;
  }, {});

  return (
    <div>
      <div className="flex flex-wrap gap-5 mt-3 mb-4">
        <div className = "bg-white w-[32%] pl-6 py-3 border border-gray-200 rounded-lg shadow-md justify-left">
          <h1 className="text-xl font-semibold text-gray-1300 mt-2">Tổng tin tức</h1>
          <p className="text-[25px] font-bold text-gray-900 pl-1 mt-1">{rawnewsPage.length}</p>
          <p className="text-[14px] text-gray-500 mb-2">Bài viết</p>
        </div>

        <div className = "bg-white w-[32%] pl-6 py-3 border border-gray-200 rounded-lg shadow-md justify-left">
          <h1 className="text-xl font-semibold text-gray-1300 mt-2">Đã xuất bản</h1>
          <p className="text-[25px] font-bold text-green-600 pl-1 mt-1">{rawnewsPage?.filter(item => item.is_published === true).length ?? 0}</p>
          <p className="text-[14px] text-gray-500 mb-2">Bài viết</p>
        </div>

        <div className = "bg-white w-[32%] pl-6 py-3 border border-gray-200 rounded-lg shadow-md justify-left">
          <h1 className="text-xl font-semibold text-gray-1300 mt-2">Bản nháp</h1>
          <p className="text-[25px] font-bold text-red-500 pl-1 mt-1">{rawnewsPage?.filter(item => item.is_published === false).length ?? 0}</p>
          <p className="text-[14px] text-gray-500 mb-2">Bài viết</p>
        </div>
      </div>
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-md mb-6">
      <SearchBar
        data={{
          hasButtonCategory: true,
          hasButtonDisplay: false,
          placeholder: "Tìm kiếm tin tức...",
          handleEnter: (item) => {
            navigate(`/admin/news/${item.id}`);
          },
          onSearch: handleButton,  // ✅ chính là hàm update URL param
          categories: newsCategory,
          currentQuery: query,
          currentCategory: filter,
          currentDisplay: null,
          handleSearchSuggestion,
          displayMap: null
        }}
      />
      </div>

      <div>
      {Object.values(newsPage).map(({ category, news }) => (
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
                      onClick={() => navigate(`/admin/news/${item.id}`)}
                    >
                      <EditIcon />
                    </button>

                    <button
                      className="border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200"
                      onClick={() => {
                        if (window.confirm('Bạn có chắc chắn muốn xóa tin tức này?')) {
                          // Xử lý xóa tin tức
                          console.log(`Xóa tin tức với ID: ${item.id}`);
                        }
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
    </div>
  )
}