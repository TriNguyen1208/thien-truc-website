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
    getById: async (req, res) => {
        const id = req.params.id;
        const data = await projectsServices.projects.getById(id);
        res.status(200).json(data);
    }
}

const project_regions = {
    getAll: async (req, res) => {
        const data = await projectsServices.project_regions.getAll();
        res.status(200).json(data);
    },
    getById: async (req, res) => {
        const id = req.params.id;
        const data = await projectsServices.project_regions.getById(id);
        res.status(200).json(data);
    }
}

export default { getAllTables, getProjectPage, projects, project_regions };