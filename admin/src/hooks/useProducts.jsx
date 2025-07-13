import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import productsServices from "@/services/products.api.js";

function useGetPricePage(){
    return useQuery({
        queryKey: ["admin_product_page"],
        queryFn: productsServices.getPricePage,
        staleTime: 5 * 60 * 1000,
    })
}

function usePatchPricePage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => productsServices.patchPricePage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_price_page"] });
    },
  });
}
export default{
    getPricePage: useGetPricePage,
    patchPricePage: usePatchPricePage
}