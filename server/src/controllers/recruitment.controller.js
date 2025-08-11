import recruitmentServices from "#@/services/recruitment.services.js";
import activityLogServices from "#@/services/activity-log.services.js";
const { logActivity } = activityLogServices;

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
    const { status, message, action = null } = await recruitmentServices.patchRecruitment(req.body, req.files);
    if (status == 200) logActivity(req.user.username, action);
    res.status(status).json({ success: true, message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Cập nhật thất bại", error: error.message });
  }
}

const updateVisibility = async (req, res) => {
  try {
    const { status, message, action } = await recruitmentServices.updateVisibility(req.body);
    if (status == 200) logActivity(req.user.username, action);
    return res.status(status).json({ message });
  } catch (error) {
      console.error('Lỗi cập nhật trang tuyển dụng: ', error);
      res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
  }
}
export default { getAllTables, getRecruitmentPage, postSubmitApplication, patchRecruitment, updateVisibility};