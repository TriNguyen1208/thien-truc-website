import { useCustomQuery, useCustomMutation } from "./customQuery";
import newsServices from "@/services/news.api.js";

function useGetAll(){
    return useCustomQuery(["news", "general", "get_all"], newsServices.general.getAll);
}
function useGetNewsPage(){
    return useCustomQuery(["news", "general", "news_page"], newsServices.general.getNewsPage);
}
function useGetHighlightNews() {
    return useCustomQuery(["news", "general", "highlight_news"], newsServices.general.getHighlightNews);
}
function useSearchSuggest(query, filter){
    return useCustomQuery(["news", "news", "search_suggestions", query, filter], () => newsServices.news.getSearchSuggestions(query, filter))
}
function useGetFeaturedNews() {
    return useCustomQuery(["news", "news", "featured_news"], newsServices.news.getAllFeatured)
}

const news = {
    useGetList: (query = '', filter = '', is_published = '', sort_by = '', page = 1, limit = undefined) => 
        useCustomQuery(["news", "news", "get_list", query, filter, is_published, sort_by, page, limit], () => newsServices.news.getList(query, filter, is_published, sort_by, page, limit)),
    useGetOne: (id) => 
        useCustomQuery(["news", "news", "get_one", id], () => newsServices.news.getOne(id)),
    useUpdateNumReaders: (id) => (
        useCustomMutation(["news", "news", "get_list"], () => newsServices.news.updateNumReaders(id))
    )
}

const news_categories = {
    useGetAll: () => useCustomQuery(["news", "news_categories", "get_all"], newsServices.new_categories.getAll),
    useGetOne: (id) => useCustomQuery(["news", "news_categories", "get_one", id], () => newsServices.new_categories.getOne(id)),
}

const news_contents = {
    useGetAll: () => useCustomQuery(["news", "news_contents", "get_all"], newsServices.new_contents.getAll),
    useGetOne: (id) => useCustomQuery(["news", "news_contents", "get_one", id], () => newsServices.new_contents.getOne(id)),
}


export default {
    getAll: useGetAll,
    getNewsPage: useGetNewsPage,
    getHighlightNews: useGetHighlightNews,
    getFeaturedNews: useGetFeaturedNews,
    getSearchSuggestions: useSearchSuggest,
    news:{
        getList: news.useGetList,
        getOne: news.useGetOne,
        updateNumReaders: news.useUpdateNumReaders
    },
    news_categories:{
        getAll: news_categories.useGetAll,
        getOne: news_categories.useGetOne,
    },
    news_contents:{
        getAll: news_contents.useGetAll,
        getOne: news_contents.useGetOne,
    }
};