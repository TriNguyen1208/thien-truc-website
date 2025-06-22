import axios from "@/services/axiosInstance.js"
import API_ROUTES from "../../../shared/routesAPI";

const getAll = async () => {
    const res = await axios.get(API_ROUTES.about_us.base);
    return res.data;
}

const getAboutUsPage = async () => {
    const res = await axios.get(API_ROUTES.about_us.about_us_page);
    return res.data;
}

const company_services = {
    getAll: async () => {
        const res = await axios.get(API_ROUTES.about_us.company_services.getAll);
        return res.data;
    },
    getOne: async (id) => {
        const res = await axios.get(API_ROUTES.about_us.company_services.getOne(id));
        return res.data;
    }
}

const why_choose_us = {
    getAll: async () => {
        const res = await axios.get(API_ROUTES.about_us.why_choose_us.getAll);
        return res.data;
    },
    getOne: async (id) => {
        const res = await axios.get(API_ROUTES.about_us.why_choose_us.getOne(id));
        return res.data;
    }
}
export default {getAll, getAboutUsPage, company_services, why_choose_us};