import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import adminServices from "../services/admin.api.js";
import { toast } from "react-toastify";

function useGetQuantity() {
    return useQuery({
        queryKey: ['quantity'],
        queryFn: adminServices.getQuantity,
        staleTime: 10 * 60 * 1000
    })
}

function useGetActivityLogs() {
    const queryClient = useQueryClient();
    queryClient.invalidateQueries(['activity_logs']);
    return useQuery({
        queryKey: ['activity_logs'],
        queryFn: adminServices.getActivityLogs,
        staleTime: 10 * 60 * 1000
    })
}
const manager = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["manager"],
            queryFn: adminServices.manager.getAll,
            staleTime: 10 * 60 * 1000,
        })
    },
    useCreateOne:() =>{
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (newManager) => adminServices.manager.createOne(newManager),
            onSuccess: (success) => {
                queryClient.invalidateQueries({ queryKey: ['manager'] });
                queryClient.invalidateQueries({ queryKey: ['quantity'] });
                toast.success(success.message);
            },
            onError: (error) => {
                toast.error(error.message);
            }
        });
    },
    useUpdateOne:() =>{
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (updatedManager) => adminServices.manager.updateOne(updatedManager),
            onSuccess: (success) => {
                queryClient.invalidateQueries({ queryKey: ['manager'] });
                toast.success(success.message);
            },
            onError: (error) => {
                toast.error(error.message);
            }
        });
    },
    useDeleteOne:() =>{
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (username) => adminServices.manager.deleteOne(username),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['manager'] });
                queryClient.invalidateQueries({ queryKey: ['quantity'] });
                toast.success(success.message);
            },
            onError: (error) => {
                toast.error(error.message);
            }
        });
    },
}

export default {
    manager: {
        getAll: manager.useGetAll,//
        createOne: manager.useCreateOne,//
        updateOne: manager.useUpdateOne,//
        deleteOne: manager.useDeleteOne//
    },
    getQuantity: useGetQuantity,//
    getActivityLogs: useGetActivityLogs//
}
