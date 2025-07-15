import { useMutation, useQuery } from "@tanstack/react-query";
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
    useGetList: (query = '', filter = '', is_featured, page = undefined, limit) => {
        return useQuery({
            queryKey: ["admin_projects_list", query, filter, is_featured, page, limit],
            queryFn: () => projectsServices.projects.getList(query, filter, is_featured, page, limit),
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
    },
    useUpdateFeatureOne: () => {
        return useMutation({
            mutationFn: ({is_featured, id}) =>
            projectsServices.projects.updateFeatureOne(is_featured, id)
        })
    },
    useDeleteOne: (id) => {
        return useMutation({
            mutationFn: (id) => 
            projectsServices.projects.deleteOne(id)
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
    },
    useCreateOne: (name = "", rgb_color = "") => {
        return useMutation({
            mutationFn: ({ name, rgb_color }) => 
            projectsServices.project_regions.createOne(name, rgb_color)
        })
    },
    useUpdateOne: (name = "", rgb_color = "", id) => {
        return useMutation({
            mutationFn: ({ name, rgb_color, id }) => 
            projectsServices.project_regions.updateOne(name, rgb_color, id)
        })
    },
    useDeleteOne: (id) => {
        return useMutation({
            mutationFn: (id) => 
            projectsServices.project_regions.deleteOne(id)
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

function useSearchSuggest(query, filter, is_featured){
    return useQuery({
        queryKey: ['admin_project-suggestions', query, filter, is_featured],
        queryFn: () => projectsServices.getSearchSuggestions(query, filter, is_featured),
        staleTime: 5 * 60 * 1000,
    })
}

function useSearchCategoriesSuggest(query){
    return useQuery({
        queryKey: ['admin_project-categories-suggestions', query],
        queryFn: () => projectsServices.getSearchCategoriesSuggestions(query),
        staleTime: 5 * 60 * 1000,
    })
}

export default {
    getAll: useGetAll,
    getProjectPage: useGetProjectPage,
    projects: {
        getList: projects.useGetList,
        getOne: projects.useGetOne,
        updateFeatureOne: projects.useUpdateFeatureOne,
        deleteOne: projects.useDeleteOne,
    },
    project_regions: {
        getAll: project_regions.useGetAll,
        getOne: project_regions.useGetOne,
        createOne: project_regions.useCreateOne,
        updateOne: project_regions.useUpdateOne,
        deleteOne: project_regions.useDeleteOne,
    },
    project_contents: {
        getAll: project_contents.useGetAll,
        getOne: project_contents.useGetOne,
    },
    getHighlightProjects: useGetHighlightProjects,
    getSearchSuggestions: useSearchSuggest,
    getSearchCategoriesSuggestions: useSearchCategoriesSuggest
};
