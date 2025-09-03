import API_ROUTES from "../../../shared/routesAPI";
import { fetchData } from "./apiHelper";

// Resystem services thành module-base api, tránh việc tồn tại api con và api toplevel cùng lúc
const aboutUsServices = {
    general: {
        getAll: async () => fetchData(API_ROUTES.about_us.base),
        getAboutUsPage: async () => fetchData(API_ROUTES.about_us.about_us_page)
    },
    company_services: {
        getAll: async () => fetchData(API_ROUTES.about_us.company_services.getAll),
        getOne: async (id) => fetchData(API_ROUTES.about_us.company_services.getOne(id))
    },
    why_choose_us: {
        getAll: async () => fetchData(API_ROUTES.about_us.why_choose_us.getAll),
        getOne: async (id) => fetchData(API_ROUTES.about_us.why_choose_us.getOne(id))
    }
};

export default aboutUsServices;