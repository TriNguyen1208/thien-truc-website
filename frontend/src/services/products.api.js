import axios from "@/services/axiosInstance.js"

const getAll = async () =>{
    const res = await axios.get("/products");
    return res.data;
}
const getId = async (id) => {
    const res = await axios.get(`/products/${id}`);
    return res.data;
}
export default {getAll, getId};