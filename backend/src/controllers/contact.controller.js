import contactServices from "#@/services/contact.services.js";

const getAll = async (req, res) => {
    const contact = await contactServices.getAll();
    res.status(200).json(contact);
}
export default { getAll };