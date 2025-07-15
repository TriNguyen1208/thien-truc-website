import axios from "@/services/axiosInstance.js"
import API_ROUTES from "../../../shared/routesAPIServer";
const getQuantity = async()=>{
    const res = await axios.get(API_ROUTES.contact.count)
    return res.data
}
const getCompanyInfo = async () => {
    const res = await axios.get(API_ROUTES.contact.company_info);
    return res.data;
}
const patchCompanyInfo = async (updatedData) => {
    const res = await axios.patch(API_ROUTES.contact.updateCompanyInfo, updatedData)
    return res.data
}
export default {getCompanyInfo, patchCompanyInfo, getQuantity};
