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
    getList: async (req, res) => {
        const {query = '', filter = '', sort_by = 'popular', page, is_published, limit} = req.query;
        const data = await newsServices.news.getList(query, filter, sort_by, parseInt(page), is_published, parseInt(limit));
        res.status(200).json(data);
    },
    getOne: async (req, res) => {
        const id = req.params.id;
        const data = await newsServices.news.getOne(id);
        res.status(200).json(data);
    },
    updateNumReaders: async(req, res)=>{
        const id = req.params.id;
        const data = await newsServices.news.updateNumReaders(id);
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

const getSearchCategoriesSuggestions = async (req, res) => {
    const query = req.query.query || '';
    const data = await newsServices.getSearchCategoriesSuggestions(query);
    res.status(200).json(data);
}

const getSearchSuggestions = async (req, res) => {
    const query = req.query.query || '';
    const filter = req.query.filter || '';

    const data = await newsServices.getSearchSuggestions(query, filter);
    res.status(200).json(data);
}

const count = async (req, res) => {
    const data = await newsServices.count();
    res.status(200).json(data);
}
export default { getAllTables, getNewsPage, news, news_categories, news_contents, getSearchCategoriesSuggestions, getSearchSuggestions, count};
