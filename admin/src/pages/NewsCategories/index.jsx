import React from 'react'
import { useEffect } from 'react';
import { useLayout } from '@/layouts/layoutcontext';

const NewsCategories = () => {
  const { setLayoutProps } = useLayout();
  useEffect(() => {
    setLayoutProps({
      title: 'Quản lý tin tức 1',
      description: 'Quản lý danh sách tin tức và bài viết 1',
      hasButton: true,
      buttonLabel: 'Thêm tin tức 1',
      buttonAction: () => {
        console.log('Thêm sản phẩm mới');
      },
    })
  }, []);
  return (
    <div>Day la noi dung trang NewsCategories</div>
  )
}

export default NewsCategories