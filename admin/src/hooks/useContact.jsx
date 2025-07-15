import { useQuery } from "@tanstack/react-query";
import contactServices from "@/services/contact.api.js";

function useGetQuantity()
{
    return useQuery({
        queryKey: ['admin_contact_quantity'],
        queryFn: contactServices.getQuantity,
        staleTime: 5 * 60 * 1000
    })
}
export default {
    getQuantity: useGetQuantity
};