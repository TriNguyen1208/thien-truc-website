import { useQuery } from "@tanstack/react-query";
import projectsServices from "@/services/projects.api.js";

function useGetAll(){
    return useQuery({
        queryKey: ["projects"],
        queryFn: projectsServices.getAll,
    })
}
function useGetProjectPage(){
    return useQuery({
        queryKey: ["project_page"],
        queryFn: projectsServices.getProjectPage,
    })
}
const projects = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["projects_list"],
            queryFn: projectsServices.projects.getAll,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["project", id],
            queryFn: () => projectsServices.projects.getOne(id),
        })
    }
}
const project_regions = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["project_regions"],
            queryFn: projectsServices.project_regions.getAll,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["project_region", id],
            queryFn: () => projectsServices.project_regions.getOne(id),
        })
    }
}
const project_contents = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["project_contents"],
            queryFn: projectsServices.project_contents.getAll,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["project_content", id],
            queryFn: () => projectsServices.project_contents.getOne(id),
        })
    }
}
export default {
    getAll: useGetAll,
    getProjectPage: useGetProjectPage,
    projects,
    project_regions,
    project_contents
};
