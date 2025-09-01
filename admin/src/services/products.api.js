import axios from "@/services/axiosInstance.js"
import API_ROUTES from "../../../shared/routesAPIServer";

// ==== Product Page ====
const getProductPage = async () => {
    const res = await axios.get(API_ROUTES.product.product_page);
    return res.data;
}
const updateProductPage = {
    banner: async (data) => {
        const res = await axios.patch(API_ROUTES.product.updateProductPage.banner, data);
        return res.data;
    },
    visibility: async (data) => {
        const res = await axios.patch(API_ROUTES.product.updateProductPage.visibility, data);
        return res.data;
    }
}
const products = {
    getList: async (query = '', filter = '', is_featured = undefined, page = undefined, limit = undefined) => {
        const res = await axios.get(API_ROUTES.product.products.getList(query, filter, is_featured, page, limit));
        return res.data;
    },
    getOne: async (id) => {
        const res = await axios.get(API_ROUTES.product.products.getOne(id));
        return res.data;
    },
    getListByCategory: async (id = '', query = '', filter = '', is_featured = undefined, limit = undefined) => {
        const res = await axios.get(API_ROUTES.product.products.getListByCategory(id, query, filter, is_featured, limit));
        return res.data;
    },
    getSearchSuggestions: async (query = '', filter = '', is_featured) => {
        const res = await axios.get(API_ROUTES.product.products.getSearchSuggestions(query, filter, is_featured));
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
    getSearchSuggestions: async (query = '') => {
        const res = await axios.get(API_ROUTES.product.product_categories.getSearchSuggestions(query));
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
const getPricePage = async () => {
    const res = await axios.get(API_ROUTES.product.price_page);
    return res.data;
}
const updatePricePage = {
    banner: async(data) => {
        const res = await axios.patch(API_ROUTES.product.updatePricePage.banner, data);
        return res.data;
    },
    visibility: async (data) => {
        const res = await axios.patch(API_ROUTES.product.updatePricePage.visibility, data);
        return res.data;
    }
}
const getQuantity = async()=>{
    const res = await axios.get(API_ROUTES.product.count)
    return res.data
}

export default {
    getProductPage,
    updateProductPage,
    products,
    product_categories,
    getPricePage,
    updatePricePage,
    getQuantity,
};
