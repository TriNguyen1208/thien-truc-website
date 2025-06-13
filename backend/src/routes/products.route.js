import express from 'express'
import productController from '#@/controllers/products.controller.js';

const router = express.Router();

router.get('/', productController.getAllTables);
router.get('/product_page', productController.getProductPage);
router.get('/products', productController.products.getAll);
router.get('/products/:id', productController.products.getById);
router.get('/product_categories', productController.product_categories.getAll);
router.get('/product_categories/:id', productController.product_categories.getById);
router.get('/product_features', productController.product_features.getAll);
router.get('/product_features/:product_id', productController.product_features.getByProductId);
router.get('/product_features/:product_id/:feature_id', productController.product_features.getByProductAndFeatureId);
router.get('/product_highlight_features', productController.product_highlight_features.getAll);
router.get('/product_highlight_features/:product_id', productController.product_highlight_features.getByProductId);
router.get('/product_highlight_features/:product_id/:feature_id', productController.product_highlight_features.getByProductAndFeatureId);
router.get('/price_page', productController.getPricePage);
router.get('/product_prices', productController.product_prices.getAll);
router.get('/product_prices/:product_id', productController.product_prices.getByProductId);
export default router;