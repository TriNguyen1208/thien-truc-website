import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import productsServices from "@/services/products.api.js";
import { toast } from 'react-toastify';


function usePatchPricePage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => productsServices.patchPricePage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_price_page"] });
    }
  })
}
function useGetProductPage(){
    return useQuery({
        queryKey: ["admin_product_page"],
        queryFn: productsServices.getProductPage,
        staleTime: 5 * 60 * 1000,
    })
}
function usePatchProductPage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedPage)=> productsServices.patchProductPage(updatedPage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product_page"] });
    },
  });
}

function useGetQuantity()
{
    return useQuery({
        queryKey: ['admin_product_quantity'],
        queryFn: productsServices.getQuantity,
        staleTime: 5 * 60 * 1000
    })
}

// ==== Base ====
function useGetAll() {
  return useQuery({
    queryKey: ["admin_product"],
    queryFn: productsServices.getAll,
    staleTime: 5 * 60 * 1000,
  });
}

function useGetPricePage() {
  return useQuery({
    queryKey: ["admin_price_page"],
    queryFn: productsServices.getPricePage,
    staleTime: 5 * 60 * 1000,
  });
}



function useGetHighlightProducts() {
  return useQuery({
    queryKey: ["admin_highlight_products"],
    queryFn: productsServices.getHighlightProducts,
    staleTime: 5 * 60 * 1000,
  });
}

function useGetCount() {
  return useQuery({
    queryKey: ["admin_product_count"],
    queryFn: productsServices.getCount,
    staleTime: 5 * 60 * 1000,
  });
}

function useSearchSuggestions(query = '', filter = '', is_featured = undefined) {
  return useQuery({
    queryKey: ["admin_product_suggestions", query, filter, is_featured],
    queryFn: () => productsServices.getSearchSuggestions(query, filter, is_featured),
    staleTime: 5 * 60 * 1000,
  });
}

// ==== Products ====
const products = {
  useGetList: (query = '', filter = '', is_featured = undefined, page = undefined, limit = undefined) => {
    return useQuery({
      queryKey: ["admin_product_list", query, filter, is_featured, page, limit],
      queryFn: () => productsServices.products.getList(query, filter, is_featured, page, limit),
      staleTime: 5 * 60 * 1000,
    });
  },

  useGetListByCategory: (query = '', filter = '', is_featured = undefined, limit = undefined) => {
    return useQuery({
      queryKey: ["admin_product_by_category", query, filter, is_featured, limit],
      queryFn: () => productsServices.products.getListByCategory(query, filter, is_featured, limit),
      staleTime: 5 * 60 * 1000,
    });
  },

  useGetOne: (id) => {
    return useQuery({
      queryKey: ["admin_product", id],
      queryFn: () => productsServices.products.getOne(id),
      enabled: id != null, 
      staleTime: 5 * 60 * 1000,
    });
  },

  // Mutations
  useCreateOne: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data) => productsServices.products.createOne(data),
      onSuccess: (success) => {
        toast.success(success.message);
        queryClient.invalidateQueries({ queryKey: ["admin_product_by_category"] });
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
        queryClient.invalidateQueries({ queryKey: ["admin_product_by_category"] });
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
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["admin_product_by_category"] });
      },
    });
  },
  useUpdateCategory: () => {
      return useMutation({
          mutationFn: (changedItems) =>
          productsServices.products.updateCategory(changedItems)
      });
  },

  useDeleteOne: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id) => productsServices.products.deleteOne(id),
      onSuccess: (success) => {
        toast.success(success.message);
        queryClient.invalidateQueries({ queryKey: ["admin_product_by_category"] });
      },
      onError: (error) => {
        toast.error(error.message);
      }
    });
  },
};

// ==== Product Categories ====
const product_categories = {
  useGetList: (query) => {
    return useQuery({
      queryKey: ["admin_product_categories_list", query],
      queryFn: () => productsServices.product_categories.getList(query),
      staleTime: 5 * 60 * 1000,
    });
  },

  useGetOne: (id) => {
    return useQuery({
      queryKey: ["admin_product_by_category", id],
      queryFn: () => productsServices.product_categories.getOne(id),
      staleTime: 5 * 60 * 1000,
    });
  },
  // Mutations
  useCreateOne: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data) => productsServices.product_categories.createOne(data),


      onSuccess: (success) => {
        toast.success(success.message);
        queryClient.invalidateQueries({ queryKey: ["admin_product_categories_list"] });
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
        queryClient.invalidateQueries({ queryKey: ["admin_product_categories_list"] });
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
        queryClient.invalidateQueries({ queryKey: ["admin_product_categories_list"] });
      },
      onError: (error) => {
        toast.error(error.message);
      }
    });
  },
};

// ==== Product Prices ====
const product_prices = {
  useGetAll: (query = '', filter = '') => {
    return useQuery({
      queryKey: ["admin_product_prices", query, filter],
      queryFn: () => productsServices.product_prices.getAll(query, filter),
      staleTime: 5 * 60 * 1000,
    });
  },

  useGetOne: (id) => {
    return useQuery({
      queryKey: ["admin_product_price", id],
      queryFn: () => productsServices.product_prices.getOne(id),
      staleTime: 5 * 60 * 1000,
    });
  }
};

// ==== Export all ====
export default {
  getAll: useGetAll,
  getProductPage: useGetProductPage,
  getHighlightProducts: useGetHighlightProducts,
  getCount: useGetCount,
  getSearchSuggestions: useSearchSuggestions,
  products: {
    getList: products.useGetList,
    getListByCategory: products.useGetListByCategory,
    getOne: products.useGetOne,
    createOne: products.useCreateOne,
    updateOne: products.useUpdateOne,
    updateFeatureOne: products.useUpdateFeatureOne,
    deleteOne: products.useDeleteOne,
    updateCategory: products.useUpdateCategory,
  },
  product_categories: {
    getAll: product_categories.useGetList,
    getOne: product_categories.useGetOne,
    createOne: product_categories.useCreateOne,
    updateOne: product_categories.useUpdateOne,
    deleteOne: product_categories.useDeleteOne,
  },
  product_prices: {
    getAll: product_prices.useGetAll,
    getOne: product_prices.useGetOne,
  },
  getQuantity: useGetQuantity,
  getPricePage: useGetPricePage,
  patchPricePage: usePatchPricePage,
  patchProductPage: usePatchProductPage,
};
