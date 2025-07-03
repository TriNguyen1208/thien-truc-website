import { useQuery } from "@tanstack/react-query";
import homeServices from "@/services/home.api.js";

function useGetHomePage(){
    return useQuery({
        queryKey: ["home_page_admin"],
        queryFn: homeServices.getHomePage,
        staleTime: 5 * 60 * 1000,
    })
}
export default {
    getHomePage: useGetHomePage
}