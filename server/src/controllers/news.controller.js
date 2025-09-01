import newsServices from "#@/services/news.services.js";
import activityLogServices from "#@/services/activity-log.services.js";
const { logActivity } = activityLogServices;

const getAllTables = async (req, res) => {
    const data = await newsServices.getAllTables();
    res.status(200).json(data);
}

const getNewsPage = async (req, res) => {
    const data = await newsServices.getNewsPage();
    res.status(200).json(data);
}

const getHighlightNews = async (req, res) => {
    const data = await newsServices.getHighlightNews();
    res.status(200).json(data);
}

const updateNewsPage = {
    banner: async (req, res) => {
        try {
            const { status, message, action } = await newsServices.updateNewsPage.banner(req.body);
            if (status == 200) logActivity(req.user.username, action);
            return res.status(status).json({ message });
        } catch (error) {
            console.error('Lỗi cập nhật Banner trang Tin tức: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    },
    visibility: async (req, res) => {
        try {
            const { status, message, action } = await newsServices.updateNewsPage.visibility(req.body);
            if (status == 200) logActivity(req.user.username, action);
            return res.status(status).json({ message });
        } catch (error) {
            console.error('Lỗi cập nhật hiển thị trang Tin tức: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    }
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
    getAllFeatured: async (req, res) => {
        const data = await newsServices.news.getAllFeatured();
        res.status(200).json(data);
    },
    getSearchSuggestions: async (req, res) => {
        const query = req.query.query || '';
        const filter = req.query.filter || '';
        const is_published = req.query.is_published;

        const data = await newsServices.news.getSearchSuggestions(query, filter, is_published);
        res.status(200).json(data);
    },
    createOne: async (req, res) => {
        try {
            const { status, message, action = null, id } = await newsServices.news.createOne(req.body, req.files);
            if (status == 200) logActivity(req.user.username, action);
            res.status(status).json({ message, id });
        } catch (error) {
            console.error('Lỗi tạo tin tức: ', error);
            return res.status(500).json({message: 'Lỗi máy chủ nội bộ' });
        }
        
    },
    updateOne: async(req, res) => {
        try {
            const { id } = req.params;
            const { status, message, action = null } = await newsServices.news.updateOne(id, req.body, req.files)
            if (status == 200) logActivity(req.user.username, action);
            res.status(status).json({ message });
        } catch (error) {
            console.error('Lỗi cập nhật tin tức: ', error);
            return res.status(500).json({message: 'Lỗi máy chủ nội bộ' });
        }
    },
    updateFeaturedNews: async (req, res) => {
        try {
            const { status, message, action = null } = await newsServices.news.updateFeaturedNews(req.body);
            if (status == 200) logActivity(req.user.username, action);
            res.status(status).json({ message: message });
        } catch(error) {
            console.error('Lỗi cập nhật Tin tức nổi bật: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    },
    updateNumReaders: async(req, res)=>{
        const id = req.params.id;
        const data = await newsServices.news.updateNumReaders(id);
        res.status(200).json(data);
    },
    updateCategory: async (req, res) => {
        try {
            const { changedItems } = req.body; 
            const { status, message, action = null } = await newsServices.news.updateCategory(changedItems);
            if (status == 200) logActivity(req.user.username, action);
            res.status(status).json({ message: message });
        } catch (error) {
            console.error('Lỗi gán loại tin tức', error);
            res.status(500).json({message: 'Lỗi máy chủ nội bộ'});
        }
    }, 
    deleteOne: async (req, res) => {
        try {
            const id = req.params.id;
            const { status, message, action = null } = await newsServices.news.deleteOne(id);
            if (status == 200) logActivity(req.user.username, action);
            res.status(status).json({ message });
        } catch (error) {
            console.error('Lỗi xóa tin tức: ', error);
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
    getSearchSuggestions: async (req, res) => {
        const query = req.query.query || '';
        const data = await newsServices.news_categories.getSearchSuggestions(query);
        res.status(200).json(data);
    },
    createOne: async(req, res) => {
        try {
            const { status, message, action = null } = await newsServices.news_categories.createOne(req.body);
            if (status == 200) logActivity(req.user.username, action);
            res.status(status).json({ message });
        } catch (error) {
            console.error('Lỗi tạo loại tin tức: ', error);
            res.status(500).json({message: 'Lỗi máy chủ nội bộ'});
        }
    },
    updateOne: async(req, res) => {
        try {
            const id = req.params.id;
            const { status, message, action = null } = await newsServices.news_categories.updateOne(req.body, id);
            if (status == 200) logActivity(req.user.username, action);
            res.status(status).json({ message });
        } catch (error) {
            console.error('Lỗi cập nhật loại tin tức: ', error);
            res.status(500).json({message: 'Lỗi máy chủ nội bộ'});
        }
    },
    deleteOne: async(req, res) => {
        try {
            const id = req.params.id;
            const { status, message, action} = await newsServices.news_categories.deleteOne(id);
            if (status == 200) logActivity(req.user.username, action);
            res.status(status).json({ message });
        } catch (error) {
            console.error('Lỗi xóa loại tin tức: ', error);
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

const count = async (req, res) => {
    const data = await newsServices.count();
    res.status(200).json(data);
}

export default { getAllTables, getNewsPage, getHighlightNews, updateNewsPage, news, news_categories, news_contents, count};
