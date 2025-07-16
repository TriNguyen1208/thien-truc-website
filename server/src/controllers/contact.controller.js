import contactServices from "#@/services/contact.services.js";

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
            const { status, message } = await contactServices.updateContactPage.banner(req.body);
            res.status(status).json({ message: message });
        } catch (error) {
            console.log('Lỗi cập nhật Banner Trang Liên Hệ: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ '});
        }
    }
}

const getCompanyInfo = async (req, res) => {
    const data = await contactServices.getCompanyInfo();
    res.status(200).json(data);
}

const updateCompanyInfo = async (req, res) => {
    try {
        const { status, message } = await contactServices.updateCompanyInfo(req.body);
        res.status(status).json({ message: message });
    } catch (error) {
        console.log('Lỗi cập nhật Thông Tin Công Ty: ', error);
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
            const { status, message } = await contactServices.support_agents.createOne(req.body);
            res.status(status).json({ message: message });
        } catch (error) {
            console.log('Lỗi tạo Người Liên Lạc: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    },
    updateOne: async (req, res) => {
        const id = req.params.id;
        try {
            const { status, message } = await contactServices.support_agents.updateOne(req.body, id);
            res.status(status).json({ message: message });
        } catch (error) {
            console.log('Lỗi chỉnh sửa Người Liên Lạc: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    },
    deleteOne: async (req, res) => {
        const id = req.params.id;
        try {
            const { status, message } = await contactServices.support_agents.deleteOne(id);
            res.status(status).json({ message: message });
        } catch (error) {
            console.log('Lỗi xóa Người Liên Lạc: ', error);
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