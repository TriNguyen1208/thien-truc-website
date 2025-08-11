import express from 'express'
import newsController from '#@/controllers/news.controller.js';
import upload from '#@/middlewares/upload.middleware.js'
import authMiddleware from '#@/middlewares/auth.middleware.js';
const { authenticateToken, authorizeAdmin } = authMiddleware;

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
router.get('/search_categories_suggestions', newsController.getSearchCategoriesSuggestions);
router.get('/count', newsController.count);
router.get('/featured_news', newsController.featured_news.getAll);

router.patch('/news/update_categories', authenticateToken, newsController.news.updateCategory);
router.patch('/news/:id/num_readers', newsController.news.updateNumReaders);
router.patch('/featured_news', authenticateToken, newsController.featured_news.updateAll);

router.post('/news_contents/', authenticateToken,  upload.fields([
    { name: 'main_image', maxCount: 1 },
    { name: 'images', maxCount: 20 }])
, newsController.news_contents.postOne);

router.patch('/news_contents/:id', authenticateToken, upload.fields([
    { name: 'main_image', maxCount: 1 },
    { name: 'images', maxCount: 20 },
])
, newsController.news_contents.updateOne);


// post
router.post('/news_categories', authenticateToken, newsController.news_categories.createOne);

// patch
router.patch('/news_categories/:id', authenticateToken, newsController.news_categories.updateOne);
router.patch('/news_page', authenticateToken, newsController.updateNewsPage);
router.patch('/news_page/visibility', authenticateToken, newsController.updateVisibility);
router.patch('/featured_news', authenticateToken, newsController.featured_news.updateAll);

// delete
router.delete('/news/:id', authenticateToken, newsController.news.deleteOne);
router.delete('/news_categories/:id', authenticateToken, newsController.news_categories.deleteOne);
export default router;