import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '@/slices/auth.slice.js';
import { useNavigate } from 'react-router-dom';

export default function AuthGate({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log('AuthGate rendered', localStorage.getItem('user'));
  useEffect(() => {
    const user = localStorage.getItem('user');
    console.log('No user found, redirecting to login');
    if (!user) {
      dispatch(logout());
      navigate('/dang-nhap', { replace: true });
    }
  }, []);

  return children;
}
