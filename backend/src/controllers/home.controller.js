import homeServices from "#@/services/home.services.js";

const getAll = async (req, res) => {
    const home = await homeServices.getAll();
    res.status(200).json(home);
}
export default { getAll };