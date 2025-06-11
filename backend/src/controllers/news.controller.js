import newsServices from "#@/services/news.services.js";

const getAll = async (req, res) => {
    const news = await newsServices.getAll();
    res.status(200).json(news);
}
const getId = async (req, res) => {
    const id = req.params.id;
    const news = await newsServices.getId(id);
    res.status(200).json(news);
}
export default { getAll, getId };