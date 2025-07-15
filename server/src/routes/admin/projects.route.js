import express from 'express'
import projectsController from '#@/controllers/projects.controller.js';

const router = express.Router();

// get
router.get('/', projectsController.getAllTables);
router.get('/project_page', projectsController.getProjectPage);
router.get('/projects', projectsController.projects.getList);
router.get('/projects/get_by_region', projectsController.projects.getListByRegion);
router.get('/projects/:id', projectsController.projects.getOne);
router.get('/project_regions', projectsController.project_regions.getAll);
router.get('/project_regions/:id', projectsController.project_regions.getOne);
router.get('/project_contents', projectsController.project_contents.getAll);
router.get('/project_contents/:id', projectsController.project_contents.getOne);

router.get('/highlight_projects', projectsController.getHighlightProjects);
router.get('/search_categories_suggestions', projectsController.getSearchCategoriesSuggestions);
router.get('/search_suggestions', projectsController.getSearchSuggestions);

router.get('/count', projectsController.count);

// post
router.post('/project_regions', projectsController.project_regions.createOne);

// patch
router.patch('/project_regions/:id', projectsController.project_regions.updateOne);
router.patch('/projects/:id', projectsController.projects.updateFeatureOne);
router.patch('/projects/update_region', projectsController.projects.updateRegion);

// delete
router.delete('/projects/:id', projectsController.projects.deleteOne);
router.delete('/project_regions/:id', projectsController.project_regions.deleteOne);

export default router;