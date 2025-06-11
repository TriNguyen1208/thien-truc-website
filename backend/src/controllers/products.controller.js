import productServices from "#@/services/products.services.js";

const getAll = async (req, res) => {
    const product = await productServices.getAll();
    res.status(200).json(product);
}
const getId = async (req, res) => {
    const id = req.params.id;
    const product = await productServices.getId(id);
    res.status(200).json(product);
}
export default { getAll, getId };