import adminServices from "#@/services/admin.services.js";

const count = async(req, res) => {
    const data = await adminServices.count();
    res.status(200).json(data);
}

export default { count };