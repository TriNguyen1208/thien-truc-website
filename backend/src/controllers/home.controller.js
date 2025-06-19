import homeServices from "#@/services/home.services.js";

const getAllTables = async (req, res) => {
    const data = await homeServices.getAllTables();
    res.status(200).json(data);
}

const getHomePage = async(req, res) => {
    const data = await homeServices.getHomePage();
    res.status(200).json(data);
}

const highlight_stats_about_us = {
    getAll: async (req, res) => {
        const data = await homeServices.highlight_stats_about_us.getAll();
        res.status(200).json(data);
    },
    getOne: async (req, res) => { 
        const id = req.params.id;
        const data = await homeServices.highlight_stats_about_us.getOne(id);
        res.status(200).json(data);
    }
}
export default { getAllTables, getHomePage, highlight_stats_about_us };