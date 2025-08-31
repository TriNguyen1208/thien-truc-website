import axios from "@/services/axiosInstance.js"
import API_ROUTES from "../../../shared/routesAPIServer";

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
const company_info = {
    get: async () => {
        const res = await axios.get(API_ROUTES.contact.company_info.get);
        return res.data;
    },
    update: async (data) => {
        const res = await axios.patch(API_ROUTES.contact.company_info.update, data)
        return res.data
    }
}

const support_agents =  {
    getAll: async () => {
        const res = await axios.get(API_ROUTES.contact.support_agents.getAll);
        return res.data;
    },
    createOne: async (data) => {
        const res = await axios.post(API_ROUTES.contact.support_agents.createOne, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            timeout: 20000
        });
        return res.data;
    },
    updateOne: async (id, data) => {
        const res = await axios.patch(API_ROUTES.contact.support_agents.updateOne(id), data, {
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

const getQuantity = async ()=>{
    const res = await axios.get(API_ROUTES.contact.count)
    return res.data
}

export default {
    getContactPage,
    updateContactPage,
    company_info,
    support_agents,
    getQuantity
}
