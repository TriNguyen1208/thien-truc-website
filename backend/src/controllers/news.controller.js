import newsServices from "#@/services/news.services.js";

const getAllTables = async (req, res) => {
    const data = await newsServices.getAllTables();
    res.status(200).json(data);
}

const getNewsPage = async (req, res) => {
    const data = await newsServices.getNewsPage();
    res.status(200).json(data);
}

const news = {
    getAll: async (req, res) => {
        const data = await newsServices.news.getAll();
        res.status(200).json(data);
    },
    getById: async (req, res) => {
        const id = req.params.id;
        const data = await newsServices.news.getById(id);
        res.status(200).json(data);
    }
}

const news_categories = {
    getAll: async (req, res) => {
        const data = await newsServices.news_categories.getAll();
        res.status(200).json(data);
    },
    getById: async (req, res) => {
        const id = req.params.id;
        const data = await newsServices.news_categories.getById(id);
        res.status(200).json(data);
    }
}

export default { getAllTables, getNewsPage, news, news_categories };