import { useQuery } from "@tanstack/react-query";
import homeServices from "@/services/home.api.js";

function useGetAll(){
    return useQuery({
        queryKey: ["home"],
        queryFn: homeServices.getAll,
    })
}
function useGetHomePage(){
    return useQuery({
        queryKey: ["home_page"],
        queryFn: homeServices.getHomePage,
    })
}
const highlight_stats_about_us = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["highlight_stats_about_us"],
            queryFn: homeServices.highlight_stats_about_us.getAll,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["highlight_stats_about_us", id],
            queryFn: () => homeServices.highlight_stats_about_us.getOne(id),
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