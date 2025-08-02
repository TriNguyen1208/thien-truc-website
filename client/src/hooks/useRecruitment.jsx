import { useQuery } from "@tanstack/react-query";
import recruitmentServices from "@/services/recruitment.api.js";

function useGetAll(){
    return useQuery({
        queryKey: ["recruitment"],
        queryFn: recruitmentServices.getAll,
        staleTime: 10 * 60 * 1000,
    })
}
function useGetRecruitmentPage(){
    return useQuery({
        queryKey: ["recruitment_page"],
        queryFn: recruitmentServices.getRecruitmentPage,
        staleTime: 10 * 60 * 1000,
    })
}
export default {
    getAll: useGetAll,
    getRecruitmentPage: useGetRecruitmentPage
};