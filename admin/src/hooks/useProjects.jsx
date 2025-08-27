import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import projectsServices from "@/services/projects.api.js";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
function useGetAll(){
    return useQuery({
        queryKey: ["admin_projects"],
        queryFn: projectsServices.getAll,
        staleTime: 10 * 60 * 1000,
    })
}
function useGetProjectPage(){
    return useQuery({
        queryKey: ["admin_project_page"],
        queryFn: projectsServices.getProjectPage,
        staleTime: 10 * 60 * 1000,
    })
}

function usePatchProjectPage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedPage)=> projectsServices.patchProjectPage(updatedPage),
    onSuccess: (success) => {
      queryClient.invalidateQueries({ queryKey: ["admin_project_page"] });
      toast.success(success.message);
    },
    onError: (error) => {
        toast.error(error.message);
    }
  });
}

function useUpdateVisibility() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedPage)=> projectsServices.updateVisibility(updatedPage),
    onSuccess: (success) => {
      queryClient.invalidateQueries({ queryKey: ["admin_project_page"] });
      toast.success(success.message);
    },
    onError: (error) => {
        toast.error(error.message);
    }
  });
}
const projects = {
    useGetList: (query = '', filter = '', is_featured, page = undefined, limit) => {
        return useQuery({
            queryKey: ["admin_projects_list", query, filter, is_featured, page, limit],
            queryFn: () => projectsServices.projects.getList(query, filter, is_featured, page, limit),
            staleTime: 10 * 60 * 1000,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["admin_project", id],
            queryFn: () => projectsServices.projects.getOne(id),
            staleTime: 10 * 60 * 1000,
            enabled: id != null
        })
    },
    useUpdateFeatureOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({ id, status }) => projectsServices.projects.updateFeatureOne(id, status),
            onSuccess: (success) => {
                toast.success(success?.message ?? "Cập nhật checkbox thành công");
                queryClient.invalidateQueries({ queryKey: ["admin_projects_list"] });
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
                queryClient.invalidateQueries({ queryKey: ["admin_projects_list"] });
            },
            onError: (error) => {
                toast.error(error.response.data.message);
            }
        });
    },
    useDeleteOne: (navigate = null) => {
        const queryClient = useQueryClient()
        return useMutation({
            mutationFn: (id) => projectsServices.projects.deleteOne(id),
            onSuccess: (success)=> { 
                queryClient.invalidateQueries({ queryKey: ["admin_projects_list"], exact: false });
                toast.success(success ? success.message: "Xóa thành công!")
                if(navigate){
                    navigate();
                }

            },
            onError:(error)=>{toast.error(error ?  error.message: "Xóa thất bại!") }
        })
    }
}
const project_regions = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["admin_project_regions"],
            queryFn: projectsServices.project_regions.getAll,
            staleTime: 10 * 60 * 1000,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["admin_project_region", id],
            queryFn: () => projectsServices.project_regions.getOne(id),
            staleTime: 10 * 60 * 1000,
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
            staleTime: 10 * 60 * 1000,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["admin_project_content", id],
            queryFn: () => projectsServices.project_contents.getOne(id),
            staleTime: 10 * 60 * 1000,
        })
    },
    usePostOne: () => {
        const queryClient = useQueryClient();
        const navigate = useNavigate();
        return useMutation({
            mutationFn: (data) => {
                return projectsServices.project_contents.postOne(data)
            },
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["admin_project_contents"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["admin_projects"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["admin_projects_list"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["admin_project_content"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["admin_project_regions"], exact: false });
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
                return projectsServices.project_contents.updateOne(id, formData)
            },
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["admin_project_contents"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["admin_project"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["admin_projects_list"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["admin_project_content"], exact: false });
            },
            onError: (error) => {
                toast.error(error.message);
            }
        })
    },
}
function useGetHighlightProjects(){
    return useQuery({
        queryKey: ["admin_highlight_projects"],
        queryFn: projectsServices.getHighlightProjects,
        staleTime: 10 * 60 * 1000,
    })
}

function useSearchSuggest(query, filter, is_featured){
    return useQuery({
        queryKey: ['admin_project-suggestions', query, filter, is_featured],
        queryFn: () => projectsServices.getSearchSuggestions(query, filter, is_featured),
        staleTime: 10 * 60 * 1000,
    })
}
function useGetQuantity()
{
    const queryClient = useQueryClient();
    queryClient.invalidateQueries(['admin_project_quantity']);
    return useQuery({
        queryKey: ['admin_project_quantity'],
        queryFn: projectsServices.getQuantity,
        staleTime: 10 * 60 * 1000
    })
}

function useSearchCategoriesSuggest(query){
    return useQuery({
        queryKey: ['admin_project-categories-suggestions', query],
        queryFn: () => projectsServices.getSearchCategoriesSuggestions(query),
        staleTime: 10 * 60 * 1000,
    })
}

export default {
    getAll: useGetAll,
    getProjectPage: useGetProjectPage,
    patchProjectPage: usePatchProjectPage,
    updateVisibility: useUpdateVisibility,
    projects: {
        getList: projects.useGetList,
        getOne: projects.useGetOne,
        updateFeatureOne: projects.useUpdateFeatureOne,
        updateRegion: projects.useUpdateRegion,
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
        postOne: project_contents.usePostOne,
        updateOne: project_contents.useUpdateOne
    },
    getHighlightProjects: useGetHighlightProjects,
    getSearchSuggestions: useSearchSuggest,
    getQuantity: useGetQuantity,
    getSearchCategoriesSuggestions: useSearchCategoriesSuggest
};
