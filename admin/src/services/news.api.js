import axios from "@/services/axiosInstance.js"
import API_ROUTES from "../../../shared/routesAPIServer";

const getAll = async () =>{
    const res = await axios.get(API_ROUTES.news.base);
    return res.data;
}

const getNewsPage = async() => {
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
        const res = await axios.post(API_ROUTES.news.news_contents.postOne, data, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
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
export default {getAll, getNewsPage, news, new_categories, new_contents, getSearchSuggestions, getSearchCategoriesSuggestions};
