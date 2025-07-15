import axios from "@/services/axiosInstance.js"
import API_ROUTES from "../../../shared/routesAPIServer";
import { setCredentials, logout, setLoading } from '../slices/auth.slice';

export const loginUser = (username, password) => async (dispatch) => {
    try {
        const res = await axios.post(API_ROUTES.auth.login, {
            username,
            password
        });
        const { accessToken, refreshToken } = res.data.token;
        const role = res.data.role || 'manager';

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('role', role); // Lưu role vào localStorage
        dispatch(setCredentials({accessToken, refreshToken, role}))
        // Chuyển hướng sang trang chính sau khi login
    } catch (err) {
        console.error('Đăng nhập thất bại:', err);
        throw err;
    }
};
export const verifyFromToken = () => async (dispatch) => {
    dispatch(setLoading(true));
    try{
        await axios.get(API_ROUTES.auth.verifyLogin);
        dispatch(setCredentials({
            accessToken: localStorage.getItem('accessToken'),
            refreshToken: localStorage.getItem('refreshToken'),
            role: localStorage.getItem('role') // Lấy role từ localStorage
        }));
    }catch{
        dispatch(logout());
    }finally{
        dispatch(setLoading(false))
    }
}
