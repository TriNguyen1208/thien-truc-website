import express from 'express'
import adminController from '#@/controllers/admin.controller.js';

const router = express.Router();

router.get('/count', adminController.count);
router.get('/activity_logs', adminController.activity_logs.getAll)
export default router;