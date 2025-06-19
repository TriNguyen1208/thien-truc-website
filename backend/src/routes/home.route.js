import express from 'express'
import homeController from '#@/controllers/home.controller.js';

const router = express.Router();

router.get('/', homeController.getAllTables);
router.get('/home_page', homeController.getHomePage);
router.get('/highlight_stats_about_us', homeController.highlight_stats_about_us.getAll);
router.get('/highlight_stats_about_us/:id', homeController.highlight_stats_about_us.getOne);

export default router;