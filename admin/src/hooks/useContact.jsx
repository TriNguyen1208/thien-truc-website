import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import contactServices from "../services/contact.api.js";
import { toast } from "react-toastify";

function useGetContactPage() {
    return useQuery({
        queryKey: ["contact_page"],
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
                queryClient.invalidateQueries({ queryKey: ['contact_page'] });
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
                queryClient.invalidateQueries({ queryKey: ['contact_page'] });
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
    },
}

const company_info = {
    get: () => {
        return useQuery({
            queryKey: ["company_info"],
            queryFn: contactServices.company_info.get,
            staleTime: 10 * 60 * 1000,
        })
    },
    update: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (updatedCompanyInfo) => contactServices.company_info.update(updatedCompanyInfo),
            onSuccess: (success) => {
                queryClient.invalidateQueries({ queryKey: ['company_info'] });
                queryClient.invalidateQueries({ queryKey: ['company_page'] });
                toast.success(success.message)
            },
            onError: (error) => {
                toast.error(error.message)
            }
        });
    }
}

const support_agents = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["contact_support_agents"],
            queryFn: contactServices.support_agents.getAll,
            staleTime: 10 * 60 * 1000,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["contact_support_agents", id],
            queryFn: () => contactServices.support_agents.getOne(id),
            staleTime: 10 * 60 * 1000,
        })
    },
    useCreateOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (newsupport_agents) => contactServices.support_agents.createOne(newsupport_agents),
            onSuccess: (success) => {
                queryClient.invalidateQueries({ queryKey: ['contact_support_agents'] });
                queryClient.invalidateQueries({ queryKey: ['contact_quantity'] });
                toast.success(success.message)
            },
            onError: (error) => {
                toast.error(error.message)
            }
        });
    },
    useUpdateOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({ id, updatedsupport_agents }) => contactServices.support_agents.updateOne(id, updatedsupport_agents),
            onSuccess: (success) => {
                queryClient.invalidateQueries({ queryKey: ['contact_support_agents'] });
                toast.success(success.message)
            },
            onError: (error) => {
                toast.error(error.message)
            }
        });
    },
    useDeleteOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (id) => contactServices.support_agents.deleteOne(id),
            onSuccess: (success) => {
                queryClient.invalidateQueries({ queryKey: ['contact_support_agents'] });
                toast.success(success.message)
            },
            onError: (error) => {
                toast.error(error.message)
            }
        });
    },
}
function useSubmitContact() {
    return useMutation({
        mutationFn: (data) => contactServices.submitContact(data),
        onSuccess: (success) => {
            toast.success(success.message);
        },
        onError: (error) => {   
            toast.error(error.message);
        }
    })
}

function useGetQuantity() {
    return useQuery({
        queryKey: ['contact_quantity'],
        queryFn: contactServices.getQuantity,
        staleTime: 10 * 60 * 1000
    })
}

export default {
    getContactPage: useGetContactPage,//
    updateContactPage: {
        updateBanner: updateContactPage.useUpdateBanner,//
        updateVisibility: updateContactPage.useUpdateVisibility//
    },
    company_info: {
        get: company_info.get,//
        update: company_info.update//
    },
    support_agents: {
        getAll: support_agents.useGetAll,//
        getOne: support_agents.useGetOne,
        createOne: support_agents.useCreateOne,//
        updateOne: support_agents.useUpdateOne,//
        deleteOne: support_agents.useDeleteOne//
    },
    submitContact: useSubmitContact,
    getQuantity: useGetQuantity,//
}

