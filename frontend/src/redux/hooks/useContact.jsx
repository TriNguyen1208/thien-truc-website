import { useQuery } from "@tanstack/react-query";
import contactServices from "@/services/contact.api.js";

function useGetAll(){
    return useQuery({
        queryKey: ["contact"],
        queryFn: contactServices.getAll,
    })
}
function useGetContactPage(){
    return useQuery({
        queryKey: ["contact_page"],
        queryFn: contactServices.getContactPage,
    })
}
function useGetCompanyInfo(){
    return useQuery({
        queryKey: ["company_info"],
        queryFn: contactServices.getCompanyInfo,
    })
}
const support_agents = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["support_agents"],
            queryFn: contactServices.support_agents.getAll,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["support_agents", id],
            queryFn: () => contactServices.support_agents.getOne(id),
        })
    } 
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