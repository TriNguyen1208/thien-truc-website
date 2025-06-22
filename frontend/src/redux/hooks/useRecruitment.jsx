import { useQuery } from "@tanstack/react-query";
import recruitmentServices from "@/services/recruitment.api.js";

function useGetAll(){
    return useQuery({
        queryKey: ["recruitment"],
        queryFn: recruitmentServices.getAll,
    })
}
function useGetRecruitmentPage(){
    return useQuery({
        queryKey: ["recruitment_page"],
        queryFn: recruitmentServices.getRecruitmentPage,
    })
}
export default {
    getAll: useGetAll,
    getRecruitmentPage: useGetRecruitmentPage
};