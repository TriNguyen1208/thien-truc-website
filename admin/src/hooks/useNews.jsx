import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newsServices from "@/services/news.api.js";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function useGetNewsPage() {
    return useQuery({
        queryKey: ["news_page"],
        queryFn: newsServices.getNewsPage,
        staleTime: 10 * 60 * 1000,
    })
}

const updateNewsPage = {
    useUpdateBanner: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => newsServices.updateNewsPage.banner(data),
            onSuccess: (success) => {
                queryClient.invalidateQueries({ queryKey: ["news_page"] });
                toast.success(success.message);
            },
            onError: (error) => {
                toast.error(error.response.data.message);
            }
        });
    },
    useUpdateVisibility: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => newsServices.updateNewsPage.visibility(data),
            onSuccess: (success) => {
                queryClient.invalidateQueries({ queryKey: ["news_page"] });
                toast.success(success.message);
            },
            onError: (error) => {
                toast.error(error.response.data.message);
            }
        });
    }
}

const news = {
    useGetList: (query = '', filter = '', is_published = undefined, sort_by = '', page = undefined, limit) => {
        return useQuery({
            queryKey: ["news_list", query, filter, is_published, sort_by, page, limit],
            queryFn: () => newsServices.news.getList(query, filter, is_published, sort_by, page, limit),
            staleTime: 10 * 60 * 1000,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["news", id],
            queryFn: () => newsServices.news.getOne(id),
            enabled: id != null,
            staleTime: 10 * 60 * 1000,
        })
    },
    useGetSearchSuggestions: (query = '', filter = '') => {
        return useQuery({
            queryKey: ['news_suggestions', query, filter],
            queryFn: () => newsServices.news.getSearchSuggestions(query, filter),
            staleTime: 10 * 60 * 1000,
        })
    },
    useGetAllFeatured: () => {
        return useQuery({
            queryKey: ["feature_news"],
            queryFn: () => newsServices.news.getAllFeatured(),
            staleTime: 10 * 60 * 1000,
        });
    },
    useCreateOne: () => {
        const queryClient = useQueryClient();
        const navigate = useNavigate();
        return useMutation({
            mutationFn: (data) => {
                return newsServices.news.createOne(data)
            },
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["news"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["news_list"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["news_suggestions"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["feature_news"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["news_quantity"] });
                queryClient.invalidateQueries({ queryKey: ["news_categories"] });
                queryClient.invalidateQueries({ queryKey: ["news_category"] });
                queryClient.invalidateQueries({ queryKey: ['news_categories_suggestions'] });
                navigate('/quan-ly-tin-tuc', {state: { createId: success.id }});
            },
            onError: (error) => {
                toast.error(error.response.data.message);
            }
        })
    },
    useUpdateOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({ id, formData }) => {
                return newsServices.news.updateOne(id, formData)
            },
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["news"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["news_list"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["news_suggestions"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["feature_news"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["news_content"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["news_categories"] });
                queryClient.invalidateQueries({ queryKey: ["news_category"] });
                queryClient.invalidateQueries({ queryKey: ['news_categories_suggestions'] });
            },
            onError: (error) => {
                toast.error(error.response.data.message);
            }
        })
    },
    useUpdateCategory: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (changedItems) => 
                newsServices.news.updateCategory(changedItems),
            onSuccess: (success) => {
                toast.success(success?.message ?? "Cập nhật khu vực thành công");
                queryClient.invalidateQueries(['news_list']);
            },
            onError: (error) => {
                toast.error(error.response.data.message);
            }
        });
    },
    useUpdateFeaturedNews: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => newsServices.news.updateFeaturedNews(data),
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["feature_news"] });
            },
            onError: (error) => {
                toast.error(error.response.data.message);
            },
        })
    },
    useDeleteOne: () => {
        const queryClient = useQueryClient();
        const navigate = useNavigate();
        return useMutation({
            mutationFn: (id) => newsServices.news.deleteOne(id),
            onSuccess: (success)=>{
                queryClient.invalidateQueries({ queryKey: ["news_list"], exact: false });
                queryClient.invalidateQueries(['news']);
                queryClient.invalidateQueries({ queryKey: ["news_categories"] });
                queryClient.invalidateQueries({ queryKey: ["news_category"] });
                queryClient.invalidateQueries({ queryKey: ['news_categories_suggestions'] });
                toast.success(success ? success.message: "Xóa thành công!")
                navigate('/quan-ly-tin-tuc');
            },
            onError: (error) => {
                toast.error(error ?  error.message: "Xóa thất bại!");
            }
        })
    }
}

const news_categories = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["news_categories"],
            queryFn: newsServices.news_categories.getAll,
            staleTime: 10 * 60 * 1000,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["news_category", id],
            queryFn: () => newsServices.news_categories.getOne(id),
            staleTime: 10 * 60 * 1000,
        })
    },
    useGetSearchSuggestions: (query = '') => {
        return useQuery({
            queryKey: ['news_categories_suggestions', query],
            queryFn: () => newsServices.news_categories.getSearchSuggestions(query),
            staleTime: 10 * 60 * 1000,
        })
    },
    useCreateOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({ name, rgb_color }) => newsServices.news_categories.createOne(name, rgb_color),
            onSuccess: (success) => {
                queryClient.invalidateQueries({ queryKey: ["news_categories"] });
                toast.success(success.message);
            },
            onError: (error) => {
                toast.error(error.response.data.message);
            }
        })
    },
    useUpdateOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({ name, rgb_color, id }) => newsServices.news_categories.updateOne(name, rgb_color, id),
            onSuccess: (success) => {
                queryClient.invalidateQueries({ queryKey: ["news_categories"] });
                queryClient.invalidateQueries({ queryKey: ["news_category"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["news_list"], exact: false });
                toast.success(success.message);
            },
            onError: (error) => {
                toast.error(error.response.data.message);
            }
        })
    },
    useDeleteOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (id) => newsServices.news_categories.deleteOne(id),
            onSuccess: (success) => {
                queryClient.invalidateQueries({ queryKey: ["news_categories"] });
                queryClient.invalidateQueries({ queryKey: ["news_categories_suggestions"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["news_list"], exact: false })
                toast.success(success.message);
            },
            onError: (error) => {
                toast.error(error.response.data.message);
            }
        })
    }
}

const news_contents = {
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["news_content", id],
            queryFn: () => newsServices.news_contents.getOne(id),
            staleTime: 10 * 60 * 1000,
        })
    },
}

function useGetQuantity() {
    return useQuery({
        queryKey: ['news_quantity'],
        queryFn: newsServices.getQuantity,
        staleTime: 10 * 60 * 1000
    })
}

export default {
    getNewsPage: useGetNewsPage,//
    updateNewsPage: {
        banner: updateNewsPage.useUpdateBanner,//
        visibility: updateNewsPage.useUpdateVisibility//
    },
    news: {
        getList: news.useGetList,//
        getOne: news.useGetOne,//
        getSearchSuggestions: news.useGetSearchSuggestions,//
        getAllFeatured: news.useGetAllFeatured,//
        createOne: news.useCreateOne,//
        updateOne: news.useUpdateOne,//
        updateCategory: news.useUpdateCategory,//
        updateFeaturedNews: news.useUpdateFeaturedNews,//
        deleteOne: news.useDeleteOne,//
    },
    news_categories: {
        getAll: news_categories.useGetAll,//
        getOne: news_categories.useGetOne,//
        getSearchSuggestions: news_categories.useGetSearchSuggestions,//
        createOne: news_categories.useCreateOne,//
        updateOne: news_categories.useUpdateOne,//
        deleteOne: news_categories.useDeleteOne,//
    },
    news_contents: {
        getOne: news_contents.useGetOne,//
    },
    getQuantity: useGetQuantity,//
};