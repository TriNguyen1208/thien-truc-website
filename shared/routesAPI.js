const BASE_API = '/api';

const HOME_BASE = `${BASE_API}/home`;
const PRODUCT_BASE = `${BASE_API}/product`;
const PROJECT_BASE = `${BASE_API}/project`;
const NEWS_BASE = `${BASE_API}/news`;
const RECRUITMENT_BASE = `${BASE_API}/recruitment`;
const CONTACT_BASE = `${BASE_API}/contact`;
const ABOUT_US_BASE = `${BASE_API}/about_us`;

const API_ROUTES = {
    schemaTable: (schema, table) => `${BASE_API}/${schema}/${table}`,
    home: {
        base: HOME_BASE,
        home_page: `${HOME_BASE}/home_page`,
        highlight_stats_about_us: {
            getAll: `${HOME_BASE}/highlight_stats_about_us`,
            getOne: (id) => `${HOME_BASE}/highlight_stats_about_us/${id}`,
        },
    },
    product: {
        base: PRODUCT_BASE,
        product_page: `${PRODUCT_BASE}/product_page`,
        products: {
            getList: (query = '', filter = '', page = 1) => `${PRODUCT_BASE}/products?query=${encodeURIComponent(query)}&filter=${encodeURIComponent(filter)}&page=${page}`,
            getOne: (id) => `${PRODUCT_BASE}/products/${id}`,
        },
        product_categories: {
            getAll: `${PRODUCT_BASE}/product_categories`,
            getOne: (id) => `${PRODUCT_BASE}/product_categories/${id}`,
        },
        product_features: {
            getAll: `${PRODUCT_BASE}/product_features`,
            getByProductId: (product_id) => `${PRODUCT_BASE}/product_features/${product_id}`,
            getOne: (product_id, feature_id) =>`${PRODUCT_BASE}/product_features/${product_id}/${feature_id}`,
        },
        product_highlight_features: {
            getAll: `${PRODUCT_BASE}/product_highlight_features`,
            getByProductId: (product_id) => `${PRODUCT_BASE}/product_highlight_features/${product_id}`,
            getOne: (product_id, feature_id) => `${PRODUCT_BASE}/product_highlight_features/${product_id}/${feature_id}`,
        },
        product_prices: {
            getAll: `${PRODUCT_BASE}/product_prices`,
            getOne: (id) => `${PRODUCT_BASE}/product_prices/${id}`,
        },
        price_page: `${PRODUCT_BASE}/price_page`,
        search_suggestions: `${PRODUCT_BASE}/search_suggestions`,
    },
    project: {
        base: PROJECT_BASE,
        project_page: `${PROJECT_BASE}/project_page`,
        projects: {
            getList: (query, filter, page) => `${PROJECT_BASE}/projects?query=${encodeURIComponent(query)}&filter=${encodeURIComponent(filter)}&page=${page}`,
            getOne: (id) => `${PROJECT_BASE}/projects/${id}`,
        },
        project_regions: {
            getAll: `${PROJECT_BASE}/project_regions`,
            getOne: (id) => `${PROJECT_BASE}/project_regions/${id}`,
        },
        project_contents: {
            getAll: `${PROJECT_BASE}/project_contents`,
            getOne: (id) => `${PROJECT_BASE}/project_contents/${id}`,
        },

        search_suggestions: `${PROJECT_BASE}/search_suggestions`,
    },
    news: {
        base: NEWS_BASE,
        news_page: `${NEWS_BASE}/news_page`,
        news: {
            getAll: `${NEWS_BASE}/news`,
            getOne: (id) => `${NEWS_BASE}/news/${id}`,
        },
        news_categories: {
            getAll: `${NEWS_BASE}/news_categories`,
            getOne: (id) => `${NEWS_BASE}/news_categories/${id}`,
        },
        news_contents: {
            getAll: `${NEWS_BASE}/news_contents`,
            getOne: (id) => `${NEWS_BASE}/news_contents/${id}`,
        },

        search_suggestions: `${NEWS_BASE}/search_suggestions`,
    },
    recruitment: {
        base: RECRUITMENT_BASE,
        recruitment_page: `${RECRUITMENT_BASE}/recruitment_page`,
    },
    contact: {
        base: CONTACT_BASE,
        contact_page: `${CONTACT_BASE}/contact_page`,
        company_info: `${CONTACT_BASE}/company_info`,
        support_agents: {
            getAll: `${CONTACT_BASE}/support_agents`,
            getOne: (id) => `${CONTACT_BASE}/support_agents/${id}`,
        },
    },
    about_us: {
        base: ABOUT_US_BASE,
        about_us_page: `${ABOUT_US_BASE}/about_us_page`,
        company_services: {
            getAll: `${ABOUT_US_BASE}/company_services`,
            getOne: (id) => `${ABOUT_US_BASE}/company_services/${id}`,
        },
        why_choose_us: {
            getAll: `${ABOUT_US_BASE}/why_choose_us`,
            getOne: (id) => `${ABOUT_US_BASE}/why_choose_us/${id}`,
        },
    },
};

export default API_ROUTES;
