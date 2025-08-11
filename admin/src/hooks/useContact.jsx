import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import contactServices from "@/services/contact.api.js";
import { toast } from "react-toastify";

function useGetQuantity() {
    const queryClient = useQueryClient();
    queryClient.invalidateQueries(['admin_contact_quantity']);
    return useQuery({
        queryKey: ['admin_contact_quantity'],
        queryFn: contactServices.getQuantity,
        staleTime: 10 * 60 * 1000
    })
}
function useGetCompanyInfo() {
    return useQuery({
        queryKey: ["admin_company_info"],
        queryFn: contactServices.getCompanyInfo,
        staleTime: 10 * 60 * 1000,
    })
}
function useGetContactPage() {
    return useQuery({
        queryKey: ["admin_contact_page"],
        queryFn: contactServices.getContactPage,
        staleTime: 10 * 60 * 1000,
    })
}

const updateContactPage = {
    useUpdateBanner: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => contactServices.updateContactPage.banner(data),
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ['admin_contact_page'] });
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
    },
    useUpdateVisibility: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => contactServices.updateContactPage.visibility(data),
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ['admin_contact_page'] });
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
    },
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
            staleTime: 10 * 60 * 1000,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["admin_contact_support_agents", id],
            queryFn: () => contactServices.support_agents.getOne(id),
            staleTime: 10 * 60 * 1000,
        })
    },
    useCreateOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (newsupport_agents) => contactServices.support_agents.createOne(newsupport_agents),
            onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_contact_support_agents'] });
            },
        });
    },
    useUpdateOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({ id, updatedsupport_agents }) => contactServices.support_agents.updateOne(id, updatedsupport_agents),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['admin_contact_support_agents'] });
            },
        });
    },
    useDeleteOne: () => {
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
    updateContactPage: {
        updateBanner: updateContactPage.useUpdateBanner,
        updateVisibility: updateContactPage.useUpdateVisibility
    },
    getCompanyInfo: useGetCompanyInfo,
    patchCompanyInfo: usePatchCompanyInfo,
    getQuantity: useGetQuantity,
    getContactPage: useGetContactPage,
}

