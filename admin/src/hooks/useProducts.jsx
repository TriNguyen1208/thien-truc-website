import { useQuery } from "@tanstack/react-query";
import productsServices from "@/services/products.api.js";

function useGetPricePage(){
    return useQuery({
        queryKey: ["admin_product_page"],
        queryFn: productsServices.getPricePage,
        staleTime: 5 * 60 * 1000,
    })
}
export default{
    getPricePage: useGetPricePage
}