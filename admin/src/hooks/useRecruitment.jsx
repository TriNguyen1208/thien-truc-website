import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import recruitmentServices from "@/services/recruitment.api.js";
import { toast } from 'react-toastify';

function useGetRecruitmentPage(){
    return useQuery({
        queryKey: ["recruitment_page"],
        queryFn: recruitmentServices.getRecruitmentPage,
        staleTime: 10 * 60 * 1000,
    })
}
const updateRecruitmentPage = {
    useUpdateBanner: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => recruitmentServices.updateRecruimentPage.banner(data),
            onSuccess: (success) => {
                toast.success(success.message)
                queryClient.invalidateQueries({ queryKey: ['recruitment_page'] });
            },
            onError: (error) => {
                toast.error(error.message);
            }
        })
    },
    useUpdateVisibility: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => recruitmentServices.updateRecruimentPage.visibility(data),
            onSuccess: (success) => {
                toast.success(success.message)
                queryClient.invalidateQueries({ queryKey: ['recruitment_page'] });
            },
            onError: (error) => {
                toast.error(error.message);
            }
        })
    },
    useUpdateCulture: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => recruitmentServices.updateRecruimentPage.culture(data),
            onSuccess: (success) => {
                toast.success(success.message)
                queryClient.invalidateQueries({ queryKey: ['recruitment_page'] });
            },
            onError: (error) => {
                toast.error(error.message);
            }
        })
    },
    useUpdateCultureImage: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => recruitmentServices.updateRecruimentPage.culture_images(data),
            onSuccess: (success) => {
                toast.success(success.message)
                queryClient.invalidateQueries({ queryKey: ['recruitment_page'] });
            },
            onError: (error) => {
                toast.error(error.message);
            }
        })
    }
}
export default {
    getRecruitmentPage: useGetRecruitmentPage,
    updateRecruitmentPage: {
        banner: updateRecruitmentPage.useUpdateBanner,
        visibility: updateRecruitmentPage.useUpdateVisibility,
        culture: updateRecruitmentPage.useUpdateCulture,
        culture_images: updateRecruitmentPage.useUpdateCultureImage
    }
};