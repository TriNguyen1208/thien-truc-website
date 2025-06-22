import axios from "@/services/axiosInstance.js"
import API_ROUTES from "../../../shared/routesAPI";

const getAll = async () =>{
    const res = await axios.get(API_ROUTES.home.base);
    return res.data;
}
const getHomePage = async() => {
    const res = await axios.get(API_ROUTES.home.home_page);
    return res.data;
}
const highlight_stats_about_us = {
    getAll: async () => {
        const res = await axios.get(API_ROUTES.home.highlight_stats_about_us.getAll);
        return res.data;
    },
    getOne: async (id) => {
        const res = await axios.get(API_ROUTES.home.highlight_stats_about_us.getOne(id));
        return res.data;
    }
}
export default {getAll, getHomePage, highlight_stats_about_us};