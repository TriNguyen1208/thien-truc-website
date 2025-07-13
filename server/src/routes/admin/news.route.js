import express from 'express'
import newsController from '#@/controllers/news.controller.js';
import upload from '#@/middlewares/upload.middleware.js'
const router = express.Router();

router.get('/', newsController.getAllTables);
router.get('/news_page', newsController.getNewsPage);
router.get('/news', newsController.news.getList);
router.get('/news/get_by_category', newsController.news.getListByCategory);
router.get('/news/:id', newsController.news.getOne);
router.get('/news_categories', newsController.news_categories.getAll);
router.get('/news_categories/:id', newsController.news_categories.getOne);
router.get('/news_contents', newsController.news_contents.getAll);
router.get('/news_contents/:id', newsController.news_contents.getOne);
router.get('/search_suggestions', newsController.getSearchSuggestions);
router.get('/count', newsController.count);

router.patch('/news/:id/num_readers', newsController.news.updateNumReaders);

router.post('/news_contents/',  upload.fields([
    { name: 'main_image', maxCount: 1 },
    { name: 'images', maxCount: 20 }])
, newsController.news_contents.postOne);
export default router;