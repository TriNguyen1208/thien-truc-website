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

const manager = {
    getAll: async(req, res) => {
        const data = await adminServices.manager.getAll();
        res.status(200).json(data);
    },
    getOne: async (req, res) => {
        const username = req.params.username;
        const data = await adminServices.manager.getOne(username);
        res.status(200).json(data);
    }
}

export default { count, activity_logs, manager};