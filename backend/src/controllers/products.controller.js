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
    getAll: async (req, res) => {
        const data = await productServices.products.getAll();
        res.status(200).json(data);
    },
    getOne: async (req, res) => {
        const id = req.params.id
        const data = await productServices.products.getOne(id);
        res.status(200).json(data);
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
    }
}

const product_features = {
    getAll: async (req, res) => {
        const data = await productServices.product_features.getAll();
        res.status(200).json(data);
    },
    getByProductId: async (req, res) => {
        const product_id = req.params.product_id
        const data = await productServices.product_features.getByProductId(product_id);
        res.status(200).json(data);
    },
    getOne: async (req, res) => {
        const product_id = req.params.product_id
        const feature_id = req.params.feature_id
        const data = await productServices.product_features.getOne(product_id, feature_id);
        res.status(200).json(data);
    }
}

const product_highlight_features = {
    getAll: async (req, res) => {
        const data = await productServices.product_highlight_features.getAll();
        res.status(200).json(data);
    },
    getByProductId: async (req, res) => {
        const product_id = req.params.product_id
        const data = await productServices.product_highlight_features.getByProductId(product_id);
        res.status(200).json(data);
    },
    getOne: async (req, res) => {
        const product_id = req.params.product_id
        const feature_id = req.params.feature_id
        const data = await productServices.product_highlight_features.getOne(product_id, feature_id);
        res.status(200).json(data);
    }
}

const getPricePage = async (req, res) => {
    const data = await productServices.getPricePage();
    res.status(200).json(data);
}

const product_prices = {
    getAll: async (req, res) => {
        const data = await productServices.product_prices.getAll();
        res.status(200).json(data);
    },
    getOne: async (req, res) => {
        const product_id = req.params.product_id
        const data = await productServices.product_prices.getOne(product_id);
        res.status(200).json(data);
    }
}

const getSearchSuggestions = async (req, res) => {
    const query = req.query.query || '';
    const filter = req.query.filter || '';

    const data = await productServices.getSearchSuggestions(query, filter);
    res.status(200).json(data);
}

export default { getAllTables, getProductPage, products, product_categories, product_features, product_highlight_features, getPricePage, product_prices, getSearchSuggestions };