import express from 'express';
import authController from '#@/controllers/auth.controller.js';
import authUtil from '#@/utils/auth.js'

const router = express.Router();

router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);

// Test --------------------------------------------------------------
import authMiddleware from '#@/middlewares/auth.middleware.js';
const { authenticateToken } = authMiddleware;

router.get('/hashpass/:password', async (req, res) => {
    const password = req.params.password;
    const hashedPassword = await authUtil.hashPassword(password);
    res.json({hashedPassword});
})

router.get('/login-result', authenticateToken, authController.getLoginResult);
// -------------------------------------------------------------------

export default router;