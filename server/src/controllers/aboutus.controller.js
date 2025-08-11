import aboutUsServices from "#@/services/aboutus.services.js";
import activityLogServices from "#@/services/activity-log.services.js";
const { logActivity } = activityLogServices;

const getAllTables = async (req, res) => {
    const data = await aboutUsServices.getAllTables();
    res.status(200).json(data);
}

const getAboutUsPage = async (req, res) => {
    const data = await aboutUsServices.getAboutUsPage();
    res.status(200).json(data);
}

const updateAboutUsPage = {
    banner: async (req, res) => {
        try {
            const { status, message, action = null } = await aboutUsServices.updateAboutUsPage.banner(req.body);
            if (status == 200) logActivity(req.user.username, action);
            res.status(status).json({ message: message });
        } catch (error) {
            console.error('Lỗi cập nhật Banner Trang Về Chúng Tôi: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ '});
        }
    },
    ourStory: async (req, res) => {
        try {
            const { status, message, action = null } = await aboutUsServices.updateAboutUsPage.ourStory(req.body);
            if (status == 200) logActivity(req.user.username, action);
            res.status(status).json({ message: message });
        } catch (error) {
            console.error('Lỗi cập nhật Banner Trang Về Chúng Tôi: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ '});
        }
    },
    visibility: async (req, res) => {
        try{
            const {status, message, action = null} = await aboutUsServices.updateAboutUsPage.visibility(req.body);
            if(status == 200) logActivity(req.user.username, action);
            res.status(status).json({message: message});
        }catch(error){
            console.error('Lỗi chế độ hiển thị trang về chúng tôi: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ '});
        }
    }
}

const company_services = {
    getAll: async (req, res) => {
        const data = await aboutUsServices.company_services.getAll();
        res.status(200).json(data);
    },
    getOne: async (req, res) => {
        const id = req.params.id;
        const data = await aboutUsServices.company_services.getOne(id);
        res.status(200).json(data);
    },
    createOne: async (req, res) => {
        try {
            const { status, message, action = null } = await aboutUsServices.company_services.createOne(req.body);
            if (status == 200) logActivity(req.user.username, action);
            res.status(status).json({ message: message });
        } catch (error) {
            console.error('Lỗi tạo Nhiệm Vụ Và Trách Nhiệm: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ '});
        }
    },
    updateOne: async (req, res) => {
        const id = req.params.id;
        try {
            const { status, message, action = null } = await aboutUsServices.company_services.updateOne(req.body, id);
            if (status == 200) logActivity(req.user.username, action);
            res.status(status).json({ message: message });
        } catch (error) {
            console.error('Lỗi cập nhật Nhiệm Vụ Và Trách Nhiệm: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ '});
        }
    },
    deleteOne: async (req, res) => {
        const id = req.params.id;
        try {
            const { status, message, action = null } = await aboutUsServices.company_services.deleteOne(id);
            if (status == 200) logActivity(req.user.username, action);
            res.status(status).json({ message: message });
        } catch (error) {
            console.error('Lỗi xóa Nhiệm Vụ Và Trách Nhiệm: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ '});
        }
    }
}

const why_choose_us = {
    getAll: async (req, res) => {
        const data = await aboutUsServices.why_choose_us.getAll();
        res.status(200).json(data);
    },
    getOne: async (req, res) => {
        const id = req.params.id;
        const data = await aboutUsServices.why_choose_us.getOne(id);
        res.status(200).json(data);
    },
    createOne: async (req, res) => {
        try {
            const { status, message, action = null } = await aboutUsServices.why_choose_us.createOne(req.body);
            if (status == 200) logActivity(req.user.username, action);
            res.status(status).json({ message: message });
        } catch (error) {
            console.error('Lỗi tạo Tại Sao Chọn Thiên Trúc: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ '});
        }
    },
    updateOne: async (req, res) => {
        const id = req.params.id;
        try {
            const { status, message, action = null } = await aboutUsServices.why_choose_us.updateOne(req.body, id);
            if (status == 200) logActivity(req.user.username, action);
            res.status(status).json({ message: message });
        } catch (error) {
            console.error('Lỗi cập nhật Tại Sao Chọn Thiên Trúc: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ '});
        }
    },
    deleteOne: async (req, res) => {
        const id = req.params.id;
        try {
            const { status, message, action = null } = await aboutUsServices.why_choose_us.deleteOne(id);
            if (status == 200) logActivity(req.user.username, action);
            res.status(status).json({ message: message });
        } catch (error) {
            console.error('Lỗi xóa Tại Sao Chọn Thiên Trúc: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ '});
        }
    }
}

export default { getAllTables, getAboutUsPage, updateAboutUsPage, company_services, why_choose_us };