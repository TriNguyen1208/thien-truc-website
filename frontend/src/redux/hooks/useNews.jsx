import { useQuery } from "@tanstack/react-query";
import newsServices from "@/services/news.api.js";

function useGetAll(){
    return useQuery({
        queryKey: ["news"],
        queryFn: newsServices.getAll,
        staleTime: 5 * 60 * 1000,
    })
}
function useGetNewsPage(){
    return useQuery({
        queryKey: ["news_page"],
        queryFn: newsServices.getNewsPage,
        staleTime: 5 * 60 * 1000,
    })
}
const news = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["news_list"],
            queryFn: newsServices.news.getAll,
            staleTime: 5 * 60 * 1000,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["news", id],
            queryFn: () => newsServices.news.getOne(id),
            staleTime: 5 * 60 * 1000,
        })
    }
}

const news_categories = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["news_categories"],
            queryFn: newsServices.new_categories.getAll,
            staleTime: 5 * 60 * 1000,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["news_category", id],
            queryFn: () => newsServices.new_categories.getOne(id),
            staleTime: 5 * 60 * 1000,
        })
    }
}

const news_contents = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["news_contents"],
            queryFn: newsServices.new_contents.getAll,
            staleTime: 5 * 60 * 1000,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["news_content", id],
            queryFn: () => newsServices.new_contents.getOne(id),
            staleTime: 5 * 60 * 1000,
        })
    }
}
function useSearchSuggest(query, filter){
    return useQuery({
        queryKey: ['news-suggestions', query, filter],
        queryFn: () => newsServices.getSearchSuggestions(query, filter),
        staleTime: 5 * 60 * 1000,
    })
}
export default {
    getAll: useGetAll,
    getNewsPage: useGetNewsPage,
    news,
    news_categories,
    news_contents,
    getSearchSuggestions: useSearchSuggest,
};