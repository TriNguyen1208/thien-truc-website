import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import recruitmentServices from "@/services/recruitment.api.js";
import { toast } from 'react-toastify';
function useGetAll(){
    return useQuery({
        queryKey: ["admin_recruitment"],
        queryFn: recruitmentServices.getAll,
        staleTime: 10 * 60 * 1000,
    })
}
function useGetRecruitmentPage(){
    return useQuery({
        queryKey: ["admin_recruitment_page"],
        queryFn: recruitmentServices.getRecruitmentPage,
        staleTime: 10 * 60 * 1000,
    })
}
function usePatchRecruitment(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => recruitmentServices.patchRecruitment(data),
        onSuccess: (success) => {
            toast.success(success.message)
            queryClient.invalidateQueries({ queryKey: ['admin_recruitment'] });
            queryClient.invalidateQueries({ queryKey: ['admin_recruitment_page'] });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })
}
function useUpdateVisibility(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => recruitmentServices.updateVisibility(data),
        onSuccess: (success) => {
            toast.success(success.message)
            queryClient.invalidateQueries({ queryKey: ['admin_recruitment'] });
            queryClient.invalidateQueries({ queryKey: ['admin_recruitment_page'] });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })
}
export default {
    getAll: useGetAll,
    getRecruitmentPage: useGetRecruitmentPage,
    patch: usePatchRecruitment,
    updateVisibility: useUpdateVisibility
};