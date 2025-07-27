import express from 'express';
import authController from '#@/controllers/auth.controller.js';
import authUtil from '#@/utils/auth.js'
import authMiddleware from '#@/middlewares/auth.middleware.js';
const { authenticateToken } = authMiddleware;

const router = express.Router();

router.get('/login-result', authenticateToken, authController.getLoginResult);

router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/send-reset-password', authController.sendResetPassword);
router.post('/logout', authController.logout);

router.patch('/update-profile', authenticateToken, authController.updateProfile);
router.patch('/update-password', authenticateToken, authController.updatePassword);
router.patch('/reset-password', authController.resetPassword);

// Test --------------------------------------------------------------

router.get('/hashpass/:password', async (req, res) => {
    const password = req.params.password;
    const hashedPassword = await authUtil.hashPassword(password);
    res.json({hashedPassword});
})

// -------------------------------------------------------------------

export default router;