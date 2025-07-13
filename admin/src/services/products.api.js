import axios from "@/services/axiosInstance.js"
import API_ROUTES from "../../../shared/routesAPIServer";

const getPricePage = async () => {
    const res = await axios.get(API_ROUTES.product.price_page);
    return res.data;
}
const patchPricePage = async (updatedPage)=>{
    const res = await axios.patch(API_ROUTES.product.update_price_page, updatedPage)
    return res.data
}
export default {getPricePage, patchPricePage };
