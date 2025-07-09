import { useQuery } from "@tanstack/react-query";
import newsServices from "@/services/news.api.js";

function useGetQuantity()
{
    return useQuery({
        queryKey: ['admin_news_quantity'],
        queryFn: newsServices.getQuantity,
        staleTime: 5 * 60 * 1000
    })
}
export default {
    getQuantity: useGetQuantity
};