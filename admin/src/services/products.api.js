import axios from "@/services/axiosInstance.js"
import API_ROUTES from "../../../shared/routesAPIServer";

const getPricePage = async () => {
    const res = await axios.get(API_ROUTES.product.price_page);
    return res.data;
}
const patchPricePage = async (updatedPage)=>{
    const res = await axios.patch(API_ROUTES.product.update_price_page, updatedPage)
    return res.data
}

const getQuantity = async()=>{
    const res = await axios.get(API_ROUTES.product.count)
    return res.data
}

// ==== Base ====
const getAll = async () => {
    const res = await axios.get(API_ROUTES.product.base);
    return res.data;
}

// ==== Product Page ====
const getProductPage = async () => {
    const res = await axios.get(API_ROUTES.product.product_page);
    return res.data;
}
const updateProductPage = async (data) => {
    const res = await axios.patch(API_ROUTES.product.update_product_page, data);
    return res.data;
}

// ==== Products ====
const products = {
    getList: async (query = '', filter = '', is_featured = undefined, page = undefined, limit = undefined) => {
        const res = await axios.get(API_ROUTES.product.products.getList(query, filter, is_featured, page, limit));
        return res.data;
    },

    getListByCategory: async (id = '', query = '', filter = '', is_featured = undefined, limit = undefined) => {
        const res = await axios.get(API_ROUTES.product.products.getListByCategory(id, query, filter, is_featured, limit));
        return res.data;
    },

    getOne: async (id) => {
        const res = await axios.get(API_ROUTES.product.products.getOne(id));
        return res.data;
    },

    createOne: async (data) => {
        const res = await axios.post(API_ROUTES.product.products.createOne, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            timeout: 20000
        });
        return res.data;
    },

    updateOne: async (id, data) => {
        const res = await axios.patch(API_ROUTES.product.products.updateOne(id), data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            timeout: 20000
        });
        return res.data;
    },

    updateFeatureOne: async (id, status) => {
        const res = await axios.patch(API_ROUTES.product.products.updateFeatureOne(id, status));
        return res.data;
    },
    updateCategory: async (changedItems) => {
        const res = await axios.patch(API_ROUTES.product.products.updateCategory, changedItems);
        return res.data;
    },
    deleteOne: async (id) => {
        const res = await axios.delete(API_ROUTES.product.products.deleteOne(id));
        return res.data;
    }
}

// ==== Product Categories ====
const product_categories = {
     getList: async (id = '', query = '') => {
        const res = await axios.get(API_ROUTES.product.product_categories.getList(id, query));
        return res.data;
    },

    getOne: async (id) => {
        const res = await axios.get(API_ROUTES.product.product_categories.getOne(id));
        return res.data;
    },

    createOne: async (data) => {
        const res = await axios.post(API_ROUTES.product.product_categories.createOne, data);
        return res.data;
    },

    updateOne: async (id, data) => {
        const res = await axios.patch(API_ROUTES.product.product_categories.updateOne(id), data);
        return res.data;
    },

    deleteOne: async (id) => {
        const res = await axios.delete(API_ROUTES.product.product_categories.deleteOne(id));
        return res.data;
    }
}

// ==== Highlight Products ====
const getHighlightProducts = async () => {
    const res = await axios.get(API_ROUTES.product.highlight_products);
    return res.data;
}

// ==== Search Suggestions ====
const getSearchSuggestions = async (query = '', filter = '', is_featured) => {
    const res = await axios.get(API_ROUTES.product.search_suggestions(query, filter, is_featured));
    return res.data;
}

const getSearchCategoriesSuggestions = async (query = '') => {
    const res = await axios.get(API_ROUTES.product.search_categories_suggestions(query));
    return res.data;
}

// ==== Search Suggestions ====
const getCount = async () => {
    const res = await axios.get(API_ROUTES.product.count());
    return res.data;
}
const patchProductPage = async (updatedPage)=> {
    const res = await axios.patch(API_ROUTES.product.update_product_page, updatedPage)
    return res.data;
}
const updateProductVisibility = async (data)=> {
    const res = await axios.patch(API_ROUTES.product.update_product_visibility, data)
    return res.data;
}
const updatePriceVisibility = async (data)=> {
    const res = await axios.patch(API_ROUTES.product.update_price_visibility, data)
    return res.data;
}

export default {
    getAll,
    getProductPage,
    updateProductPage,
    products,
    product_categories,
    getHighlightProducts,
    getSearchSuggestions,
    getSearchCategoriesSuggestions,
    getCount,
    getQuantity,
    getPricePage, 
    patchPricePage,
    patchProductPage,
    updateProductVisibility,
    updatePriceVisibility
};
