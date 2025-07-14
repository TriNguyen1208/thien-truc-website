import React, { useEffect, useRef, useState } from 'react'
import { LockIcon, LockIconBackground, AccountIcon, EyeIcon, EyeOffIcon } from '../../components/Icon'
import ButtonLayout from "../../components/ButtonLayout"
import {useLocation, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../services/auth.api';
import { toast } from 'react-toastify';
const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isFocusedUser, setIsFocusedUser] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [visible, setIsVisible] = useState(false);

    const wrapperUserRef = useRef();
    const wrapperPasswordRef = useRef();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(loginUser(username, password));
            toast.success("Đăng nhập thành công!");
            navigate(location.state?.from?.pathname || '/');
        } catch{
            toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
        }
    };
    useEffect(()=>{
        const handleClickOutside = (e) => {
            if(wrapperUserRef.current && !wrapperUserRef.current.contains(e.target)){
                setIsFocusedUser(false);
            }   
            if(wrapperPasswordRef.current && !wrapperPasswordRef.current.contains(e.target)){
                setIsFocusedPassword(false);
            } 
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    })
    return (
        <div 
            className='w-screen h-screen flex justify-center items-center'
            style={{
                background: 'linear-gradient(to right, #eff6ff, #e0e7ff)',
            }}
        >
            <div className='flex flex-col rounded-[8px] border border-[#e5e7eb] shadow-sm bg-white px-6 pb-10'>
                <div className='flex flex-col p-6 text-center'>
                    <div className="pb-4 flex justify-center">
                        <LockIconBackground />
                    </div>
                    <div className='pt-1'>
                        <h3 className='font-bold text-2xl'>Đăng nhập</h3>
                    </div>
                    <div className='pt-1'>
                        <p className='text-[#71717A]'>Nhập thông tin đăng nhập để truy cập hệ thống quản trị</p>
                    </div>
                </div>
                <form action="" onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div ref={wrapperUserRef} className='flex flex-col gap-3 pt-1'>
                        <label htmlFor="username" className='text-sm text-[#09090b] font-medium'>Tên đăng nhập</label>
                        <div className={`flex flex-row px-3 gap-4 border border-[#e4e4e7] ${isFocusedUser ? "border-gray-300 outline-none" : ""} h-10 rounded-md`}>
                            <span className='flex items-center'><AccountIcon/></span>
                            <input 
                                type="text" 
                                id='username' 
                                className='w-full outline-none text-sm'
                                value={username}
                                onFocus={() => {
                                    setIsFocusedUser(true);
                                }}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>
                    <div ref={wrapperPasswordRef} className='flex flex-col gap-3 pt-1'>
                        <label htmlFor="password" className='text-sm text-[#09090b] font-medium'>Mật khẩu</label>
                        <div  className={`flex flex-row px-3 gap-4 border border-[#e4e4e7] ${isFocusedPassword ? "border-gray-300 outline-none" : ""} h-10 rounded-md`}>
                            <span className='flex items-center'><LockIcon/></span>
                            <input 
                                type={`${visible ? "text": "password"}`} 
                                id='password' 
                                className='w-full outline-none text-sm'
                                value={password}
                                onFocus={() => {
                                    setIsFocusedPassword(true);
                                }}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span
                                onClick={() => setIsVisible(!visible)}
                                className='flex items-center cursor-pointer'
                            >
                                {visible ? <EyeOffIcon/> : <EyeIcon/>}
                            </span>
                        </div>
                    </div>
                    <div className='mt-2'></div>
                    <ButtonLayout
                        paddingX={16}
                        backgroundColor="#18181B"
                        height={40}
                        htmlType="submit"
                    >
                        Đăng nhập
                    </ButtonLayout>
                </form>
            </div>
        </div>  
    )
}

export default Login