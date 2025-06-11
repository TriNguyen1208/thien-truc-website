import { useQuery } from "@tanstack/react-query";
import homeServices from "@/services/home.api.js";

const useHome = () => {
    // const queryClient = useQueryClient(); //Khi nao can thi nho import vao
    const getAll = useQuery({
            queryKey: ["home"],
            queryFn: homeServices.getAll
        });

    return {
        getAll
    };
}

export default useHome;