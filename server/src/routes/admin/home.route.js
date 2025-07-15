import express from 'express'
import homeController from '#@/controllers/home.controller.js';
import authMiddleware from '#@/middlewares/auth.middleware.js';
const { authenticateToken } = authMiddleware;

const router = express.Router();

router.get('/', homeController.getAllTables);
router.get('/home_page', homeController.getHomePage);
router.get('/highlight_stats_about_us', homeController.highlight_stats_about_us.getAll);
router.get('/highlight_stats_about_us/:id', homeController.highlight_stats_about_us.getOne);

router.post('/highlight_stats_about_us', authenticateToken, homeController.highlight_stats_about_us.createOne);

router.patch('/home_page/banner', authenticateToken, homeController.updateHomePage.banner);
router.patch('/home_page/about_us', authenticateToken, homeController.updateHomePage.aboutUs);
router.patch('/highlight_stats_about_us/:id', authenticateToken, homeController.highlight_stats_about_us.updateOne);

router.delete('/highlight_stats_about_us/:id', authenticateToken, homeController.highlight_stats_about_us.deleteOne);

export default router;