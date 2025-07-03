import homeServices from "#@/services/admin/home.services.js";

const getHomePage = async(req, res) => {
    const data = await homeServices.getHomePage();
    res.status(200).json(data);
}
export default {getHomePage}