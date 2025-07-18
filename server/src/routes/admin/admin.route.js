import express from 'express'
import adminController from '#@/controllers/admin.controller.js';
import authMiddleware from '#@/middlewares/auth.middleware.js';
const { authenticateToken, authorizeAdmin } = authMiddleware;

const router = express.Router();

router.get('/count', authenticateToken, adminController.count);
router.get('/activity_logs', authenticateToken, adminController.activity_logs.getAll);
router.get('/managers', authenticateToken, authorizeAdmin, adminController.manager.getAll);
router.get('/managers/:username', authenticateToken, authorizeAdmin, adminController.manager.getOne);

router.post('/managers', authenticateToken, authorizeAdmin, adminController.manager.createOne);
    
router.patch('/managers/:username', authenticateToken, authorizeAdmin, adminController.manager.updateOne);

router.delete('/managers/:username', authenticateToken, authorizeAdmin, adminController.manager.deleteOne);

export default router;