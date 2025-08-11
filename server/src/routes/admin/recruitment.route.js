import express from 'express'
import recruitmentController from '#@/controllers/recruitment.controller.js';
import validateForm from '#@/middlewares/validateForm.middleware.js';
import authMiddleware from '#@/middlewares/auth.middleware.js';
import upload from '#@/middlewares/upload.middleware.js'

const { authenticateToken} = authMiddleware;

const router = express.Router();

router.get('/', recruitmentController.getAllTables);
router.get('/recruitment_page', recruitmentController.getRecruitmentPage);
router.post('/submit_application', validateForm.validateRecruitment, recruitmentController.postSubmitApplication);
router.patch('/', authenticateToken, upload.fields([
  { name: 'culture_img_1', maxCount: 1 },
  { name: 'culture_img_2', maxCount: 1 },
  { name: 'culture_img_3', maxCount: 1 },
  { name: 'culture_img_4', maxCount: 1 },
]), recruitmentController.patchRecruitment);
router.patch('/recruitment_page/visibility', authenticateToken, recruitmentController.updateVisibility);
export default router;