import express from 'express'
import projectsController from '#@/controllers/projects.controller.js';

const router = express.Router();

router.get('/', projectsController.getAllTables);
router.get('/project_page', projectsController.getProjectPage);
router.get('/projects', projectsController.projects.getAll);
router.get('/projects/:id', projectsController.projects.getById);
router.get('/project_regions', projectsController.project_regions.getAll);
router.get('/project_regions/:id', projectsController.project_regions.getById);
export default router;