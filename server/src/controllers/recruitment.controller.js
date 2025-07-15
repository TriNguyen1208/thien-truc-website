import recruitmentServices from "#@/services/recruitment.services.js";

const getAllTables = async (req, res) => {
    const data = await recruitmentServices.getAllTables();
    res.status(200).json(data);
}

const getRecruitmentPage = async (req, res) => {
    const data = await recruitmentServices.getRecruitmentPage();
    res.status(200).json(data);
}

const postSubmitApplication = async (req, res) => {
  try {
    await recruitmentServices.postSubmitApplication(req.body);
    res.status(200).json({ success: true, message: "Ứng tuyển thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Gửi đơn ứng tuyển thất bại", error: error.message });
  }
};

const patchRecruitment = async (req, res) => {
  try {
    await recruitmentServices.patchRecruitment(req.body);
    res.status(200).json({ success: true, message: "Cập nhật thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Cập nhật thất bại", error: error.message });
  }
}
export default { getAllTables, getRecruitmentPage, postSubmitApplication, patchRecruitment};