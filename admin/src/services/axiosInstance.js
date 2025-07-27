import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true, // Gửi cookie (accessToken/refreshToken) kèm theo request
    headers: { "Content-Type": "application/json" }
});

// Tự động gọi refresh token nếu accessToken hết hạn
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const res = await axios.post(API_ROUTES.auth.refreshToken, { refreshToken });
                if (res.status === 200) {
                    return api(originalRequest);
                }
            } catch {
                window.location.href = '/dang-nhap';
            }
        }

        return Promise.reject(error);
    }
);

export default api;