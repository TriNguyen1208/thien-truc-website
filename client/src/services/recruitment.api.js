import { fetchData, postData } from "./apiHelper";
import API_ROUTES from "../../../shared/routesAPI";
const recruitmentServices = {
    general: {
        getAll: async () => fetchData(API_ROUTES.recruitment.base),
        getRecruitmentPage: async () => fetchData(API_ROUTES.recruitment.recruitment_page),
        postRecruitmentForm: async (formData) => postData(API_ROUTES.recruitment.submit_application, formData)
    }
}

export default recruitmentServices;
