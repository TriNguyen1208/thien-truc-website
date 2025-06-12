import { useQuery } from "@tanstack/react-query";
import aboutUsServices from "@/services/aboutus.api.js";

function useGetAll(){
    return useQuery({
        queryKey: ["aboutus"],
        queryFn: aboutUsServices.getAll,
    })
}
export default {
    getAll: useGetAll,
};