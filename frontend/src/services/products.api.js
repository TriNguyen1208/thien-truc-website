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
    getAll: async () => {
        const res = await axios.get(API_ROUTES.product.products.getAll);
        return res.data;
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
    getOne: async (id) => {
        const res = await axios.get(API_ROUTES.product.product_categories.getOne(id));
        return res.data;
    }
}
const product_features = {
    getAll: async () => {
        const res = await axios.get(API_ROUTES.product.product_features.getAll);
        return res.data;
    },
    getByProductId: async (product_id) => {
        const res = await axios.get(API_ROUTES.product.product_features.getByProductId(product_id));
        return res.data;
    },
    getOne: async (product_id, feature_id) => {
        const res = await axios.get(API_ROUTES.product.product_features.getOne(product_id, feature_id));
        return res.data;
    }
}
const product_highlight_features = {
    getAll: async () => 
        {
            const res = await axios.get(API_ROUTES.product.product_highlight_features.getAll);
            return res.data;
        },
    getByProductId: async (product_id) => 
        {
            const res = await axios.get(API_ROUTES.product.product_highlight_features.getByProductId(product_id));
            return res.data;
        },
    getOne: async (product_id, feature_id) => 
        {
            const res = await axios.get(API_ROUTES.product.product_highlight_features.getOne(product_id, feature_id));
            return res.data;
        }   
} 
const product_prices = {
    getAll: async () => 
        {
            const res = await axios.get(API_ROUTES.product.product_prices.getAll);
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

export default {
    getAll,
    getProductPage,
    products,
    product_categories,
    product_features,
    product_highlight_features,
    product_prices,
    getPricePage
}