import { useQuery } from "@tanstack/react-query";
import productsServices from "@/services/products.api.js";

function useGetQuantity()
{
    return useQuery({
        queryKey: ['admin_product_quantity'],
        queryFn: productsServices.getQuantity,
        staleTime: 5 * 60 * 1000
    })
}
export default {
    getQuantity: useGetQuantity
};