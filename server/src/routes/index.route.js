import registerRoutesClient from "#@/routes/client/index.route.js";
import registerRoutesAdmin from "#@/routes/admin/index.route.js";
import registerSEOClient from "#@/routes/seo-client/index.route.js"

const registerRoutes = (app) => {
    registerRoutesClient(app);
    registerRoutesAdmin(app);
    registerSEOClient(app);
}
export default registerRoutes