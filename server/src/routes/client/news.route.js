import express from 'express'
import newsController from '#@/controllers/news.controller.js';

const router = express.Router();

router.get('/', newsController.getAllTables);
router.get('/news_page', newsController.getNewsPage);
router.get('/news', newsController.news.getList);
router.get('/news/:id', newsController.news.getOne);
router.get('/news_categories', newsController.news_categories.getAll);
router.get('/news_categories/:id', newsController.news_categories.getOne);
router.get('/news_contents', newsController.news_contents.getAll);
router.get('/news_contents/:id', newsController.news_contents.getOne);
router.get('/search_suggestions', newsController.getSearchSuggestions);
router.patch('/news/:id/num_readers', newsController.news.updateNumReaders);
router.get('/highlight_news', newsController.news.getHighlightNews);

export default router;