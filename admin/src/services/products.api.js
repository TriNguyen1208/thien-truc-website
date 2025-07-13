import axios from "@/services/axiosInstance.js"
import API_ROUTES from "../../../shared/routesAPIServer";


const getProductPage = async () => {
    const res = await axios.get(API_ROUTES.product.product_page);
    return res.data;
}

const patchProductPage = async (updatedPage)=> {
    const res = await axios.patch(API_ROUTES.product.update_product_page, updatedPage)
    return res.data;
}

export default {
    getProductPage,
    patchProductPage
}