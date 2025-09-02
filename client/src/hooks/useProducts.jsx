import { useCustomQuery } from "./customQuery";
import productsServices from "@/services/products.api.js";

function useGetAll(){
    return useCustomQuery(["products", "general", "get_all"], productsServices.general.getAll);
}
function useGetProductPage(){
    return useCustomQuery(["products", "general", "get_product_page"], productsServices.general.getProductPage);
}
function useGetPricePage(){
    return useCustomQuery(["products", "general", "get_price_page"], productsServices.general.getPricePage);
}
function useGetHighlightProducts(){
    return useCustomQuery(["products", "products", "highlight_products"], productsServices.products.getAllFeatured);
}
function useSearchSuggest(query, filter){
    return useCustomQuery(["products", "products", "search_suggest", query, filter], () => productsServices.products.getSearchSuggestions(query, filter));
}

const products = {
    useGetList: (query = '', filter = '', is_featured = '', page = 1, limit='') => 
        useCustomQuery(["products", "products", "get_list", query, filter, is_featured, page, limit], () => productsServices.products.getList(query, filter, is_featured, page, limit)),
    useGetListByCategory: (id, query ='', filter ='', is_featured, limit) =>
        useCustomQuery(["products", "products", "get_list_by_category", id, query, filter, is_featured, limit], () => productsServices.products.getListByCategory(id, query, filter, is_featured, limit)),
    useGetOne: (id) => 
        useCustomQuery(["products", "products", "get_one", id], () => productsServices.products.getOne(id))
   
}
const product_categories = {
    useGetAll: () =>
        useCustomQuery(["products", "product_categories", "get_all"], productsServices.product_categories.getAll),
    useGetList: (id, query) =>
        useCustomQuery(["products", "product_categories", "get_list", id, query], () => productsServices.product_categories.getList(id, query)),
    useGetOne: (id) =>
        useCustomQuery(["products", "product_categories", "get_one", id], () => productsServices.product_categories.getOne(id))
}

export default {
    getAll: useGetAll,
    getProductPage: useGetProductPage,
    getPricePage: useGetPricePage,
    getHighlightProducts: useGetHighlightProducts,
    getSearchSuggestions: useSearchSuggest,
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
    // product_prices: {
    //     getAll: product_prices.useGetAll,
    //     getOne: product_prices.useGetOne
    // },
  };