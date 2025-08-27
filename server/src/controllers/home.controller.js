import homeServices from "#@/services/home.services.js";
import activityLogServices from "#@/services/activity-log.services.js";
const { logActivity } = activityLogServices;

const getAllTables = async (req, res) => {
    const data = await homeServices.getAllTables();
    res.status(200).json(data);
}

const getHomePage = async(req, res) => {
    const data = await homeServices.getHomePage();
    res.status(200).json(data);
}

const updateHomePage = {
    banner: async(req, res) => {
        try {
            const { status, message, action = null } = await homeServices.updateHomePage.banner(req.body);
            if (status == 200) logActivity(req.user.username, action);
            return res.status(status).json({ message });
        } catch (error) {
            console.error('Lỗi cập nhật banner Trang Chủ: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    }, 
    bannerImages: async(req, res) => {
        try {
            const { status, message, action = null } = await homeServices.updateHomePage.bannerImages(req.body, req.files);
            if (status == 200) logActivity(req.user.username, action);
            return res.status(status).json({ message });
        } catch (error) {
            console.error('Lỗi cập nhật ảnh banner Trang Chủ: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    },
    aboutUs: async(req, res) => {
        try {
            const { status, message, action = null } = await homeServices.updateHomePage.aboutUs(req.body);
            if (status == 200) logActivity(req.user.username, action);
            return res.status(status).json({ message });
        } catch (error) {
            console.error('Lỗi cập nhật nội dung Về Chúng Tôi của Trang Chủ: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    },
    imageAboutUs: async(req, res) => {
        try {
            const { status, message, action = null } = await homeServices.updateHomePage.imageAboutUs(req.body, req.file);
            if (status == 200) logActivity(req.user.username, action);
            return res.status(status).json({ message });
        } catch (error) {
            console.error('Lỗi cập nhật ảnh giới thiệu công ty của Trang Chủ: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    },
    visibility: async(req, res) => {
        try{
            const {status, message, action = null} = await homeServices.updateHomePage.visibility(req.body);
            if(status == 200) logActivity(req.user.username, action);
            res.status(status).json({message: message});
        }catch(error){
            console.error('Lỗi chế độ hiển thị trang chủ: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ '});
        }
    }
}

const highlight_stats_about_us = {
    getAll: async (req, res) => {
        const data = await homeServices.highlight_stats_about_us.getAll();
        res.status(200).json(data);
    },
    getOne: async (req, res) => { 
        const id = req.params.id;
        const data = await homeServices.highlight_stats_about_us.getOne(id);
        res.status(200).json(data);
    },
    createOne: async (req, res) => {
        try {
            const { status, message, action = null } = await homeServices.highlight_stats_about_us.createOne (req.body);
            if (status == 200) logActivity(req.user.username, action);
            return res.status(status).json({ message });
        } catch (error) {
            console.error('Lỗi tạo Thông Số Nổi Bật của Trang Chủ: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ '});
        }
    },
    updateOne: async (req, res) => {
        const id = req.params.id;
        try {
            const { status, message,action = null } = await homeServices.highlight_stats_about_us.updateOne(req.body, id);
            if (status == 200) logActivity(req.user.username, action);
            return res.status(status).json({ message });
        } catch (error) {
            console.error('Lỗi cập nhật Thông Số Nổi Bật của Trang Chủ: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ '});
        }
    },
    deleteOne: async (req, res) => {
        const id = req.params.id;
        try {
            const { status, message, action = null } = await homeServices.highlight_stats_about_us.deleteOne(id);
            if (status == 200) logActivity(req.user.username, action);
            return res.status(status).json({ message });
        } catch (error) {
            console.error('Lỗi xóa Thông Số Nổi Bật của Trang Chủ: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ '});
        }
    },
}
export default { getAllTables, getHomePage, updateHomePage, highlight_stats_about_us };