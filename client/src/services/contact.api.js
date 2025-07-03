import axios from "@/services/axiosInstance.js"
import API_ROUTES from "../../../shared/routesAPI"
const getAll = async () => {
    const res = await axios.get(API_ROUTES.contact.base);
    return res.data;
}

const getContactPage = async () => {
    const res = await axios.get(API_ROUTES.contact.contact_page);
    return res.data;
}

const getCompanyInfo = async () => {
    const res = await axios.get(API_ROUTES.contact.company_info);
    return res.data;
}
// TODO: add
const postContactForm = async (formData) => {
    const res = await axios.post(API_ROUTES.contact.contact_messages, formData);
    return res.data;
}

const support_agents = {
    getAll: async () => {
        const res = await axios.get(API_ROUTES.contact.support_agents.getAll);
        return res.data;
    },
    getOne: async (id) => {
        const res = await axios.get(API_ROUTES.contact.support_agents.getOne(id));
        return res.data;
    }
}
export default {getAll, getContactPage, getCompanyInfo, postContactForm,support_agents};
