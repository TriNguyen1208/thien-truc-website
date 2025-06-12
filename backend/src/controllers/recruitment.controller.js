import recruitmentServices from "#@/services/recruitment.services.js";

const getAll = async (req, res) => {
    const recruitment = await recruitmentServices.getAll();
    res.status(200).json(recruitment);
}
export default { getAll };