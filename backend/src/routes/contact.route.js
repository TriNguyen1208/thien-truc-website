import express from 'express'
import contactController from '#@/controllers/contact.controller.js';

const router = express.Router();

router.get('/', contactController.getAllTables);
router.get('/contact_page', contactController.getContactPage);
router.get('/company_info', contactController.getCompanyInfo);
router.get('/support_agents', contactController.support_agents.getAll);
router.get('/support_agents/:id', contactController.support_agents.getById);
export default router;