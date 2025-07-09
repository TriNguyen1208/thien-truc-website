import React from 'react'
import { useEffect } from 'react';
import { useLayout } from '@/layouts/layoutcontext';
import { useSearchParams } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';
import useNews from '@/hooks/useNews';

const MockData = [
  {category_id: 1, id: 'TT001', title: 'Tin tức 1', content: 'Nội dung tin tức 1', state: 'published', public_date: '2023-10-01' },
  {category_id: 1, id: 'TT002', title: 'Tin tức 2', content: 'Nội dung tin tức 2', state: 'draft', public_date: '2023-10-02' },
  {category_id: 1, id: 'TT003', title: 'Tin tức 3', content: 'Nội dung tin tức 3', state: 'published', public_date: '2023-10-03' },
  {category_id: 2, id: 'TT001', title: 'Tin tức 1', content: 'Nội dung tin tức 1', state: 'published', public_date: '2023-10-01' },
  {category_id: 2, id: 'TT002', title: 'Tin tức 2', content: 'Nội dung tin tức 2', state: 'draft', public_date: '2023-10-02' },
  {category_id: 3, id: 'TT003', title: 'Tin tức 3', content: 'Nội dung tin tức 3', state: 'published', public_date: '2023-10-03' },
  {category_id: 4, id: 'TT001', title: 'Tin tức 1', content: 'Nội dung tin tức 1', state: 'published', public_date: '2023-10-01' },
  {category_id: 5, id: 'TT002', title: 'Tin tức 2', content: 'Nội dung tin tức 2', state: 'draft', public_date: '2023-10-02' },
  {category_id: 5, id: 'TT003', title: 'Tin tức 3', content: 'Nội dung tin tức 3', state: 'published', public_date: '2023-10-03' },
];

const MockCategories = [
  { id: 1, name: 'Tin tức chung' },
  { id: 2, name: 'Tin tức công nghệ' },
  { id: 3, name: 'Tin tức thể thao' },
  { id: 4, name: 'Tin tức giải trí' },
  { id: 5, name: 'Tin tức kinh doanh' }
];

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

  console.log('rawnewsPage', rawnewsPage);
  if (isLoadingNewsPage || isLoadingfilter) return <div>Loading...</div>;

  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    if (key !== 'page') newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handleButton = (filter, query) => {
    const newParams = new URLSearchParams();
    newParams.set('query', query);
    newParams.set('filter', filter);
    newParams.set('is_published', is_published);
    setSearchParams(newParams);
  }

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

      <div>
      {Object.values(newsPage).map(({ category, news }) => (
          <div key={category.id} className="mb-6 bg-white p-6 border border-md border-gray-200 rounded-lg shadow-md">
            <h2 className="text-[23px] font-bold text-gray-900 mb-1">{category.name}</h2>
            <p className="text-[14px] text-gray-500">{news.length} tin tức</p>

            <table className='mt-9' cellPadding={10}>
              <thead className='text-left border-b border-gray-200 text-[14px] font-normal text-gray-500'>
                <tr>
                  <th className='pb-3 pl-3 w-[8%] pr-3'>Mã tin tức</th>
                  <th className='pb-3 pl-4 w-[10%]'>Ảnh</th>
                  <th className='pb-3 pl-1 w-[45%]'>Tiêu đề</th>
                  <th className='pb-3 w-[13%]'>Trạng thái</th>
                  <th className='pb-3 w-[12%]'>Ngày xuất bản</th>
                  <th className='pb-3 pl-3 w-[10%]'>Thao tác</th>
                </tr>
              </thead>

              <tbody className="text-left">

              {news.map((item) => (
                <tr key={item.id + '-' + category.id} className=" hover:bg-gray-100">
                  <td className="py-3 px-4 text-black-100 font-medium">{item.id}</td>
                  <td className="py-3 px-4">
                    <img src={item.main_img || 'https://via.placeholder.com/50'} className="w-12 h-12 object-cover rounded" />
                  </td>
                  <td className="py-3 px-1 text-black">{item.title}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-xl text-[12px] font-semibold ${item.state === 'published' ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}>
                      {item.state}
                    </span>
                  </td>
                  <td className="py-3  text-gray-800">{item.public_date}</td>
                  <td className="py-3 pl-3">
                    <button 
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => navigate(`/admin/news/${item.id}`)}
                    >
                      Xem chi tiết
                    </button>
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