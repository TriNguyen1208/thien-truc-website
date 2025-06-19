import pool from '#@/config/db.js'

const getAllTables = async () => {
    const product_page = await getProductPage();
    const _products = await products.getAll();
    const _product_features = await product_features.getAll();
    const _product_highlight_features = await product_highlight_features.getAll();
    const _product_categories = await product_categories.getAll();
    const price_page = await getPricePage();
    const _product_prices = await product_prices.getAll();
    return {
        ...product_page,
        ..._products,
        ..._product_features,
        ..._product_highlight_features,
        ..._product_categories,
        ...price_page,
        ..._product_prices
    };
}

const getProductPage = async () => {
    const product_page = (await pool.query("SELECT * FROM product.product_page")).rows;
    if(!product_page){
        throw new Error("Can't get product_page");
    }
    return {
        product_page
    };
}

const products = {
    getAll: async () => {
        const products = (await pool.query("SELECT * FROM product.products")).rows;
        if(!products){
            throw new Error("Can't get products");
        }
        return {
            products
        };
    },
    getOne: async (id) => {
        const product = (await pool.query(`SELECT * FROM product.products WHERE id = ${id}`)).rows;
        if(!product){
            throw new Error("Can't get products");
        }
        return {
            product
        };
    }
}

const product_categories = {
    getAll: async () => {
        const product_categories = (await pool.query("SELECT * FROM product.product_categories")).rows;
        if(!product_categories){
            throw new Error("Can't get product_categories");
        }
        return {
            product_categories
        };
    },
    getOne: async (id) => {
        const product_category = (await pool.query(`SELECT * FROM product.product_categories WHERE id = ${id}`)).rows;
        if(!product_category){
            throw new Error("Can't get product_categories");
        }
        return {
            product_category
        };
    }
}

const product_features = {
    getAll: async () => {
        const product_features = (await pool.query("SELECT * FROM product.product_features")).rows;
        if(!product_features){
            throw new Error("Can't get product_features");
        }
        return {
            product_features
        };
    },
    getByProductId: async (product_id) => {
        const product_features = (await pool.query(`SELECT * FROM product.product_features WHERE product_id = ${product_id}`)).rows;
        if(!product_features){
            throw new Error("Can't get product_features");
        }
        return {
            product_features
        };
    },
    getOne: async (product_id, feature_id) => {
        const product_feature = (await pool.query(`SELECT * FROM product.product_features WHERE product_id = ${product_id} AND feature_id = ${feature_id}`)).rows;
        if(!product_feature){
            throw new Error("Can't get product_features");
        }
        return {
            product_feature
        };
    }
}

const product_highlight_features = {
    getAll: async () => {
        const product_highlight_features = (await pool.query("SELECT * FROM product.product_highlight_features")).rows;
        if(!product_highlight_features){
            throw new Error("Can't get product_highlight_features");
        }
        return {
            product_highlight_features
        };
    },
    getByProductId: async (product_id) => {
        const product_highlight_features = (await pool.query(`SELECT * FROM product.product_highlight_features WHERE product_id = ${product_id}`)).rows;
        if(!product_highlight_features){
            throw new Error("Can't get product_highlight_features");
        }
        return {
            product_highlight_features
        };
    },
    getOne: async (product_id, feature_id) => {
        const product_highlight_feature = (await pool.query(`SELECT * FROM product.product_highlight_features WHERE product_id = ${product_id} AND feature_id = ${feature_id}`)).rows;
        if(!product_highlight_feature){
            throw new Error("Can't get product_highlight_features");
        }
        return {
            product_highlight_feature
        };
    }
}

const getPricePage = async () => {
    const price_page = (await pool.query("SELECT * FROM product.price_page")).rows;
    if(!price_page){
        throw new Error("Can't get price_page");
    }
    return {
        price_page
    };
}

const product_prices = {
    getAll: async () => {
        const product_prices = (await pool.query("SELECT * FROM product.product_prices")).rows;
        if(!product_prices){
            throw new Error("Can't get product_prices");
        }
        return {
            product_prices
        };
    },
    getOne: async (product_id) => {
        const product_price = (await pool.query(`SELECT * FROM product.product_prices WHERE product_id = ${product_id}`)).rows;
        if(!product_price){
            throw new Error("Can't get products");
        }
        return {
            product_price
        };
    }
}


export default { getAllTables, getProductPage, products, product_categories, product_features, product_highlight_features, getPricePage, product_prices };