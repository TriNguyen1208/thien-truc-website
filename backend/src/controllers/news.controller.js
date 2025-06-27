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
    getOne: async (req, res) => {
        const id = req.params.id;
        const data = await newsServices.news.getOne(id);
        res.status(200).json(data);
    }
}

const news_categories = {
    getAll: async (req, res) => {
        const data = await newsServices.news_categories.getAll();
        res.status(200).json(data);
    },
    getOne: async (req, res) => {
        const id = req.params.id;
        const data = await newsServices.news_categories.getOne(id);
        res.status(200).json(data);
    }
}

const news_contents = {
    getAll: async (req, res) => {
        const data = await newsServices.news_contents.getAll();
        res.status(200).json(data);
    },
    getOne: async (req, res) => {
        const id = req.params.id;
        const data = await newsServices.news_contents.getOne(id);
        res.status(200).json(data);
    }
}

const getSearchSuggestions = async (req, res) => {
    const query = req.query.query || '';
    const filter = req.query.filter || '';

    const data = await newsServices.getSearchSuggestions(query, filter);
    res.status(200).json(data);
}

const getAllByFilter = async (req, res) => {
    try {
        const { limit = 6, sort_by = 'date_desc', filter = '' } = req.query;
        const data = await newsServices.getAllByFilter({
            limit: parseInt(limit),
            sortBy: sort_by,
            filter: filter.trim() // ✅ chỉ cần trim cho gọn nếu muốn
        });
        res.status(200).json(data);
    }catch (error) {
        console.error('Error fetching filtered news:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
export default { getAllTables, getNewsPage, news, news_categories, news_contents,getSearchSuggestions, getAllByFilter};