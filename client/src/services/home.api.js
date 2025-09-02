import { fetchData } from "./apiHelper";
import API_ROUTES from "../../../shared/routesAPI";

const homeServices = {
    general: {
        getAll: async () => fetchData(API_ROUTES.home.base),
        getHomePage: async () => fetchData(API_ROUTES.home.home_page)
    },
    highlight_stats_about_us: {
        getAll: async () => fetchData(API_ROUTES.home.highlight_stats_about_us.getAll),
        getOne: async (id) => fetchData(API_ROUTES.home.highlight_stats_about_us.getOne(id))
    }
}

export default homeServices;




