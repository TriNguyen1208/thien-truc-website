import { useQuery } from "@tanstack/react-query";
import projectsServices from "@/services/projects.api.js";

function useGetAll(){
    return useQuery({
        queryKey: ["projects"],
        queryFn: projectsServices.getAll,
    })
}
function useGetId(id){
    return useQuery({
        queryKey: ["projects", id],
        queryFn: () => projectsServices.getId(id),
        enabled: !!id //chi fetch khi co id
    })
}
export default {
    getAll: useGetAll,
    getId: useGetId
  };