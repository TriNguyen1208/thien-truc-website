import { useQuery } from "@tanstack/react-query";
import productsServices from "@/services/products.api.js";

function useGetProductPage(){
    return useQuery({
        queryKey: ["admin_product_page"],
        queryFn: productsServices.getProductPage,
        staleTime: 5 * 60 * 1000,
    })
}

export default {
    getProductPage: useGetProductPage,
  };