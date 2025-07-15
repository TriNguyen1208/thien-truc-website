import axios from "@/services/axiosInstance.js"
import API_ROUTES from "../../../shared/routesAPIServer";

const manager =  {
    getAll: async () => {
        const res = await axios.get(API_ROUTES.admin.manager.getAll);
        return res.data;
    },
    getOne: async (username) => {
        const res = await axios.get(API_ROUTES.admin.manager.getOne(username) );
        return res.data;
    },
    createOne: async (newManager) => {
        const res = await axios.post(API_ROUTES.admin.manager.createOne, newManager);
        return res.data;
    },
    updateOne: async (updatedManager) => {
        const res = await axios.patch(API_ROUTES.admin.manager.updateOne(updatedManager.username), updatedManager );
        return res.data;
    },
    deleteOne: async (username) => {
        const res = await axios.delete(API_ROUTES.admin.manager.deleteOne(username) );
        return res.data;
    },
}
const getQuantity = async()=>{
    const res = await axios.get(API_ROUTES.admin.count)
    return res.data
}
const getActivityLogs = async()=>{
    const res = await axios.get(API_ROUTES.admin.activity_logs)
    return res.data
}
export default {manager,  getQuantity , getActivityLogs};
