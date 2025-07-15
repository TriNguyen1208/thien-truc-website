import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import productsServices from "@/services/products.api.js";
import { toast } from 'react-toastify';
// ==== Base ====
function useGetAll() {
  return useQuery({
    queryKey: ["admin_product"],
    queryFn: productsServices.getAll,
    staleTime: 5 * 60 * 1000,
  });
}

function useGetProductPage() {
  return useQuery({
    queryKey: ["admin_product_page"],
    queryFn: productsServices.getProductPage,
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
  useGetList: (query = '', filter = '', is_featured = undefined, page = 1, limit = undefined) => {
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
      staleTime: 5 * 60 * 1000,
    });
  },

  // Mutations
  useCreateOne: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data) => productsServices.products.createOne(data),
      onSuccess: () => {
        toast.success("Tạo sản phẩm thành công!");
        queryClient.invalidateQueries({ queryKey: ["admin_product_by_category"] });
      },
      onError: () => {
        toast.error("Tạo sản phẩm thất bại!");
      },
    });
  },

  useUpdateOne: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, data }) => productsServices.products.updateOne(id, data),
      onSuccess: () => {
        toast.success("Cập nhật sản phẩm thành công!");
        queryClient.invalidateQueries({ queryKey: ["admin_product_by_category"] });
      },
      onError: () => {
        toast.error("Cập nhật sản phẩm thất bại!");
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


  useDeleteOne: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id) => productsServices.products.deleteOne(id),
      onSuccess: () => {
        toast.success("Xoá sản phẩm thành công!");
        queryClient.invalidateQueries({ queryKey: ["admin_product_by_category"] });
      },
      onError: () => {
        toast.success("Xoá sản phẩm không thành công!");
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
      onSuccess: () => {
        toast.success("Tạo loại sản phẩm thành công!");
        queryClient.invalidateQueries({ queryKey: ["admin_product_categories_list"] });
      },
      onError: () => {
        toast.error("Tạo loại sản phẩm thất bại!");
      }
    });
  },

  useUpdateOne: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, data }) => productsServices.product_categories.updateOne(id, data),
      onSuccess: () => {
        toast.success("Cập nhật loại sản phẩm thành công!");
        queryClient.invalidateQueries({ queryKey: ["admin_product_categories_list"] });
      },
       onError: () => {
        toast.error("Cập nhật loại sản phẩm thất bại!");
      }
    });
  },

  useDeleteOne: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id) => productsServices.product_categories.deleteOne(id),
      onSuccess: () => {
        toast.success("Xoá loại sản phẩm thành công!");
        queryClient.invalidateQueries({ queryKey: ["admin_product_categories_list"] });
      },
         onError: () => {
        toast.error("XpoasF loại sản phẩm thất bại!");
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
  getPricePage: useGetPricePage,
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
  },
  product_categories: {
    getList: product_categories.useGetList,
    getOne: product_categories.useGetOne,
    createOne: product_categories.useCreateOne,
    updateOne: product_categories.useUpdateOne,
    deleteOne: product_categories.useDeleteOne,
  },
  product_prices: {
    getAll: product_prices.useGetAll,
    getOne: product_prices.useGetOne,
  },
};

