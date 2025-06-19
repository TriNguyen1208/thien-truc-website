import contactServices from "#@/services/contact.services.js";

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

export default { getAllTables, getContactPage, getCompanyInfo, support_agents };