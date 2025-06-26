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
    getAll: async (req, res) => {
        const data = await projectsServices.projects.getAll();
        res.status(200).json(data);
    },
    getByRegion: async (req, res) => {
        const region = req.params.name;
        const data = await projectsServices.projects.getByRegion(region);
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
    }
}

const getSearchSuggestions = async (req, res) => {
    const query = req.query.query || '';
    const filter = req.query.filter || '';

    const data = await projectsServices.getSearchSuggestions(query, filter);
    res.status(200).json(data);
}
export default { getAllTables, getProjectPage, projects, project_regions, project_contents, getSearchSuggestions};