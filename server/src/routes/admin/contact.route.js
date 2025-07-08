import express from 'express'
import contactController from '#@/controllers/contact.controller.js';
import validateForm from '#@/middlewares/validateForm.middleware.js';

const router = express.Router();

router.get('/', contactController.getAllTables);
router.get('/contact_page', contactController.getContactPage);
router.get('/company_info', contactController.getCompanyInfo);
router.get('/support_agents', contactController.support_agents.getAll);
router.get('/support_agents/:id', contactController.support_agents.getOne);
router.post('/contact_messages', validateForm.validateContact, contactController.postContactMessage);
export default router;