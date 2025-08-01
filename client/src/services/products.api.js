import axios from "@/services/axiosInstance.js"
import API_ROUTES from "../../../shared/routesAPI";


const getAll = async () => {
    const res = await axios.get(API_ROUTES.product.base);
    return res.data;
}

const getProductPage = async () => {
    const res = await axios.get(API_ROUTES.product.product_page);
    return res.data;
}
const products = {
    getList: async (query = '', filter = '', is_featured = '', page = 1, limit) => {
        const res = await axios.get(API_ROUTES.product.products.getList(query, filter, is_featured, page, limit));
        return res.data;
    },
    getListByCategory: async(id, query ='', filter ='', is_featured, limit) =>{
        const res = await axios.get(API_ROUTES.product.products.getListByCategory(id, query, filter, is_featured, limit))
        return res.data
    },
    getOne: async (id) => {
        const res = await axios.get(API_ROUTES.product.products.getOne(id));
        return res.data;
    }
}
const product_categories = {
    getAll: async () => {
        const res = await axios.get(API_ROUTES.product.product_categories.getAll);
        return res.data;
    },
    getList: async (id, query)=>{
        const res = await axios.get(API_ROUTES.product.product_categories.getList(id, query))
        return res.data
    },
    getOne: async (id) => {
        const res = await axios.get(API_ROUTES.product.product_categories.getOne(id));
        return res.data;
    }
}
const product_prices = {
    getAll: async (query = '', filter = '') =>  {
            const res = await axios.get(API_ROUTES.product.product_prices.getAll(query, filter));
            return res.data;
        },
    getOne: async (id) => 
        {
            const res = await axios.get(API_ROUTES.product.product_prices.getOne(id));
            return res.data;
        }
}
const getPricePage = async () => {
    const res = await axios.get(API_ROUTES.product.price_page);
    return res.data;
}

const getHighlightProducts = async () => {
    const res = await axios.get(API_ROUTES.product.highlight_products);
    return res.data;
}

const getSearchSuggestions = async (query, filter) => {
    const res = await axios.get(API_ROUTES.product.search_suggestions(query, filter));
    return res.data
}
export default {
    getAll,
    getProductPage,
    products,
    product_categories,
    product_prices,
    getPricePage,
    getHighlightProducts,
    getSearchSuggestions
}