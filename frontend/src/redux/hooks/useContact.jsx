import { useQuery } from "@tanstack/react-query";
import contactServices from "@/services/contact.api.js";

function useGetAll(){
    return useQuery({
        queryKey: ["contact"],
        queryFn: contactServices.getAll,
    })
}
export default {
    getAll: useGetAll,
  };