const BASE_API = '/api';

const HOME_BASE = `${BASE_API}/home`;
const PRODUCT_BASE = `${BASE_API}/product`;
const PROJECT_BASE = `${BASE_API}/project`;
const NEWS_BASE = `${BASE_API}/news`;
const RECRUITMENT_BASE = `${BASE_API}/recruitment`;
const CONTACT_BASE = `${BASE_API}/contact`;
const ABOUT_US_BASE = `${BASE_API}/about_us`;

const uri = (value) => {
  if (value === undefined || value === null) return '';
  return encodeURIComponent(value);
};

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
            getList: (query, filter, is_featured, page, limit) => `${PRODUCT_BASE}/products?query=${uri(query)}&filter=${uri(filter)}&is_featured=${uri(is_featured)}&page=${uri(page)}&limit=${uri(limit)}`,
            getListByCategory: (id, query, filter, is_featured, limit) => `${PRODUCT_BASE}/products/get_by_category?id=${uri(id)}&query=${uri(query)}&filter=${uri(filter)}&is_featured=${uri(is_featured)}&limit=${uri(limit)}`,
            getOne: (id) => `${PRODUCT_BASE}/products/${id}`,
        },
        product_categories: {
            getAll: `${PRODUCT_BASE}/product_categories`,
            getList: (id, query) => `${PRODUCT_BASE}/product_categories?id=${uri(id)}&query=${uri(query)}`,
            getOne: (id) => `${PRODUCT_BASE}/product_categories/${id}`,
            getAllFeatured: `${PRODUCT_BASE}/featured_product_categories`
        },
        product_prices: {
            getAll: (query, filter) => `${PRODUCT_BASE}/product_prices?query=${uri(query)}&filter=${uri(filter)}`,
            getOne: (id) => `${PRODUCT_BASE}/product_prices/${id}`,
        },
        price_page: `${PRODUCT_BASE}/price_page`,
        highlight_products: `${PRODUCT_BASE}/products?is_featured=true`,
        search_suggestions: (query='', filter='', is_featured) => `${PRODUCT_BASE}/search_suggestions?query=${uri(query)}&filter=${uri(filter)}&is_featured=${uri(is_featured)}`
    },
    project: {
        base: PROJECT_BASE,
        project_page: `${PROJECT_BASE}/project_page`,
        projects: {
            getList: (query, filter, is_featured, page, limit) => `${PROJECT_BASE}/projects?query=${uri(query)}&filter=${uri(filter)}&is_featured=${uri(is_featured)}&page=${page}&limit=${limit}`,
            getListByRegion: (query, filter, is_featured, limit) => `${PROJECT_BASE}/projects/get_by_region?query=${uri(query)}&filter=${uri(filter)}&is_featured=${uri(is_featured)}&limit=${limit}`,
            getOne: (id) => `${PROJECT_BASE}/projects/${id}`,
        },
        project_regions: {
            getAll: `${PROJECT_BASE}/project_regions`,
            getOne: (id) => `${PROJECT_BASE}/project_regions/${id}`,
            getAllFeatured: `${PROJECT_BASE}/featured_project_regions`,
        },
        project_contents: {
            getAll: `${PROJECT_BASE}/project_contents`,
            getOne: (id) => `${PROJECT_BASE}/project_contents/${id}`,
        },
        highlight_projects: (filter) => `${PROJECT_BASE}/projects?filter=${uri(filter)}&is_featured=true`,

        search_suggestions: (query='', filter='', is_featured) => `${PROJECT_BASE}/search_suggestions?query=${uri(query)}&filter=${uri(filter)}&is_featured=${uri(is_featured)}`
    },
    news: {
        base: NEWS_BASE,
        news_page: `${NEWS_BASE}/news_page`,
        highlight_news: `${NEWS_BASE}/highlight_news`,
        news: {
            getList: (query, filter, is_published, sort_by, page, limit) => `${NEWS_BASE}/news?query=${uri(query)}&filter=${uri(filter)}&is_published=${is_published}&sort_by=${uri(sort_by)}&page=${page}&limit=${limit}`,
            getListByCategory: (query, filter, is_published, sort_by, limit) => `${NEWS_BASE}/news/get_by_category?query=${uri(query)}&filter=${uri(filter)}&is_published=${is_published}&sort_by=${uri(sort_by)}&limit=${limit}`,
            getOne: (id) => `${NEWS_BASE}/news/${id}`,
            updateNumReaders: (id) => `${NEWS_BASE}/news/${id}/num_readers`
        },
        news_categories: {
            getAll: `${NEWS_BASE}/news_categories`,
            getOne: (id) => `${NEWS_BASE}/news_categories/${id}`,
        },
        news_contents: {
            getAll: `${NEWS_BASE}/news_contents`,
            getOne: (id) => `${NEWS_BASE}/news_contents/${id}`,
        },
        getFeaturedNews: `${NEWS_BASE}/featured_news`,
        search_suggestions: (query='', filter='', is_published) => `${NEWS_BASE}/search_suggestions?query=${uri(query)}&filter=${uri(filter)}&is_published=${uri(is_published)}`
    },
    recruitment: {
        base: RECRUITMENT_BASE,
        recruitment_page: `${RECRUITMENT_BASE}/recruitment_page`,
        submit_application: `${RECRUITMENT_BASE}/submit_application`,
    },
    contact: {
        base: CONTACT_BASE,
        contact_page: `${CONTACT_BASE}/contact_page`,
        company_info: `${CONTACT_BASE}/company_info`,
        support_agents: {
            getAll: `${CONTACT_BASE}/support_agents`,
            getOne: (id) => `${CONTACT_BASE}/support_agents/${id}`,
        },
        contact_messages: `${CONTACT_BASE}/contact_messages`,
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