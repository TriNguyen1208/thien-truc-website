import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import productsServices from "../services/products.api.js";
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from "react-router-dom";


function useGetProductPage() {
    return useQuery({
        queryKey: ["product_page"],
        queryFn: productsServices.getProductPage,
        staleTime: 10 * 60 * 1000,
    })
}

const updateProductPage = {
    useUpdateBanner: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => productsServices.updateProductPage.banner(data),
            onSuccess: (success) => {
                queryClient.invalidateQueries({ queryKey: ["product_page"]});
                toast.success(success.message);
            },
            onError: (error) => {
                toast.error(error.message)
            }
        });
    },
    useUpdateVisibility: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => productsServices.updateProductPage.visibility(data),
            onSuccess: (success) => {
                queryClient.invalidateQueries({ queryKey: ["product_page"]});
                toast.success(success.message);
            },
            onError: (error) => {
                toast.error(error.message);
            }
        });
    },
}

// ==== Products ====
const products = {
    useGetList: (query = '', filter = '', is_featured = undefined, page = undefined, limit = undefined) => {
        return useQuery({
            queryKey: ["product_list", query, filter, is_featured, page, limit],
            queryFn: () => productsServices.products.getList(query, filter, is_featured, page, limit),
            staleTime: 10 * 60 * 1000,
        });
    },

    useGetListByCategory: (id = '', query = '', filter = '', is_featured = undefined, limit = undefined) => {
        return useQuery({
            queryKey: ["product_by_category", id, query, filter, is_featured, limit],
            queryFn: () => productsServices.products.getListByCategory(id, query, filter, is_featured, limit),
            staleTime: 10 * 60 * 1000,
        });
    },

    useGetSearchSuggestions: (query = '', filter = '', is_featured) => {
        return useQuery({
            queryKey: ["product_suggestions", query, filter, is_featured],
            queryFn: () => productsServices.products.getSearchSuggestions(query, filter, is_featured),
            staleTime: 10 * 60 * 1000,
        });
    },
    // Mutations
    useCreateOne: () => {
        const queryClient = useQueryClient();
        const navigate = useNavigate();
        const location = useLocation();
        return useMutation({
            mutationFn: (data) => productsServices.products.createOne(data),
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["product_by_category"], exact: false});
                queryClient.invalidateQueries({ queryKey: ["product_quantity"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["product_list"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["product_suggestions"], exact: false });
                navigate(location.pathname, { state: {createId: success.id} });
            },
            onError: (error) => {
                toast.error(error.message);
            }
        });
    },

    useUpdateOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({ id, data }) => productsServices.products.updateOne(id, data),
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["product_by_category"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["product_list"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["product_suggestions"], exact: false });
            },
            onError: (error) => {
                toast.error(error.message);
            }
        });
    },

    useUpdateFeatureOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({ id, status }) => productsServices.products.updateFeatureOne(id, status),
            onSuccess: (success) => {
                toast.success(success?.message ?? "Cập nhật checkbox thành công");
                queryClient.invalidateQueries({ queryKey: ["product_by_category"] });
            },
            onError: (error) => {
                toast.error(error?.message ?? "Cập nhật checkbox không thành công");
            }
        });
    },

    useUpdateCategory: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (changedItems) => productsServices.products.updateCategory(changedItems),
            onSuccess: (success) => {
                toast.success(success?.message ?? "Cập nhật khu vực thành công");
                queryClient.invalidateQueries(['product_by_category']);
            },
            onError: (error) => {
                toast.error(error?.message ?? "Cập nhật khu vực không thành công");
            }
        });
    },

    useDeleteOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (id) => productsServices.products.deleteOne(id),
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["product_by_category"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["product_quantity"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["product_list"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["product_suggestions"], exact: false });
            },
            onError: (error) => {
                toast.error(error.message);
            }
        });
    },
};

// ==== Product Categories ====
const product_categories = {
    useGetList: (id, query) => {
        return useQuery({
            queryKey: ["product_categories_list", id, query],
            queryFn: () => productsServices.product_categories.getList(id, query),
            staleTime: 10 * 60 * 1000,
        });
    },
    useGetSearchSuggestions: (query = '') => {
        return useQuery({
            queryKey: ["product_categories_suggestions", query],
            queryFn: () => productsServices.product_categories.getSearchSuggestions(query),
            staleTime: 10 * 60 * 1000,
        })
    },
    // Mutations
    useCreateOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => productsServices.product_categories.createOne(data),
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["product_categories_list"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["product_categories_suggestions"], exact: false });
                
            },
            onError: (error) => {
                toast.error(error.message);
            }
        });
    },

    useUpdateOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({ id, data }) => productsServices.product_categories.updateOne(id, data),
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["product_categories_list"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["product_categories_suggestions"], exact: false });
            },
            onError: (error) => {
                toast.error(error.message);
            }
        });
    },

    useDeleteOne: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (id) => productsServices.product_categories.deleteOne(id),
            onSuccess: (success) => {
                toast.success(success.message);
                queryClient.invalidateQueries({ queryKey: ["product_categories_list"], exact: false });
                queryClient.invalidateQueries({ queryKey: ["product_categories_suggestions"], exact: false });
            },
            onError: (error) => {
                toast.error(error.message);
            }
        });
    },
};

function useGetPricePage (){
    return useQuery({
        queryKey: ["price_page"],
        queryFn: productsServices.getPricePage,
        staleTime: 10 * 60 * 1000,
    })
}
const updatePricePage = {
    useUpdateBanner: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => productsServices.updatePricePage.banner(data),
            onSuccess: (success) => {
                queryClient.invalidateQueries({ queryKey: ["price_page"] });
                toast.success(success.message);
            },
            onError: (error) => {
                toast.error(error.message);
            }
        })
    },
    useUpdateVisibility: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (data) => productsServices.updatePricePage.visibility(data),
            onSuccess: (success) => {
                queryClient.invalidateQueries({ queryKey: ["price_page"] });
                toast.success(success.message);
            },
            onError: (error) => {
                toast.error(error.message);
            }
        })
    }
}

function useGetQuantity() {
    return useQuery({
        queryKey: ['product_quantity'],
        queryFn: productsServices.getQuantity,
        staleTime: 10 * 60 * 1000
    })
}

// ==== Export all ====
export default {
    getProductPage: useGetProductPage,//
    updateProductPage: {
        banner: updateProductPage.useUpdateBanner,//
        visibility: updateProductPage.useUpdateVisibility//
    },
    products: {
        getList: products.useGetList,//
        getListByCategory: products.useGetListByCategory,//
        getSearchSuggestions: products.useGetSearchSuggestions,//
        createOne: products.useCreateOne,//
        updateOne: products.useUpdateOne,//
        updateFeatureOne: products.useUpdateFeatureOne,//
        updateCategory: products.useUpdateCategory,//
        deleteOne: products.useDeleteOne,//
    },
    product_categories: {
        getAll: product_categories.useGetList,//
        getSearchSuggestions: product_categories.useGetSearchSuggestions,//
        createOne: product_categories.useCreateOne,//
        updateOne: product_categories.useUpdateOne,//
        deleteOne: product_categories.useDeleteOne,//
    },
    getPricePage: useGetPricePage,//
    updatePricePage: {
        banner: updatePricePage.useUpdateBanner,//
        visibility: updatePricePage.useUpdateVisibility//
    },
    getQuantity: useGetQuantity//
};
