import { useQuery } from "@tanstack/react-query";
import projectsServices from "@/services/projects.api.js";

function useGetAll(){
    return useQuery({
        queryKey: ["projects"],
        queryFn: projectsServices.getAll,
        staleTime: 5 * 60 * 1000,
    })
}
function useGetProjectPage(){
    return useQuery({
        queryKey: ["project_page"],
        queryFn: projectsServices.getProjectPage,
        staleTime: 5 * 60 * 1000,
    })
}
const projects = {
    useGetList: (query = '', filter = '', is_featured = undefined, page = 1, limit = undefined) => {
        return useQuery({
            queryKey: ["projects_list", query, filter, is_featured, page, limit],
            queryFn: () => projectsServices.projects.getList(query, filter, is_featured, page, limit),
            staleTime: 5 * 60 * 1000,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["project", id],
            queryFn: () => projectsServices.projects.getOne(id),
            staleTime: 5 * 60 * 1000,
        })
    }
}
const project_regions = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["project_regions"],
            queryFn: projectsServices.project_regions.getAll,
            staleTime: 5 * 60 * 1000,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["project_region", id],
            queryFn: () => projectsServices.project_regions.getOne(id),
            staleTime: 5 * 60 * 1000,
        })
    }
}
const project_contents = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["project_contents"],
            queryFn: projectsServices.project_contents.getAll,
            staleTime: 5 * 60 * 1000,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["project_content", id],
            queryFn: () => projectsServices.project_contents.getOne(id),
            staleTime: 5 * 60 * 1000,
        })
    }
}
function useGetHighlightProjects(){
    return useQuery({
        queryKey: ["highlight_projects"],
        queryFn: projectsServices.getHighlightProjects,
        staleTime: 5 * 60 * 1000,
    })
}

function useSearchSuggest(query, filter){
    return useQuery({
        queryKey: ['project-suggestions', query, filter],
        queryFn: () => projectsServices.getSearchSuggestions(query, filter),
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
