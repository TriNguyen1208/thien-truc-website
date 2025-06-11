import { useQuery } from "@tanstack/react-query";
import recruitmentServices from "@/services/recruitment.api.js";

const useRecruitment = () => {
    // const queryClient = useQueryClient(); //Khi nao can thi nho import vao
    const getAll = useQuery({
            queryKey: ["recruitment"],
            queryFn: recruitmentServices.getAll
        });

    return {
        getAll
    };
}

export default useRecruitment;