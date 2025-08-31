import homeRouter from "#@/routes/seo-client/home.route.js"
import recruitmentRouter from "#@/routes/seo-client/recruitment.route.js"
import contactRouter from "#@/routes/seo-client/contact.route.js"
import aboutUsRouter from '#@/routes/seo-client/aboutus.route.js'
import newsRouter from '#@/routes/seo-client/news.route.js'
import projectsRouter from '#@/routes/seo-client/projects.route.js'
import productRouter from '#@/routes/seo-client/products.route.js'
import priceRouter from '#@/routes/seo-client/product-prices.route.js'

const registerRoutes = (app) => {
    app.use('/', homeRouter);
    app.use('/san-pham', productRouter);
    app.use('/bang-gia', priceRouter);
    app.use('/du-an', projectsRouter);
    app.use('/tin-tuc', newsRouter);
    app.use('/tuyen-dung', recruitmentRouter);
    app.use('/lien-he', contactRouter);
    app.use('/ve-chung-toi', aboutUsRouter);
};

export default registerRoutes;