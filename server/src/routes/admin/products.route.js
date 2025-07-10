import express from 'express'
import productController from '#@/controllers/products.controller.js';

const router = express.Router();

router.get('/', productController.getAllTables);
router.get('/product_page', productController.getProductPage);
router.get('/products', productController.products.getList);
router.get('/products/get_by_category', productController.products.getListByCategory);
router.get('/products/:id', productController.products.getOne);
router.get('/product_categories', productController.product_categories.getAll);
router.get('/product_categories/:id', productController.product_categories.getOne);
router.get('/price_page', productController.getPricePage);
router.get('/product_prices', productController.product_prices.getAll);
router.get('/product_prices/:product_id', productController.product_prices.getOne);

router.get('/highlight_products', productController.getHighlightProducts);
router.get('/search_suggestions', productController.getSearchSuggestions);

router.get('/count', productController.count);

router.delete('/products/:id', productController.products.deleteOne);
router.delete('/product_categories/:id', productController.product_categories.deleteOne);

export default router;