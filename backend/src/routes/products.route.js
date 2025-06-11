import express from 'express'
import productController from '#@/controllers/products.controller.js';

const router = express.Router();

router.get('/', productController.getAll);
router.get('/:id', productController.getId);
export default router;