import { useQuery } from "@tanstack/react-query";
import projectsServices from "@/services/projects.api.js";

function useGetAll(){
    return useQuery({
        queryKey: ["admin_projects"],
        queryFn: projectsServices.getAll,
        staleTime: 5 * 60 * 1000,
    })
}
function useGetProjectPage(){
    return useQuery({
        queryKey: ["admin_project_page"],
        queryFn: projectsServices.getProjectPage,
        staleTime: 5 * 60 * 1000,
    })
}
const projects = {
    useGetList: (query = '', filter = '', page = '') => {
        return useQuery({
            queryKey: ["admin_projects_list", query, filter, page],
            queryFn: () => projectsServices.projects.getList(query, filter, page),
            staleTime: 5 * 60 * 1000,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["admin_project", id],
            queryFn: () => projectsServices.projects.getOne(id),
            staleTime: 5 * 60 * 1000,
            enabled: id != null
        })
    }
}
const project_regions = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["admin_project_regions"],
            queryFn: projectsServices.project_regions.getAll,
            staleTime: 5 * 60 * 1000,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["admin_project_region", id],
            queryFn: () => projectsServices.project_regions.getOne(id),
            staleTime: 5 * 60 * 1000,
        })
    }
}
const project_contents = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["admin_project_contents"],
            queryFn: projectsServices.project_contents.getAll,
            staleTime: 5 * 60 * 1000,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["admin_project_content", id],
            queryFn: () => projectsServices.project_contents.getOne(id),
            staleTime: 5 * 60 * 1000,
        })
    }
}
function useGetHighlightProjects(){
    return useQuery({
        queryKey: ["admin_highlight_projects"],
        queryFn: projectsServices.getHighlightProjects,
        staleTime: 5 * 60 * 1000,
    })
}

function useSearchSuggest(query, filter, is_feature){
    return useQuery({
        queryKey: ['admin_project-suggestions', query, filter, is_feature],
        queryFn: () => projectsServices.getSearchSuggestions(query, filter, is_feature),
        staleTime: 5 * 60 * 1000,
    })
}
export default {
    getAll: useGetAll,
    getProjectPage: useGetProjectPage,
    projects: {
        getList: projects.useGetList,
        getOne: projects.useGetOne,
    },
    project_regions: {
        getAll: project_regions.useGetAll,
        getOne: project_regions.useGetOne,
    },
    project_contents: {
        getAll: project_contents.useGetAll,
        getOne: project_contents.useGetOne,
    },
    getHighlightProjects: useGetHighlightProjects,
    getSearchSuggestions: useSearchSuggest,
};
