import { useQuery } from "@tanstack/react-query";
import productsServices from "@/services/products.api.js";
import { use } from "react";

function useGetAll(){
    return useQuery({
        queryKey: ["product"],
        queryFn: productsServices.getAll,
    })
}
function useGetProductPage(){
    return useQuery({
        queryKey: ["product_page"],
        queryFn: productsServices.getProductPage,
    })
}
const products = {
    useGetAll: ()=>{
        return useQuery({
            queryKey: ["products"],
            queryFn: productsServices.products.getAll,
        })
    },
    useGetOne: (id)=>{
        return useQuery({
            queryKey: ["products", id],
            queryFn: () => productsServices.products.getOne(id),
        })
    }
}
const product_categories = {
    useGetAll: ()=>{
        return useQuery({
            queryKey: ["product_categories"],
            queryFn: productsServices.product_categories.getAll,
        })
    },
    useGetOne: (id)=>{
        return useQuery({
            queryKey: ["product_categories", id],
            queryFn: () => productsServices.product_categories.getOne(id),
        })
    } 
}
const product_features = {
    useGetAll: ()=>{    
        return useQuery({
            queryKey: ["product_features"],
            queryFn: productsServices.product_features.getAll,
        })
    },
    useGetByProductId: (product_id)=>{
        return useQuery({
            queryKey: ["product_features", product_id],
            queryFn: () => productsServices.product_features.getByProductId(product_id),
        })
    },
    useGetOne: (product_id, feature_id)=>{
        return useQuery({
            queryKey: ["product_features", product_id, feature_id],
            queryFn: () => productsServices.product_features.getOne(product_id, feature_id),
        })
    }   
}
const product_highlight_features = {
    useGetAll: ()=>{    
        return useQuery({
            queryKey: ["product_highlight_features"],
            queryFn: productsServices.product_highlight_features.getAll,
        })
    },
    useGetByProductId: (product_id)=>{
        return useQuery({
            queryKey: ["product_highlight_features", product_id],
            queryFn: () => productsServices.product_highlight_features.getByProductId(product_id),
        })
    },
    useGetOne: (product_id, feature_id)=>{
        return useQuery({
            queryKey: ["product_highlight_features", product_id, feature_id],
            queryFn: () => productsServices.product_highlight_features.getOne(product_id, feature_id),
        })
    }   
}
const product_prices = {
    useGetAll: ()=>{
        return useQuery({
            queryKey: ["product_prices"],
            queryFn: productsServices.product_prices.getAll,
        })
    },
    useGetOne: (id)=>{
        return useQuery({
            queryKey: ["product_prices", id],
            queryFn: () => productsServices.product_prices.getOne(id),
        })
    }
}
function useGetPricePage(){
    return useQuery({
        queryKey: ["price_page"],
        queryFn: productsServices.getPricePage,
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
    getPricePage: useGetPricePage

  };