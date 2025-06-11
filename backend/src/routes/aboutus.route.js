import express from 'express'
import aboutUsController from '#@/controllers/aboutus.controller.js';

const router = express.Router();

router.get('/', aboutUsController.getAll);
export default router;