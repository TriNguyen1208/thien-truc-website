import React from 'react'
import { useEffect } from 'react';
import { useLayout } from '@/layouts/layoutcontext';
import { useSearchParams } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';

const MockData = [
  {category_id: 1, id: 1, title: 'Tin tức 1', content: 'Nội dung tin tức 1', state: 'published', public_date: '2023-10-01' },
  {category_id: 1, id: 2, title: 'Tin tức 2', content: 'Nội dung tin tức 2', state: 'draft', public_date: '2023-10-02' },
  {category_id: 1, id: 3, title: 'Tin tức 3', content: 'Nội dung tin tức 3', state: 'published', public_date: '2023-10-03' },
  {category_id: 2, id: 1, title: 'Tin tức 1', content: 'Nội dung tin tức 1', state: 'published', public_date: '2023-10-01' },
  {category_id: 2, id: 2, title: 'Tin tức 2', content: 'Nội dung tin tức 2', state: 'draft', public_date: '2023-10-02' },
  {category_id: 3, id: 3, title: 'Tin tức 3', content: 'Nội dung tin tức 3', state: 'published', public_date: '2023-10-03' },
  {category_id: 4, id: 1, title: 'Tin tức 1', content: 'Nội dung tin tức 1', state: 'published', public_date: '2023-10-01' },
  {category_id: 5, id: 2, title: 'Tin tức 2', content: 'Nội dung tin tức 2', state: 'draft', public_date: '2023-10-02' },
  {category_id: 5, id: 3, title: 'Tin tức 3', content: 'Nội dung tin tức 3', state: 'published', public_date: '2023-10-03' },
];

const MockCategories = [
  { id: 1, name: 'Tin tức chung' },
  { id: 2, name: 'Tin tức công nghệ' },
  { id: 3, name: 'Tin tức thể thao' },
  { id: 4, name: 'Tin tức giải trí' },
  { id: 5, name: 'Tin tức kinh doanh' }
];

export default function Product() {

  const navigate = useNavigate();
  const { setLayoutProps } = useLayout();
  const [news, setNews] = React.useState(MockData);
  const [categories, setCategories] = React.useState(MockCategories);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const filter = searchParams.get('filter') || '';
  const state = searchParams.get('state') || '';

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
  }, []);

  
  return (
    <div>
      <div className="flex flex-wrap gap-5 mt-3 mb-4">

      <div className = "bg-white w-[32%] pl-6 py-3 border border-gray-200 rounded-lg shadow-md justify-left">
        <h1 className="text-xl font-semibold text-gray-1300 mt-2">Tổng tin tức</h1>
        <p className="text-[25px] font-bold text-gray-900 pl-1 mt-1">{MockData.length}</p>
        <p className="text-[14px] text-gray-500 mb-2">Bài viết</p>
      </div>

      <div className = "bg-white w-[32%] pl-6 py-3 border border-gray-200 rounded-lg shadow-md justify-left">
        <h1 className="text-xl font-semibold text-gray-1300 mt-2">Đã xuất bản</h1>
        <p className="text-[25px] font-bold text-green-600 pl-1 mt-1">{MockData.filter(item => item.state === 'published').length}</p>
        <p className="text-[14px] text-gray-500 mb-2">Bài viết</p>
      </div>

      <div className = "bg-white w-[32%] pl-6 py-3 border border-gray-200 rounded-lg shadow-md justify-left">
        <h1 className="text-xl font-semibold text-gray-1300 mt-2">Bản nháp</h1>
        <p className="text-[25px] font-bold text-red-500 pl-1 mt-1">{MockData.filter(item => item.state === 'draft').length}</p>
        <p className="text-[14px] text-gray-500 mb-2">Bài viết</p>
      </div>
      </div>
    </div>
  )
}