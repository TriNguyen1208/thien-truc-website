import API_ROUTES from "../../../shared/routesAPI"
import { fetchData, postData } from "./apiHelper";


const contactServices = {
    general: {
        getAll: async () => fetchData(API_ROUTES.contact.base),
        getContactPage: async () => fetchData(API_ROUTES.contact.contact_page),
        getCompanyInfo: async () => fetchData(API_ROUTES.contact.company_info),
        postContactForm: async (formData) => postData(API_ROUTES.contact.submitContact, formData)
    },
    support_agents: {
        getAll: async () => fetchData(API_ROUTES.contact.support_agents.getAll),
        getOne: async (id) => fetchData(API_ROUTES.contact.support_agents.getOne(id))
    }
}

export default contactServices;
