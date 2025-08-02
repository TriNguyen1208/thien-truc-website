
import React, { useState, useEffect } from 'react';
import PopupForm from './PopupForm';
import { LockIcon, LockIconBackground, AccountIcon, EyeIcon, EyeOffIcon, CheckCircleIcon } from '@/components/Icon';
import { loginUser, sendResetPassword, resetPassword } from '@/services/auth.api';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useLocation, useNavigate, useSearchParams} from 'react-router-dom';
import Loading from '@/components/Loading'

const AuthPopupManager = () => {
  const [step, setStep] = useState('login'); // login | forgot | reset | success
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const rawToken = searchParams.get('token');
  const token = rawToken?.trim();
  const [send, isSending] = useState(false);
  const [kp, iskp] = useState(false);
  const urlStep = searchParams.get('step');

  useEffect(() => {
      if (localStorage.getItem('user')) {
        if (step === 'login') {
          const backTo = location.state?.from?.pathname || '/';
          toast.error('Bạn đã đăng nhập, đăng xuất nếu muốn đăng nhập lại');
          navigate(backTo);
        }
      }
  }, [step, navigate]);

  useEffect(() => {
    if (urlStep === 'forgot') {
      setStep('forgot');
      searchParams.delete('step'); // xóa param khỏi URL
      navigate({ search: searchParams.toString() }, { replace: true });
    } else if (token && step !== 'reset') {
      setStep('reset');
    }
  }, [token, step, urlStep]);
  
  

  const handleLogin = async ({ username, password }) => {
    try {
      const res = await dispatch(loginUser(username, password));
      toast.success(res?.message || 'Đăng nhập thành công');
      navigate(location.state?.from?.pathname || '/');
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || "Đăng nhập thất bại";
      toast.error(message);
    }
  };

  const handleSendReset = async ({ username, email }) => {
    isSending(true);
    try {
      const res = await dispatch(sendResetPassword(username, email)); // <-- lấy res
      if (res.status === 200) {
        toast.success(res.data?.message || 'Đã gửi email khôi phục mật khẩu');
        setStep('sendSuccess');
      } else {
        toast.error(res.data?.message || 'Không thể gửi email khôi phục');
      }
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || "Khôi phục thất bại";
      toast.error(message);
    } finally {
      isSending(false);
    }
  };

  const handleResetPassword = async ({ newPassword, confirmPassword }) => {
    iskp(true);
    if (newPassword !== confirmPassword) {
      return toast.error('Mật khẩu không khớp');
    }
    try {
      const res = await dispatch(resetPassword(token, newPassword)); // <-- lấy res

      if (res.status === 200) {
        toast.success(res.data?.message || 'Khôi phục mật khẩu thành công');
        searchParams.delete('token');
        navigate({ search: searchParams.toString() });
        setStep('success');
      } else {
        toast.error(res?.message || 'Lỗi khi khôi phục mật khẩu');
      }
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || "Lỗi khi khôi phục mật khẩu";
      toast.error(message);
    } finally {
      iskp(false);
    }
  };

  const steps = {
    login: {
      icon: LockIconBackground,
      title: 'Đăng nhập',
      description: 'Nhập thông tin đăng nhập để truy cập hệ thống quản trị',
      onSubmit: handleLogin,
      submitLabel: 'Đăng nhập',
      fields: [
        { name: 'username', label: 'Tên đăng nhập', placeholder: 'Nhập tên đăng nhập', type: 'text', icon: <AccountIcon /> },
        { name: 'password', label: 'Mật khẩu', placeholder: 'Nhập mật khẩu', type: 'passwordToggle', icon: <LockIcon />, eyeIcon: <EyeIcon />, eyeOffIcon: <EyeOffIcon /> }
      ],
      extraAction: 'Quên mật khẩu?',
      onExtraAction: () => setStep('forgot')
    },
    forgot: {
      icon: LockIconBackground,
      title: 'Quên mật khẩu',
      description: 'Nhập tên đăng nhập và email để khôi phục mật khẩu',
      onSubmit: handleSendReset,
      fields: [
        { name: 'username', label: 'Tên đăng nhập', placeholder: 'Nhập tên đăng nhập', type: 'text', icon: <AccountIcon /> },
        { name: 'email', label: 'Email', placeholder: 'Nhập email', type: 'email', icon: <LockIcon /> }
      ],
      extraAction: 'Trở lại đăng nhập',
      onExtraAction: () => setStep('login'),
      submitLabel: 'Gửi yêu cầu'
    },
    sendSuccess: {
      icon: CheckCircleIcon,
      title: 'Yêu cầu đã được gửi',
      description: 'Vui lòng kiểm tra email để khôi phục mật khẩu',
      onSubmit: () => setStep('login'),
      fields: [],
      submitLabel: 'Trở lại đăng nhập',
    },
    reset: {
      icon: LockIconBackground,
      title: 'Khôi phục mật khẩu',
      description: 'Đặt lại mật khẩu mới cho tài khoản của bạn',
      onSubmit: handleResetPassword,
      fields: [
        { name: 'newPassword', label: 'Mật khẩu mới', placeholder: 'Nhập mật khẩu mới', type: 'passwordToggle', icon: <LockIcon />, eyeIcon: <EyeIcon />, eyeOffIcon: <EyeOffIcon /> },
        { name: 'confirmPassword', label: 'Xác nhận mật khẩu', placeholder: 'Nhập lại mật khẩu', type: 'passwordToggle', icon: <LockIcon />, eyeIcon: <EyeIcon />, eyeOffIcon: <EyeOffIcon /> }
      ],
      submitLabel: 'Xác nhận'
    },
    success: {
      icon: CheckCircleIcon,
      title: 'Khôi phục mật khẩu thành công!',
      onSubmit: () => setStep('login'),
      fields: [],
      submitLabel: 'Về trang đăng nhập'
    }
  };

  const currentStep = steps[step];

  if (step === 'forgot' && send) return <Loading />;
  if (step === 'reset' && kp) return <Loading />;
  return (
    <PopupForm
      icon={currentStep.icon}
      title={currentStep.title}
      description={currentStep.description}
      fields={currentStep.fields}
      onSubmit={currentStep.onSubmit}
      submitLabel={currentStep.submitLabel}
      extraAction={currentStep.extraAction}
      onExtraAction={currentStep.onExtraAction}
    />
  );
};

export default AuthPopupManager;
