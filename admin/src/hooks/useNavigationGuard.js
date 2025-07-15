import { useEffect, useContext, useRef } from 'react';
import { UNSAFE_NavigationContext } from 'react-router-dom';
import useConfirmModal from './useConfirmModal';

const useNavigationGuard = (shouldWarn) => {
  const navigator = useContext(UNSAFE_NavigationContext).navigator;
  const { confirm, modal } = useConfirmModal();
  // Cảnh báo khi reload hoặc đóng tab
  const shouldWarnRef = useRef(shouldWarn);
  const patchedRef = useRef(false);

  // Luôn cập nhật shouldWarn mới nhất vào ref
  useEffect(() => {
    shouldWarnRef.current = shouldWarn;
  }, [shouldWarn]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!shouldWarnRef.current) return;
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []); // ✅ chỉ gắn 1 lần duy nhất

  // Chặn điều hướng nội bộ
  useEffect(() => {
    if (patchedRef.current) return;
    const originalPush = navigator.push;
    const originalReplace = navigator.replace;
    const showConfirm = async (method, ...args) => {
      if (!shouldWarnRef.current) return method(...args);
      const result = await confirm();
      if (result) {
        navigator.push = originalPush;
        navigator.replace = originalReplace;
        method(...args);
      }
    };

    navigator.push = (...args) => showConfirm(originalPush, ...args);
    navigator.replace = (...args) => showConfirm(originalReplace, ...args);

    patchedRef.current = true;

    return () => {
      navigator.push = originalPush;
      navigator.replace = originalReplace;
      patchedRef.current = false;
    };
  }, [confirm, navigator]);

  return modal; // Render modal ở component chính
};

export default useNavigationGuard;
