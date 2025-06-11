import { useQuery } from "@tanstack/react-query";
import productsServices from "@/services/products.api.js";

const useProducts = (id = null) => {
    // const queryClient = useQueryClient(); //Khi nao can thi nho import vao
    const getAll = useQuery({
        queryKey: ["products"],
        queryFn: productsServices.getAll,
        enabled: !id //chi fetch neu khong co id
    });
    const getId = useQuery({
        queryKey: ["products", id],
        queryFn: () => productsServices.getId(id),
        enabled: !!id //chi fetch khi co id
    });
    return {
        getAll,
        getId
    };
}

export default useProducts;