import API_ROUTES from "../../../shared/routesAPIServer";
import axios from  "@/services/axiosInstance.js"
const getCompanyInfo = async () => {
    const res = await axios.get(API_ROUTES.contact.company_info);
    return res.data;
}
const patchCompanyInfo = async (updatedData) => {
    const res = await axios.patch(API_ROUTES.contact.updateCompanyInfo, updatedData)
    return res.data
}
export default {getCompanyInfo, patchCompanyInfo};