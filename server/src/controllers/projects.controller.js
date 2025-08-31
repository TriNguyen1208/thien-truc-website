import projectsServices from "#@/services/projects.services.js";
import activityLogServices from "#@/services/activity-log.services.js";
const { logActivity } = activityLogServices;

const getAllTables = async (req, res) => {
    const data = await projectsServices.getAllTables();
    res.status(200).json(data);
}

const getProjectPage = async (req, res) => {
    const data = await projectsServices.getProjectPage();
    res.status(200).json(data);
}

const updateProjectPage = {
    banner: async (req, res) => {
        try {
            const { status, message, action = null } = await projectsServices.updateProjectPage.banner(req.body);
            if (status == 200) logActivity(req.user.username, action);
            return res.status(status).json({ message });
        } catch (error) {
            console.error('Lỗi cập nhật trang Dự án: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    },
    visibility: async (req, res) => {
        try{
            const {status, message, action = null} = await projectsServices.updateProjectPage.visibility(req.body);
            if(status == 200) logActivity(req.user.username, action);
            res.status(status).json({message: message});
        }catch(error){
            console.error('Lỗi chế độ hiển thị trang Dự án: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ '});
        }
    }
}
const projects = {
    getList: async (req, res) => {
        const { query = '', filter = '', page, is_featured, limit } = req.query;
        const data = await projectsServices.projects.getList(query, filter, parseInt(page), is_featured, parseInt(limit));
        res.status(200).json(data);
    },
    getListByRegion: async (req, res) => {
        const { query = '', filter = '', is_featured, limit } = req.query;
        const data = await projectsServices.projects.getListByRegion(query, filter, is_featured, parseInt(limit));
        res.status(200).json(data);
    },
    getOne: async (req, res) => {
        const id = req.params.id;
        const data = await projectsServices.projects.getOne(id);
        res.status(200).json(data);
    },
    getSearchSuggestions: async (req, res) => {
        const query = req.query.query || '';
        const filter = req.query.filter || '';
        const is_featured = req.query.is_featured;

        const data = await projectsServices.projects.getSearchSuggestions(query, filter, is_featured);
        res.status(200).json(data);
    }, 
    createOne: async(req, res) => {
        try {
            const { status, message, action = null, id } = await projectsServices.projects.createOne(req.body, req.files);
            if (status == 200) logActivity(req.user.username, action);
            return res.status(status).json({ message, id });
        } catch (error) {
            console.error('Lỗi tạo dự án: ', error);
            return res.status(500).json({message: 'Lỗi máy chủ'});
        }        
    },
    updateOne: async(req, res) => {
        try {
            const { id } = req.params;
            const { status, message, action = null } = await projectsServices.projects.updateOne(id, req.body, req.files)
            if (status == 200) logActivity(req.user.username, action);
            return res.status(status).json({ message });
        } catch (error) {
            console.error('Lỗi cập nhật dự án: ', error);
            return res.status(500).json({message: 'Lỗi máy chủ'});
        }
    },
    updateFeatureOne: async (req, res) => {
        try {
            const { id, status: project_status } = req.params;
            const { status, message, action = null } = await projectsServices.projects.updateFeatureOne(id, project_status);
            if (status == 200) logActivity(req.user.username, action);
            return res.status(status).json({ message });
        } catch (error) {
            console.error('Lỗi cập nhật dự án: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    },
    updateRegion: async (req, res) => {
        try {
            const { changedItems } = req.body; 
            const { status, message, action = null } = await projectsServices.projects.updateRegion(changedItems);
            if (status == 200) logActivity(req.user.username, action);
            return res.status(status).json({ message });
        } catch (error) {
            console.error('Lỗi gán khu vực dự án: ', error);
            res.status(500).json({message: 'Lỗi máy chủ nội bộ'});
        }
    }, 
    deleteOne: async (req, res) => {
        try {
            const id = req.params.id;
            const { status, message, action = null } = await projectsServices.projects.deleteOne(id);
            if (status == 200) logActivity(req.user.username, action);
            return res.status(status).json({ message });
        } catch (error) {
            console.error('Lỗi xóa dự án: ', error);
            return res.status(500).json({message: 'Lỗi máy chủ'});
        }
    }
}

const project_regions = {
    getAll: async (req, res) => {
        const data = await projectsServices.project_regions.getAll();
        res.status(200).json(data);
    },
    getOne: async (req, res) => {
        const id = req.params.id;
        const data = await projectsServices.project_regions.getOne(id);
        res.status(200).json(data);
    },
    getAllFeatured: async (req, res) => {
        const data = await projectsServices.project_regions.getAllFeatured();
        res.status(200).json(data);
    },
    getSearchSuggestions: async (req, res) => {
        const query = req.query.query || '';
        const data = await projectsServices.project_regions.getSearchSuggestions(query);
        res.status(200).json(data);
    },
    createOne: async(req, res) => {
        try {
            const { status, message, action = null } = await projectsServices.project_regions.createOne(req.body);
            if (status == 200) logActivity(req.user.username, action);
            return res.status(status).json({ message });
        } catch (error) {
            console.error('Lỗi tạo khu vực dự án: ', error);
            res.status(500).json({message: 'Lỗi máy chủ nội bộ'});
        }
    },
    updateOne: async(req, res) => {
        try {
            const id = req.params.id;
            const { status, message, action = null } = await projectsServices.project_regions.updateOne(req.body, id); 
            if (status == 200) logActivity(req.user.username, action);
            return res.status(status).json({ message });
        } catch (error) {
            console.error('Lỗi cập nhật khu vực dự án: ', error);
            res.status(500).json({message: 'Lỗi máy chủ nội bộ'});
        }
    },
    deleteOne: async(req, res) => {
        try {
            const id = req.params.id;
            const { status, message, action = null } = await projectsServices.project_regions.deleteOne(id);
            if (status == 200) logActivity(req.user.username, action);
            return res.status(status).json({ message });
        } catch (error) {
            console.error('Lỗi xóa khu vực dự án: ', error);
            return res.status(500).json({message: 'Lỗi máy chủ'});
        }
    }
}

const project_contents = {
    getAll: async(req, res) => {
        const data = await projectsServices.project_contents.getAll();
        res.status(200).json(data);
    },
    getOne: async(req, res) => {
        const id = req.params.id;
        const data = await projectsServices.project_contents.getOne(id);
        res.status(200).json(data);
    }
}

const getHighlightProjects = async (req, res) => {
    const data = await projectsServices.getHighlightProjects();
    res.status(200).json(data);
}

const count = async (req, res) => {
    const data = await projectsServices.count();
    res.status(200).json(data);
}

export default { getAllTables, getProjectPage, updateProjectPage, projects, project_regions, project_contents, getHighlightProjects, count};