import express from 'express'
import projectsController from '#@/controllers/projects.controller.js';

const router = express.Router();

router.get('/', projectsController.getAllTables);
router.get('/project_page', projectsController.getProjectPage);
router.get('/projects', projectsController.projects.getList);
router.get('/projects/:id', projectsController.projects.getOne);
router.get('/project_regions', projectsController.project_regions.getAll);
router.get('/project_regions/:id', projectsController.project_regions.getOne);
router.get('/project_contents', projectsController.project_contents.getAll);
router.get('/project_contents/:id', projectsController.project_contents.getOne);

router.get('/highlight_projects', projectsController.getHighlightProjects);
router.get('/search_suggestions', projectsController.getSearchSuggestions);
router.get('/featured_project_regions', projectsController.project_regions.getAllFeatured);
export default router;