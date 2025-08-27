const BASE_API = '/api/admin';

const HOME_BASE = `${BASE_API}/home`;
const PRODUCT_BASE = `${BASE_API}/product`;
const PROJECT_BASE = `${BASE_API}/project`;
const NEWS_BASE = `${BASE_API}/news`;
const RECRUITMENT_BASE = `${BASE_API}/recruitment`;
const CONTACT_BASE = `${BASE_API}/contact`;
const ABOUT_US_BASE = `${BASE_API}/about_us`;
const ADMIN_BASE = `${BASE_API}/admin`;
const AUTH_BASE = `${BASE_API}/auth`;

const uri = (value) => {
  if (value === undefined || value === null) return '';
  return encodeURIComponent(value);
};

const API_ROUTES = {
    schemaTable: (schema, table) => `${BASE_API}/${schema}/${table}`,
    admin: {
        base: ADMIN_BASE,
        count: `${ADMIN_BASE}/count`,
        activity_logs: `${ADMIN_BASE}/activity_logs`,
        manager: {
            // get
            getAll: `${ADMIN_BASE}/managers`,
            getOne: (username) => `${ADMIN_BASE}/managers/${username}`,
            // post
            createOne: `${ADMIN_BASE}/managers`,
            // patch
            updateOne: (username) => `${ADMIN_BASE}/managers/${username}`,
            // delete
            deleteOne: (username) => `${ADMIN_BASE}/managers/${username}`
        }
    },
    home: {
        base: HOME_BASE,
        home_page: `${HOME_BASE}/home_page`,
        updateHomePage: {
            // patch
            banner: `${HOME_BASE}/home_page/banner`,
            bannerImages: `${HOME_BASE}/home_page/banner_images`,
            aboutUs: `${HOME_BASE}/home_page/about_us`,
            imageAboutUs: `${HOME_BASE}/home_page/about_us_image`,
            visibility: `${HOME_BASE}/home_page/visibility`,
        },
        highlight_stats_about_us: {
            getAll: `${HOME_BASE}/highlight_stats_about_us`,
            getOne: (id) => `${HOME_BASE}/highlight_stats_about_us/${id}`,
            createOne: `${HOME_BASE}/highlight_stats_about_us`,
            updateOne: (id) => `${HOME_BASE}/highlight_stats_about_us/${id}`,
            deleteOne: (id) => `${HOME_BASE}/highlight_stats_about_us/${id}`,
        },
    },
    product: {
        base: PRODUCT_BASE,
        product_page: `${PRODUCT_BASE}/product_page`,
        update_product_page: `${PRODUCT_BASE}/product_page`, // patch
        update_product_visibility: `${PRODUCT_BASE}/product_page/visibility`,
        products: {
            // get
            getList: (query, filter, is_featured, page, limit) => `${PRODUCT_BASE}/products?query=${uri(query)}&filter=${uri(filter)}&is_featured=${uri(is_featured)}&page=${uri(page)}&limit=${uri(limit)}`,
            getListByCategory: (id, query, filter, is_featured, limit) => `${PRODUCT_BASE}/products/get_by_category?id=${uri(id)}&query=${uri(query)}&filter=${uri(filter)}&is_featured=${uri(is_featured)}&limit=${uri(limit)}`,
            getOne: (id) => `${PRODUCT_BASE}/products/${id}`,
            // post
            createOne: `${PRODUCT_BASE}/products`,
            // patch
            updateOne: (id) => `${PRODUCT_BASE}/products/${id}`,
            updateFeatureOne: (id, status) => `${PRODUCT_BASE}/products/is_featured/${id}/${status}`,
            updateCategory: `${PRODUCT_BASE}/products/update-categories`,
            // delete
            deleteOne: (id) => `${PRODUCT_BASE}/products/${id}`
        },
        product_categories: {
            // get
            getAll: `${PRODUCT_BASE}/product_categories`,
            getList: (id, query) => `${PRODUCT_BASE}/product_categories?id=${uri(id)}&query=${uri(query)}`,
            getOne: (id) => `${PRODUCT_BASE}/product_categories/${id}`,
            getAllFeatured: `${PRODUCT_BASE}/featured_product_categories`,
            // post
            createOne: `${PRODUCT_BASE}/product_categories`,
            // patch
            updateOne: (id) => `${PRODUCT_BASE}/product_categories/${id}`,
            // delete
            deleteOne: (id) => `${PRODUCT_BASE}/product_categories/${id}`
        },
        product_prices: {
            getAll: (query, filter) => `${PRODUCT_BASE}/product_prices?query=${uri(query)}&filter=${uri(filter)}`,
            getOne: (id) => `${PRODUCT_BASE}/product_prices/${id}`,
        },
        price_page: `${PRODUCT_BASE}/price_page`,
        update_price_page: `${PRODUCT_BASE}/price_page`, // patch
        update_price_visibility: `${PRODUCT_BASE}/price_page/visibility`,
        highlight_products: `${PRODUCT_BASE}/products?is_featured=true`,
        search_suggestions: (query='', filter='', is_featured) => `${PRODUCT_BASE}/search_suggestions?query=${uri(query)}&filter=${uri(filter)}&is_featured=${uri(is_featured)}`,
        search_categories_suggestions: (query='') => `${PRODUCT_BASE}/search_categories_suggestions?query=${uri(query)}`,
        count: `${PRODUCT_BASE}/count`
    },
    project: {
        base: PROJECT_BASE,
        project_page: `${PROJECT_BASE}/project_page`,
        update_project_page: `${PROJECT_BASE}/project_page`, // patch
        update_visibility: `${PROJECT_BASE}/project_page/visibility`,
        projects: {
            getList: (query, filter, is_featured, page, limit) => `${PROJECT_BASE}/projects?query=${uri(query)}&filter=${uri(filter)}&is_featured=${uri(is_featured)}&page=${page}&limit=${limit}`,
            getListByRegion: (query, filter, is_featured, limit) => `${PROJECT_BASE}/projects/get_by_region?query=${uri(query)}&filter=${uri(filter)}&is_featured=${uri(is_featured)}&limit=${limit}`,
            getOne: (id) => `${PROJECT_BASE}/projects/${id}`,
            postOne: `${PROJECT_BASE}/projects/`,
            
            updateFeatureOne: (id, status) => `${PROJECT_BASE}/projects/is_featured/${id}/${status}`,
            updateRegion: `${PROJECT_BASE}/projects/update_regions`, 
            // delete
            deleteOne: (id) => `${PROJECT_BASE}/projects/${id}`,
        },
        project_regions: {
            getAll: `${PROJECT_BASE}/project_regions`,
            getOne: (id) => `${PROJECT_BASE}/project_regions/${id}`,
            getAllFeatured: `${PROJECT_BASE}/featured_project_regions`,

            // post
            createOne: `${PROJECT_BASE}/project_regions`,
               
            // patch
            updateOne: (id) => `${PROJECT_BASE}/project_regions/${id}`,

            // delete
            deleteOne: (id) => `${PROJECT_BASE}/project_regions/${id}`
        },
        project_contents: {
            getAll: `${PROJECT_BASE}/project_contents`,
            getOne: (id) => `${PROJECT_BASE}/project_contents/${id}`,
            postOne: `${PROJECT_BASE}/project_contents/`,
            updateOne: (id) => `${PROJECT_BASE}/project_contents/${id}`
        },
        highlight_projects: `${PROJECT_BASE}/highlight_projects`,
        search_suggestions: (query='', filter='', is_featured) => `${PROJECT_BASE}/search_suggestions?query=${uri(query)}&filter=${uri(filter)}&is_featured=${uri(is_featured)}`,
        search_categories_suggestions: (query='') => `${PROJECT_BASE}/search_categories_suggestions?query=${uri(query)}`,
        count: `${PROJECT_BASE}/count`
    },
    news: {
        base: NEWS_BASE,
        news_page: `${NEWS_BASE}/news_page`,
        update_news_page: `${NEWS_BASE}/news_page`, // patch
        update_visibility: `${NEWS_BASE}/news_page/visibility`,
        news: {
            getList: (query, filter, is_published, sort_by, page, limit) => `${NEWS_BASE}/news?query=${uri(query)}&filter=${uri(filter)}&is_published=${is_published}&sort_by=${uri(sort_by)}&page=${page}&limit=${limit}`,
            getListByCategory: (query, filter, is_published, sort_by, limit) => `${NEWS_BASE}/news/get_by_category?query=${uri(query)}&filter=${uri(filter)}&is_published=${is_published}&sort_by=${uri(sort_by)}&limit=${limit}`,
            getOne: (id) => `${NEWS_BASE}/news/${id}`,
            updateNumReaders: (id) => `${NEWS_BASE}/news/${id}/num_readers`,
            updateCategory: `${NEWS_BASE}/news/update_categories`, 
            // delete
            deleteOne: (id) => `${NEWS_BASE}/news/${id}`,
        },
        news_categories: {
            getAll: `${NEWS_BASE}/news_categories`,
            getOne: (id) => `${NEWS_BASE}/news_categories/${id}`,

            // post
            createOne: `${NEWS_BASE}/news_categories`,
            
            // patch
            updateOne: (id) => `${NEWS_BASE}/news_categories/${id}`,

            // delete
            deleteOne: (id) => `${NEWS_BASE}/news_categories/${id}`
        },  
        news_contents: {
            getAll: `${NEWS_BASE}/news_contents`,   
            getOne: (id) => `${NEWS_BASE}/news_contents/${id}`,
            postOne: `${NEWS_BASE}/news_contents/`,
            updateOne: (id) => `${NEWS_BASE}/news_contents/${id}`
        },
        
        getFeaturedNews: `${NEWS_BASE}/featured_news`,
        updateFeaturedNews: `${NEWS_BASE}/featured_news`, // patch
        search_suggestions: (query='', filter='', is_published) => `${NEWS_BASE}/search_suggestions?query=${uri(query)}&filter=${uri(filter)}&is_published=${uri(is_published)}`,
        search_categories_suggestions: (query='') => `${NEWS_BASE}/search_categories_suggestions?query=${uri(query)}`,
        count: `${NEWS_BASE}/count`
    },
    recruitment: {
        base: RECRUITMENT_BASE,
        recruitment_page: `${RECRUITMENT_BASE}/recruitment_page`,
        submit_application: `${RECRUITMENT_BASE}/submit_application`,
        update_visibility: `${RECRUITMENT_BASE}/recruitment_page/visibility`,
    },
    contact: {
        base: CONTACT_BASE,
        contact_page: `${CONTACT_BASE}/contact_page`,
        updateContactPage: {
            banner: `${CONTACT_BASE}/contact_page/banner`, // patch 
            visibility: `${CONTACT_BASE}/contact_page/visibility`
        },
        company_info: `${CONTACT_BASE}/company_info`,
        updateCompanyInfo: `${CONTACT_BASE}/company_info`, // patch        
        support_agents: {
            getAll: `${CONTACT_BASE}/support_agents`,
            getOne: (id) => `${CONTACT_BASE}/support_agents/${id}`,
            createOne: `${CONTACT_BASE}/support_agents/`,
            updateOne: (id) => `${CONTACT_BASE}/support_agents/${id}`,
            deleteOne: (id) => `${CONTACT_BASE}/support_agents/${id}`,
        },
        contact_messages: `${CONTACT_BASE}/contact_messages`,
        count: `${CONTACT_BASE}/count`,
    },
    about_us: {
        base: ABOUT_US_BASE,
        about_us_page: `${ABOUT_US_BASE}/about_us_page`,
        updateAboutUsPage: {
            // patch
            banner: `${ABOUT_US_BASE}/about_us_page/banner`,
            ourStory: `${ABOUT_US_BASE}/about_us_page/our_story`,
            visibility: `${ABOUT_US_BASE}/about_us_page/visibility`,
        },
        company_services: {
            getAll: `${ABOUT_US_BASE}/company_services`,
            getOne: (id) => `${ABOUT_US_BASE}/company_services/${id}`,
            createOne: `${ABOUT_US_BASE}/company_services`, // post
            updateOne: (id) => `${ABOUT_US_BASE}/company_services/${id}`, // patch
            deleteOne: (id) => `${ABOUT_US_BASE}/company_services/${id}`, // delete
        },
        why_choose_us: {
            getAll: `${ABOUT_US_BASE}/why_choose_us`,
            getOne: (id) => `${ABOUT_US_BASE}/why_choose_us/${id}`,
            createOne: `${ABOUT_US_BASE}/why_choose_us`, // post
            updateOne: (id) => `${ABOUT_US_BASE}/why_choose_us/${id}`, // patch
            deleteOne: (id) => `${ABOUT_US_BASE}/why_choose_us/${id}`, // delete
        },
    },
    auth: {
        // post
        login: `${AUTH_BASE}/login`,
        refreshToken: `${AUTH_BASE}/refresh-token`,
        verifyLogin: `${AUTH_BASE}/login-result`,
        sendResetPassword: `${AUTH_BASE}/send-reset-password`,
        logout: `${AUTH_BASE}/logout`,
        // patch
        updateProfile: `${AUTH_BASE}/update-profile`,
        updatePassword: `${AUTH_BASE}/update-password`,
        resetPassword: `${AUTH_BASE}/reset-password`,
    }
};

export default API_ROUTES;