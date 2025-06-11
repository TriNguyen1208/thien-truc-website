import { useQuery } from "@tanstack/react-query";
import aboutUsServices from "@/services/aboutus.api.js";

const useAboutUs = () => {
    // const queryClient = useQueryClient(); //Khi nao can thi nho import vao
    const getAll = useQuery({
            queryKey: ["aboutus"],
            queryFn: aboutUsServices.getAll
        });

    return {
        getAll
    };
}

export default useAboutUs;