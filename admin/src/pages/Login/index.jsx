// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// import { LockIcon, LockIconBackground, AccountIcon, EyeIcon, EyeOffIcon } from '../../components/Icon'
// import { loginUser } from '../../services/auth.api';
// import PopupForm from './PopupForm';

// const Login = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const handleLogin = async ({ username, password }) => {
//     try {
//       await dispatch(loginUser(username, password));
//       toast.success('Đăng nhập thành công!');
//       navigate(location.state?.from?.pathname || '/');
//     } catch {
//       toast.error('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
//     }
//   };

//   return (
//     <PopupForm
//       icon={LockIconBackground}
//       title="Đăng nhập"
//       description="Nhập thông tin đăng nhập để truy cập hệ thống quản trị"
//       buttonText="Đăng nhập"
//       onSubmit={handleLogin}
//       fields={[
//         {
//           name: 'username',
//           label: 'Tên đăng nhập',
//           placeholder: 'Nhập tên đăng nhập',
//           type: 'text',
//           icon: <AccountIcon />
//         },
//         {
//           name: 'password',
//           label: 'Mật khẩu',
//           placeholder: 'Nhập mật khẩu',
//           type: 'passwordToggle',
//           eyeIcon: <EyeIcon />,
//           eyeOffIcon: <EyeOffIcon />,
//           icon: <LockIcon />
//         }
//       ]}
//     extraAction={
//         <div className="text-right mt-1 text-sm text-gray-500 hover:underline cursor-pointer">
//         Quên mật khẩu?
//         </div>
//     }
//     submitLabel='Đăng nhập'
//     />
//   );
// };

// export default Login;

import React, { useState } from 'react';
import PopupForm from './PopupForm';
import { LockIcon, LockIconBackground, AccountIcon, EyeIcon, EyeOffIcon, CheckCircleIcon } from '@/components/Icon';
import { loginUser } from '@/services/auth.api';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthPopupManager = () => {
  const [step, setStep] = useState('login'); // login | forgot | reset | success
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = async ({ username, password }) => {
    try {
      await dispatch(loginUser(username, password));
      toast.success('Đăng nhập thành công!');
      navigate(location.state?.from?.pathname || '/');
      // điều hướng hoặc đóng popup
    } catch {
      toast.error('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    }
  };

  const handleSendReset = async ({ username, email }) => {
    try {
    //   await sendResetEmail({ username, email });
      setStep('reset');
    } catch {
      toast.error('Không thể gửi email khôi phục');
    }
  };

  const handleResetPassword = async ({ newPassword, confirmPassword }) => {
    if (newPassword !== confirmPassword) {
      return toast.error('Mật khẩu không khớp');
    }
    try {
    //   await resetPassword({ newPassword }); // giả định có token gửi từ link email
      setStep('success');
    } catch {
      toast.error('Lỗi khi khôi phục mật khẩu');
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
  console.log(step);
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
