import express from 'express'
import recruitmentController from '#@/controllers/recruitment.controller.js';
import validateForm from '#@/middlewares/validateForm.middleware.js';

const router = express.Router();

router.get('/', recruitmentController.getAllTables);
router.get('/recruitment_page', recruitmentController.getRecruitmentPage);
router.post('/submit_application', validateForm.validateRecruitment, recruitmentController.postSubmitApplication);
export default router;