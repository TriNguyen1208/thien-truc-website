import homeRouter from "#@/routes/home.route.js"
import recruitmentRouter from "#@/routes/recruitment.route.js"
import contactRouter from "#@/routes/contact.route.js"
import aboutUsRouter from '#@/routes/aboutus.route.js'
import newsRouter from '#@/routes/news.route.js'
import projectsRouter from '#@/routes/projects.route.js'
import productRouter from '#@/routes/products.route.js'

const registerRoutes = (app) => {
    app.use('/api/home', homeRouter);
    app.use('/api/recruitment', recruitmentRouter);
    app.use('/api/contact', contactRouter);
    app.use('/api/aboutus', aboutUsRouter);
    app.use('/api/news', newsRouter);
    app.use('/api/projects', projectsRouter);
    app.use('/api/products', productRouter);
};

export default registerRoutes;