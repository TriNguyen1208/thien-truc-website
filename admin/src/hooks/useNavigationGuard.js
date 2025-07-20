import { useBlocker } from 'react-router-dom';
import { useEffect, useRef } from 'react';
const useNavigationGuard = (shouldWarn) => {

  // Cảnh báo khi reload hoặc đóng tab
  const shouldWarnRef = useRef(shouldWarn);
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
  const blocker = useBlocker(() => shouldWarnRef.current);

  useEffect(() => {
    if (blocker.state !== 'blocked') return;

    const confirm = window.confirm("Bạn có chắc chắn muốn rời khỏi? Dữ liệu sẽ bị mất.");

    if (confirm) {
      shouldWarnRef.current = false;
      blocker.proceed(); // chuyển trang
    } else {
      // Không làm gì => giữ nguyên trang hiện tại
    }
  }, [blocker]);
};
export default useNavigationGuard;




