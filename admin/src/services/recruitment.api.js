import axios from "@/services/axiosInstance.js"
import API_ROUTES from "../../../shared/routesAPIServer";

const getAll = async () =>{
    const res = await axios.get(API_ROUTES.recruitment.base);
    return res.data;
}

const getRecruitmentPage = async () => {
    const res = await axios.get(API_ROUTES.recruitment.recruitment_page);
    return res.data;
}

const submitApplication = async (data) => {
    const res = await axios.post(API_ROUTES.recruitment.submitApplication, data);
    return res.data;
}

const updateRecruimentPage = {
    banner: async (data) => {
        const res = await axios.patch(API_ROUTES.recruitment.updateRecruitmentPage.banner, data);
        return res.data;
    },
    visibility: async (data) => {
        const res = await axios.patch(API_ROUTES.recruitment.updateRecruitmentPage.visibility, data);
        return res.data;
    },
    culture: async (data) => {
        const res = await axios.patch(API_ROUTES.recruitment.updateRecruitmentPage.culture, data);
        return res.data;
    },
    culture_images: async (data) => {
        const res = await axios.patch(API_ROUTES.recruitment.updateRecruitmentPage.culture_images, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            timeout: 20000
        });
        return res.data;
    }
}

export default {
    getAll, 
    getRecruitmentPage, 
    submitApplication, 
    updateRecruimentPage
};
