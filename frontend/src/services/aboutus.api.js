import axios from "@/services/axiosInstance.js"
import API_ROUTES from "../../../shared/routesAPI";
const getAll = async () =>{
    console.log(API_ROUTES.about_us.base);
    const res = await axios.get(API_ROUTES.about_us.base);
    return res.data;
}
export default {getAll};