import aboutUsServices from "#@/services/aboutus.services.js";

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
            const { status, message } = await aboutUsServices.updateAboutUsPage.banner(req.body);
            res.status(status).json({ message: message });
        } catch (error) {
            console.log('Lỗi cập nhật Banner Trang Về Chúng Tôi: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ '});
        }
    },
    ourStory: async (req, res) => {
        try {
            const { status, message } = await aboutUsServices.updateAboutUsPage.ourStory(req.body);
            res.status(status).json({ message: message });
        } catch (error) {
            console.log('Lỗi cập nhật Banner Trang Về Chúng Tôi: ', error);
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
            const { status, message } = await aboutUsServices.company_services.createOne(req.body);
            res.status(status).json({ message: message });
        } catch (error) {
            console.log('Lỗi tạo Nhiệm Vụ Và Trách Nhiệm: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ '});
        }
    },
    updateOne: async (req, res) => {
        const id = req.params.id;
        try {
            const { status, message } = await aboutUsServices.company_services.updateOne(req.body, id);
            res.status(status).json({ message: message });
        } catch (error) {
            console.log('Lỗi cập nhật Nhiệm Vụ Và Trách Nhiệm: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ '});
        }
    },
    deleteOne: async (req, res) => {
        const id = req.params.id;
        try {
            const { status, message } = await aboutUsServices.company_services.deleteOne(id);
            res.status(status).json({ message: message });
        } catch (error) {
            console.log('Lỗi xóa Nhiệm Vụ Và Trách Nhiệm: ', error);
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
            const { status, message } = await aboutUsServices.why_choose_us.createOne(req.body);
            res.status(status).json({ message: message });
        } catch (error) {
            console.log('Lỗi tạo Tại Sao Chọn Thiên Trúc: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ '});
        }
    },
    updateOne: async (req, res) => {
        const id = req.params.id;
        try {
            const { status, message } = await aboutUsServices.why_choose_us.updateOne(req.body, id);
            res.status(status).json({ message: message });
        } catch (error) {
            console.log('Lỗi cập nhật Tại Sao Chọn Thiên Trúc: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ '});
        }
    },
    deleteOne: async (req, res) => {
        const id = req.params.id;
        try {
            const { status, message } = await aboutUsServices.why_choose_us.deleteOne(id);
            res.status(status).json({ message: message });
        } catch (error) {
            console.log('Lỗi xóa Tại Sao Chọn Thiên Trúc: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ '});
        }
    }
}

export default { getAllTables, getAboutUsPage, updateAboutUsPage, company_services, why_choose_us };