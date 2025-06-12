import { useQuery } from "@tanstack/react-query";
import homeServices from "@/services/home.api.js";

function useGetAll(){
    return useQuery({
        queryKey: ["home"],
        queryFn: homeServices.getAll,
    })
}
export default {
    getAll: useGetAll,
  };