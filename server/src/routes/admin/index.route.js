import homeRouter from "#@/routes/admin/home.route.js"
import recruitmentRouter from "#@/routes/admin/recruitment.route.js"
import contactRouter from "#@/routes/admin/contact.route.js"
import aboutUsRouter from '#@/routes/admin/aboutus.route.js'
import newsRouter from '#@/routes/admin/news.route.js'
import projectsRouter from '#@/routes/admin/projects.route.js'
import productRouter from '#@/routes/admin/products.route.js'
import adminRouter from '#@/routes/admin/admin.route.js'
import authRouter from '#@/routes/admin/auth.route.js'

const registerRoutes = (app) => {
    app.use('/api/admin/home', homeRouter);
    app.use('/api/admin/recruitment', recruitmentRouter);
    app.use('/api/admin/contact', contactRouter);
    app.use('/api/admin/about_us', aboutUsRouter);
    app.use('/api/admin/project', projectsRouter);
    app.use('/api/admin/news', newsRouter);
    app.use('/api/admin/product', productRouter);
    app.use('/api/admin/admin', adminRouter);

    app.use('/api/admin/auth/', authRouter);
};

export default registerRoutes;