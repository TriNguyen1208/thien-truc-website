import axios from "axios";

// TODO: add 
const axiosInstance = axios.create({
    headers: {
        "Content-Type": "application/json"
    }
})
export default axiosInstance