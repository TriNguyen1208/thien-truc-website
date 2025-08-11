import express from 'express'
import aboutUsController from '#@/controllers/aboutus.controller.js';
import authMiddleware from '#@/middlewares/auth.middleware.js';
const { authenticateToken } = authMiddleware;

const router = express.Router();

router.get('/', aboutUsController.getAllTables);
router.get('/about_us_page', aboutUsController.getAboutUsPage);
router.get('/company_services', aboutUsController.company_services.getAll);
router.get('/company_services/:id', aboutUsController.company_services.getOne);
router.get('/why_choose_us', aboutUsController.why_choose_us.getAll);
router.get('/why_choose_us/:id', aboutUsController.why_choose_us.getOne);

router.post('/company_services', authenticateToken, aboutUsController.company_services.createOne);
router.post('/why_choose_us', authenticateToken, aboutUsController.why_choose_us.createOne);

router.patch('/about_us_page/banner', authenticateToken, aboutUsController.updateAboutUsPage.banner);
router.patch('/about_us_page/our_story', authenticateToken, aboutUsController.updateAboutUsPage.ourStory);
router.patch('/about_us_page/visibility', authenticateToken, aboutUsController.updateAboutUsPage.visibility);

router.patch('/company_services/:id', authenticateToken, aboutUsController.company_services.updateOne);
router.patch('/why_choose_us/:id', authenticateToken, aboutUsController.why_choose_us.updateOne);

router.delete('/company_services/:id', authenticateToken, aboutUsController.company_services.deleteOne);
router.delete('/why_choose_us/:id', authenticateToken, aboutUsController.why_choose_us.deleteOne);

export default router;