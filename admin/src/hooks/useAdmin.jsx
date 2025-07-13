import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import adminServices from "@/services/admin.api.js";

const manager = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["admin_admin_manager"],
            queryFn: adminServices.manager.getAll,
            staleTime: 5 * 60 * 1000,
        })
    },
    useGetOne: (username) => {
        return useQuery({
            queryKey: ["admin_admin_manager",username],
            queryFn: ()=> adminServices.manager.getOne(username),
            staleTime: 5 * 60 * 1000,
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
export default {
    manager: {
        getAll: manager.useGetAll,
        getOne: manager.useGetOne,
        createOne: manager.useCreateOne,
        updateOne: manager.useUpdateOne,
        deleteOne: manager.useDeleteOne
    }
}