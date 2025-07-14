import axiosService from "@/services/axiosInstance.js"
import API_ROUTES from "../../../shared/routesAPIServer";

const axios = axiosService.axiosInstance
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
        const res = await axios.post(API_ROUTES.contact.support_agents.createOne, newsupport_agents);
        return res.data;
    },
    updateOne: async (id, updatedsupport_agents) => {
        const res = await axios.patch(API_ROUTES.contact.support_agents.updateOne(id), updatedsupport_agents );
        return res.data;
    },
    deleteOne: async (id) => {
        const res = await axios.delete(API_ROUTES.contact.support_agents.deleteOne(id) );
        return res.data;
    },
}
export default {support_agents}