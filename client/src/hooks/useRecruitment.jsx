import { useQuery } from "@tanstack/react-query";
import recruitmentServices from "@/services/recruitment.api.js";

function useGetAll(){
    return useQuery({
        queryKey: ["recruitment"],
        queryFn: recruitmentServices.getAll,
        staleTime: 5 * 60 * 1000,
    })
}
function useGetRecruitmentPage(){
    return useQuery({
        queryKey: ["recruitment_page"],
        queryFn: recruitmentServices.getRecruitmentPage,
        staleTime: 5 * 60 * 1000,
    })
}z
export default {
    getAll: useGetAll,
    getRecruitmentPage: useGetRecruitmentPage
};