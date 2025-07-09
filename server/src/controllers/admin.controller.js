import adminServices from "#@/services/admin.services.js";

const count = async(req, res) => {
    const data = await adminServices.count();
    res.status(200).json(data);
}

const activity_logs = {
    getAll: async(req, res) => {
        const data = await adminServices.activity_logs.getAll();
        res.status(200).json(data);
    }
}

export default { count, activity_logs};