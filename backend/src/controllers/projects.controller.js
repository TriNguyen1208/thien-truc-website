import projectsServices from "#@/services/projects.services.js";

const getAll = async (req, res) => {
    const projects = await projectsServices.getAll();
    res.status(200).json(projects);
}
const getId = async (req, res) => {
    const id = req.params.id;
    const project = await projectsServices.getId(id);
    res.status(200).json(project);
}
export default { getAll, getId };