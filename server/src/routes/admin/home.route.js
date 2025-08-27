import express from 'express'
import homeController from '#@/controllers/home.controller.js';
import authMiddleware from '#@/middlewares/auth.middleware.js';
import upload from '#@/middlewares/upload.middleware.js';
const { authenticateToken } = authMiddleware;

const router = express.Router();

router.get('/', homeController.getAllTables);
router.get('/home_page', homeController.getHomePage);
router.get('/highlight_stats_about_us', homeController.highlight_stats_about_us.getAll);
router.get('/highlight_stats_about_us/:id', homeController.highlight_stats_about_us.getOne);

router.post('/highlight_stats_about_us', authenticateToken, homeController.highlight_stats_about_us.createOne);

router.patch('/home_page/banner_images', authenticateToken, upload.array('banner_images', 20), homeController.updateHomePage.bannerImages)
router.patch('/home_page/banner', authenticateToken, homeController.updateHomePage.banner);
router.patch('/home_page/about_us', authenticateToken, homeController.updateHomePage.aboutUs);
router.patch('/home_page/about_us_image', authenticateToken, upload.single('aboutus_img'), homeController.updateHomePage.imageAboutUs);
router.patch('/highlight_stats_about_us/:id', authenticateToken, homeController.highlight_stats_about_us.updateOne);
router.patch('/home_page/visibility', authenticateToken, homeController.updateHomePage.visibility);

router.delete('/highlight_stats_about_us/:id', authenticateToken, homeController.highlight_stats_about_us.deleteOne);

export default router;