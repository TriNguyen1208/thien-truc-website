import { useQuery } from "@tanstack/react-query";
import newsServices from "@/services/news.api.js";

function useGetAll(){
    return useQuery({
        queryKey: ["news"],
        queryFn: newsServices.getAll,
    })
}
function useGetId(id){
    return useQuery({
        queryKey: ["news", id],
        queryFn: () => newsServices.getId(id),
        enabled: !!id //chi fetch khi co id
    })
}
export default {
    getAll: useGetAll,
    getId: useGetId
  };