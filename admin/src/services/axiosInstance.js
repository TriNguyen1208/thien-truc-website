import axios from "axios";

const axiosInstance = axios.create({
    headers: { "Content-Type": "application/json" }
});

const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: { "Content-Type": "application/json" }
});

// Gắn accessToken vào mỗi request nếu có
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Tự động gọi refresh token nếu accessToken hết hạn
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const res = await axios.post('http://localhost:3000/refresh-token', { refreshToken });

                if (res.status === 200) {
                    const newAccessToken = res.data.accessToken;
                    localStorage.setItem('accessToken', newAccessToken);
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login'; // hoặc xử lý theo app bạn
            }
        }

        return Promise.reject(error);
    }
);

export { axiosInstance, api };