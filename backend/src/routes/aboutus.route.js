import express from 'express'
import aboutUsController from '#@/controllers/aboutus.controller.js';

const router = express.Router();

router.get('/', aboutUsController.getAllTables);
router.get('/about_us_page', aboutUsController.getAboutUsPage);
router.get('/company_services', aboutUsController.company_services.getAll);
router.get('/company_services/:id', aboutUsController.company_services.getOne);
router.get('/why_choose_us', aboutUsController.why_choose_us.getAll);
router.get('/why_choose_us/:id', aboutUsController.why_choose_us.getOne);
export default router;