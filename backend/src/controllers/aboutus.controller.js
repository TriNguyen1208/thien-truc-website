import aboutUsServices from "#@/services/aboutus.services.js";

const getAll = async (req, res) => {
    const about_us = await aboutUsServices.getAll();
    res.status(200).json(about_us);
}
export default { getAll };