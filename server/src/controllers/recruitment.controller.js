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

const submitApplication = async (req, res) => {
  try {
    await recruitmentServices.submitApplication(req.body);
    res.status(200).json({ success: true, message: "Ứng tuyển thành công" });
  } catch (error) {
    console.error('Lỗi gửi đơn tuyển dụng: ', error);
    res.status(500).json({ success: false, message: "Gửi đơn ứng tuyển thất bại", error: error.message });
  }
};

const updateRecruitmentPage = {
  banner: async (req, res) => {
    try {
      const { status, message, action = null } = await recruitmentServices.updateRecruitmentPage.banner(req.body);
      if (status == 200) logActivity(req.user.username, action);
      res.status(status).json({ success: true, message });
    } catch (error) {
      console.error('Lỗi cập nhật Banner trang Tuyển dụng: ', error);
      res.status(500).json({ success: false, message: "Cập nhật thất bại", error: error.message });
    }
  },
  visibility: async (req, res) => {
    try {
      const { status, message, action = null } = await recruitmentServices.updateRecruitmentPage.visibility(req.body);
      if (status == 200) logActivity(req.user.username, action);
      res.status(status).json({ success: true, message });
    } catch (error) {
      console.error('Lỗi cập nhật hiển thị trang Tuyển dụng: ', error);
      res.status(500).json({ success: false, message: "Cập nhật thất bại", error: error.message });
    }
  },
  culture: async (req, res) => {
    try {
      const { status, message, action = null } = await recruitmentServices.updateRecruitmentPage.culture(req.body);
      if (status == 200) logActivity(req.user.username, action);
      res.status(status).json({ success: true, message });
    } catch (error) {
      console.error('Lỗi cập nhật Văn hóa của chúng tôi trang Tuyển dụng: ', error);
      res.status(500).json({ success: false, message: "Cập nhật thất bại", error: error.message });
    }
  },
  culture_images: async (req, res) => {
    try {
      const { status, message, action = null } = await recruitmentServices.updateRecruitmentPage.culture_images(req.body, req.files);
      if (status == 200) logActivity(req.user.username, action);
      res.status(status).json({ success: true, message });
    } catch (error) {
      console.error('Lỗi cập nhật Ảnh Văn hóa của chúng tôi trang Tuyển dụng: ', error);
      res.status(500).json({ success: false, message: "Cập nhật thất bại", error: error.message });
    }
  },
}

export default { getAllTables, getRecruitmentPage, submitApplication, updateRecruitmentPage};