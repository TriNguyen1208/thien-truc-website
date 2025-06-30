import axios from "@/services/axiosInstance.js"
import API_ROUTES from "../../../shared/routesAPI";
const getAll = async () =>{
    const res = await axios.get(API_ROUTES.recruitment.base);
    return res.data;
}
const getRecruitmentPage = async () => {
    const res = await axios.get(API_ROUTES.recruitment.recruitment_page);
    return res.data;
}
// TODO: Add 
const postRecruitmentForm = async (formData) => {
    const res = await axios.post(API_ROUTES.recruitment.submit_application, formData);
    return res.data;
}
export default {getAll, getRecruitmentPage, postRecruitmentForm};
