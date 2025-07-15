import projectsServices from "#@/services/projects.services.js";

const getAllTables = async (req, res) => {
    const data = await projectsServices.getAllTables();
    res.status(200).json(data);
}

const getProjectPage = async (req, res) => {
    const data = await projectsServices.getProjectPage();
    res.status(200).json(data);
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
    updateFeatureOne: async (req, res) => {
        const id = req.params.id;
        const {is_featured} = req.body;
        try {
            await projectsServices.projects.updateFeatureOne(is_featured, id);
            res.status(200).json({message: 'Update sucess'});
        } catch (error) {
            console.log('Error', error);
            res.status(500).json({message: 'Loi may chu'});
        }
    },
    deleteOne: async (req, res) => {
        const id = parseInt(req.params.id);
        try {
            const result = await projectsServices.projects.deleteOne(id);
            if (result.rowCount == 0) {
                return res.status(404).json({message: 'Không tìm thấy sản phẩm'});
            }
            return res.status(200).json({message: result});
        } catch (error) {
            console.log('Lỗi máy chủ', error);
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
    createOne: async(req, res) => {
        try {
            await projectsServices.project_regions.createOne(req.body);
            res.status(200).json({message: 'Thêm dự án thành công'});
        } catch (error) {
            console.log('Error: ', error);
            res.status(500).json({message: 'Lỗi máy chủ nội bộ'});
        }
    },
    updateOne: async(req, res) => {
        const id = parseInt(req.params.id);
        try {
            await projectsServices.project_regions.updateOne(req.body, id); 
            res.status(200).json({message: 'Cập nhật thông tin vùng thành công'});
        } catch (error) {
            console.log('Error:', error);
            res.status(500).json({message: 'Lỗi máy chủ nội bộ'});
        }
    },
    deleteOne: async(req, res) => {
        const id = parseInt(req.params.id);
        try {
            const result = await projectsServices.project_regions.deleteOne(id);
            if (result.rowCount == 0) {
                return res.status(404).json({message: 'Không tìm thấy sản phẩm'});
            }
            return res.status(200).json(result);
        } catch (error) {
            console.log('Error: ', error);
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
    },
    postOne: async(req, res) => {
        await projectsServices.project_contents.postOne(req.body, req.files);
        res.status(200).json("Tạo dự án mới thành công");
    },
    updateOne: async(req, res) => {
        const {id} = req.params;
        await projectsServices.project_contents.updateOne(id, req.body, req.files)
        res.status(200).json("Chỉnh sửa dự án thành công");
    }
}

const getHighlightProjects = async (req, res) => {
    const data = await projectsServices.getHighlightProjects();
    res.status(200).json(data);
}

const getSearchSuggestions = async (req, res) => {
    const query = req.query.query || '';
    const filter = req.query.filter || '';
    const is_featured = req.query.is_featured;

    const data = await projectsServices.getSearchSuggestions(query, filter, is_featured);
    res.status(200).json(data);
}

const getSearchCategoriesSuggestions = async (req, res) => {
    const query = req.query.query || '';
    const data = await projectsServices.getSearchCategoriesSuggestions(query);
    res.status(200).json(data);
}

const count = async (req, res) => {
    const data = await projectsServices.count();
    res.status(200).json(data);
}

export default { getAllTables, getProjectPage, projects, project_regions, project_contents, getHighlightProjects, getSearchSuggestions, getSearchCategoriesSuggestions, count};