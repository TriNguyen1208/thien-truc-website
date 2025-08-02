import { useQuery } from "@tanstack/react-query";
import projectsServices from "@/services/projects.api.js";

function useGetAll() {
    return useQuery({
        queryKey: ["projects"],
        queryFn: projectsServices.getAll,
        staleTime: 10 * 60 * 1000,
    })
}
function useGetProjectPage() {
    return useQuery({
        queryKey: ["project_page"],
        queryFn: projectsServices.getProjectPage,
        staleTime: 10 * 60 * 1000,
    })
}
const projects = {
    useGetList: (query = '', filter = '', is_featured = undefined, page = 1, limit = undefined) => {
        return useQuery({
            queryKey: ["projects_list", query, filter, is_featured, page, limit],
            queryFn: () => projectsServices.projects.getList(query, filter, is_featured, page, limit),
            staleTime: 10 * 60 * 1000,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["project", id],
            queryFn: () => projectsServices.projects.getOne(id),
            staleTime: 10 * 60 * 1000,
        })
    }
}
const project_regions = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["project_regions"],
            queryFn: projectsServices.project_regions.getAll,
            staleTime: 10 * 60 * 1000,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["project_region", id],
            queryFn: () => projectsServices.project_regions.getOne(id),
            staleTime: 10 * 60 * 1000,
        })
    },
    useGetAllFeatured: () => {
        return useQuery({
            queryKey: ["project_regions_featured"],
            queryFn: projectsServices.project_regions.getAllFeatured,
            staleTime: 10 * 60 * 1000,
        })
    }
}
const project_contents = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["project_contents"],
            queryFn: projectsServices.project_contents.getAll,
            staleTime: 10 * 60 * 1000,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["project_content", id],
            queryFn: () => projectsServices.project_contents.getOne(id),
            staleTime: 10 * 60 * 1000,
        })
    }
}
function useGetHighlightProjects(filter) {
    return useQuery({
        queryKey: ["highlight_projects", filter],
        queryFn: () =>  projectsServices.getHighlightProjects(filter),
        staleTime: 10 * 60 * 1000,
    })
}

function useSearchSuggest(query, filter) {
    return useQuery({
        queryKey: ['project-suggestions', query, filter],
        queryFn: () => projectsServices.getSearchSuggestions(query, filter),
        staleTime: 10 * 60 * 1000,
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
        getAllFeatured: project_regions.useGetAllFeatured
    },
    project_contents: {
        getAll: project_contents.useGetAll,
        getOne: project_contents.useGetOne,
    },
    getHighlightProjects: useGetHighlightProjects,
    getSearchSuggestions: useSearchSuggest,
};
