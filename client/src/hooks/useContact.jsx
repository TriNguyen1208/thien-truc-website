import { useCustomQuery } from "./customQuery";
import contactServices from "@/services/contact.api.js";

function useGetAll(){
    return useCustomQuery(["contact", "general", "contact"], contactServices.general.getAll)
}
function useGetContactPage(){
    return useCustomQuery(["contact", "contact_page"], contactServices.general.getContactPage)
}
function useGetCompanyInfo(){
    return useCustomQuery(["contact", "company_info"], contactServices.general.getCompanyInfo)
}
const support_agents = {
    useGetAll: () => useCustomQuery(["contact", "support_agents", "get_all"], contactServices.support_agents.getAll),
    useGetOne: (id) => useCustomQuery(["contact", "support_agents", "get_one", id], () => contactServices.support_agents.getOne(id))
}

export default {
    getAll: useGetAll,
    getContactPage: useGetContactPage,
    getCompanyInfo: useGetCompanyInfo,
    support_agents: {
        getAll: support_agents.useGetAll,
        getOne: support_agents.useGetOne,
    }
};