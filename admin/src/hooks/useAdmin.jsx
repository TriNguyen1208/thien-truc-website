import { useQuery } from "@tanstack/react-query";
import adminServices from "@/services/admin.api.js";

function useGetQuantity()
{
    return useQuery({
        queryKey: ['admin_admin_quantity'],
        queryFn: adminServices.getQuantity,
        staleTime: 5 * 60 * 1000
    })
}
function useGetActivityLogs()
{
    return useQuery({
        queryKey: ['admin_admin_activity_logs'],
        queryFn: adminServices.getActivityLogs,
        staleTime: 5 * 60 * 1000
    })
}
export default {
    getQuantity: useGetQuantity,
    getActivityLogs: useGetActivityLogs
};