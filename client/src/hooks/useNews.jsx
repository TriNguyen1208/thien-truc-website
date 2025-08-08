import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newsServices from "@/services/news.api.js";

function useGetAll(){
    return useQuery({
        queryKey: ["news"],
        queryFn: newsServices.getAll,
        staleTime: 10 * 60 * 1000,
    })
}
function useGetNewsPage(){
    return useQuery({
        queryKey: ["news_page"],
        queryFn: newsServices.getNewsPage,
        staleTime: 10 * 60 * 1000,
    })
}

function useGetHighlightNews() {
    return useQuery({
        queryKey: ["highlight_news"],
        queryFn: newsServices.getHighlightNews,
        staleTime: 10 * 60 * 1000,
    })
}   

const news = {
    useGetList: (query = '', filter = '', is_published = '', sort_by = '', page = 1, limit = undefined) => {
        return useQuery({
            queryKey: ["news_list", query, filter, sort_by, page],
            queryFn: () => newsServices.news.getList(query, filter, is_published, sort_by, page, limit),
            staleTime: 10 * 60 * 1000,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["news", id],
            queryFn: () => newsServices.news.getOne(id),
            staleTime: 10 * 60 * 1000,
        })
    },
    useUpdateNumReaders: (id) => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: () => newsServices.news.updateNumReaders(id),
            onSuccess: () => {
            // ✅ Invalidate tất cả danh sách đã từng được query
            queryClient.invalidateQueries({
                queryKey: ["news_list"], // match theo prefix
                exact: false,            // cho phép match tất cả ["news_list", ...]
            });
        }
        })
    }
}

const news_categories = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["news_categories"],
            queryFn: newsServices.new_categories.getAll,
            staleTime: 10 * 60 * 1000,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["news_category", id],
            queryFn: () => newsServices.new_categories.getOne(id),
            staleTime: 10 * 60 * 1000,
        })
    }
}

const news_contents = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["news_contents"],
            queryFn: newsServices.new_contents.getAll,
            staleTime: 10 * 60 * 1000,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["news_content", id],
            queryFn: () => newsServices.new_contents.getOne(id),
            staleTime: 10 * 60 * 1000,
        })
    }
}
function useSearchSuggest(query, filter){
    return useQuery({
        queryKey: ['news-suggestions', query, filter],
        queryFn: () => newsServices.getSearchSuggestions(query, filter),
        staleTime: 10 * 60 * 1000,
    })
}

function useGetFeaturedNews() {
    return useQuery({
        queryKey: ["featured_news"],
        queryFn: () => newsServices.getFeaturedNews(),
        staleTime: 10 * 60 * 1000,
    })
}

export default {
    getAll: useGetAll,
    getNewsPage: useGetNewsPage,
    getHighlightNews: useGetHighlightNews,
    getFeaturedNews: useGetFeaturedNews,
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
    },
    getSearchSuggestions: useSearchSuggest,
};