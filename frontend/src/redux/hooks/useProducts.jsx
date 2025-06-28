import { useQuery } from "@tanstack/react-query";
import productsServices from "@/services/products.api.js";

function useGetAll(){
    return useQuery({
        queryKey: ["product"],
        queryFn: productsServices.getAll,
        staleTime: 5 * 60 * 1000,
    })
}
function useGetProductPage(){
    return useQuery({
        queryKey: ["product_page"],
        queryFn: productsServices.getProductPage,
        staleTime: 5 * 60 * 1000,
    })
}
const products = {
    useGetAll: ()=>{
        return useQuery({
            queryKey: ["product-list"],
            queryFn: productsServices.products.getAll,
            staleTime: 5 * 60 * 1000,
        })
    },
    useGetOne: (id)=>{
        return useQuery({
            queryKey: ["product", id],
            queryFn: () => productsServices.products.getOne(id),
            staleTime: 5 * 60 * 1000,
        })
    }
}
const product_categories = {
    useGetAll: ()=>{
        return useQuery({
            queryKey: ["product_categories"],
            queryFn: productsServices.product_categories.getAll,
            staleTime: 5 * 60 * 1000,
        })
    },
    useGetOne: (id)=>{
        return useQuery({
            queryKey: ["product_category", id],
            queryFn: () => productsServices.product_categories.getOne(id),
            staleTime: 5 * 60 * 1000,
        })
    } 
}
const product_features = {
    useGetAll: ()=>{    
        return useQuery({
            queryKey: ["product_features"],
            queryFn: productsServices.product_features.getAll,
            staleTime: 5 * 60 * 1000,
        })
    },
    useGetByProductId: (product_id)=>{
        return useQuery({
            queryKey: ["product_feature", product_id],
            queryFn: () => productsServices.product_features.getByProductId(product_id),
            staleTime: 5 * 60 * 1000,
        })
    },
    useGetOne: (product_id, feature_id)=>{
        return useQuery({
            queryKey: ["product_feature", product_id, feature_id],
            queryFn: () => productsServices.product_features.getOne(product_id, feature_id),
            staleTime: 5 * 60 * 1000,
        })
    }   
}
const product_highlight_features = {
    useGetAll: ()=>{    
        return useQuery({
            queryKey: ["product_highlight_features"],
            queryFn: productsServices.product_highlight_features.getAll,
            staleTime: 5 * 60 * 1000,
        })
    },
    useGetByProductId: (product_id)=>{
        return useQuery({
            queryKey: ["product_highlight_feature", product_id],
            queryFn: () => productsServices.product_highlight_features.getByProductId(product_id),
            staleTime: 5 * 60 * 1000,
        })
    },
    useGetOne: (product_id, feature_id)=>{
        return useQuery({
            queryKey: ["product_highlight_feature", product_id, feature_id],
            queryFn: () => productsServices.product_highlight_features.getOne(product_id, feature_id),
            staleTime: 5 * 60 * 1000,
        })
    }   
}
const product_prices = {
    useGetAll: ()=>{
        return useQuery({
            queryKey: ["product_prices"],
            queryFn: productsServices.product_prices.getAll,
            staleTime: 5 * 60 * 1000,
        })
    },
    useGetOne: (id)=>{
        return useQuery({
            queryKey: ["product_price", id],
            queryFn: () => productsServices.product_prices.getOne(id),
            staleTime: 5 * 60 * 1000,
        })
    }
}
function useGetPricePage(){
    return useQuery({
        queryKey: ["price_page"],
        queryFn: productsServices.getPricePage,
        staleTime: 5 * 60 * 1000,
    })
}
function useSearchSuggest(query, filter){
    return useQuery({
        queryKey: ['product-suggestions', query, filter],
        queryFn: () => productsServices.getSearchSuggestions(query, filter),
        staleTime: 5 * 60 * 1000,
        
    })
}
export default {
    getAll: useGetAll,
    getProductPage: useGetProductPage,
    products: {
        getAll: products.useGetAll,
        getOne: products.useGetOne
    },
    product_categories: {
        getAll: product_categories.useGetAll,
        getOne: product_categories.useGetOne
    },
    product_features: {
        getAll: product_features.useGetAll,
        getByProductId: product_features.useGetByProductId,
        getOne: product_features.useGetOne
    },
    product_highlight_features: {
        getAll: product_highlight_features.useGetAll,
        getByProductId: product_highlight_features.useGetByProductId,
        getOne: product_highlight_features.useGetOne
    },
    product_prices: {
        getAll: product_prices.useGetAll,
        getOne: product_prices.useGetOne
    },
    getPricePage: useGetPricePage,
    getSearchSuggestions: useSearchSuggest,
  };