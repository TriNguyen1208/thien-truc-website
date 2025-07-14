import axios from "@/services/axiosInstance.js"
import API_ROUTES from "../../../shared/routesAPIServer";
import { setCredentials, logout } from '../slices/auth.slice';

export const loginUser = (username, password) => async (dispatch) => {
    try {
        const res = await axios.post(API_ROUTES.auth.login, {
            username,
            password
        });
        const { accessToken, refreshToken } = res.data.token;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        dispatch(setCredentials({accessToken, refreshToken}))
        // Chuyển hướng sang trang chính sau khi login
    } catch (err) {
        console.error('Đăng nhập thất bại:', err);
        throw err
    }
};
export const verifyFromToken = () => async (dispatch) => {
    
}
