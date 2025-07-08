import homeRouter from "#@/routes/admin/home.route.js"
import recruitmentRouter from "#@/routes/admin/recruitment.route.js"
import contactRouter from "#@/routes/admin/contact.route.js"
import aboutUsRouter from '#@/routes/admin/aboutus.route.js'
import newsRouter from '#@/routes/admin/news.route.js'
import projectsRouter from '#@/routes/admin/projects.route.js'
import productRouter from '#@/routes/admin/products.route.js'

const registerRoutes = (app) => {
    app.use('/api/admin/home', homeRouter);
    app.use('/api/recruitment', recruitmentRouter);
    app.use('/api/contact', contactRouter);
    app.use('/api/about_us', aboutUsRouter);
    app.use('/api/admin/project', projectsRouter);
    app.use('/api/news', newsRouter);
    app.use('/api/product', productRouter);
};

export default registerRoutes;