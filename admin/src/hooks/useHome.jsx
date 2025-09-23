import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import homeServices from "@/services/home.api";
import { toast } from 'react-toastify';

function useGetHomePage() {
    return useQuery({
        queryKey: ["home_page"],
        queryFn: homeServices.getHomePage,
        staleTime: 10 * 60 * 1000,
    })
}

const updateHomePage = {
    useUpdateBanner: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => homeServices.updateHomePage.banner(data),
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["home_page"] });
            },
            onError: (error) => {
                toast.error(error.response.data.message);
            }
        });
    },
    useUpdateBannerImages: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => homeServices.updateHomePage.bannerImages(data),
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["home_page"] });
            },
            onError: (error) => {
                toast.error(error.response.data.message);
            }
        });
    },
    useUpdateAboutUs: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => homeServices.updateHomePage.aboutUs(data),
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["home_page"] });
            },
            onError: (error) => {
                toast.error(error.response.data.message);
            }
        });
    },
    useUpdateImageAboutUs: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => homeServices.updateHomePage.imageAboutUs(data),
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["home_page"] });
            },
            onError: (error) => {
                toast.error(error.response.data.message);
            }
        });
    },
    useUpdateVisibility: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => homeServices.updateHomePage.visibility(data),
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["home_page"] });
            },
            onError: (error) => {
                toast.error(error.response.data.message);
            }
        });
    },
};

// ==== Highlight Stats About Us ====
const highlight_stats_about_us = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["highlight_stats_about_us"],
            queryFn: homeServices.highlight_stats_about_us.getAll,
            staleTime: 10 * 60 * 1000,
        });
    },
    useCreateOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => homeServices.highlight_stats_about_us.createOne(data),
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ 
                    queryKey: ["highlight_stats_about_us"],
                    exact: false
                });
                queryClient.invalidateQueries({ queryKey: ["home_page"] });
            },
            onError: (error) => {
                toast.error(error.response.data.message);
            }
        });
    },
    useUpdateOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({ id, data }) => homeServices.highlight_stats_about_us.updateOne(id, data),
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ 
                    queryKey: ["highlight_stats_about_us"],
                    exact: false
                });
                queryClient.invalidateQueries({ queryKey: ["home_page"] });
            },
            onError: (error) => {
                toast.error(error.response.data.message);
            }
        });
    },
    useDeleteOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (id) => homeServices.highlight_stats_about_us.deleteOne(id),
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ 
                    queryKey: ["highlight_stats_about_us"],
                    exact: false
                });
                queryClient.invalidateQueries({ queryKey: ["home_page"] });
            },
            onError: (error) => {
                toast.error(error.response.data.message);
            }
        });
    },
};

export default {
    getHomePage: useGetHomePage,//
    updateHomePage: {
        banner: updateHomePage.useUpdateBanner,//
        aboutUs: updateHomePage.useUpdateAboutUs,//
        bannerImages: updateHomePage.useUpdateBannerImages,//
        imageAboutUs: updateHomePage.useUpdateImageAboutUs,//
        visibility: updateHomePage.useUpdateVisibility//
    },
    highlight_stats_about_us: {
        getAll: highlight_stats_about_us.useGetAll,//
        createOne: highlight_stats_about_us.useCreateOne,//
        updateOne: highlight_stats_about_us.useUpdateOne,//
        deleteOne: highlight_stats_about_us.useDeleteOne,//
    }
}