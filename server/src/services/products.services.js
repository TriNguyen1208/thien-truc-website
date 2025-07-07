import pool from '#@/config/db.js'

const getAllTables = async () => {
    const _product_page = await getProductPage();
    const _products = await products.getList();
    const _product_categories = await product_categories.getAll();
    const _price_page = await getPricePage();
    const _product_prices = await product_prices.getAll();
    return {
        product_page: _product_page,
        products: _products,
        product_categories: _product_categories,
        price_page: _price_page,
        product_prices: _product_prices
    };
}
const getNumPage = async (query, filter) => {
    let totalCount = 0;
    const hasQuery = query !== '';
    const hasFilter = filter !== '';
    // ✅ 1. Có query (search bar). Nếu có searchBar thì không dùng sort_by nữa
    if (hasQuery) {
        const sql = `
            SELECT COUNT(*) AS total
            FROM product.products prd
            JOIN product.product_categories pc ON prd.category_id = pc.id
            WHERE 
                ($2 = '' OR unaccent(pc.name) ILIKE unaccent($2)) AND
                similarity(unaccent(prd.name::text), unaccent($1::text)) > 0.1
        `;
        const values = [query, filter];
        const result = await pool.query(sql, values);
        totalCount = parseInt(result.rows[0].total);
        return totalCount;
    }

    // ✅ 2. Không có query
    if (!hasFilter) {
        // Trả về tối đa 9 trang, sắp xếp theo sortBy
        const result = await pool.query("SELECT COUNT(*) FROM product.products");
        totalCount = parseInt(result.rows[0].count);
        return totalCount;
    } else {
        // Có filter (theo category), phân trang theo sortBy
        const sql = `
            SELECT COUNT(*) AS total
            FROM product.products prd
            JOIN product.product_categories pc ON prd.category_id = pc.id
            WHERE 
                ($1 = '' OR unaccent(pc.name) ILIKE unaccent($1))
        `;
        const results = await pool.query(sql, [filter]);
        totalCount = parseInt(results.rows[0].total);
        return totalCount;
    }
}
const getProductPage = async () => {
    const product_page = (await pool.query("SELECT * FROM product.product_page")).rows[0];
    if(!product_page){
        throw new Error("Can't get product_page");
    }
    return {
        ...product_page,
    }
}

const products = {
    getList: async (query = '', filter = '', page, is_featured) => {
        query = query.trim().replaceAll(`'`, ``); // clean
        filter = filter.trim().replaceAll(`'`, ``); // clean
        const pageSize = 12;
        const totalCount = await getNumPage(query, filter);

        let where = [];
        let order = [];
        let limit = '';

        if (query != '') {
            where.push(
                `(unaccent(prd.name::text) ILIKE '%' || unaccent('${query}'::text) || '%' OR
                similarity(unaccent(prd.name::text), unaccent('${query}'::text)) > 0.1)`
            );
            
            order.push(
                `similarity(unaccent(prd.name), unaccent('${query}')) DESC`
            );
        }

        if (filter != '') {
            where.push(
                `unaccent(pc.name) ILIKE unaccent('${filter}')`
            );
        }

        if (is_featured == 'true' || is_featured == 'false') {
            where.push(`prd.is_featured = ${is_featured}`);
        }

        if (page) {
            const offset = (page - 1) * pageSize;
            limit = `${pageSize} OFFSET ${offset}`;
        } else {
            limit = 'ALL';
        }
        
        // Chuẩn hóa từng thành phần truy vấn
        if (where.length != 0) where = 'WHERE ' + where.join(' AND '); else where = '';
        if (order.length != 0) order = 'ORDER BY ' + order.join(', '); else order = '';
        if (limit != '') limit = ` LIMIT ${limit} `;

        const sql = `
            SELECT 
                prd.id AS product_id,
                prd.name AS product_name,
                prd.description,
                prd.product_img,
                prd.warranty_period,
                prd.product_specifications,
                prd.product_features,
                prd.highlight_features,
            
                pp.price AS price,
                pc.id AS category_id,
                pc.name AS category_name
            FROM product.products prd
            JOIN product.product_categories pc ON prd.category_id = pc.id
            JOIN product.product_prices pp ON prd.id = pp.product_id
            ${where}
            ${order}
            ${limit}
        `;

        const { rows } = await pool.query(sql);
        const results = rows.map(row => ({
            id: row.product_id,
            name: row.product_name,
            description: row.description,
            product_img: row.product_img,
            price: row.price,
            product_specifications: JSON.parse(row.product_specifications || '{}'),
            warranty_period: row.warranty_period,
            product_features: row.product_features || [],
            highlight_features: row.highlight_features || [],
            category: {
                id: row.category_id,
                name: row.category_name
            }
        }));
        if (page)
            return {
                totalCount,
                page,
                pageSize: rows.length,
                results
            };
        else return [...results];
        // const cleanedQuery = query.trim().replaceAll(`'`, ``);
        // const cleanedFilter = filter.trim().replaceAll(`'`, ``);
        // const pageSize = 12;
        // const offset = (page - 1) * pageSize;
    
        // const hasQuery = cleanedQuery !== '';
        // const hasFilter = cleanedFilter !== '';
        // const totalCount = await getNumPage(cleanedQuery, cleanedFilter)
        // // CASE 1: Có query (searchBar)
        // if (hasQuery) {
        //     const sql = `
        //         SELECT 
        //             prd.id AS product_id,
        //             prd.name AS product_name,
        //             prd.description,
        //             prd.product_img,
        //             prd.warranty_period,
        //             prd.product_specifications,
        //             prd.product_features,
        //             prd.highlight_features,
                    
        //             pp.price AS price,
        //             pc.id AS category_id,
        //             pc.name AS category_name
        //         FROM product.products prd
        //         JOIN product.product_categories pc ON prd.category_id = pc.id
        //         JOIN product.product_prices pp ON prd.id = pp.product_id
        //         WHERE
        //             ($2 = '' OR unaccent(pc.name) ILIKE unaccent($2)) AND
        //             (unaccent(prd.name::text) ILIKE unaccent($1::text) || '%' OR 
        //             similarity(unaccent(prd.name::text), unaccent($1::text)) > 0.1)
        //         ORDER BY
        //             similarity(unaccent(prd.name::text), unaccent($1::text)) DESC,
        //             prd.name
        //         LIMIT $3 OFFSET $4
        //     `;
        //     const values = [cleanedQuery, cleanedFilter, pageSize, offset];
        //     const { rows } = await pool.query(sql, values);
        //     const results = rows.map(row => ({
        //         id: row.product_id,
        //         name: row.product_name,
        //         description: row.description,
        //         product_img: row.product_img,
        //         price: row.price,
        //         product_specifications: JSON.parse(row.product_specifications || '{}'),
        //         warranty_period: row.warranty_period,
        //         product_features: row.product_features || [],
        //         highlight_features: row.highlight_features || [],
        //         category: {
        //             id: row.category_id,
        //             name: row.category_name
        //         }
        //     }));
    
        //     return {
        //         totalCount,
        //         page,
        //         pageSize: rows.length,
        //         results
        //     };
        // }
    
        // // CASE 2: Không có query
        // if (!hasFilter) {
        //     // Lấy mỗi loại sản phẩm ra 4 sản phẩm
        //     const sql = `
        //         SELECT 
        //             prd.id AS product_id,
        //             prd.name AS product_name,
        //             prd.description,
        //             prd.product_img,
        //             prd.product_specifications,
        //             prd.warranty_period,
        //             prd.product_features,
        //             prd.highlight_features,
                    
        //             pp.price AS price,
        //             pc.id AS category_id,
        //             pc.name AS category_name
        //         FROM product.products prd
        //         JOIN product.product_categories pc ON prd.category_id = pc.id
        //         JOIN product.product_prices pp ON prd.id = pp.product_id
        //         WHERE prd.id IN (
        //             SELECT id FROM (
        //                 SELECT 
        //                     prd.id,
        //                     ROW_NUMBER() OVER (PARTITION BY prd.category_id ORDER BY prd.name) AS rn
        //                 FROM product.products prd
        //             ) sub
        //             WHERE rn <= 4
        //         )
        //         ORDER BY pc.name, prd.name
        //     `;
        
        //     const { rows } = await pool.query(sql);
        
        //     // Group theo category_name
        //     const groupedResults = {};
        //     for (const row of rows) {
        //         const categoryName = row.category_name;
        //         if (!groupedResults[categoryName]) {
        //             groupedResults[categoryName] = [];
        //         }
        
        //         groupedResults[categoryName].push({
        //             id: row.product_id,
        //             name: row.product_name,
        //             description: row.description,
        //             product_img: row.product_img,
        //             price: row.price,
        //             product_specifications: JSON.parse(row.product_specifications || '{}'),
        //             warranty_period: row.warranty_period,
        //             product_features: row.product_features || [],
        //             highlight_features: row.highlight_features || [],
                    
        //             category: {
        //                 id: row.category_id,
        //                 name: row.category_name
        //             }
        //         });
        //     }
        
        //     return {
        //         totalCount,
        //         page: page,
        //         pageSize: rows.length,
        //         results: groupedResults
        //     };
        // } else {
        //     // Có filter nhưng không có query => phân trang theo filter
        //     const sql = `
        //         SELECT 
        //             prd.id AS product_id,
        //             prd.name AS product_name,
        //             prd.description,
        //             prd.product_img,
        //             prd.warranty_period,
        //             prd.product_specifications,
        //             prd.product_features,
        //             prd.highlight_features,

        //             pp.price AS price,
        //             pc.id AS category_id,
        //             pc.name AS category_name
        //         FROM product.products prd
        //         JOIN product.product_categories pc ON prd.category_id = pc.id
        //         JOIN product.product_prices pp ON prd.id = pp.product_id
        //         WHERE 
        //             ($1 = '' OR unaccent(pc.name) ILIKE unaccent($1))
        //         ORDER BY prd.name
        //         LIMIT $2 OFFSET $3
        //     `;
        //     const values = [cleanedFilter, pageSize, offset];
        //     const { rows } = await pool.query(sql, values);
    
        //     const results = rows.map(row => ({
        //         id: row.product_id,
        //         name: row.product_name,
        //         description: row.description,
        //         product_img: row.product_img,
        //         price: row.price,
        //         product_specifications: JSON.parse(row.product_specifications || '{}'),
        //         warranty_period: row.warranty_period,
        //         product_features: row.product_features || [],
        //         highlight_features: row.highlight_features || [],

        //         category: {
        //             id: row.category_id,
        //             name: row.category_name
        //         }
        //     }));
    
        //     return {
        //         totalCount,
        //         page: page,
        //         pageSize: rows.length,
        //         results: results
        //     };
        // }
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
                prd.product_features,
                prd.highlight_features,

                pp.price as price,
                prd_cate.id as category_id,
                prd_cate.name as category_name

            from product.products prd
            join product.product_categories prd_cate on prd.category_id = prd_cate.id
            join product.product_prices pp on prd.id = pp.product_id
            where prd.id = ${id}
        `
        const row = (await pool.query(query)).rows[0];
        const product = {
                id: row.product_id,
                name: row.product_name,
                description: row.description,
                product_img: row.product_img,
                price: row.price,
                product_specifications: JSON.parse(row.product_specifications || '{}'), // xử lý JSON
                warranty_period: row.warranty_period,
                product_features: row.product_features || [],
                highlight_features: row.highlight_features || [],

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


const getPricePage = async () => {
    const price_page = (await pool.query("SELECT * FROM product.price_page")).rows[0];
    if(!price_page){
        throw new Error("Can't get price_page");
    }
    return price_page;
}

const product_prices = {
    getAll: async (query = '', filter = '') => {
        const cleanedQuery = query.trim().replaceAll(`'`, ``);
        const cleanedFilter = filter.trim().replaceAll(`'`, ``);  
        const hasQuery = cleanedQuery !== '';
        const hasFilter = cleanedFilter !== '';


        if (hasQuery) {
        const sql = `
            select
                prd_pri.id as price_id,
                prd_pri.price,
                prd_pri.note,


                prd.id as product_id,
                prd.name as product_name,
                prd.description,
                prd.product_img,
                prd.warranty_period,
                prd.product_features,
                prd.highlight_features,


                prd_cate.id as category_id,
                prd_cate.name as category_name
            from product.product_prices prd_pri
            join product.products prd on prd_pri.product_id = prd.id
            join product.product_categories prd_cate on prd.category_id = prd_cate.id
            WHERE
                ($2 = '' OR unaccent(prd_cate.name) ILIKE unaccent($2)) AND
                (unaccent(prd.name::text) ILIKE unaccent($1::text) || '%' OR
                similarity(unaccent(prd.name::text), unaccent($1::text)) > 0.1)
            ORDER BY
                similarity(unaccent(prd.name::text), unaccent($1::text)) DESC,
                prd.name
            LIMIT 20
        `
        const { rows } = await pool.query(sql, [cleanedQuery, cleanedFilter]);
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
                product_features: row.product_features || [],
                highlight_features: row.highlight_features || [],
                category: {
                    id: row.category_id,
                    name: row.category_name
                }
            }


          }));
        return product_prices
        }
        // CASE 2: Không có query
        if (!hasFilter) {
            const sql = `
            select
                prd_pri.id as price_id,
                prd_pri.price,
                prd_pri.note,


                prd.id as product_id,
                prd.name as product_name,
                prd.description,
                prd.product_img,
                prd.warranty_period,
                prd.product_features,
                prd.highlight_features,


                prd_cate.id as category_id,
                prd_cate.name as category_name
            from product.product_prices prd_pri
            join product.products prd on prd_pri.product_id = prd.id
            join product.product_categories prd_cate on prd.category_id = prd_cate.id


        `
        const { rows } = await pool.query(sql);
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
                product_features: row.product_features || [],
                highlight_features: row.highlight_features || [],
                category: {
                    id: row.category_id,
                    name: row.category_name
                }
            }
          }));
        return product_prices
        } else {
            // Có filter nhưng không có query => phân trang theo filter
        const sql = `
            select
                prd_pri.id as price_id,
                prd_pri.price,
                prd_pri.note,


                prd.id as product_id,
                prd.name as product_name,
                prd.description,
                prd.product_img,
                prd.warranty_period,
                prd.product_features,
                prd.highlight_features,


                prd_cate.id as category_id,
                prd_cate.name as category_name
            from product.product_prices prd_pri
            join product.products prd on prd_pri.product_id = prd.id
            join product.product_categories prd_cate on prd.category_id = prd_cate.id
            where
                ($1 = '' OR unaccent(prd_cate.name) ILIKE unaccent($1))
        `
        const { rows } = await pool.query(sql, [cleanedFilter]);
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
                product_features: row.product_features || [],
                highlight_features: row.highlight_features || [],
                category: {
                    id: row.category_id,
                    name: row.category_name
                }
            }
          }));
        return product_prices
        }
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
                prd.product_features,
                prd.highlight_features,

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
                product_features: row.product_features || [],
                highlight_features: row.highlight_features || [],
            
                category: {
                    id: row.category_id,
                    name: row.category_name
                }
            }};
        return product_price;
    }
}

const getHighlightProducts = async () => {
    const sql = `
        SELECT
            prd.id AS product_id,
            prd.name AS product_name,
            prd.product_img,
            prd.description,
            prd.product_specifications,
            prd.warranty_period,
            prd.product_features,
            prd.highlight_features,

            pp.price AS price,
            pc.id AS category_id,
            pc.name AS category_name

        FROM unnest((
            SELECT highlight_product_ids FROM product.highlight_products as hp LIMIT 1
        )) As highlighted_id
        JOIN product.products prd ON highlighted_id = prd.id
        JOIN product.product_categories pc ON prd.category_id = pc.id
        JOIN product.product_prices pp ON prd.id = pp.product_id
        `
    try {
        const { rows } = await pool.query(sql);
        const results = rows.map(row => ({
            id: row.product_id,
            name: row.product_name,
            product_img: row.product_img,
            description: row.description,
            price: row.price,
            product_specifications: JSON.parse(row.product_specifications || '{}'),
            warranty_period: row.warranty_period,
            product_features: row.product_features || [],
            highlight_features: row.highlight_features || [],
            category: {
                id: row.category_id,
                name: row.category_name
            }
        }));
        return results;
    } catch (err) {
        throw new Error(`DB error: ${err.message}`);
    }
}

const getSearchSuggestions = async (query, filter) => {
    const cleanedQuery = query.trim().replaceAll(`'`, ``);
    const cleanedFilter = filter.trim().replaceAll(`'`, ``);

    const sql = `
        SELECT P.name, P.id, P.product_img
        FROM product.products P
        JOIN product.product_categories C ON P.category_id = C.id
        WHERE 
            $2 = '' OR unaccent(C.name) ILIKE unaccent($2) AND
            (unaccent(P.name::text) ILIKE '%' || unaccent($1::text) || '%' OR
            similarity(unaccent(P.name::text), unaccent($1::text)) > 0)
        ORDER BY
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


export default { getAllTables, getProductPage, products, product_categories, getPricePage, product_prices, getHighlightProducts, getSearchSuggestions };