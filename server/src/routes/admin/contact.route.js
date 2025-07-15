import express from 'express'
import contactController from '#@/controllers/contact.controller.js';
import validateForm from '#@/middlewares/validateForm.middleware.js';
import authMiddleware from '#@/middlewares/auth.middleware.js';
const { authenticateToken } = authMiddleware;

const router = express.Router();

router.get('/', contactController.getAllTables);
router.get('/contact_page', contactController.getContactPage);
router.get('/company_info', contactController.getCompanyInfo);
router.get('/support_agents', contactController.support_agents.getAll);
router.get('/support_agents/:id', contactController.support_agents.getOne);
router.get('/count', contactController.count);

router.post('/contact_messages', validateForm.validateContact, contactController.postContactMessage);
router.post('/support_agents', authenticateToken, contactController.support_agents.createOne);

router.patch('/company_info', authenticateToken, contactController.updateCompanyInfo);
router.patch('/support_agents/:id', authenticateToken, contactController.support_agents.updateOne);
router.patch('/contact_page/banner', authenticateToken, contactController.updateContactPage.banner);

router.delete('/support_agents/:id', authenticateToken, contactController.support_agents.deleteOne);
export default router;