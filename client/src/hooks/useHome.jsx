import { useQuery } from "@tanstack/react-query";
import homeServices from "@/services/home.api.js";

function useGetAll(){
    return useQuery({
        queryKey: ["home"],
        queryFn: homeServices.getAll,
        staleTime: 10 * 60 * 1000,
    })
}
function useGetHomePage(){
    return useQuery({
        queryKey: ["home_page"],
        queryFn: homeServices.getHomePage,
        staleTime: 10 * 60 * 1000,
    })
}
const highlight_stats_about_us = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["highlight_stats_about_us"],
            queryFn: homeServices.highlight_stats_about_us.getAll,
            staleTime: 10 * 60 * 1000,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["highlight_stats_about_us", id],
            queryFn: () => homeServices.highlight_stats_about_us.getOne(id),
            staleTime: 10 * 60 * 1000,
        })
    } 
}
export default {
    getAll: useGetAll,
    getHomePage: useGetHomePage,
    highlight_stats_about_us: {
        getAll: highlight_stats_about_us.useGetAll,
        getOne: highlight_stats_about_us.useGetOne,
    }
};