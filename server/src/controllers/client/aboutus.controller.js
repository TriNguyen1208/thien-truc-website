import aboutUsServices from "#@/services/client/aboutus.services.js";

const getAllTables = async (req, res) => {
    const data = await aboutUsServices.getAllTables();
    res.status(200).json(data);
}

const getAboutUsPage = async (req, res) => {
    const data = await aboutUsServices.getAboutUsPage();
    res.status(200).json(data);
}

const company_services = {
    getAll: async (req, res) => {
        const data = await aboutUsServices.company_services.getAll();
        res.status(200).json(data);
    },
    getOne: async (req, res) => {
        const id = req.params.id;
        const data = await aboutUsServices.company_services.getOne(id);
        res.status(200).json(data);
    }
}

const why_choose_us = {
    getAll: async (req, res) => {
        const data = await aboutUsServices.why_choose_us.getAll();
        res.status(200).json(data);
    },
    getOne: async (req, res) => {
        const id = req.params.id;
        const data = await aboutUsServices.why_choose_us.getOne(id);
        res.status(200).json(data);
    }
}

export default { getAllTables, getAboutUsPage, company_services, why_choose_us };