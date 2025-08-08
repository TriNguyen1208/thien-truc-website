import axios from "@/services/axiosInstance.js"
import API_ROUTES from "../../../shared/routesAPI";

const getAll = async () =>{
    const res = await axios.get(API_ROUTES.news.base);
    return res.data;
}

const getNewsPage = async() => {
    const res = await axios.get(API_ROUTES.news.news_page);
    return res.data;
}

const getHighlightNews = async () => {
    const res = await axios.get(API_ROUTES.news.highlight_news);
    return res.data;
}

const news = {
    getList: async (query = '', filter = '', is_published = '', sort_by = '', page = 1, limit = undefined) => {
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
        
    }
}
const getFeaturedNews = async () => {
    const res = await axios.get(API_ROUTES.news.getFeaturedNews);
    return res.data;
}

const getSearchSuggestions = async (query, filter) => {
    const res = await axios.get(API_ROUTES.news.search_suggestions(query, filter))
    return res.data;
}
export default {getAll, getNewsPage, getHighlightNews, news, new_categories, new_contents, getSearchSuggestions, getFeaturedNews};
