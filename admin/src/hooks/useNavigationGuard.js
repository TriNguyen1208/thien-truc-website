import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { UNSAFE_NavigationContext, useLocation } from 'react-router-dom'
import {Modal} from 'antd'
const useNavigationGuard = (shouldWarn) => {
  const location = useLocation();
  const navigator = useContext(UNSAFE_NavigationContext).navigator;

  //Cảnh báo khi rời khỏi hoăc reload trang
  useEffect(() => {
      const handleBeforeSave = (e) => {
          if(!shouldWarn) return;
          e.preventDefault();
          e.returnValue = '';
      }
      window.addEventListener('beforeunload', handleBeforeSave);
      return () => window.removeEventListener('beforeunload', handleBeforeSave);
  }, [shouldWarn])
  useEffect(() => {
      if(!shouldWarn) return;
      const originalPush = navigator.push;
      const originalReplace = navigator.replace;
      const showConfirm = (method, ...args) => {
        Modal.confirm({
          title: 'Rời khỏi trang?',
          content: 'Bạn có chắc chắn muốn rời khỏi? Dữ liệu chưa lưu sẽ bị mất.',
          okText: 'Rời đi',
          cancelText: 'Ở lại',
          onOk: () => {
            navigator.push = originalPush;
            navigator.replace = originalReplace;
            method(...args); // tiếp tục chuyển route
          },
      })};
      navigator.push = (...args) => showConfirm(originalPush, ...args);
      navigator.replace = (...args) => showConfirm(originalReplace, ...args);
  
      return () => {
        navigator.push = originalPush;
        navigator.replace = originalReplace;
      };
  }, [shouldWarn, navigator, location])
}
export default useNavigationGuard