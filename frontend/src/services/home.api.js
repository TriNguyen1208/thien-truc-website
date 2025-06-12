import axios from "@/services/axiosInstance.js"

const getAll = async () =>{
    const res = await axios.get("/home");
    return res.data;
}
export default {getAll};