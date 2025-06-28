import pool from '#@/config/db.js'

const getAllTables = async () => {
    const _product_page = await getProductPage();
    const _products = await products.getList();
    const _product_features = await product_features.getAll();
    const _product_highlight_features = await product_highlight_features.getAll();
    const _product_categories = await product_categories.getAll();
    const _price_page = await getPricePage();
    const _product_prices = await product_prices.getAll();
    return {
        product_page: _product_page,
        products: _products,
        product_features: _product_features,
        product_highlight_features: _product_highlight_features,
        product_categories: _product_categories,
        price_page: _price_page,
        product_prices: _product_prices
    };
}

const getProductPage = async (filter = '') => {
    const product_page = (await pool.query("SELECT * FROM product.product_page")).rows[0];
    if(!product_page){
        throw new Error("Can't get product_page");
    }

    const cleanedFilter = filter.trim().replaceAll(`'`, ``);
    let totalCount = 0;

    if (cleanedFilter === '') {
        const result = await pool.query("SELECT COUNT(*) FROM product.products");
        totalCount = parseInt(result.rows[0].count);
    }
    else {
        const query = `
            SELECT COUNT(*) AS total
            FROM product.products p
            JOIN product.product_categories pc on p.category_id = pc.id
            WHERE unaccent(pc.name) ILIKE unaccent($1)
        `;
        const result = await pool.query(query, [cleanedFilter]);
        totalCount = parseInt(result.rows[0].total);
    }
    return {
        ...product_page,
        totalCount
    }
}

const products = {
    getList: async (query = '', filter = '', page = 1) => {
            const cleanedQuery = query.trim().replaceAll(`'`, ``);
            const cleanedFilter = filter.trim().replaceAll(`'`, ``);
            const pageSize = 12;
            const offset = (page - 1) * pageSize;
        
            const hasQuery = cleanedQuery !== '';
            const hasFilter = cleanedFilter !== '';
        
            // CASE 1: Có query (searchBar)
            if (hasQuery) {
                const sql = `
                    SELECT 
                        prd.id AS product_id,
                        prd.name AS product_name,
                        prd.description,
                        prd.product_img,
                        prd.warranty_period,
                        prd.product_specifications,
                        pc.id AS category_id,
                        pc.name AS category_name
                    FROM product.products prd
                    JOIN product.product_categories pc ON prd.category_id = pc.id
                    WHERE 
                        ($2 = '' OR unaccent(pc.name) ILIKE unaccent($2)) AND
                        similarity(unaccent(prd.name::text), unaccent($1::text)) > 0.1
                    ORDER BY
                        similarity(unaccent(prd.name::text), unaccent($1::text)) DESC,
                        prd.name
                    LIMIT $3 OFFSET $4
                `;
                const values = [cleanedQuery, cleanedFilter, pageSize, offset];
                const { rows } = await pool.query(sql, values);
        
                const results = rows.map(row => ({
                    id: row.product_id,
                    name: row.product_name,
                    description: row.description,
                    product_img: row.product_img,
                    product_specifications: JSON.parse(row.product_specifications || '{}'),
                    warranty_period: row.warranty_period,
                    product_specifications: JSON.parse(row.product_specifications || '{}'),
                    category: {
                        id: row.category_id,
                        name: row.category_name
                    }
                }));
        
                return {
                    page,
                    pageSize: rows.length,
                    results
                };
            }
        
            // CASE 2: Không có query
            if (!hasFilter) {
                // Lấy mỗi loại sản phẩm ra 4 sản phẩm
                const sql = `
                    SELECT 
                        prd.id AS product_id,
                        prd.name AS product_name,
                        prd.description,
                        prd.product_img,
                        prd.product_specifications,
                        prd.warranty_period,
            
                        pc.id AS category_id,
                        pc.name AS category_name
                    FROM product.products prd
                    JOIN product.product_categories pc ON prd.category_id = pc.id
                    WHERE prd.id IN (
                        SELECT id FROM (
                            SELECT 
                                prd.id,
                                ROW_NUMBER() OVER (PARTITION BY prd.category_id ORDER BY prd.name) AS rn
                            FROM product.products prd
                        ) sub
                        WHERE rn <= 4
                    )
                    ORDER BY pc.name, prd.name
                `;
            
                const { rows } = await pool.query(sql);
            
                // Group theo category_name
                const groupedResults = {};
                for (const row of rows) {
                    const categoryName = row.category_name;
                    if (!groupedResults[categoryName]) {
                        groupedResults[categoryName] = [];
                    }
            
                    groupedResults[categoryName].push({
                        id: row.product_id,
                        name: row.product_name,
                        description: row.description,
                        product_img: row.product_img,
                        product_specifications: JSON.parse(row.product_specifications || '{}'),
                        warranty_period: row.warranty_period,
                        category: {
                            id: row.category_id,
                            name: row.category_name
                        }
                    });
                }
            
                return {
                    page: page,
                    pageSize: rows.length,
                    results: groupedResults
                };
            } else {
                // Có filter nhưng không có query => phân trang theo filter
                const sql = `
                    SELECT 
                        prd.id AS product_id,
                        prd.name AS product_name,
                        prd.description,
                        prd.product_img,
                        prd.warranty_period,
                        prd.product_specifications,
                        pc.id AS category_id,
                        pc.name AS category_name
                    FROM product.products prd
                    JOIN product.product_categories pc ON prd.category_id = pc.id
                    WHERE 
                        ($1 = '' OR unaccent(pc.name) ILIKE unaccent($1))
                    ORDER BY prd.name
                    LIMIT $2 OFFSET $3
                `;
                const values = [cleanedFilter, pageSize, offset];
                const { rows } = await pool.query(sql, values);
        
                const results = rows.map(row => ({
                    id: row.product_id,
                    name: row.product_name,
                    description: row.description,
                    product_img: row.product_img,
                    product_specifications: JSON.parse(row.product_specifications || '{}'),
                    warranty_period: row.warranty_period,
                    category: {
                        id: row.category_id,
                        name: row.category_name
                    }
                }));
        
                return {
                    page: page,
                    pageSize: rows.length,
                    results: results
                };
            }
    },
    getOne: async (id) => {
        const query = `
            select 
                prd.id as product_id,
                prd.name as product_name,
                prd.description,
                prd.product_img,
                prd.product_specifications,
                prd.warranty_period,

                prd_cate.id as category_id,
                prd_cate.name as category_name

            from product.products prd
            join product.product_categories prd_cate on prd.category_id = prd_cate.id
            where prd.id = ${id}
        `
        const row = (await pool.query(query)).rows[0];
        const product = {
                id: row.product_id,
                name: row.product_name,
                description: row.description,
                product_img: row.product_img,
                product_specifications: JSON.parse(row.product_specifications || '{}'), // xử lý JSON
                warranty_period: row.warranty_period,
                category: {
                    id: row.category_id,
                    name: row.category_name
                }
            };
        return product
    }
}

const product_categories = {
    getAll: async () => {
        const product_categories = (await pool.query("SELECT * FROM product.product_categories")).rows;
        if(!product_categories){
            throw new Error("Can't get product_categories");
        }
        return product_categories
    },
    getOne: async (id) => {
        const product_category = (await pool.query(`SELECT * FROM product.product_categories WHERE id = ${id}`)).rows[0];
        if(!product_category){
            throw new Error("Can't get product_categories");
        }
        return product_category
    }
}

const product_features = {
    getAll: async () => {
        const product_features = (await pool.query("SELECT * FROM product.product_features")).rows;
        if(!product_features){
            throw new Error("Can't get product_features");
        }
        return product_features
    },
    getByProductId: async (product_id) => {
        const product_features = (await pool.query(`SELECT * FROM product.product_features WHERE product_id = ${product_id}`)).rows;
        if(!product_features){
            throw new Error("Can't get product_features");
        }
        return product_features
    },
    getOne: async (product_id, feature_id) => {
        const product_feature = (await pool.query(`SELECT * FROM product.product_features WHERE product_id = ${product_id} AND feature_id = ${feature_id}`)).rows[0];
        if(!product_feature){
            throw new Error("Can't get product_features");
        }
        return product_feature
    }
}

const product_highlight_features = {
    getAll: async () => {
        const product_highlight_features = (await pool.query("SELECT * FROM product.product_highlight_features")).rows;
        if(!product_highlight_features){
            throw new Error("Can't get product_highlight_features");
        }
        return product_highlight_features
    },
    getByProductId: async (product_id) => {
        const product_highlight_features = (await pool.query(`SELECT * FROM product.product_highlight_features WHERE product_id = ${product_id}`)).rows;
        if(!product_highlight_features){
            throw new Error("Can't get product_highlight_features");
        }
        return product_highlight_features
    },
    getOne: async (product_id, feature_id) => {
        const product_highlight_feature = (await pool.query(`SELECT * FROM product.product_highlight_features WHERE product_id = ${product_id} AND feature_id = ${feature_id}`)).rows[0];
        if(!product_highlight_feature){
            throw new Error("Can't get product_highlight_features");
        }
        return product_highlight_feature
    }
}

const getPricePage = async () => {
    const price_page = (await pool.query("SELECT * FROM product.price_page")).rows[0];
    if(!price_page){
        throw new Error("Can't get price_page");
    }
    return price_page;
}

const product_prices = {
    getAll: async () => {
        const query = `
            select 
                prd_pri.id as price_id,
                prd_pri.price,
                prd_pri.note,

                prd.id as product_id,
                prd.name as product_name,
                prd.description,
                prd.product_img,
                prd.warranty_period,

                prd_cate.id as category_id,
                prd_cate.name as category_name
            from product.product_prices prd_pri
            join product.products prd on prd_pri.product_id = prd.id
            join product.product_categories prd_cate on prd.category_id = prd_cate.id
        `
        const { rows } = await pool.query(query);
        const product_prices = rows.map(row => ({
            id: row.price_id,
            price: row.price,
            note: row.note,
            product: {
                id: row.product_id,
                name: row.product_name,
                description: row.description,
                product_img: row.product_img,
                warranty_period: row.warranty_period,
                category: {
                    id: row.category_id,
                    name: row.category_name
                }
            }
          }));
        return product_prices
    },
    getOne: async (id) => {
        const query = `
            select 
                prd_pri.id as price_id,
                prd_pri.price,
                prd_pri.note,

                prd.id as product_id,
                prd.name as product_name,
                prd.description,
                prd.product_img,
                prd.warranty_period,

                prd_cate.id as category_id,
                prd_cate.name as category_name
            from product.product_prices prd_pri
            join product.products prd on prd_pri.product_id = prd.id
            join product.product_categories prd_cate on prd.category_id = prd_cate.id
            where prd_pri.id = ${id}
        `
        const row = (await pool.query(query)).rows[0];
        const product_price = {
            id: row.price_id,
            price: row.price,
            note: row.note,
            product: {
                id: row.product_id,
                name: row.product_name,
                description: row.description,
                product_img: row.product_img,
                warranty_period: row.warranty_period,
                category: {
                    id: row.category_id,
                    name: row.category_name
                }
            }};
        return product_price;
    }
}

const getSearchSuggestions = async (query, filter) => {
    const cleanedQuery = query.trim().replaceAll(`'`, ``);
    const cleanedFilter = filter.trim().replaceAll(`'`, ``);

    const sql = `
        SELECT DISTINCT ON (P.name) P.name, P.id, P.id, P.product_img
        FROM product.products P
        JOIN product.product_categories C ON P.category_id = C.id
        WHERE 
            ($2 = '' OR unaccent(C.name) ILIKE unaccent($2)) AND
            ($1 = '' OR similarity(unaccent(P.name::text), unaccent($1::text)) > 0)
        ORDER BY
            P.name,
            P.product_img,
            similarity(unaccent(P.name::text), unaccent($1::text)) DESC
        LIMIT 5
    `;
    const values = [cleanedQuery, cleanedFilter];
    try {
        const result = await pool.query(sql, values);
        return result.rows.map(row => ({
            query: row.name,
            id: row.id,
            img: row.product_img
        }));
    } catch (err) {
        throw new Error(`DB error: ${err.message}`);
    }
};


export default { getAllTables, getProductPage, products, product_categories, product_features, product_highlight_features, getPricePage, product_prices, getSearchSuggestions };