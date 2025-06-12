import { useQuery } from "@tanstack/react-query";
import recruitmentServices from "@/services/recruitment.api.js";

function useGetAll(){
    return useQuery({
        queryKey: ["recruitment"],
        queryFn: recruitmentServices.getAll,
    })
}
export default {
    getAll: useGetAll,
};