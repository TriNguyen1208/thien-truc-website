import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import adminServices from "@/services/admin.api.js";

const manager = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["admin_admin_manager"],
            queryFn: adminServices.manager.getAll,
            staleTime: 10 * 60 * 1000,
        })
    },
    useGetOne: (username) => {
        return useQuery({
            queryKey: ["admin_admin_manager",username],
            queryFn: ()=> adminServices.manager.getOne(username),
            staleTime: 10 * 60 * 1000,
        })
    },
    useCreateOne:() =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newManager) => adminServices.manager.createOne(newManager),
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['admin_admin_manager'] });
        },
    });
    },
    useUpdateOne:() =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedManager) => adminServices.manager.updateOne(updatedManager),
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['admin_admin_manager'] });
        },
    });
    },
    useDeleteOne:() =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (username) => adminServices.manager.deleteOne(username),
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['admin_admin_manager'] });
        },
    });
    },


}



function useGetQuantity()
{
    const queryClient = useQueryClient();
    queryClient.invalidateQueries(['admin_admin_quantity']);
    return useQuery({
        queryKey: ['admin_admin_quantity'],
        queryFn: adminServices.getQuantity,
        staleTime: 10 * 60 * 1000
    })
}
function useGetActivityLogs()
{
    const queryClient = useQueryClient();
    queryClient.invalidateQueries(['admin_admin_activity_logs']);
    return useQuery({
        queryKey: ['admin_admin_activity_logs'],
        queryFn: adminServices.getActivityLogs,
        staleTime: 10 * 60 * 1000
    })
}
export default {
    manager: {
        getAll: manager.useGetAll,
        getOne: manager.useGetOne,
        createOne: manager.useCreateOne,
        updateOne: manager.useUpdateOne,
        deleteOne: manager.useDeleteOne
    },
    getQuantity: useGetQuantity,
    getActivityLogs: useGetActivityLogs
}
