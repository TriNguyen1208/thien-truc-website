import { useQuery } from "@tanstack/react-query";
import newsServices from "@/services/news.api.js";

function useGetAll(){
    return useQuery({
        queryKey: ["news"],
        queryFn: newsServices.getAll,
    })
}
function useGetNewsPage(){
    return useQuery({
        queryKey: ["news_page"],
        queryFn: newsServices.getNewsPage,
    })
}
const news = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["news_list"],
            queryFn: newsServices.news.getAll,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["news", id],
            queryFn: () => newsServices.news.getOne(id),
        })
    }
}

const news_categories = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["news_categories"],
            queryFn: newsServices.new_categories.getAll,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["news_category", id],
            queryFn: () => newsServices.new_categories.getOne(id),
        })
    }
}

const news_contents = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["news_contents"],
            queryFn: newsServices.new_contents.getAll,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["news_content", id],
            queryFn: () => newsServices.new_contents.getOne(id),
        })
    }
}

export default {
    getAll: useGetAll,
    getNewsPage: useGetNewsPage,
    news,
    news_categories,
    news_contents
};