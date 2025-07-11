import express from 'express'
import adminController from '#@/controllers/admin.controller.js';

const router = express.Router();

router.get('/count', adminController.count);
router.get('/activity_logs', adminController.activity_logs.getAll);
router.get('/managers', adminController.manager.getAll);
router.get('/managers/:username', adminController.manager.getOne);
export default router;