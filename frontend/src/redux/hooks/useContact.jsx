import { useQuery } from "@tanstack/react-query";
import contactServices from "@/services/contact.api.js";

const useContact = () => {
    // const queryClient = useQueryClient(); //Khi nao can thi nho import vao
    const getAll = useQuery({
            queryKey: ["contact"],
            queryFn: contactServices.getAll
        });

    return {
        getAll
    };
}

export default useContact;