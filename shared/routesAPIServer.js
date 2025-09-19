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
            visibility: `${HOME_BASE}/home_page/visibility`,
            bannerImages: `${HOME_BASE}/home_page/banner_images`,
            aboutUs: `${HOME_BASE}/home_page/about_us`,
            imageAboutUs: `${HOME_BASE}/home_page/about_us_image`,
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
        updateProductPage: { // patch
            banner: `${PRODUCT_BASE}/product_page/banner`,
            visibility: `${PRODUCT_BASE}/product_page/visibility`
        },
        products: {
            // get
            getList: (query, filter, is_featured, is_sale, page, limit) => `${PRODUCT_BASE}/products?query=${uri(query)}&filter=${uri(filter)}&is_featured=${uri(is_featured)}&is_sale=${uri(is_sale)}&page=${uri(page)}&limit=${uri(limit)}`,
            getListByCategory: (id, query, filter, is_featured, is_sale, limit) => `${PRODUCT_BASE}/products/get_by_category?id=${uri(id)}&query=${uri(query)}&filter=${uri(filter)}&is_featured=${uri(is_featured)}&is_sale=${uri(is_sale)}&limit=${uri(limit)}`,
            getOne: (id) => `${PRODUCT_BASE}/products/${id}`,
            getAllFeatured: `${PRODUCT_BASE}/products?is_featured=true`,
            getSearchSuggestions: (query='', filter='', is_featured, is_sale) => `${PRODUCT_BASE}/search_suggestions?query=${uri(query)}&filter=${uri(filter)}&is_featured=${uri(is_featured)}&is_sale=${uri(is_sale)}`,        
            // post
            createOne: `${PRODUCT_BASE}/products`,
            activateSale: `${PRODUCT_BASE}/activate-sale`,
            // patch
            updateOne: (id) => `${PRODUCT_BASE}/products/${id}`,
            updateFeatureOne: (id, status) => `${PRODUCT_BASE}/products/is_featured/${id}/${status}`,
            updateCategory: `${PRODUCT_BASE}/products/update-categories`,
            updateSale: `${PRODUCT_BASE}/sale`,
            // delete
            deleteOne: (id) => `${PRODUCT_BASE}/products/${id}`
        },
        product_categories: {
            // get
            getAll: `${PRODUCT_BASE}/product_categories`,
            getList: (id, query) => `${PRODUCT_BASE}/product_categories?id=${uri(id)}&query=${uri(query)}`,
            getOne: (id) => `${PRODUCT_BASE}/product_categories/${id}`,
            getAllFeatured: `${PRODUCT_BASE}/featured_product_categories`,
            getSearchSuggestions: (query='') => `${PRODUCT_BASE}/search_categories_suggestions?query=${uri(query)}`,
            // post
            createOne: `${PRODUCT_BASE}/product_categories`,
            // patch
            updateOne: (id) => `${PRODUCT_BASE}/product_categories/${id}`,
            // delete
            deleteOne: (id) => `${PRODUCT_BASE}/product_categories/${id}`
        },
        price_page: `${PRODUCT_BASE}/price_page`,
        updatePricePage: { // patch
            banner: `${PRODUCT_BASE}/price_page/banner`,
            visibility: `${PRODUCT_BASE}/price_page/visibility`,
        },
        count: `${PRODUCT_BASE}/count`
    },
    project: {
        base: PROJECT_BASE,
        project_page: `${PROJECT_BASE}/project_page`,
        updateProjectPage: { // patch
            banner: `${PROJECT_BASE}/project_page/banner`,
            visibility: `${PROJECT_BASE}/project_page/visibility`,
        },
        projects: {
            // get
            getList: (query, filter, is_featured, page, limit) => `${PROJECT_BASE}/projects?query=${uri(query)}&filter=${uri(filter)}&is_featured=${uri(is_featured)}&page=${page}&limit=${limit}`,
            getListByRegion: (query, filter, is_featured, limit) => `${PROJECT_BASE}/projects/get_by_region?query=${uri(query)}&filter=${uri(filter)}&is_featured=${uri(is_featured)}&limit=${limit}`,
            getOne: (id) => `${PROJECT_BASE}/projects/${id}`,
            getAllFeatured: `${PROJECT_BASE}/highlight_projects`,
            getSearchSuggestions: (query='', filter='', is_featured) => `${PROJECT_BASE}/search_suggestions?query=${uri(query)}&filter=${uri(filter)}&is_featured=${uri(is_featured)}`,
            // post
            createOne: `${PROJECT_BASE}/project`,
            // patch
            updateOne: (id) => `${PROJECT_BASE}/project/${id}`,
            updateFeatureOne: (id, status) => `${PROJECT_BASE}/projects/is_featured/${id}/${status}`,
            updateRegion: `${PROJECT_BASE}/projects/update_regions`, 
            // delete
            deleteOne: (id) => `${PROJECT_BASE}/projects/${id}`,
        },
        project_regions: {
            // get
            getAll: `${PROJECT_BASE}/project_regions`,
            getOne: (id) => `${PROJECT_BASE}/project_regions/${id}`,
            getAllFeatured: `${PROJECT_BASE}/featured_project_regions`,
            getSearchSuggestions: (query='') => `${PROJECT_BASE}/search_categories_suggestions?query=${uri(query)}`,
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
        },
        count: `${PROJECT_BASE}/count`
    },
    news: {
        base: NEWS_BASE,
        news_page: `${NEWS_BASE}/news_page`,
        updateNewsPage: { // patch
            banner: `${NEWS_BASE}/news_page/banner`,
            visibility: `${NEWS_BASE}/news_page/visibility`,
        },
        news: {
            // get
            getList: (query, filter, is_published, sort_by, page, limit) => `${NEWS_BASE}/news?query=${uri(query)}&filter=${uri(filter)}&is_published=${is_published}&sort_by=${uri(sort_by)}&page=${page}&limit=${limit}`,
            getListByCategory: (query, filter, is_published, sort_by, limit) => `${NEWS_BASE}/news/get_by_category?query=${uri(query)}&filter=${uri(filter)}&is_published=${is_published}&sort_by=${uri(sort_by)}&limit=${limit}`,
            getOne: (id) => `${NEWS_BASE}/news/${id}`,
            getSearchSuggestions: (query='', filter='', is_published) => `${NEWS_BASE}/search_suggestions?query=${uri(query)}&filter=${uri(filter)}&is_published=${uri(is_published)}`,
            getAllFeatured: `${NEWS_BASE}/featured_news`,
            // post
            createOne: `${NEWS_BASE}/news`,
            // patch
            updateOne: (id) => `${NEWS_BASE}/news/${id}`,
            updateNumReaders: (id) => `${NEWS_BASE}/news/${id}/num_readers`,
            updateCategory: `${NEWS_BASE}/news/update_categories`, 
            updateFeaturedNews: `${NEWS_BASE}/featured_news`,
            // delete
            deleteOne: (id) => `${NEWS_BASE}/news/${id}`,
        },
        news_categories: {
            // get
            getAll: `${NEWS_BASE}/news_categories`,
            getOne: (id) => `${NEWS_BASE}/news_categories/${id}`,
            getSearchSuggestions: (query='') => `${NEWS_BASE}/search_categories_suggestions?query=${uri(query)}`,
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
        },
        count: `${NEWS_BASE}/count`
    },
    recruitment: {
        base: RECRUITMENT_BASE,
        recruitment_page: `${RECRUITMENT_BASE}/recruitment_page`,
        submitApplication: `${RECRUITMENT_BASE}/submit_application`,
        updateRecruitmentPage: { // patch
            banner: `${RECRUITMENT_BASE}/recruitment_page/banner`,
            visibility: `${RECRUITMENT_BASE}/recruitment_page/visibility`,
            culture: `${RECRUITMENT_BASE}/recruitment_page/culture`,
            culture_images: `${RECRUITMENT_BASE}/recruitment_page/culture_images`,
        }
    },
    contact: {
        base: CONTACT_BASE,
        contact_page: `${CONTACT_BASE}/contact_page`,
        updateContactPage: { // patch
            banner: `${CONTACT_BASE}/contact_page/banner`,
            visibility: `${CONTACT_BASE}/contact_page/visibility`
        },
        company_info: { // patch    
            get: `${CONTACT_BASE}/company_info`,
            update: `${CONTACT_BASE}/company_info`,
        },  
        support_agents: {
            // get
            getAll: `${CONTACT_BASE}/support_agents`,
            getOne: (id) => `${CONTACT_BASE}/support_agents/${id}`,
            // post
            createOne: `${CONTACT_BASE}/support_agents/`,
            // patch
            updateOne: (id) => `${CONTACT_BASE}/support_agents/${id}`,
            // delete
            deleteOne: (id) => `${CONTACT_BASE}/support_agents/${id}`,
        },
        submitContact: `${CONTACT_BASE}/contact_messages`,
        count: `${CONTACT_BASE}/count`,
    },
    about_us: {
        base: ABOUT_US_BASE,
        about_us_page: `${ABOUT_US_BASE}/about_us_page`,
        updateAboutUsPage: { // patch
            banner: `${ABOUT_US_BASE}/about_us_page/banner`,
            visibility: `${ABOUT_US_BASE}/about_us_page/visibility`,
            ourStory: `${ABOUT_US_BASE}/about_us_page/our_story`,
        },
        company_services: {
            // get
            getAll: `${ABOUT_US_BASE}/company_services`,
            getOne: (id) => `${ABOUT_US_BASE}/company_services/${id}`,
            // post
            createOne: `${ABOUT_US_BASE}/company_services`,
            // patch
            updateOne: (id) => `${ABOUT_US_BASE}/company_services/${id}`,
            // delete
            deleteOne: (id) => `${ABOUT_US_BASE}/company_services/${id}`,
        },
        why_choose_us: {
            // get
            getAll: `${ABOUT_US_BASE}/why_choose_us`,
            getOne: (id) => `${ABOUT_US_BASE}/why_choose_us/${id}`,
            // post
            createOne: `${ABOUT_US_BASE}/why_choose_us`,
            // patch
            updateOne: (id) => `${ABOUT_US_BASE}/why_choose_us/${id}`,
            // delete
            deleteOne: (id) => `${ABOUT_US_BASE}/why_choose_us/${id}`,
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