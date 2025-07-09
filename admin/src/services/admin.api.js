import axios from "@/services/axiosInstance.js"
import API_ROUTES from "../../../shared/routesAPIServer";
const getQuantity = async()=>{
    const res = await axios.get(API_ROUTES.admin.count)
    return res.data
}
export default {  getQuantity };
