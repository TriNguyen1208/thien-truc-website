import express from 'express'
import homeController from '#@/controllers/home.controller.js';

const router = express.Router();

router.get('/home_page', homeController.getHomePage);

export default router;