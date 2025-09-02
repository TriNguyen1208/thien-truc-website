import axios from "@/services/axiosInstance.js"
import API_ROUTES from "../../../shared/routesAPIServer";

const getNewsPage = async () => {
    const res = await axios.get(API_ROUTES.news.news_page);
    return res.data;
}
const updateNewsPage = {
    banner: async (data) => {
        const res = await axios.patch(API_ROUTES.news.updateNewsPage.banner, data)
        return res.data;
    },
    visibility: async (data) => {
        const res = await axios.patch(API_ROUTES.news.updateNewsPage.visibility, data)
        return res.data;
    }
}
const news = {
    getList: async (query = '', filter = '', is_published, sort_by = '', page = undefined, limit) => {
        const res = await axios.get(API_ROUTES.news.news.getList(query, filter, is_published, sort_by, page, limit));
        return res.data;
    },
    getOne: async (id) => {
        const res = await axios.get(API_ROUTES.news.news.getOne(id));
        return res.data;
    },
    getSearchSuggestions: async (query='', filter='') => {
        const res = await axios.get(API_ROUTES.news.news.getSearchSuggestions(query, filter))
        return res.data;
    },
    getAllFeatured: async () => {
        const res = await axios.get(API_ROUTES.news.news.getAllFeatured)
        return res.data;
    },
    createOne: async (data) => {
        const res = await axios.post(API_ROUTES.news.news.createOne, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            timeout: 20000
        });
        return res.data;
    },
    updateOne: async (id, data) => {
        const res = await axios.patch(API_ROUTES.news.news.updateOne(id), data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            timeout: 20000
        });
        return res.data;
    },
    updateCategory: async (changedItems) => {
        const res = await axios.patch(API_ROUTES.news.news.updateCategory, changedItems);
        return res.data;
    },
    updateFeaturedNews: async (data) => {
        const res = await axios.patch(API_ROUTES.news.news.updateFeaturedNews, data)
        return res.data;
    },
    deleteOne: async (id) => {
        const res = await axios.delete(API_ROUTES.news.news.deleteOne(id));
        return res.data;
    }
}

const news_categories = {
    getAll: async () => {
        const res = await axios.get(API_ROUTES.news.news_categories.getAll);
        return res.data;
    },
    getOne: async (id) => {
        const res = await axios.get(API_ROUTES.news.news_categories.getOne(id));
        return res.data;
    },
    getSearchSuggestions: async (query = '') => {
        const res = await axios.get(API_ROUTES.news.news_categories.getSearchSuggestions(query));
        return res.data;
    },
    createOne: async (name = '', rgb_color = '') => {
        const res = await axios.post(API_ROUTES.news.news_categories.createOne, {
            name,
            rgb_color
        })
        return res.data;
    },
    updateOne: async (name = '', rgb_color = '', id) => {
        const res = await axios.patch(API_ROUTES.news.news_categories.updateOne(id), {
            name,
            rgb_color
        });
        return res.data;
    },
    deleteOne: async (id) => {
        const res = await axios.delete(API_ROUTES.news.news_categories.deleteOne(id));
        return res.data;
    }
}

const news_contents = {
    getOne: async (id) => {
        const res = await axios.get(API_ROUTES.news.news_contents.getOne(id));
        return res.data;
    },
}
const getQuantity = async () => {
    const res = await axios.get(API_ROUTES.news.count)
    return res.data
}
export default { 
    getNewsPage,
    updateNewsPage,
    news,
    news_categories,
    news_contents,
    getQuantity
};
