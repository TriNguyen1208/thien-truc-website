import axios from "axios";

// TODO: add 
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
    headers: {
        "Content-Type": "application/json"
    }
})
export default axiosInstance
