import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import homeServices from "@/services/home.api.js";

function useGetHomePage() {
    return useQuery({
        queryKey: ["home_page_admin"],
        queryFn: homeServices.getHomePage,
        staleTime: 5 * 60 * 1000,
    })
}

const updateHomePage = {
    useUpdateBanner: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => homeServices.updateHomePage.banner(data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["admin_home_page"] });
            },
        });
    },
    useUpdateAboutUs: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => homeServices.updateHomePage.aboutUs(data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["admin_home_page"] });
            },
        });
    },
};

// ==== Highlight Stats About Us ====
const highlight_stats_about_us = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["admin_highlight_stats_about_us"],
            queryFn: homeServices.highlight_stats_about_us.getAll,
            staleTime: 5 * 60 * 1000,
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
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["admin_highlight_stats_about_us"] });
            },
        });
    },
    useUpdateOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({ id, data }) => homeServices.highlight_stats_about_us.updateOne(id, data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["admin_highlight_stats_about_us"] });
            },
        });
    },
    useDeleteOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (id) => homeServices.highlight_stats_about_us.deleteOne(id),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["admin_highlight_stats_about_us"] });
            },
        });
    },
};

export default {
    getHomePage: useGetHomePage,
    updateHomePage: {
        updateBanner: updateHomePage.useUpdateBanner,
        updateAboutUs: updateHomePage.useUpdateAboutUs,

    },
    highlight_stats_about_us: {
        getAll: highlight_stats_about_us.useGetAll,
        getOne: highlight_stats_about_us.useGetOne,
        createOne: highlight_stats_about_us.useCreateOne,
        updateOne: highlight_stats_about_us.useUpdateOne,
        deleteOne: highlight_stats_about_us.useDeleteOne,
    }
}