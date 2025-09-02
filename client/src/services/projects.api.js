import {fetchData} from "./apiHelper"
import API_ROUTES from "../../../shared/routesAPI";

const projectServices = {
    general: {
        getAll: async () => fetchData(API_ROUTES.project.base),
        getProjectPage: async () => fetchData(API_ROUTES.project.project_page)
    },
    projects: {
        getList: async (query = undefined, filter = undefined, is_featured = undefined, page = 1, limit = undefined) => 
            fetchData(API_ROUTES.project.projects.getList(query, filter, is_featured,  page, limit)),
        getOne: async (id) => fetchData(API_ROUTES.project.projects.getOne(id)),
        getAllFeatured: async (filter = undefined) => fetchData(API_ROUTES.project.projects.getAllFeatured(filter)),
        getSearchSuggestions: async (query, filter) => fetchData(API_ROUTES.project.projects.getSearchSuggestions(query, filter))
    },
    project_regions: {
        getAll: async () => fetchData(API_ROUTES.project.project_regions.getAll),
        getOne: async (id) => fetchData(API_ROUTES.project.project_regions.getOne(id)),
        getAllFeatured: async () => fetchData(API_ROUTES.project.project_regions.getAllFeatured)
    },
    project_contents: {
        getAll: async () => fetchData(API_ROUTES.project.project_contents.getAll),
        getOne: async (id) => fetchData(API_ROUTES.project.project_contents.getOne(id))
    }
}

export default projectServices;