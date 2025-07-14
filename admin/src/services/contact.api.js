import API_ROUTES from "../../../shared/routesAPIServer";
import axiosService from  "@/services/axiosInstance.js"
const axios = axiosService.axiosInstance
const getCompanyInfo = async () => {
    const res = await axios.get(API_ROUTES.contact.company_info);
    return res.data;
}
const patchCompanyInfo = async (updatedData) => {
    const res = await axios.patch(API_ROUTES.contact.updateCompanyInfo, updatedData)
    return res.data
}
export default {getCompanyInfo, patchCompanyInfo};