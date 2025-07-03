import contactServices from "#@/services/client/contact.services.js";

const getAllTables = async (req, res) => {
    const data = await contactServices.getAllTables();
    res.status(200).json(data);
}

const getContactPage = async (req, res) => {
    const data = await contactServices.getContactPage();
    res.status(200).json(data);
}

const getCompanyInfo = async (req, res) => {
    const data = await contactServices.getCompanyInfo();
    res.status(200).json(data);
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
    }
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
export default { getAllTables, getContactPage, getCompanyInfo, support_agents, postContactMessage};