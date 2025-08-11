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
const updateProjectPage = async (data) => {
    const res = await axios.patch(API_ROUTES.project.update_project_page, data);
    return res.data;
}

const projects = {
    getList: async (query = '', filter = '', is_featured, page = undefined, limit) => {
        const res = await axios.get(API_ROUTES.project.projects.getList(query, filter, is_featured, page, limit));
        return res.data;
    },
    getOne: async (id) => {
        const res = await axios.get(API_ROUTES.project.projects.getOne(id));
        return res.data;
    },
    updateFeatureOne: async (id, status) => {
        const res = await axios.patch(API_ROUTES.project.projects.updateFeatureOne(id, status));
        return res.data;
    },
    updateRegion: async (changedItems) => {
        const res = await axios.patch(API_ROUTES.project.projects.updateRegion, changedItems);
        return res.data;
    },
    deleteOne: async (id) => {
        const res = await axios.delete(API_ROUTES.project.projects.deleteOne(id));
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
    },
    createOne: async (name = '', rgb_color = '') => {
        const res = await axios.post(API_ROUTES.project.project_regions.createOne, {
        name,
        rgb_color
        })
        return res.data;
    },
    updateOne: async (name = '', rgb_color = '', id) => {
        const res = await axios.patch(API_ROUTES.project.project_regions.updateOne(id), {
            name,
            rgb_color
        });
        return res.data;
    },
    deleteOne: async (id) => {
        const res = await axios.delete(API_ROUTES.project.project_regions.deleteOne(id));
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
    },
    postOne: async (data) => {
        const res = await axios.post(API_ROUTES.project.project_contents.postOne, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            timeout: 20000
        });
        return res.data;
    },
    updateOne: async (id, data) => {
        const res = await axios.patch(API_ROUTES.project.project_contents.updateOne(id), data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            timeout: 20000
        });
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
const getQuantity = async()=>{
    const res = await axios.get(API_ROUTES.project.count)
    return res.data
}

const getSearchCategoriesSuggestions = async (query) => {
    const res = await axios.get(API_ROUTES.project.search_categories_suggestions(query));
    return res.data;
}

const patchProjectPage = async (updatedPage)=> {
    const res = await axios.patch(API_ROUTES.project.update_project_page, updatedPage)
    return res.data;
}
const updateVisibility = async (data)=> {
    const res = await axios.patch(API_ROUTES.project.update_visibility, data)
    return res.data;
}

export default { getAll, getProjectPage, updateProjectPage, projects, project_regions, project_contents, getHighlightProjects, getSearchSuggestions, getSearchCategoriesSuggestions, getQuantity, patchProjectPage, updateVisibility };
