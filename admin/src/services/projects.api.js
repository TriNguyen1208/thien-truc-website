import axios from "@/services/axiosInstance.js"
import API_ROUTES from "../../../shared/routesAPIServer";

const getAll = async () => {
    const res = await axios.get(API_ROUTES.project.base);
    return res.data;
}

const getProjectPage = async () => {
    const res = await axios.get(API_ROUTES.project.project_page);
    return res.data;
}

const projects = {
    getList: async (query = '', filter = '', page = '') => {
        const res = await axios.get(API_ROUTES.project.projects.getList(query, filter, page));
        return res.data;
    },
    getOne: async (id) => {
        const res = await axios.get(API_ROUTES.project.projects.getOne(id));
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

const getHighlightProjects = async () => {
    const res = await axios.get(API_ROUTES.project.highlight_projects);
    return res.data;
}

const getSearchSuggestions = async (query, filter, is_featured) => {
    const res = await axios.get(API_ROUTES.project.search_suggestions(query, filter, is_featured));
    return res.data
}
export default { getAll, getProjectPage, projects, project_regions, project_contents, getHighlightProjects, getSearchSuggestions };