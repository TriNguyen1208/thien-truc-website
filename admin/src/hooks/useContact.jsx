import { useQuery,useMutation, useQueryClient } from "@tanstack/react-query";
import contactServices from "@/services/contact.api.js";

function useGetQuantity()
{
    return useQuery({
        queryKey: ['admin_contact_quantity'],
        queryFn: contactServices.getQuantity,
        staleTime: 5 * 60 * 1000
    })
}
function useGetCompanyInfo(){
    return useQuery({
        queryKey: ["admin_company_info"],
        queryFn: contactServices.getCompanyInfo,
        staleTime: 5 * 60 * 1000,
    })
}
function usePatchCompanyInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedCompanyInfo) => contactServices.patchCompanyInfo(updatedCompanyInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_company_info'] });
    },
  });
}
const support_agents = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["admin_contact_support_agents"],
            queryFn: contactServices.support_agents.getAll,
            staleTime: 5 * 60 * 1000,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["admin_contact_support_agents",id],
            queryFn: ()=> contactServices.support_agents.getOne(id),
            staleTime: 5 * 60 * 1000,
        })
    },
    useCreateOne:() =>{
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (newsupport_agents) => contactServices.support_agents.createOne(newsupport_agents),
            onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_contact_support_agents'] });
            },
        });
    },
    useUpdateOne:() =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, updatedsupport_agents}) => contactServices.support_agents.updateOne(id, updatedsupport_agents),
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['admin_contact_support_agents'] });
        },
    });
    },
    useDeleteOne:() =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => contactServices.support_agents.deleteOne(id),
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['admin_contact_support_agents'] });
        },
    });
    },


}
export default {
    support_agents: {
        getAll: support_agents.useGetAll,
        getOne: support_agents.useGetOne,
        createOne: support_agents.useCreateOne,
        updateOne: support_agents.useUpdateOne,
        deleteOne: support_agents.useDeleteOne
    },
    getCompanyInfo: useGetCompanyInfo,
    patchCompanyInfo: usePatchCompanyInfo,
    getQuantity: useGetQuantity
}

