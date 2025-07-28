import express from 'express'
import productController from '#@/controllers/products.controller.js';

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

router.get('/highlight_products', productController.getHighlightProducts);
router.get('/search_suggestions', productController.getSearchSuggestions);
router.get('/featured_product_categories', productController.product_categories.getAllFeatured);
export default router;