import homeRouter from "#@/routes/admin/home.route.js"

const registerRoutes = (app) => {
    app.use('/api/admin/home', homeRouter);
};

export default registerRoutes;