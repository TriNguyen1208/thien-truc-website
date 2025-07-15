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
    getListByCategory: async (req, res) => {
        const {query = '', filter = '', sort_by = 'popular', is_published, limit} = req.query;
        const data = await newsServices.news.getListByCategory(query, filter, sort_by, is_published, parseInt(limit));
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
    },
    deleteOne: async (req, res) => {
        const id = parseInt(req.params.id);
        try {
            const result = await newsServices.news.deleteOne(id);
            if (result.rowCount == 0) {
                return res.status(404).json({message: 'Không tìm thấy sản phẩm'});
            }
            return res.status(200).json({message: result});
        } catch (error) {
            console.log('Lỗi máy chủ', error);
            return res.status(500).json({message: 'Lỗi máy chủ'});
        }
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
    },
    createOne: async(req, res) => {
        try {
            await newsServices.news_categories.createOne(req.body);
            res.status(200).json({message: 'Thêm dự án thành công'});
        } catch (error) {
            console.log('Error: ', error);
            res.status(500).json({message: 'Lỗi máy chủ nội bộ'});
        }
    },
    updateOne: async(req, res) => {
        const id = parseInt(req.params.id);
        try {
            await newsServices.news_categories.updateOne(req.body, id); 
            res.status(200).json({message: 'Cập nhật thông tin vùng thành công'});
        } catch (error) {
            console.log('Error:', error);
            res.status(500).json({message: 'Lỗi máy chủ nội bộ'});
        }
    },
    deleteOne: async(req, res) => {
        const id = parseInt(req.params.id);
        try {
            const result = await newsServices.news_categories.deleteOne(id);
            if (result.rowCount == 0) {
                return res.status(404).json({message: 'Không tìm thấy sản phẩm'});
            }
            return res.status(200).json(result);
        } catch (error) {
            console.log('Error: ', error);
            return res.status(500).json({message: 'Lỗi máy chủ'});
        }
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
    const is_published = req.query.is_published;

    const data = await newsServices.getSearchSuggestions(query, filter, is_published);
    res.status(200).json(data);
}

const count = async (req, res) => {
    const data = await newsServices.count();
    res.status(200).json(data);
}

const featured_news = {
    getAll: async (req, res) => {
        const data = await newsServices.featured_news.getAll();
        res.status(200).json(data);
    },
    updateAll: async (req, res) => {
        try {
            const { status, message } = await newsServices.featured_news.updateAll(req.body);
            res.status(status).json({ message: message });
        } catch(error) {
            console.error('Lỗi cập nhật Tin Tức Nổi Bật: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    }
}
export default { getAllTables, getNewsPage, news, news_categories, news_contents, getSearchSuggestions, getSearchCategoriesSuggestions, count, featured_news};
