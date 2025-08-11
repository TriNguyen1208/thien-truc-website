import axios from "@/services/axiosInstance.js"
import API_ROUTES from "../../../shared/routesAPIServer";
const getQuantity = async () => {
    const res = await axios.get(API_ROUTES.news.count)
    return res.data
}

const getAll = async () => {
    const res = await axios.get(API_ROUTES.news.base);
    return res.data;
}

const getNewsPage = async () => {
    const res = await axios.get(API_ROUTES.news.news_page);
    return res.data;
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
    updateNumReaders: async (id) => {
        const res = await axios.patch(API_ROUTES.news.news.updateNumReaders(id));
        return res.data;
    },
    updateCategory: async (changedItems) => {
        const res = await axios.patch(API_ROUTES.news.news.updateCategory, changedItems);
        return res.data;
    },
    deleteOne: async (id) => {
        const res = await axios.delete(API_ROUTES.news.news.deleteOne(id));
        return res.data;
    }
}
const new_categories = {
    getAll: async () => {
        const res = await axios.get(API_ROUTES.news.news_categories.getAll);
        return res.data;
    },
    getOne: async (id) => {
        const res = await axios.get(API_ROUTES.news.news_categories.getOne(id));
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

const new_contents = {
    getAll: async () => {
        const res = await axios.get(API_ROUTES.news.news_contents.getAll);
        return res.data;
    },
    getOne: async (id) => {
        const res = await axios.get(API_ROUTES.news.news_contents.getOne(id));
        return res.data;
    },
    postOne: async (data) => {
        const res = await axios.post(API_ROUTES.news.news_contents.postOne, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            timeout: 20000
        });
        return res.data;
    },
    updateOne: async (id, data) => {
        const res = await axios.patch(API_ROUTES.news.news_contents.updateOne(id), data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            timeout: 20000
        });
        return res.data;
    }
}
const getSearchCategoriesSuggestions = async (query) => {
    const res = await axios.get(API_ROUTES.news.search_categories_suggestions(query));
    return res.data;
}

const getSearchSuggestions = async (query, filter) => {
    const res = await axios.get(API_ROUTES.news.search_suggestions(query, filter))
    return res.data;
}

const getFeatureNews = async () => {
    const res = await axios.get(API_ROUTES.news.getFeaturedNews);
    return res.data;
}

const updateFeatureNews = async (data) => {
    const res = await axios.patch(API_ROUTES.news.updateFeaturedNews, data)
    return res.data;
}
const patchNewsPage = async (updatedPage)=> {
    const res = await axios.patch(API_ROUTES.news.update_news_page, updatedPage)
    return res.data;
}
const updateVisibility = async (data) => {
    const res = await axios.patch(API_ROUTES.news.update_visibility, data)
    return res.data;
}
export default { 
getQuantity, getAll, getNewsPage, news, new_categories, new_contents,
getSearchSuggestions, getSearchCategoriesSuggestions, getFeatureNews, updateFeatureNews, patchNewsPage, updateVisibility};
