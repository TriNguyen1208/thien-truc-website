import axios from "@/services/axiosInstance.js"
import API_ROUTES from "../../../shared/routesAPIServer";

const getHomePage = async () => {
    const res = await axios.get(API_ROUTES.home.home_page);
    return res.data;
}
const updateHomePage = {
    banner: async (data) => {
        const res = await axios.patch(API_ROUTES.home.updateHomePage.banner, data);
        return res.data;
    },
    aboutUs: async (data) => {
        const res = await axios.patch(API_ROUTES.home.updateHomePage.aboutUs, data);
        return res.data;
    },
    imageAboutUs: async (data) => {
        const res = await axios.patch(API_ROUTES.home.updateHomePage.imageAboutUs, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            timeout: 20000
        })
        return res.data;
    },
    bannerImages: async(data) =>{
        const res = await axios.patch(API_ROUTES.home.updateHomePage.bannerImages, data,{
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            timeout: 20000
        })
        return res.data
    },
    visibility: async (data) => {
        const res = await axios.patch(API_ROUTES.home.updateHomePage.visibility, data);
        return res.data;
    }
}
const highlight_stats_about_us = {
    getAll: async () => {
        const res = await axios.get(API_ROUTES.home.highlight_stats_about_us.getAll);
        return res.data;
    },
    getOne: async (id) => {
        const res = await axios.get(API_ROUTES.home.highlight_stats_about_us.getOne(id));
        return res.data;
    },
    createOne: async (data) => {
        const res = await axios.post(API_ROUTES.home.highlight_stats_about_us.createOne, data);
        return res.data;
    },
    updateOne: async (id, data) => {
        const res = await axios.patch(API_ROUTES.home.highlight_stats_about_us.updateOne(id), data);
        return res.data;
    },
    deleteOne: async (id) => {
        const res = await axios.delete(API_ROUTES.home.highlight_stats_about_us.deleteOne(id));
        return res.data;
    }
}
export default { getHomePage, updateHomePage, highlight_stats_about_us };