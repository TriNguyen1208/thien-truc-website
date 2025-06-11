import express from 'express'
import projectsController from '#@/controllers/projects.controller.js';

const router = express.Router();

router.get('/', projectsController.getAll);
router.get('/:id', projectsController.getId);
export default router;