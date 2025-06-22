import recruitmentServices from "#@/services/recruitment.services.js";

const getAllTables = async (req, res) => {
    const data = await recruitmentServices.getAllTables();
    res.status(200).json(data);
}

const getRecruitmentPage = async (req, res) => {
    const data = await recruitmentServices.getRecruitmentPage();
    res.status(200).json(data);
}

export default { getAllTables, getRecruitmentPage };