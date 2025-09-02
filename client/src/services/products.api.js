import { fetchData } from "./apiHelper";
import API_ROUTES from "../../../shared/routesAPI";

const productServices = {
    general: {
        getAll: async (query = '', filter = '') => fetchData(API_ROUTES.product.base(query, filter)),
        getProductPage: async () => fetchData(API_ROUTES.product.product_page),
        getPricePage: async () => fetchData(API_ROUTES.product.price_page)
    },
    products: {
        getList: async (query = '', filter = '', is_featured = '', page = 1, limit) => 
            fetchData(API_ROUTES.product.products.getList(query, filter, is_featured, page, limit)),
        getListByCategory: async (id, query ='', filter ='', is_featured, limit) => 
            fetchData(API_ROUTES.product.products.getListByCategory(id, query, filter, is_featured, limit)),
        getOne: async (id) => fetchData(API_ROUTES.product.products.getOne(id)),
        getAllFeatured: async () => fetchData(API_ROUTES.product.products.getAllFeatured),
        getSearchSuggestions: async (query, filter) => fetchData(API_ROUTES.product.products.getSearchSuggestions(query, filter))
    },
    product_categories: {
        getAll: async () => fetchData(API_ROUTES.product.product_categories.getAll),
        getList: async (id, query) => fetchData(API_ROUTES.product.product_categories.getList(id, query)),
        getOne: async (id) => fetchData(API_ROUTES.product.product_categories.getOne(id))
    }
}

export default productServices;