import contactServices from "#@/services/contact.services.js";
import activityLogServices from "#@/services/activity-log.services.js";
const { logActivity } = activityLogServices;

const getAllTables = async (req, res) => {
    const data = await contactServices.getAllTables();
    res.status(200).json(data);
}

const getContactPage = async (req, res) => {
    const data = await contactServices.getContactPage();
    res.status(200).json(data);
}

const updateContactPage ={
    banner: async (req, res) => {
        try {
            const { status, message, action = null } = await contactServices.updateContactPage.banner(req.body);
            if (status == 200) logActivity(req.user.username, action);
            res.status(status).json({ message: message });
        } catch (error) {
            console.error('Lỗi cập nhật Banner trang Liên Hệ: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ '});
        }
    },
    visibility: async (req, res) => {
        try {
            const { status, message, action } = await contactServices.updateContactPage.visibility(req.body);
            if (status == 200) logActivity(req.user.username, action);
            return res.status(status).json({ message });
        } catch (error) {
            console.error('Lỗi cập nhật trang liên hệ: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    }
}

const getCompanyInfo = async (req, res) => {
    const data = await contactServices.getCompanyInfo();
    res.status(200).json(data);
}

const updateCompanyInfo = async (req, res) => {
    try {
        const { status, message, action = null } = await contactServices.updateCompanyInfo(req.body);
        if (status == 200) logActivity(req.user.username, action);
        res.status(status).json({ message: message });
    } catch (error) {
        console.error('Lỗi cập nhật Thông Tin Công Ty: ', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
    }
    
}

const support_agents = {
    getAll: async (req, res) => {
        const data = await contactServices.support_agents.getAll();
        res.status(200).json(data);
    },
    getOne: async (req, res) => {
        const id = req.params.id;
        const data = await contactServices.support_agents.getOne(id);
        res.status(200).json(data);
    },
    createOne: async (req, res) => {
        try {
            const { status, message, action = null } = await contactServices.support_agents.createOne(req.body, req.file);
        if (status == 200) logActivity(req.user.username, action);
            res.status(status).json({ message: message });
        } catch (error) {
            console.error('Lỗi tạo Người Liên Lạc: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    },
    updateOne: async (req, res) => {
        const id = req.params.id;
        try {
            const { status, message, action = null } = await contactServices.support_agents.updateOne(req.body, req.file, id);
        if (status == 200) logActivity(req.user.username, action);
            res.status(status).json({ message: message });
        } catch (error) {
            console.error('Lỗi chỉnh sửa Người Liên Lạc: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    },
    deleteOne: async (req, res) => {
        const id = req.params.id;
        try {
            const { status, message, action = null } = await contactServices.support_agents.deleteOne(id);
            if (status == 200) logActivity(req.user.username, action);
            res.status(status).json({ message: message });
        } catch (error) {
            console.error('Lỗi xóa Người Liên Lạc: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    },
}

const postContactMessage = async (req, res) => {
    try {
        await contactServices.postContactMessage(req.body);
        res.status(200).json({ success: true, message: "Tin nhắn đã được gửi thành công" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Gửi tin nhắn thất bại", error: error.message });
    }
}

const count = async (req, res) => {
    const data = await contactServices.count();
    res.status(200).json(data);
}

export default { getAllTables, getContactPage, getCompanyInfo, updateCompanyInfo, support_agents, postContactMessage, count, updateContactPage};