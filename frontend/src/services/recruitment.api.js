import axios from "@/services/axiosInstance.js"
import API_ROUTES from "../../../shared/routesAPI";
const getAll = async () =>{
    const res = await axios.get(API_ROUTES.recruitment.base);
    return res;
}
const getRecruitmentPage = async () => {
    const res = await axios.get(API_ROUTES.recruitment.recruitment_page);
    return res;
}
export default {getAll, getRecruitmentPage};