import { useQuery } from "@tanstack/react-query";
import productsServices from "@/services/products.api.js";

function useGetAll(){
    return useQuery({
        queryKey: ["product"],
        queryFn: productsServices.getAll,
        staleTime: 10 * 60 * 1000,
    })
}
function useGetProductPage(){
    return useQuery({
        queryKey: ["product_page"],
        queryFn: productsServices.getProductPage,
        staleTime: 10 * 60 * 1000,
    })
}
const products = {
    useGetList: (query = '', filter = '', is_featured = '', page = 1, limit='')=>{
        return useQuery({
            queryKey: ["product-list", query, filter, is_featured, page, limit],
            queryFn: ()=> productsServices.products.getList(query, filter, is_featured, page, limit),
            staleTime: 10 * 60 * 1000,
        })
    },
    useGetListByCategory: (id, query ='', filter ='', is_featured, limit)=>{
        return useQuery({
            queryKey: ["product-list",id, query, filter, is_featured, limit],
            queryFn: ()=> productsServices.products.getListByCategory(id, query, filter, is_featured, limit),
            staleTime: 10 * 60 * 1000,
        })
    },
    useGetOne: (id)=>{
        return useQuery({
            queryKey: ["product", id],
            queryFn: () => productsServices.products.getOne(id),
            staleTime: 10 * 60 * 1000,
        })
    }
   
}
const product_categories = {
    useGetAll: ()=>{
        return useQuery({
            queryKey: ["product_categories"],
            queryFn: productsServices.product_categories.getAll,
            staleTime: 10 * 60 * 1000,
        })
    },
    useGetList: (id, query)=>{
        return useQuery({
            queryKey: ["product_categories", id, query],
            queryFn: productsServices.product_categories.getList(id, query),
            staleTime: 10 * 60 * 1000,
        })
    },
    useGetOne: (id)=>{
        return useQuery({
            queryKey: ["product_category", id],
            queryFn: () => productsServices.product_categories.getOne(id),
            staleTime: 10 * 60 * 1000,
        })
    } 
}
const product_prices = {
     useGetAll: (query = '', filter = '')=>{
        return useQuery({
            queryKey: ["product_prices", query, filter],
            queryFn: ()=> productsServices.product_prices.getAll(query, filter),
            staleTime: 10 * 60 * 1000,
        })
    },
    useGetOne: (id)=>{
        return useQuery({
            queryKey: ["product_price", id],
            queryFn: () => productsServices.product_prices.getOne(id),
            staleTime: 10 * 60 * 1000,
        })
    }
}
function useGetPricePage(){
    return useQuery({
        queryKey: ["price_page"],
        queryFn: productsServices.getPricePage,
        staleTime: 10 * 60 * 1000,
    })
}

function useGetHighlightProducts(){
    return useQuery({
        queryKey: ["highlight_products"],
        queryFn: productsServices.getHighlightProducts,
        staleTime: 10 * 60 * 1000,
    })
}

function useSearchSuggest(query, filter){
    return useQuery({
        queryKey: ['product-suggestions', query, filter],
        queryFn: () => productsServices.getSearchSuggestions(query, filter),
        staleTime: 10 * 60 * 1000,
        
    })
}
export default {
    getAll: useGetAll,
    getProductPage: useGetProductPage,
    products: {
        getList: products.useGetList,
        getListByCategory: products.useGetListByCategory,
        getOne: products.useGetOne
    },
    product_categories: {
        getAll: product_categories.useGetAll,
        getList: product_categories.useGetList,
        getOne: product_categories.useGetOne
    },
    product_prices: {
        getAll: product_prices.useGetAll,
        getOne: product_prices.useGetOne
    },
    getPricePage: useGetPricePage,
    getHighlightProducts: useGetHighlightProducts,
    getSearchSuggestions: useSearchSuggest,
  };