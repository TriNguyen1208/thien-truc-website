import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import aboutUsServices from "@/services/aboutus.api.js";
import { toast } from "react-toastify";

// ==== About Us Page ====
function useGetAboutUsPage() { 
    return useQuery({
        queryKey: ["about_us_page"],
        queryFn: aboutUsServices.getAboutUsPage,
        staleTime: 10 * 60 * 1000,
    });
}

const updateAboutUsPage = {
    useUpdateBanner: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => aboutUsServices.updateAboutUsPage.banner(data),
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["about_us_page"] });
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
    },
    useUpdateOurStory: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => aboutUsServices.updateAboutUsPage.ourStory(data),
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["about_us_page"] });
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
    },
    useUpdateVisibility: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => aboutUsServices.updateAboutUsPage.visibility(data),
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["about_us_page"] });
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
    }
};

// ==== Company Services ====
const company_services = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["company_services"],
            queryFn: aboutUsServices.company_services.getAll,
            staleTime: 10 * 60 * 1000,
        })
    },
    useCreateOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => aboutUsServices.company_services.createOne(data),
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["company_services"] });
                queryClient.invalidateQueries({ queryKey: ["about_us_page"] });
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
    },
    useUpdateOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({ id, data }) => aboutUsServices.company_services.updateOne(id, data),
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["company_services"] });
                queryClient.invalidateQueries({ queryKey: ["about_us_page"] });
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
    },
    useDeleteOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (id) => aboutUsServices.company_services.deleteOne(id),
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["company_services"] });
                queryClient.invalidateQueries({ queryKey: ["about_us_page"] });
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
    },
};

// ==== Why Choose Us ====
const why_choose_us = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["why_choose_us"],
            queryFn: aboutUsServices.why_choose_us.getAll,
            staleTime: 10 * 60 * 1000,
        })
    },
    useCreateOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => aboutUsServices.why_choose_us.createOne(data),
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["why_choose_us"] });
                queryClient.invalidateQueries({ queryKey: ["about_us_page"] });
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
    },
    useUpdateOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({ id, data }) => aboutUsServices.why_choose_us.updateOne(id, data),
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["why_choose_us"] });
                queryClient.invalidateQueries({ queryKey: ["about_us_page"] });
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
    },
    useDeleteOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (id) => aboutUsServices.why_choose_us.deleteOne(id),
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["why_choose_us"] });
                queryClient.invalidateQueries({ queryKey: ["about_us_page"] });
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
    },
};

export default {
    getAboutUsPage: useGetAboutUsPage,//
    updateAboutUsPage: {
        banner: updateAboutUsPage.useUpdateBanner,//
        ourStory: updateAboutUsPage.useUpdateOurStory,//
        visibility: updateAboutUsPage.useUpdateVisibility//
    },
    company_services: {
        getAll: company_services.useGetAll,//
        createOne: company_services.useCreateOne,//
        updateOne: company_services.useUpdateOne,//
        deleteOne: company_services.useDeleteOne,//
    },
    why_choose_us: {
        getAll: why_choose_us.useGetAll,//
        createOne: why_choose_us.useCreateOne,//
        updateOne: why_choose_us.useUpdateOne,//
        deleteOne: why_choose_us.useDeleteOne,//
    },
};
