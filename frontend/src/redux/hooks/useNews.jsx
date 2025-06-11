import { useQuery } from "@tanstack/react-query";
import newsServices from "@/services/news.api.js";

const useNews = (id = null) => {
    // const queryClient = useQueryClient(); //Khi nao can thi nho import vao
    const getAll = useQuery({
        queryKey: ["news"],
        queryFn: newsServices.getAll,
        enabled: !id //chi fetch neu khong co id
    });
    const getId = useQuery({
        queryKey: ["news", id],
        queryFn: () => newsServices.getId(id),
        enabled: !!id //chi fetch khi co id
    });
    return {
        getAll,
        getId
    };
}

export default useNews;