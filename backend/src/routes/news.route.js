import express from 'express'
import newsController from '#@/controllers/news.controller.js';

const router = express.Router();

router.get('/', newsController.getAllTables);
router.get('/news_page', newsController.getNewsPage);
router.get('/news', newsController.news.getAll);
router.get('/news/:id', newsController.news.getById);
router.get('/news_categories', newsController.news_categories.getAll);
router.get('/news_categories/:id', newsController.news_categories.getById);

export default router;