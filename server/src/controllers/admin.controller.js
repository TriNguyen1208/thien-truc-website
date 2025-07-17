import adminServices from "#@/services/admin.services.js";
import activityLogServices from "#@/services/activity-log.services.js";
const { logActivity } = activityLogServices;

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
    },
    createOne: async (req, res) => {
        try {
            const { status, message, action = null} = await adminServices.manager.createOne(req.body);
            if (status == 200) logActivity(req.user.username, action);
            return res.status(status).json({ message });
        } catch (error) {
            console.error('Lỗi tạo Manager: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    },
    updateOne: async (req, res) => {
        const username = req.params.username;
        try {
            const { status, message, action = null } = await adminServices.manager.updateOne(req.body, username);
            if (status == 200) logActivity(req.user.username, action);
            return res.status(status).json({ message });
        } catch (error) {
            console.error('Lỗi cập nhật Manager: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    },
    deleteOne: async (req, res) => {
        const username = req.params.username;
        try {
            const { status, message, action = null } = await adminServices.manager.deleteOne(username);
            if (status == 200) logActivity(req.user.username, action);
            return res.status(status).json({ message });
        } catch (error) {
            console.error('Lỗi xóa Manager: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    }
}

export default { count, activity_logs, manager};