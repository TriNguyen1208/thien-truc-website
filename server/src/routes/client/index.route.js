import homeRouter from "#@/routes/client/home.route.js"
import recruitmentRouter from "#@/routes/client/recruitment.route.js"
import contactRouter from "#@/routes/client/contact.route.js"
import aboutUsRouter from '#@/routes/client/aboutus.route.js'
import newsRouter from '#@/routes/client/news.route.js'
import projectsRouter from '#@/routes/client/projects.route.js'
import productRouter from '#@/routes/client/products.route.js'

const registerRoutes = (app) => {
    app.use('/api/home', homeRouter);
    app.use('/api/recruitment', recruitmentRouter);
    app.use('/api/contact', contactRouter);
    app.use('/api/about_us', aboutUsRouter);
    app.use('/api/news', newsRouter);
    app.use('/api/project', projectsRouter);
    app.use('/api/product', productRouter);
};

export default registerRoutes;