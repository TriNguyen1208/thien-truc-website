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
const getContactPage = async () => {
    const res = await axios.get(API_ROUTES.contact.contact_page);
    return res.data;
}
const updateContactPage = {
    banner: async (data) => {
        const res = await axios.patch(API_ROUTES.contact.updateContactPage.banner, data);
        return res.data;
    },
    visibility: async (data) => {
        const res = await axios.patch(API_ROUTES.contact.updateContactPage.visibility, data);
        return res.data;
    }
}
const patchCompanyInfo = async (updatedData) => {
    const res = await axios.patch(API_ROUTES.contact.updateCompanyInfo, updatedData)
    return res.data
}
const support_agents =  {
    getAll: async () => {
        const res = await axios.get(API_ROUTES.contact.support_agents.getAll);
        return res.data;
    },
    getOne: async (id) => {
        const res = await axios.get(API_ROUTES.contact.support_agents.getOne(id) );
        return res.data;
    },
    createOne: async (newsupport_agents) => {
        const res = await axios.post(API_ROUTES.contact.support_agents.createOne, newsupport_agents, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            timeout: 20000
        });
        return res.data;
    },
    updateOne: async (id, updatedsupport_agents) => {
        const res = await axios.patch(API_ROUTES.contact.support_agents.updateOne(id), updatedsupport_agents, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            timeout: 20000
        });
        return res.data;
    },
    deleteOne: async (id) => {
        const res = await axios.delete(API_ROUTES.contact.support_agents.deleteOne(id) );
        return res.data;
    },
}
export default {support_agents, getCompanyInfo, patchCompanyInfo, getQuantity,
    getContactPage, 
    updateContactPage
}
