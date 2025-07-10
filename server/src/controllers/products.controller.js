import productServices from "#@/services/products.services.js";

const getAllTables = async (req, res) => {
    const data = await productServices.getAllTables();
    res.status(200).json(data);
}

const getProductPage = async (req, res) => {
    const data = await productServices.getProductPage();
    res.status(200).json(data);
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
    deleteOne: async (req, res) => {
        const id = parseInt(req.params.id);
        try {
            const result = await productServices.products.deleteOne(id);
            if (result.rowCount == 0) {
                return res.status(404).json({ message: 'Product not found'});
            }
            return res.status(200).json({ message: result}); //'Product deleted successfully' });
        } catch (error) {
            console.error('Delete product error:', error);
            res.status(500).json({ message: 'Internal server error'});
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
    deleteOne: async (req, res) => {
        const id = req.params.id;
        try {
            const result = await productServices.product_categories.deleteOne(id);
            if (result.rowCount == 0) {
                return res.status(404).json({ message: 'Product categories not found'});
            }
            return res.status(200).json({ message: 'Product categories deleted successfully' });
        } catch (error) {
            console.error('Delete product categories error:', error);
            res.status(500).json({ message: 'Internal server error'});
        }
    }
}

const getPricePage = async (req, res) => {
    const data = await productServices.getPricePage();
    res.status(200).json(data);
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

    const data = await productServices.getSearchSuggestions(query, filter);
    res.status(200).json(data);
}

const count = async (req, res) => {
    const data = await productServices.count();
    res.status(200).json(data);
}

export default { getAllTables, getProductPage, products, product_categories, getPricePage, product_prices, getHighlightProducts, getSearchSuggestions, count };