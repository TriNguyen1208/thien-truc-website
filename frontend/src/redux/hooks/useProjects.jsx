import { useQuery } from "@tanstack/react-query";
import projectsServices from "@/services/projects.api.js";

const useProjects = (id = null) => {
    // const queryClient = useQueryClient(); //Khi nao can thi nho import vao
    const getAll = useQuery({
        queryKey: ["projects"],
        queryFn: projectsServices.getAll,
        enabled: !id //chi fetch neu khong co id
    });
    const getId = useQuery({
        queryKey: ["projects", id],
        queryFn: () => projectsServices.getId(id),
        enabled: !!id //chi fetch khi co id
    });
    return {
        getAll,
        getId
    };
}

export default useProjects;