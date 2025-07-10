import { useQuery } from "@tanstack/react-query";
import contactServices from "@/services/contact.api.js";

function useGetCompanyInfo(){
    return useQuery({
        queryKey: ["admin_company_info"],
        queryFn: contactServices.getCompanyInfo,
        staleTime: 5 * 60 * 1000,
    })
}
export default {
    getCompanyInfo: useGetCompanyInfo
}