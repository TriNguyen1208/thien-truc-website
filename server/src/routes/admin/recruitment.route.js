import express from 'express'
import recruitmentController from '#@/controllers/recruitment.controller.js';
import validateForm from '#@/middlewares/validateForm.middleware.js';
import authMiddleware from '#@/middlewares/auth.middleware.js';
const { authenticateToken} = authMiddleware;

const router = express.Router();

router.get('/', recruitmentController.getAllTables);
router.get('/recruitment_page', recruitmentController.getRecruitmentPage);
router.post('/submit_application', validateForm.validateRecruitment, recruitmentController.postSubmitApplication);
router.patch('/', authenticateToken, recruitmentController.patchRecruitment);
export default router;