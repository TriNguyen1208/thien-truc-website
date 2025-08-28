import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import homeServices from "@/services/home.api.js";
import { toast } from 'react-toastify';

function useGetHomePage() {
    return useQuery({
        queryKey: ["home_page_admin"],
        queryFn: homeServices.getHomePage,
        staleTime: 10 * 60 * 1000,
    })
}

const updateHomePage = {
    useUpdateBanner: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => homeServices.updateHomePage.banner(data),
            onSuccess:  (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["home_page_admin"] });
            },
            onError:  (error) => {
                toast.error(error.message);
            }
        });
    },
    useUpdateBannerImages: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => homeServices.updateHomePage.bannerImages(data),
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["home_page_admin"] });
            },
            onError: (error) => {
                toast.error(error.message);
            }
        });
    },
    useUpdateAboutUs: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => homeServices.updateHomePage.aboutUs(data),
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["home_page_admin"] });
            },
            onError: (error) => {
                toast.error(error.message);
            }
        });
    },
    useUpdateImageAboutUs: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => homeServices.updateHomePage.imageAboutUs(data),
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["home_page_admin"] });
            },
            onError: (error) => {
                toast.error(error.message);
            }
        });
    },
    useUpdateVisibility: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => homeServices.updateHomePage.visibility(data),
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["home_page_admin"] });
            },
            onError: (error) => {
                toast.error(error.message);
            }
        });
    },
};

// ==== Highlight Stats About Us ====
const highlight_stats_about_us = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["admin_highlight_stats_about_us"],
            queryFn: homeServices.highlight_stats_about_us.getAll,
            staleTime: 10 * 60 * 1000,
        });
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["admin_highlight_stats_about_us", id],
            queryFn: () => homeServices.highlight_stats_about_us.getOne(id),
            enabled: !!id,
        });
    },
    useCreateOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => homeServices.highlight_stats_about_us.createOne(data),
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["admin_highlight_stats_about_us"] });
            },
            onError: (error) => {
                toast.error(error.message);
            }
        });
    },
    useUpdateOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({ id, data }) => homeServices.highlight_stats_about_us.updateOne(id, data),
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["admin_highlight_stats_about_us"] });
            },
            onError: (error) => {
                toast.error(error.message);
            }
        });
    },
    useDeleteOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (id) => homeServices.highlight_stats_about_us.deleteOne(id),
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["admin_highlight_stats_about_us"] });
            },
            onError: (error) => {
                toast.error(error.message);
            }
        });
    },
};

export default {
    getHomePage: useGetHomePage,
    updateHomePage: {
        updateBanner: updateHomePage.useUpdateBanner,
        updateAboutUs: updateHomePage.useUpdateAboutUs,
        updateBannerImages: updateHomePage.useUpdateBannerImages,
        updateImageAboutUs: updateHomePage.useUpdateImageAboutUs,
        updateVisibility: updateHomePage.useUpdateVisibility

    },
    highlight_stats_about_us: {
        getAll: highlight_stats_about_us.useGetAll,
        getOne: highlight_stats_about_us.useGetOne,
        createOne: highlight_stats_about_us.useCreateOne,
        updateOne: highlight_stats_about_us.useUpdateOne,
        deleteOne: highlight_stats_about_us.useDeleteOne,
    }
}