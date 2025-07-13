import { useQuery,  useMutation, useQueryClient  } from "@tanstack/react-query";
import productsServices from "@/services/products.api.js";

function useGetProductPage(){
    return useQuery({
        queryKey: ["admin_product_page"],
        queryFn: productsServices.getProductPage,
        staleTime: 5 * 60 * 1000,
    })
}
function usePatchProductPage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedPage)=> productsServices.patchProductPage(updatedPage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product_page"] });
    },
  });
}

export default {
    getProductPage: useGetProductPage,
    patchProductPage: usePatchProductPage,

  };