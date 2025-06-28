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

const news = {
    getAll: async () => {
        const res = await axios.get(API_ROUTES.news.news.getAll);
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
    }
}
const getSearchSuggestions = async (query, filter) => {
    const res = await axios.get(API_ROUTES.news.search_suggestions, {
        params: {
            query: query,
            filter: filter
        }
    })
    return res.data
}


export default {getAll, getNewsPage, news, new_categories, new_contents, getSearchSuggestions};
