import axios from "@/services/axiosInstance.js"
import API_ROUTES from "../../../shared/routesAPIServer";

const getPricePage = async () => {
    const res = await axios.get(API_ROUTES.product.price_page);
    return res.data;
}
export default {getPricePage };
