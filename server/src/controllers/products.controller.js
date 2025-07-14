import productServices from "#@/services/products.services.js";

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
        await productServices.updateProductPage(req.body);
        return res.status(200).json({ message: 'Cập nhật trang sản phẩm thành công' });
    } catch (error) {
        console.error('Lỗi cập nhật trang sản phẩm: ', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
    }
}

const products = {
    getList: async (req, res) => {
        const {query ='', filter = '', page, is_featured, limit} = req.query;
        const data = await productServices.products.getList(query, filter, parseInt(page), is_featured, parseInt(limit));
        res.status(200).json(data);
    },
    getListByCategory: async (req, res) => {
        const {query ='', filter = '', is_featured, limit} = req.query;
        const data = await productServices.products.getListByCategory(query, filter, is_featured, parseInt(limit));
        res.status(200).json(data);
    },
    getOne: async (req, res) => {
        const id = req.params.id
        const data = await productServices.products.getOne(id);
        res.status(200).json(data);
    },
    updateFeatureOne: async (req, res) => {
        const { id, status } = req.params;
        try {
            const result = await productServices.products.updateFeatureOne(id, status);
            if (result.rowCount == 0) {
                return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
            }
            return res.status(200).json({ message: 'Cập nhật sản phẩm thành công' });
        } catch (error) {
            console.error('Lỗi cập nhật sản phẩm: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    },
    createOne: async (req, res) => {
        try {
            await productServices.products.createOne(req.body);
            res.status(200).json({ message: 'Tạo sản phẩm thành công'});
        } catch (error) {
            console.error('Lỗi tạo sản phẩm: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    },
    updateOne: async (req, res) => {
        const id = req.params.id;
        try {
            await productServices.products.updateOne(req.body, id);
            res.status(200).json({ message: 'Cập nhật sản phẩm thành công' });
        } catch (error) {
            console.error('Lỗi cập nhật sản phẩm: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    },
    deleteOne: async (req, res) => {
        const id = parseInt(req.params.id);
        try {
            const result = await productServices.products.deleteOne(id);
            if (result.rowCount == 0) {
                return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
            }
            return res.status(200).json({ message: 'Xóa sản phẩm thành công' });
        } catch (error) {
            console.error('Lỗi xóa sản phẩm: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    }
}

const product_categories = {
    getAll: async (req, res) => {
        const data = await productServices.product_categories.getAll();
        res.status(200).json(data);
    },
    getOne: async (req, res) => {
        const id = req.params.id
        const data = await productServices.product_categories.getOne(id);
        res.status(200).json(data);
    },
    createOne: async (req, res) => {
        try {
            await productServices.product_categories.createOne(req.body);
            res.status(200).json({ message: 'Tạo loại sản phẩm thành công'});
        } catch (error) {
            console.error('Lỗi tạo loại sản phẩm: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    },
    updateOne: async (req, res) => {
        const id = req.params.id;
        try {
            await productServices.product_categories.updateOne(req.body, id);
            res.status(200).json({ message: 'Cập nhật loại sản phẩm thành công'});
        } catch (error) {
            console.error('Lỗi cập nhat loại sản phẩm: ', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    },
    deleteOne: async (req, res) => {
        const id = req.params.id;
        try {
            const result = await productServices.product_categories.deleteOne(id);
            if (result.rowCount == 0) {
                return res.status(404).json({ message: 'PKhông tìm thấy loại sản phẩm' });
            }
            return res.status(200).json({ message: 'Xóa loại sản phẩm thành công' });
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

const updatePricePage = async (req, res) => {
    try {
        await productServices.updatePricePage(req.body);
        return res.status(200).json({ message: 'Cập nhật trang bảng giá thành công' });
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

const count = async (req, res) => {
    const data = await productServices.count();
    res.status(200).json(data);
}

export default { getAllTables, getProductPage, updateProductPage, products, product_categories, getPricePage, updatePricePage, product_prices, getHighlightProducts, getSearchSuggestions, count };