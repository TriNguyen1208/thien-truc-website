import homeServices from "#@/services/home.services.js";

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
            await homeServices.updateHomePage.banner(req.body);
            return res.status(200).json({ message: 'Cập nhật banner Trang Chủ thành công' });
        } catch (error) {
            console.error('Lỗi cập nhật banner Trang Chủ: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    }, 
    aboutUs: async(req, res) => {
        try {
            await homeServices.updateHomePage.aboutUs(req.body);
            return res.status(200).json({ message: 'Cập nhật nội dung Về Chúng Tôi của Trang Chủ thành công' });
        } catch (error) {
            console.error('Lỗi cập nhật nội dung Về Chúng Tôi của Trang Chủ: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    },
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
            const { status, message } = await homeServices.highlight_stats_about_us.createOne (req.body);
            return res.status(status).json({ message: message });
        } catch (error) {
            console.error('Lỗi tạo Thông Số Nổi Bật của Trang Chủ: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ '});
        }
    },
    updateOne: async (req, res) => {
        const id = req.params.id;
        try {
            const { status, message } = await homeServices.highlight_stats_about_us.updateOne(req.body, id);
            return res.status(status).json({ message: message});
        } catch (error) {
            console.error('Lỗi cập nhật Thông Số Nổi Bật của Trang Chủ: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ '});
        }
    },
    deleteOne: async (req, res) => {
        const id = req.params.id;
        try {
            const { status, message } = await homeServices.highlight_stats_about_us.deleteOne(id);
            return res.status(status).json({ message: message });
        } catch (error) {
            console.error('Lỗi xóa Thông Số Nổi Bật của Trang Chủ: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ '});
        }
    },
}
export default { getAllTables, getHomePage, updateHomePage, highlight_stats_about_us };