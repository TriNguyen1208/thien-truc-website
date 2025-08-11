import express from 'express'
import productController from '#@/controllers/products.controller.js';
import upload from '#@/middlewares/upload.middleware.js'
import authMiddleware from '#@/middlewares/auth.middleware.js';
const { authenticateToken } = authMiddleware;

const router = express.Router();

router.get('/', productController.getAllTables);
router.get('/product_page', productController.getProductPage);
router.get('/products', productController.products.getList);
router.get('/products/get_by_category', productController.products.getListByCategory);
router.get('/products/:id', productController.products.getOne);
router.get('/product_categories', productController.product_categories.getList);
router.get('/product_categories/:id', productController.product_categories.getOne);
router.get('/price_page', productController.getPricePage);
router.get('/product_prices', productController.product_prices.getAll);
router.get('/product_prices/:product_id', productController.product_prices.getOne);
router.get('/highlight_products', productController.getHighlightProducts);
router.get('/search_suggestions', productController.getSearchSuggestions);
router.get('/search_categories_suggestions', productController.getSearchCategoriesSuggestions);
router.get('/count', productController.count);
router.get('/featured_product_categories', productController.product_categories.getAllFeatured);

router.post('/products', authenticateToken, upload.single('local_image'), productController.products.createOne);
router.post('/product_categories', authenticateToken, productController.product_categories.createOne);

router.patch('/product_page', authenticateToken, productController.updateProductPage);
router.patch('/product_page/visibility', authenticateToken, productController.updateProductVisibility);
router.patch('/price_page', authenticateToken, productController.updatePricePage);
router.patch('/price_page/visibility', authenticateToken, productController.updatePriceVisibility);

router.patch('/products/update-categories', authenticateToken, productController.products.updateCategory);
router.patch('/products/:id', authenticateToken, upload.single('local_image'), productController.products.updateOne);
router.patch('/products/is_featured/:id/:status', authenticateToken, productController.products.updateFeatureOne);
router.patch('/product_categories/:id', authenticateToken, productController.product_categories.updateOne);

router.delete('/products/:id', authenticateToken, productController.products.deleteOne);
router.delete('/product_categories/:id', authenticateToken, productController.product_categories.deleteOne);

export default router;