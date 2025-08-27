import productServices from "#@/services/products.services.js";
import activityLogServices from "#@/services/activity-log.services.js";
const { logActivity } = activityLogServices;

const getAllTables = async (req, res) => {
    const data = await productServices.getAllTables();
    res.status(200).json(data);
}

const getProductPage = async (req, res) => {
    const data = await productServices.getProductPage();
    res.status(200).json(data);
}

const updateProductPage = async (req, res) => {
    try {
        const { status, message, action = null } = await productServices.updateProductPage(req.body);
        if (status == 200) logActivity(req.user.username, action);
        return res.status(status).json({ message });
    } catch (error) {
        console.error('Lỗi cập nhật trang sản phẩm: ', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
    }
}
const updateProductVisibility = async(req, res) => {
    try{
        const {status, message, action = null} = await productServices.updateProductVisibility(req.body);
        if(status == 200) logActivity(req.user.username, action);
        res.status(status).json({message: message});
    }catch(error){
        console.error('Lỗi chế độ hiển thị trang sản phẩm: ', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ '});
    }
}
const updatePriceVisibility = async(req, res) => {
    try{
        const {status, message, action = null} = await productServices.updatePriceVisibility(req.body);
        if(status == 200) logActivity(req.user.username, action);
        res.status(status).json({message: message});
    }catch(error){
        console.error('Lỗi chế độ hiển thị trang bảng giá: ', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ '});
    }
}
const products = {
    getList: async (req, res) => {
        const {query ='', filter = '', page, is_featured, limit} = req.query;
        const data = await productServices.products.getList(query, filter, parseInt(page), is_featured, parseInt(limit));
        res.status(200).json(data);
    },
    getListByCategory: async (req, res) => {
        const {id = '', query ='', filter = '', is_featured, limit} = req.query;
        const data = await productServices.products.getListByCategory(id, query, filter, is_featured, parseInt(limit));
        res.status(200).json(data);
    },
    getOne: async (req, res) => {
        const id = req.params.id
        const data = await productServices.products.getOne(id);
        res.status(200).json(data);
    },
    updateFeatureOne: async (req, res) => {
        const { id, status: product_status } = req.params;
        try {
            const { status, message, action = null } = await productServices.products.updateFeatureOne(id, product_status);
            if (status == 200) logActivity(req.user.username, action);
            return res.status(status).json({ message });
        } catch (error) {
            console.error('Lỗi cập nhật sản phẩm: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    },
    updateCategory: async (req, res) => {
        const { changedItems } = req.body;
        try {
            const { status, message, action = null } = await productServices.products.updateCategory(changedItems);
            if (status == 200) logActivity(req.user.username, action);
            return res.status(status).json({ message });
        } catch (error) {
            console.error('Lỗi cập nhật loại sản phẩm: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    },
    createOne: async (req, res) => {
        try {
            const { status, message, action = null, id } = await productServices.products.createOne(req.body, req.file);
            if (status == 200) logActivity(req.user.username, action);
            return res.status(status).json({ message, id });
        } catch (error) {
            console.error('Lỗi tạo sản phẩm: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    },
    updateOne: async (req, res) => {
        const id = req.params.id;
        try {
            const { status, message, action = null } = await productServices.products.updateOne(req.body, req.file, id);
            if (status == 200) logActivity(req.user.username, action);
            return res.status(status).json({ message });
        } catch (error) {
            console.error('Lỗi cập nhật sản phẩm: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    },
    deleteOne: async (req, res) => {
        const id = req.params.id;
        try {
            const { status, message, action = null } = await productServices.products.deleteOne(id);
            if (status == 200) logActivity(req.user.username, action);
            return res.status(status).json({ message });
        } catch (error) {
            console.error('Lỗi xóa sản phẩm: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    }
}

const product_categories = {
    getList: async (req, res) => {
        const { id = '', query ='' } = req.query;
        const data = await productServices.product_categories.getList(id, query);
        res.status(200).json(data);
    },
    getOne: async (req, res) => {
        const id = req.params.id
        const data = await productServices.product_categories.getOne(id);
        res.status(200).json(data);
    },
    getAllFeatured: async (req, res) => {
        const data = await productServices.product_categories.getAllFeatured();
        res.status(200).json(data);
    },
    createOne: async (req, res) => { 
        try {
            const { status, message, action = null } = await productServices.product_categories.createOne(req.body);
            if (status == 200) logActivity(req.user.username, action);
            return res.status(status).json({ message });
        } catch (error) {
            console.error('Lỗi tạo loại sản phẩm: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    },
    updateOne: async (req, res) => {
        const id = req.params.id;
        try {
            const { status, message, action = null } = await productServices.product_categories.updateOne(req.body, id);
            if (status == 200) logActivity(req.user.username, action);
            return res.status(status).json({ message });
        } catch (error) {
            console.error('Lỗi cập nhật loại sản phẩm: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    },
    deleteOne: async (req, res) => {
        const id = req.params.id;
        try {
            const { status, message, action = null } = await productServices.product_categories.deleteOne(id);
            if (status == 200) logActivity(req.user.username, action);
            return res.status(status).json({ message });
        } catch (error) {
            console.error('Lỗi xóa loại sản phẩm: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    }
}

const getPricePage = async (req, res) => {
    const data = await productServices.getPricePage();
    res.status(200).json(data);
}

const updatePricePage = async (req, res) => { // <------------------
    try {
        const { status, message, action = null } = await productServices.updatePricePage(req.body);
            if (status == 200) logActivity(req.user.username, action);
            return res.status(status).json({ message });
    } catch (error) {
        console.error('Lỗi cập nhật trang bảng giá: ', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
    }
}

const product_prices = {
    getAll: async (req, res) => {
        const {query ='', filter = ''} = req.query;
        const data = await productServices.product_prices.getAll(query, filter);
        res.status(200).json(data);
    },
    getOne: async (req, res) => {
        const product_id = req.params.product_id
        const data = await productServices.product_prices.getOne(product_id);
        res.status(200).json(data);
    }
}

const getHighlightProducts = async (req, res) => {
    const data = await productServices.getHighlightProducts();
    res.status(200).json(data);
}

const getSearchSuggestions = async (req, res) => {
    const query = req.query.query || '';
    const filter = req.query.filter || '';
    const is_featured = req.query.is_featured;

    const data = await productServices.getSearchSuggestions(query, filter, is_featured);
    res.status(200).json(data);
}

const getSearchCategoriesSuggestions = async (req, res) => {
    const query = req.query.query || '';
    const id = req.query.id || '';

    const data = await productServices.getSearchCategoriesSuggestions(id, query);
    res.status(200).json(data);
}

const count = async (req, res) => {
    const data = await productServices.count();
    res.status(200).json(data);
}

export default { getAllTables, getProductPage, updateProductPage, products, product_categories, getPricePage, updatePricePage, product_prices, getHighlightProducts, getSearchSuggestions, getSearchCategoriesSuggestions, count, updateProductVisibility, updatePriceVisibility };