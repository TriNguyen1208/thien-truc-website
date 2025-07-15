import express from 'express'
import projectsController from '#@/controllers/projects.controller.js';
import upload from '#@/middlewares/upload.middleware.js'

const router = express.Router();

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

router.post('/project_contents/',  upload.fields([
    { name: 'main_image', maxCount: 1 },
    { name: 'images', maxCount: 20 }])
, projectsController.project_contents.postOne);

// router.patch('/project_contents/',  upload.fields([
//     { name: 'main_image', maxCount: 1 },
//     { name: 'images', maxCount: 20 },
//     { name: 'delete_images', maxCount: 20}
// ])
// , projectsController.project_contents.updateOne);
export default router;