import { fetchData, patchData } from "./apiHelper";
import API_ROUTES from "../../../shared/routesAPI";

const newsServices = {
    general: {
        getAll: async () => fetchData(API_ROUTES.news.base),
        getNewsPage: async () => fetchData(API_ROUTES.news.news_page),
        getHighlightNews: async () => fetchData(API_ROUTES.news.getHighlightNews)
    },
    news: {
        getList: async (query = '', filter = '', is_published = '', sort_by = '', page = 1, limit = undefined) => 
            fetchData(API_ROUTES.news.news.getList(query, filter, is_published, sort_by, page, limit)),
        getOne: async (id) => fetchData(API_ROUTES.news.news.getOne(id)),
        getAllFeatured: async () => fetchData(API_ROUTES.news.news.getAllFeatured),
        getSearchSuggestions: async (query, filter) => fetchData(API_ROUTES.news.news.getSearchSuggestions(query, filter)),
        updateNumReaders: async (id) => patchData(API_ROUTES.news.news.updateNumReaders(id))
    },
    new_categories: {
        getAll: async () => fetchData(API_ROUTES.news.news_categories.getAll),
        getOne: async (id) => fetchData(API_ROUTES.news.news_categories.getOne(id))
    },
    new_contents: {
        getAll: async () => fetchData(API_ROUTES.news.news_contents.getAll),
        getOne: async (id) => fetchData(API_ROUTES.news.news_contents.getOne(id))
    }
}

export default newsServices;