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
    },
    createOne: async (req, res) => {
        try {
            const result = await adminServices.manager.createOne(req.body);
            if (result.rowCount == 0) {
                return res.status(409).json({ message: 'Username đã tồn tại' });
            }
            return res.status(200).json({ message: 'Tạo Manager thành công'});
        } catch (error) {
            console.error('Lỗi tạo Manager: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    },
    updateOne: async (req, res) => {
        const username = req.params.username;
        try {
            const result = await adminServices.manager.updateOne(req.body, username);
            if (result.rowCount == 0) {
                return res.status(404).json({ message: 'Không tìm thấy Manager' });
            }
            res.status(200).json({ message: 'Cập nhật Manager thành công'});
        } catch (error) {
            console.error('Lỗi cập nhật Manager: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    },
    deleteOne: async (req, res) => {
        const username = req.params.username;
        try {
            const result = await adminServices.manager.deleteOne(username);
            if (result.rowCount == 0) {
                return res.status(404).json({ message: 'Không tìm thấy Manager' });
            }
            res.status(200).json({ message: 'Xóa Manager thành công'});
        } catch (error) {
            console.error('Lỗi xóa Manager: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    }
}

export default { count, activity_logs, manager};