import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newsServices from "@/services/news.api.js";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
function useGetQuantity() {
    const queryClient = useQueryClient();
    queryClient.invalidateQueries(['admin_news_quantity']);
    return useQuery({
        queryKey: ['admin_news_quantity'],
        queryFn: newsServices.getQuantity,
        staleTime: 10 * 60 * 1000
    })
}

function useGetAll() {
    return useQuery({
        queryKey: ["admin_news"],
        queryFn: newsServices.getAll,
        staleTime: 10 * 60 * 1000,
    })
}
function useGetNewsPage() {
    return useQuery({
        queryKey: ["admin_news_page"],
        queryFn: newsServices.getNewsPage,
        staleTime: 10 * 60 * 1000,
    })
}

function usePatchNewsPage() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedPage) => newsServices.patchNewsPage(updatedPage),
        onSuccess: (success) => {
            queryClient.invalidateQueries({ queryKey: ["admin_news_page"] });
            toast.success(success.message);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });
}
const news = {
    useGetList: (query = '', filter = '', is_published = undefined, sort_by = '', page = undefined, limit) => {
        return useQuery({
            queryKey: ["admin_news_list", query, filter, is_published, sort_by, page, limit],
            queryFn: () => newsServices.news.getList(query, filter, is_published, sort_by, page, limit),
            staleTime: 10 * 60 * 1000,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["admin_news", id],
            queryFn: () => newsServices.news.getOne(id),
            enabled: id != null,
            staleTime: 10 * 60 * 1000,
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
    },
    useUpdateCategory: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (changedItems) => 
                newsServices.news.updateCategory(changedItems),
            onSuccess: (success) => {
                toast.success(success?.message ?? "Cập nhật khu vực thành công");
                queryClient.invalidateQueries(['admin_news_list']);
            },
            onError: (error) => {
                toast.error(error.response.data.message);
            }
        });
    },
    useDeleteOne: (navigate = null) => {
        const queryClient = useQueryClient()
        return useMutation({
            mutationFn: (id) => newsServices.news.deleteOne(id),
            onSuccess: (success)=>{
                queryClient.invalidateQueries({ queryKey: ["admin_news_list"], exact: false });
                queryClient.invalidateQueries(['admin_news']);
                toast.success(success ? success.message: "Xóa thành công!")
                if(navigate){
                    navigate();
                }
            },
            onError:(error)=>{toast.error(error ?  error.message: "Xóa thất bại!") }
        })
    }
}

const news_categories = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["admin_news_categories"],
            queryFn: newsServices.new_categories.getAll,
            staleTime: 10 * 60 * 1000,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["admin_news_category", id],
            queryFn: () => newsServices.new_categories.getOne(id),
            staleTime: 10 * 60 * 1000,
        })
    },
    useCreateOne: (name = "", rgb_color = "") => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({ name, rgb_color }) => newsServices.new_categories.createOne(name, rgb_color),
            onSuccess: (success) => {
                queryClient.invalidateQueries({ queryKey: ["admin_news_categories"] });
                toast.success(success.message);
            },
            onError: (error) => {
                toast.error(error.message);
            }
        })
    },
    useUpdateOne: (name = "", rgb_color = "", id) => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({ name, rgb_color, id }) => newsServices.new_categories.updateOne(name, rgb_color, id),
            onSuccess: (success) => {
                queryClient.invalidateQueries({ queryKey: ["admin_news_categories"] });
                toast.success(success.message);
            },
            onError: (error) => {
                toast.error(error.message);
            }
        })
    },
    useDeleteOne: (id) => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (id) => newsServices.new_categories.deleteOne(id),
            onSuccess: (success) => {
                queryClient.invalidateQueries({ queryKey: ["admin_news_categories"] });
                toast.success(success.message);
            },
            onError: (error) => {
                toast.error(error.message);
            }
        })
    }
}

const news_contents = {
    useGetAll: () => {
        return useQuery({
            queryKey: ["admin_news_contents"],
            queryFn: newsServices.new_contents.getAll,
            staleTime: 10 * 60 * 1000,
        })
    },
    useGetOne: (id) => {
        return useQuery({
            queryKey: ["admin_news_content", id],
            queryFn: () => newsServices.new_contents.getOne(id),
            staleTime: 10 * 60 * 1000,
        })
    },
    usePostOne: () => {
        const queryClient = useQueryClient();
        const navigate = useNavigate();
        return useMutation({
            mutationFn: (data) => {
                return newsServices.new_contents.postOne(data)
            },
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["admin_news_content"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["admin_news_contents"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["admin_news"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["admin_news_list"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["admin_news_categories"], exact: false });
                navigate('/quan-ly-tin-tuc', {state: { createId: success.id }});
            },
            onError: (error) => {
                toast.error(error.message);
            }
        })
    },
    useUpdateOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({ id, formData }) => {
                return newsServices.new_contents.updateOne(id, formData)
            },
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["admin_news_content"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["admin_news_contents"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["admin_news"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["admin_news_list"], exact: false });
            },
            onError: (error) => {
                toast.error(error.message);
            }
        })
    }
}
function useGetSearchCategoriesSuggest(query) {
    return useQuery({
        queryKey: ['admin_news-categories-suggestions', query],
        queryFn: () => newsServices.getSearchCategoriesSuggestions(query),
        staleTime: 10 * 60 * 1000,
    })
}

function useSearchSuggest(query, filter) {
    return useQuery({
        queryKey: ['admin_news-suggestions', query, filter],
        queryFn: () => newsServices.getSearchSuggestions(query, filter),
        staleTime: 10 * 60 * 1000,
    })
}

function useGetFeatureNews() {
    return useQuery({

        queryKey: ["admin_feature_news"],
        queryFn: () => newsServices.getFeatureNews(),
        staleTime: 10 * 60 * 1000,
    });
}

function useUpdateFeatureNews() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => newsServices.updateFeatureNews(data),
        onSuccess: (success) => {
            toast.success(success.message);
            queryClient.invalidateQueries({ queryKey: ["admin_feature_news"] });
        },
        onError: (error) => {
            toast.error(error.message);
            queryClient.invalidateQueries({ queryKey: ["admin_feature_news"] });
        },
    })
}
function useUpdateVisibility() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedPage) => newsServices.updateVisibility(updatedPage),
        onSuccess: (success) => {
            queryClient.invalidateQueries({ queryKey: ["admin_news_page"] });
            toast.success(success.message);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });
}
export default {
    getQuantity: useGetQuantity,
    getAll: useGetAll,
    getNewsPage: useGetNewsPage,
    getFeatureNews: useGetFeatureNews,
    updateFeatureNews: useUpdateFeatureNews,
    patchNewsPage: usePatchNewsPage,
    news: {
        getList: news.useGetList,
        getOne: news.useGetOne,
        updateNumReaders: news.useUpdateNumReaders,
        deleteOne: news.useDeleteOne,
        updateCategory: news.useUpdateCategory,
    },
    news_categories: {
        getAll: news_categories.useGetAll,
        getOne: news_categories.useGetOne,
        createOne: news_categories.useCreateOne,
        updateOne: news_categories.useUpdateOne,
        deleteOne: news_categories.useDeleteOne,
    },
    news_contents: {
        getAll: news_contents.useGetAll,
        getOne: news_contents.useGetOne,
        postOne: news_contents.usePostOne,
        updateOne: news_contents.useUpdateOne
    },
    getSearchCategoriesSuggestions: useGetSearchCategoriesSuggest,
    getSearchSuggestions: useSearchSuggest,
    updateVisibility: useUpdateVisibility
};