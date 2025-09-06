import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import projectsServices from "@/services/projects.api.js";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function useGetProjectPage(){
    return useQuery({
        queryKey: ["project_page"],
        queryFn: projectsServices.getProjectPage,
        staleTime: 10 * 60 * 1000,
    })
}

const updateProjectPage = {
    useUpdateBanner: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (updatedPage)=> projectsServices.updateProjectPage.banner(updatedPage),
            onSuccess: (success) => {
                queryClient.invalidateQueries({ queryKey: ["project_page"] });
                toast.success(success.message);
            },
            onError: (error) => {
                toast.error(error.message);
            }
        });
    },
    useUpdateVisibility: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (updatedPage)=> projectsServices.updateProjectPage.visibility(updatedPage),
            onSuccess: (success) => {
                queryClient.invalidateQueries({ queryKey: ["project_page"] });
                toast.success(success.message);
            },
            onError: (error) => {
                toast.error(error.message);
            }
        });
    }
}

const projects = {
    useGetList: (query = '', filter = '', is_featured, page = undefined, limit) => {
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
            enabled: id != null
        })
    },
    useGetSearchSuggestions: (query, filter, is_featured) => {
        return useQuery({
            queryKey: ['project_suggestions', query, filter, is_featured],
            queryFn: () => projectsServices.projects.getSearchSuggestions(query, filter, is_featured),
            staleTime: 10 * 60 * 1000,
        })
    },
    useCreateOne: () => {
        const queryClient = useQueryClient();
        const navigate = useNavigate();
        return useMutation({
            mutationFn: (data) => {
                return projectsServices.projects.createOne(data)
            },
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["project"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["projects_list"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["project_suggestions"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["project_quantity"], exact: false });
                navigate('/quan-ly-du-an', {state: { createId: success.id }});
            },
            onError: (error) => {
                toast.error(error.message);
            }
        })
    },
    useUpdateOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({id, formData}) => {
                return projectsServices.projects.updateOne(id, formData)
            },
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["project"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["projects_list"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["project_suggestions"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["project_content"], exact: false });
            },
            onError: (error) => {
                toast.error(error.message);
            }
        })
    },
    useUpdateFeatureOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({ id, status }) => projectsServices.projects.updateFeatureOne(id, status),
            onSuccess: (success) => {
                toast.success(success?.message ?? "Cập nhật checkbox thành công");
                queryClient.invalidateQueries({ queryKey: ["projects_list"] });
            },
            onError: (error) => {
                toast.error(error?.message ?? "Cập nhật checkbox không thành công");
            } 
        });
    },
    useUpdateRegion: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (changedItems) =>
                projectsServices.projects.updateRegion(changedItems),
            onSuccess: (success) => {
                toast.success(success?.message ?? "Cập nhật khu vực thành công");
                queryClient.invalidateQueries({ queryKey: ["projects_list"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["project_regions"], exact: false });
            },
            onError: (error) => {
                toast.error(error.message);
            }
        });
    },
    useDeleteOne: () => {
        const queryClient = useQueryClient();
        const navigate = useNavigate();
        return useMutation({
            mutationFn: (id) => projectsServices.projects.deleteOne(id),
            onSuccess: (success)=> { 
                queryClient.invalidateQueries({ queryKey: ["project"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["projects_list"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["project_suggestions"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["project_quantity"], exact: false });
                toast.success(success ? success.message: "Xóa thành công!")
                navigate("/quan-ly-du-an");
            },
            onError:(error)=>{
                toast.error(error ?  error.message: "Xóa thất bại!") 
            }
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
    useGetSearchSuggestions: (query = '') => {
        return useQuery({
            queryKey: ['project_categories_suggestions', query],
            queryFn: () => projectsServices.project_regions.getSearchSuggestions(query),
            staleTime: 10 * 60 * 1000,
        })
    },
    useCreateOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({ name, rgb_color }) => projectsServices.project_regions.createOne(name, rgb_color),
            onSuccess: (success) => {
                queryClient.invalidateQueries({ queryKey: ["project_regions"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["project_region"], exact: false });
                toast.success(success.message);
            },
            onError: (error) => {
                toast.error(error.message);
            }
        })
    },
    useUpdateOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({ name, rgb_color, id }) => projectsServices.project_regions.updateOne(name, rgb_color, id),
            onSuccess: (success) => {
                queryClient.invalidateQueries({ queryKey: ["project_regions"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["project_region"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["projects_list"], exact: false });
                toast.success(success.message);
            },
            onError: (error) => {
                toast.error(error.message);
            }
        })
    },
    useDeleteOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (id) => projectsServices.project_regions.deleteOne(id),
            onSuccess: (success) => {
                queryClient.invalidateQueries({ queryKey: ["project_regions"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["project_categories_suggestions"], exact: false });
                toast.success(success.message);
            },
            onError: (error) => {
                toast.error(error.message);
            }
        })
    }
}
const project_contents = {
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["project_content", id],
            queryFn: () => projectsServices.project_contents.getOne(id),
            staleTime: 10 * 60 * 1000,
        })
    }
}
function useGetQuantity() {
    return useQuery({
        queryKey: ['project_quantity'],
        queryFn: projectsServices.getQuantity,
        staleTime: 10 * 60 * 1000
    })
}


export default {
    getProjectPage: useGetProjectPage,//
    updateProjectPage: {
        banner: updateProjectPage.useUpdateBanner,//
        visibility: updateProjectPage.useUpdateVisibility//
    },
    projects: {
        getList: projects.useGetList,//
        getOne: projects.useGetOne,//
        getSearchSuggestions: projects.useGetSearchSuggestions,//
        createOne: projects.useCreateOne,//
        updateOne: projects.useUpdateOne,//
        updateFeatureOne: projects.useUpdateFeatureOne,//
        updateRegion: projects.useUpdateRegion,//
        deleteOne: projects.useDeleteOne,//
    },
    project_regions: {
        getAll: project_regions.useGetAll,//
        getOne: project_regions.useGetOne,//
        getSearchSuggestions: project_regions.useGetSearchSuggestions,//
        createOne: project_regions.useCreateOne,//
        updateOne: project_regions.useUpdateOne,//
        deleteOne: project_regions.useDeleteOne,//
    },
    project_contents: {
        getOne: project_contents.useGetOne,//
    },
    getQuantity: useGetQuantity//
};
