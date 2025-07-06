import homeRouter from "#@/routes/admin/home.route.js"
import projectsRouter from "#@/routes/admin/projects.route.js"

const registerRoutes = (app) => {
    app.use('/api/admin/home', homeRouter);
    app.use('/api/admin/project', projectsRouter);
};

export default registerRoutes;