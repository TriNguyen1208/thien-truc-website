import registerRoutesClient from "#@/routes/client/index.route.js";
import registerRoutesAdmin from "#@/routes/admin/index.route.js";

const registerRoutes = (app) => {
    registerRoutesClient(app);
    registerRoutesAdmin(app);
}
export default registerRoutes