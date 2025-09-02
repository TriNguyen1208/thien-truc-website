import { useCustomQuery } from "./customQuery";
import projectsServices from "@/services/projects.api.js";

function useGetAll() {
    return useCustomQuery(["projects", "general", "get_all"], projectsServices.general.getAll);
}
function useGetProjectPage() {
    return useCustomQuery(["projects", "general", "project_page"], projectsServices.general.getProjectPage);
}
function useGetHighlightProjects(filter) {
    return useCustomQuery(["projects", "projects", "highlight_projects", filter], () =>  projectsServices.projects.getAllFeatured(filter));
}
function useSearchSuggest(query, filter) {
    return useCustomQuery(["projects", "projects", "search_suggestions", query, filter], () => projectsServices.projects.getSearchSuggestions(query, filter));
}

const projects = {
    useGetList: (query = '', filter = '', is_featured = undefined, page = 1, limit = undefined) => {
        return useCustomQuery(["projects", "projects", "get_list", query, filter, is_featured, page, limit], () => projectsServices.projects.getList(query, filter, is_featured, page, limit));
    },
    useGetOne: (id) => {
        return useCustomQuery(["projects", "projects", "get_one", id], () => projectsServices.projects.getOne(id));
    }
}

const project_regions = {
    useGetAll: () => {
        return useCustomQuery(["projects", "project_regions", "get_all"], projectsServices.project_regions.getAll);
    },
    useGetOne: (id) => {
        return useCustomQuery(["projects", "project_regions", "get_one", id], () => projectsServices.project_regions.getOne(id));
    },
    useGetAllFeatured: () => {
        return useCustomQuery(["projects", "project_regions", "get_all_featured"], projectsServices.project_regions.getAllFeatured);
    }
}

const project_contents = {
    useGetAll: () => {
        return useCustomQuery(["projects", "project_contents", "get_all"], projectsServices.project_contents.getAll);
    },
    useGetOne: (id) => {
        return useCustomQuery(["projects", "project_contents", "get_one", id], () => projectsServices.project_contents.getOne(id));
    },
}

export default {
    getAll: useGetAll,
    getProjectPage: useGetProjectPage,
    getHighlightProjects: useGetHighlightProjects,
    getSearchSuggestions: useSearchSuggest,
    projects: {
        getList: projects.useGetList,
        getOne: projects.useGetOne,
    },
    project_regions: {
        getAll: project_regions.useGetAll,
        getOne: project_regions.useGetOne,
        getAllFeatured: project_regions.useGetAllFeatured
    },
    project_contents: {
        getAll: project_contents.useGetAll,
        getOne: project_contents.useGetOne,
    },
};
