import axios from "@/services/axiosInstance.js"
import API_ROUTES from "../../../shared/routesAPI";

const getAll = async () => {
    const res = await axios.get(API_ROUTES.project.base);
    return res.data;
}

const getProjectPage = async () => {
    const res = await axios.get(API_ROUTES.project.project_page);
    return res.data;
}

const projects = {
    getAll: async () => {
        const res = await axios.get(API_ROUTES.project.projects.getAll);
        return res.data;
    },
    getOne: async (id) => {
        const res = await axios.get(API_ROUTES.project.projects.getOne(id));
        return res.data;
    },
    getByRegion: async (region) => {
        const res = await axios.get(API_ROUTES.project.projects.getByRegion(region));
        return res.data;
    }
}
const project_regions = {
    getAll: async () => {
        const res = await axios.get(API_ROUTES.project.project_regions.getAll);
        return res.data;
    },
    getOne: async (id) => {
        const res = await axios.get(API_ROUTES.project.project_regions.getOne(id));
        return res.data;
    }
}
const project_contents = {
    getAll: async () => {
        const res = await axios.get(API_ROUTES.project.project_contents.getAll);
        return res.data;
    },
    getOne: async (id) => {
        const res = await axios.get(API_ROUTES.project.project_contents.getOne(id));
        return res.data;
    }
}
const getSearchSuggestions = async (query, filter) => {
    const res = await axios.get(API_ROUTES.project.search_suggestions, {
        params: {
            query: query,
            filter: filter
        }
    })
    return res.data
}
export default { getAll, getProjectPage, projects, project_regions, project_contents, getSearchSuggestions };