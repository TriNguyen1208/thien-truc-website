import express from 'express'
import recruitmentController from '#@/controllers/recruitment.controller.js';

const router = express.Router();

router.get('/', recruitmentController.getAll);
export default router;