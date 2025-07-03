import axios from "@/services/axiosInstance.js"
import API_ROUTES from "../../../shared/routesAPIServer";

const getHomePage = async () => {
    const res = await axios.get(API_ROUTES.home.home_page);
    return res.data;
}
export default {getHomePage};