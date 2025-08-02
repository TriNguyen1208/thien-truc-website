import { useQuery } from "@tanstack/react-query";
import contactServices from "@/services/contact.api.js";

function useGetAll(){
    return useQuery({
        queryKey: ["contact"],
        queryFn: contactServices.getAll,
        staleTime: 10 * 60 * 1000,
    })
}
function useGetContactPage(){
    return useQuery({
        queryKey: ["contact_page"],
        queryFn: contactServices.getContactPage,
        staleTime: 10 * 60 * 1000,
    })
}
function useGetCompanyInfo(){
    return useQuery({
        queryKey: ["company_info"],
        queryFn: contactServices.getCompanyInfo,
        staleTime: 10 * 60 * 1000,
    })
}
const support_agents = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["support_agents"],
            queryFn: contactServices.support_agents.getAll,
            staleTime: 10 * 60 * 1000,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["support_agent", id],
            queryFn: () => contactServices.support_agents.getOne(id),
            staleTime: 10 * 60 * 1000,
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