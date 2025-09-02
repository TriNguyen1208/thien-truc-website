import { useCustomQuery } from "./customQuery";
import recruitmentServices from "@/services/recruitment.api.js";

function useGetAll(){
    return useCustomQuery(["recruitment", "general", "get_all"], recruitmentServices.general.getAll);
}
function useGetRecruitmentPage(){
    return useCustomQuery(["recruitment", "general", "recruitment_page"], recruitmentServices.general.getRecruitmentPage);
}

export default {
    getAll: useGetAll,
    getRecruitmentPage: useGetRecruitmentPage
};