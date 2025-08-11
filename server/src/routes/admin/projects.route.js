import express from 'express'
import projectsController from '#@/controllers/projects.controller.js';
import upload from '#@/middlewares/upload.middleware.js'
import authMiddleware from '#@/middlewares/auth.middleware.js';
const { authenticateToken} = authMiddleware;

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
router.get('/featured_project_regions', projectsController.project_regions.getAllFeatured);

// post
router.post('/project_regions', authenticateToken, projectsController.project_regions.createOne);
router.post('/project_contents/', authenticateToken, upload.fields([
    { name: 'main_image', maxCount: 1 },
    { name: 'images', maxCount: 20 }])
, projectsController.project_contents.postOne);

router.patch('/project_contents/:id', authenticateToken, upload.fields([
    { name: 'main_image', maxCount: 1 },
    { name: 'images', maxCount: 20 },
])
, projectsController.project_contents.updateOne);

// patch
router.patch('/project_page', authenticateToken, projectsController.updateProjectPage);
router.patch('/project_page/visibility', authenticateToken, projectsController.updateVisibility);
router.patch('/project_regions/:id', authenticateToken, projectsController.project_regions.updateOne);
router.patch('/projects/update_regions', authenticateToken, projectsController.projects.updateRegion);
router.patch('/projects/is_featured/:id/:status', authenticateToken, projectsController.projects.updateFeatureOne);
router.patch('/projects/:id', authenticateToken, projectsController.projects.updateFeatureOne);

// delete
router.delete('/projects/:id', authenticateToken, projectsController.projects.deleteOne);
router.delete('/project_regions/:id', authenticateToken, projectsController.project_regions.deleteOne);

export default router;