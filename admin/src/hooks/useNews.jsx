import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newsServices from "@/services/news.api.js";

function useGetQuantity()
{
    return useQuery({
        queryKey: ['admin_news_quantity'],
        queryFn: newsServices.getQuantity,
        staleTime: 5 * 60 * 1000
    })
}

function useGetAll(){
    return useQuery({
        queryKey: ["admin_news"],
        queryFn: newsServices.getAll,
        staleTime: 5 * 60 * 1000,
    })
}
function useGetNewsPage(){
    return useQuery({
        queryKey: ["admin_news_page"],
        queryFn: newsServices.getNewsPage,
        staleTime: 5 * 60 * 1000,
    })
}
const news = {
    useGetList: (query = '', filter = '', is_published, sort_by = '', page = undefined, limit) => {
        return useQuery({
            queryKey: ["admin_news_list", query, filter, is_published, sort_by, page, limit],
            queryFn: () => newsServices.news.getList(query, filter, is_published, sort_by, page, limit),
            staleTime: 5 * 60 * 1000,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["admin_news", id],
            queryFn: () => newsServices.news.getOne(id),
            staleTime: 5 * 60 * 1000,
        })
    },
    useUpdateNumReaders: (id) => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: () => newsServices.news.updateNumReaders(id),
            onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["admin_news_list"], // match theo prefix
                exact: false,            // cho phép match tất cả ["news_list", ...]
            });
        }
        })
    }
}

const news_categories = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["admin_news_categories"],
            queryFn: newsServices.new_categories.getAll,
            staleTime: 5 * 60 * 1000,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["admin_news_category", id],
            queryFn: () => newsServices.new_categories.getOne(id),
            staleTime: 5 * 60 * 1000,
        })
    }
}

const news_contents = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["admin_news_contents"],
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
    },
    usePostOne: ({onSuccess, onError}) => {
        return useMutation({
            mutationFn: (data) => {
                return newsServices.new_contents.postOne(data)
            },
            onSuccess,
            onError
        })
    },
    useUpdateOne: ({onSuccess, onError}) => {
        return useMutation({
            mutationFn: ({id, formDataNews}) => {
                return newsServices.new_contents.updateOne(id, formDataNews)
            },
            onSuccess,
            onError
        })
    }
}
function useGetSearchCategoriesSuggest(query){
    return useQuery({
        queryKey: ['admin_news-categories-suggestions', query],
        queryFn: () => newsServices.getSearchCategoriesSuggestions(query),
        staleTime: 5 * 60 * 1000,
    })
}

function useSearchSuggest(query, filter){
    return useQuery({
        queryKey: ['admin_news-suggestions', query, filter],
        queryFn: () => newsServices.getSearchSuggestions(query, filter),
        staleTime: 5 * 60 * 1000,
    })
}
export default {
    getQuantity: useGetQuantity,
    getAll: useGetAll,
    getNewsPage: useGetNewsPage,
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
        postOne: news_contents.usePostOne,
        updateOne: news_contents.useUpdateOne
    },
    getSearchCategoriesSuggestions: useGetSearchCategoriesSuggest,
    getSearchSuggestions: useSearchSuggest,
};