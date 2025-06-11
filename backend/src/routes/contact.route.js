import express from 'express'
import contactController from '#@/controllers/contact.controller.js';

const router = express.Router();

router.get('/', contactController.getAll);
export default router;