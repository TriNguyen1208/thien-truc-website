import { useCustomQuery } from "./customQuery";
import homeServices from "@/services/home.api.js";

function useGetAll(){
    return useCustomQuery(["home", "general", "get_all"], homeServices.general.getAll);
}
function useGetHomePage(){
    return useCustomQuery(["home", "general", "home_page"], homeServices.general.getHomePage);
}

const highlight_stats_about_us = {
    useGetAll: () => useCustomQuery(["home", "highlight_stats_about_us", "get_all"], homeServices.highlight_stats_about_us.getAll),
    useGetOne: (id) => useCustomQuery(["home", "highlight_stats_about_us", "get_one", id], () => homeServices.highlight_stats_about_us.getOne(id))
};
export default {
    getAll: useGetAll,
    getHomePage: useGetHomePage,
    highlight_stats_about_us: {
        getAll: highlight_stats_about_us.useGetAll,
        getOne: highlight_stats_about_us.useGetOne,
    }
};