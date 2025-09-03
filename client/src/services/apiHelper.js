import axios from "@/services/axiosInstance.js"

// fetchData tái sử dụng nhiều lần, sử dụng try catch để phòng ngừa rủi ro
export const fetchData = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

export const postData = async (url, data) => {
    try {
        const response = await axios.post(url, data);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

export const patchData = async (url, data) => {
    try {
        const response = await axios.patch(url, data);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}