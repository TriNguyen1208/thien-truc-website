import projectsServices from "#@/services/projects.services.js";

const getAllTables = async (req, res) => {
    const data = await projectsServices.getAllTables();
    res.status(200).json(data);
}

const getProjectPage = async (req, res) => {
    const data = await projectsServices.getProjectPage();
    res.status(200).json(data);
}

const projects = {
    getList: async (req, res) => {
        const { query = '', filter = '', page, is_featured, limit } = req.query;
        const data = await projectsServices.projects.getList(query, filter, parseInt(page), is_featured, parseInt(limit));
        res.status(200).json(data);
    },
    getListByRegion: async (req, res) => {
        const { query = '', filter = '', is_featured, limit } = req.query;
        const data = await projectsServices.projects.getListByRegion(query, filter, is_featured, parseInt(limit));
        res.status(200).json(data);
    },
    getOne: async (req, res) => {
        const id = req.params.id;
        const data = await projectsServices.projects.getOne(id);
        res.status(200).json(data);
    }
}

const project_regions = {
    getAll: async (req, res) => {
        const data = await projectsServices.project_regions.getAll();
        res.status(200).json(data);
    },
    getOne: async (req, res) => {
        const id = req.params.id;
        const data = await projectsServices.project_regions.getOne(id);
        res.status(200).json(data);
    }
}

const project_contents = {
    getAll: async(req, res) => {
        const data = await projectsServices.project_contents.getAll();
        res.status(200).json(data);
    },
    getOne: async(req, res) => {
        const id = req.params.id;
        const data = await projectsServices.project_contents.getOne(id);
        res.status(200).json(data);
    },
    postOne: async(req, res) => {
        await projectsServices.project_contents.postOne(req.body, req.files);
        res.status(200).json("Tạo dự án mới thành công");
    }
}

const getHighlightProjects = async (req, res) => {
    const data = await projectsServices.getHighlightProjects();
    res.status(200).json(data);
}

const getSearchSuggestions = async (req, res) => {
    const query = req.query.query || '';
    const filter = req.query.filter || '';
    const is_featured = req.query.is_featured;

    const data = await projectsServices.getSearchSuggestions(query, filter, is_featured);
    res.status(200).json(data);
}

const getSearchCategoriesSuggestions = async (req, res) => {
    const query = req.query.query || '';
    const data = await projectsServices.getSearchCategoriesSuggestions(query);
    res.status(200).json(data);
}

const count = async (req, res) => {
    const data = await projectsServices.count();
    res.status(200).json(data);
}

export default { getAllTables, getProjectPage, projects, project_regions, project_contents, getHighlightProjects, getSearchSuggestions, getSearchCategoriesSuggestions, count};