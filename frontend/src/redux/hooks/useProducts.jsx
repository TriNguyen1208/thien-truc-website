import { useQuery } from "@tanstack/react-query";
import productsServices from "@/services/products.api.js";

function useGetAll(){
    return useQuery({
        queryKey: ["products"],
        queryFn: productsServices.getAll,
    })
}
function useGetId(id){
    return useQuery({
        queryKey: ["products", id],
        queryFn: () => productsServices.getId(id),
        enabled: !!id //chi fetch khi co id
    })
}
export default {
    getAll: useGetAll,
    getId: useGetId
  };