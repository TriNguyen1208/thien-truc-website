import React, { use } from 'react'
import { useEffect, useState } from 'react';
import { useLayout } from '@/layouts/layoutcontext';
import { SettingIcon, DeleteIcon, EditIcon } from '@/components/Icon';
import useNews from '@/hooks/useNews';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import SearchBar from '@/components/Search';

export default function NewsCategories() {
  const { setLayoutProps } = useLayout();
  useEffect(() => {
    setLayoutProps({
      title: 'Quản lý loại tin tức',
      description: 'Quản lý các danh mục tin tức',
      hasButton: true,
      buttonLabel: 'Thêm loại tin tức',
      buttonAction: () => {
        console.log('Thêm sản phẩm mới');
      },
    })
  }, []);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const filter = searchParams.get('filter') || "Tất cả thể loại";

  const {data: newsCategories, isLoading: isLoadingCategory} = useNews.news_categories.getAll();
  const {data: rawnewsPage, isLoading: isLoadingNewsPage } = useNews.news.getList("", filter === "Tất cả thể loại" ? undefined : filter);
  
  if (isLoadingNewsPage || isLoadingCategory) return <div>Loading...</div>;
  
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
  const newsCountMap = {};
  for (const [categoryId, { news }] of Object.entries(newsPage)) {
    newsCountMap[categoryId] = news.length;
  }

  const onSearch = (query) => {
    const newParams = new URLSearchParams();
    newParams.set('query', query);
    setSearchParams(newParams);
  } 
  const handleSearchSuggestions = (query) => {
    return useNews.getSearchCategoriesSuggestions(query);
  }

  const handleEnter = (item) => {
    const selectedCategory = newsCategories.find((x) => x.id === item.id);
    if (!selectedCategory) return;

    const newParams = new URLSearchParams(searchParams);
    newParams.set("filter", selectedCategory.name);
    setSearchParams(newParams);
  }

  return (
    <div>
      <div className='p-4 bg-white border-b border-gray-200 shadow-sm rounded-t-lg mb-6'>
        <SearchBar
          data={{
          hasButtonCategory: false,
          hasButtonDisplay: false,
          placeholder: "Tìm kiếm theo tên loại tin tức...",
          handleEnter: handleEnter, 
          onSearch: onSearch,
          currentCategory: filter,
          handleSearchSuggestion: handleSearchSuggestions,
          displayMap: null
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
            {(filter !== "Tất cả thể loại" ? newsCategories.filter((category) => category.name === filter) :
            newsCategories).map((category, index) => (
               <tr key={category.id} className='border-b border-gray-200 hover:bg-gray-100'>
                <td className='w-[10%] py-5 pl-12'>{index + 1}</td>
                <td className='w-[30%] py-5 px-4 font-medium'>{category.name}</td>
                <td className='w-[20%] py-5 px-4'>
                  <span className='inline-block w-4 py-2 mt-2 mr-2' style={{ backgroundColor: category.rgb_color }}></span>
                  {category.rgb_color}
                </td>
                <td className='w-[20%] py-5 pl-10'>{newsCountMap[category.id] || 0}</td>
                <td className='w-[20%] py-5 flex items-center gap-3'>
                  <button className='border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200' onClick={() => console.log('Cài đặt loại tin tức', category.id)}>
                    <SettingIcon />
                  </button>
                  <button className='border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200' onClick={() => console.log('Chỉnh sửa loại tin tức', category.id)}>
                    <EditIcon />
                  </button>
                  <button className='border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200' onClick={() => console.log('Xoá loại tin tức', category.id)}>
                    <DeleteIcon />
                  </button>
                </td>
               </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
