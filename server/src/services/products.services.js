import pool from '#@/config/db.js'
import { uploadImage, deleteImage, updateImage, isCloudinary } from '#@/utils/image.js';

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

const updateProductPage = async (data) => {
    const {
        title,
        description
    } = data;

    await pool.query(`
        UPDATE product.product_page
        SET
            banner_title = $1,
            banner_description = $2
    `, [title, description]);

    return {
        status: 200,
        message: "Cập nhật Banner thành công",
        action: "Cập nhật Banner trang Sản Phẩm"
    }
}
const updateProductVisibility = async (data) => {
    const {
        visibility
    } = data;

    await pool.query(`
        UPDATE product.product_page
        SET
            is_visible = $1
    `, [visibility]);
    const visibility_state = visibility == true ? "Bật" : "Tắt";
    return {
        status: 200,
        message: `${visibility_state} chế độ hiển thị trang sản phẩm thành công`,
        action: `${visibility_state} chế độ hiển thị trang sản phẩm`
    }
}

const products = {
    getList: async (query = '', filter = '', page, is_featured, item_limit) => {
        query = query.trim().replaceAll(`'`, ``); // clean
        filter = filter.trim().replaceAll(`'`, ``); // clean
        const pageSize = parseInt(item_limit) || 12;
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
        
        order.push('prd.id DESC')

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
                prd.is_featured,
            
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
            name: row.product_name || "",
            description: row.description || "",
            product_img: row.product_img || "",
            price: (row.price == null) ? "" : row.price,
            product_specifications: JSON.parse(row.product_specifications || '{}'),
            warranty_period: (row.warranty_period == null) ? "" : row.warranty_period,
            product_features: row.product_features || [],
            highlight_features: row.highlight_features.map(index => row.product_features[index]) || [],
            highlight_feature_ids: row.highlight_features || [],
            category: {
                id: row.category_id,
                name: row.category_name
            },
            is_featured: row.is_featured || false
        }));
        if (page)
            return {
                totalCount,
                page,
                pageSize: rows.length,
                results
            };
        else return [...results];
    },
    getListByCategory: async (id = '', query = '', filter = '', is_featured, item_limit) => {
        query = query.trim().replaceAll(`'`, ``); // clean
        filter = filter.trim().replaceAll(`'`, ``); // clean
        id = id.trim().replace(/^['"]|['"]$/g, '');
        
        let where = [];
        let order = [];
        const limit = parseInt(item_limit) || 100;
        
        if (id) {
            where.push(`prd.id = '${id}'`);
        }
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

        // Chuẩn hóa từng thành phần truy vấn
        if (where.length != 0) where = 'WHERE ' + where.join(' AND '); else where = '';
        if (order.length != 0) order = 'ORDER BY ' + order.join(', '); else order = '';

        // ✅ SQL giữ nguyên where/order/limit — nhưng thêm phần row_number cho mỗi category
        const sql = `
            SELECT 
                prd.id AS product_id,
                prd.name AS product_name,
                prd.description,
                prd.product_img,
                prd.product_specifications,
                prd.warranty_period,
                prd.product_features,
                prd.highlight_features,
                prd.is_featured,

                pp.price AS price,
                pc.id AS category_id,
                pc.name AS category_name
            FROM product.products prd
            JOIN product.product_categories pc   ON prd.category_id = pc.id
            JOIN product.product_prices pp ON prd.id = pp.product_id
            WHERE prd.id IN (
                SELECT id FROM (
                    SELECT 
                        prd.id,
                        ROW_NUMBER() OVER (PARTITION BY prd.category_id ORDER BY prd.id DESC) AS rn
                    FROM product.products prd   
                    ${where}
                    ${order}
                ) sub
                WHERE rn <= ${limit}
            )
            ORDER BY pc.id, prd.id DESC
        `;

        const { rows } = await pool.query(sql);
        
        // ✅ Group theo category_name
        const groupedResults = {};
        for (const row of rows) {
            const categoryName = row.category_name;
            if (!groupedResults[categoryName]) {
                groupedResults[categoryName] = [];
            }

            groupedResults[categoryName].push({
                id: row.product_id,
                name: row.product_name || "",
                description: row.description || "",
                product_img: row.product_img || "",
                price: (row.price == null) ? "" : row.price,
                product_specifications: JSON.parse(row.product_specifications || '{}'),
                warranty_period: (row.warranty_period == null) ? "" : row.warranty_period,
                product_features: row.product_features || [],
                highlight_features: row.highlight_features.map(index => row.product_features[index]) || [],
                highlight_feature_ids: row.highlight_features || [],
                category: {
                    id: row.category_id,
                    name: row.category_name
                },
                is_featured: row.is_featured || false
            });
        }

        return groupedResults;
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
                prd.is_featured,

                pp.price as price,
                prd_cate.id as category_id,
                prd_cate.name as category_name,
                (select is_visible from product.product_page) as is_visible
            from product.products prd
            join product.product_categories prd_cate on prd.category_id = prd_cate.id
            join product.product_prices pp on prd.id = pp.product_id
            where prd.id = $1
        `
        const row = (await pool.query(query, [id])).rows[0];
        const product = {
                id: row.product_id,
                name: row.product_name || "",
                description: row.description || "",
                product_img: row.product_img || "",
                price: (row.price == null) ? "" : row.price,
                product_specifications: JSON.parse(row.product_specifications || '{}'),
                warranty_period: (row.warranty_period == null) ? "" : row.warranty_period,
                product_features: row.product_features || [],
                highlight_features: row.highlight_features.map(index => row.product_features[index]) || [],
                highlight_feature_ids: row.highlight_features || [],
                
                category: {
                    id: row.category_id,
                    name: row.category_name
                },

                is_featured: row.is_featured || false,
                is_visible: row.is_visible
            };
        return product
    },
    updateFeatureOne: async (id, product_status) => {
        const query = `
            UPDATE product.products SET is_featured = $1 WHERE id = $2 RETURNING name;
        `
        const result = await pool.query(query, [product_status, id]);

        if (result.rowCount == 0) return {
            status: 404,
            message: "Không tìm thấy sản phẩm"
        }

        const { name } = result.rows[0];
        const update = (product_status == 'true') ? 'Trưng bày' : 'Bỏ trưng bày'
        return {
            status: 200,
            message: `${update} sản phẩm thành công`,
            action: `${update} sản phẩm: ${id} - ${name}`
        }
    },
    updateCategory: async (changedItems) => {
        if (!Array.isArray(changedItems)) {
            throw new Error("Invalid input");
        }
        
        if (changedItems.length == 0) return {
            status: 400,
            message: "Không có dữ liệu cần cập nhật"
        }

        const category_id = changedItems[0].category_id;
        const category_name = (await pool.query('SELECT name FROM product.product_categories WHERE id = $1', [category_id])).rows?.[0]?.name;
        if (!category_name) return {
            status: 404,
            message: "Không tìm thấy loại sản phẩm"
        }

        const client = await pool.connect();
        try {
            await client.query("BEGIN");

            for (const item of changedItems) {
                const { id, category_id } = item;

                const result = await client.query(
                    `SELECT category_id, name FROM product.products WHERE id = $1`,
                    [id]
                );

                const oldCategoryId = result.rows[0]?.category_id;

                if (oldCategoryId !== category_id) {
                    await client.query(
                        `UPDATE product.products SET category_id = $1 WHERE id = $2`,
                        [category_id, id]
                    );

                    if (oldCategoryId) {
                        await client.query(
                            `UPDATE product.product_categories SET item_count = item_count - 1 WHERE id = $1`,
                            [oldCategoryId]
                        );
                    }

                    await client.query(
                        `UPDATE product.product_categories SET item_count = item_count + 1 WHERE id = $1`,
                        [category_id]
                    );
                }
            }

            await client.query("COMMIT");

            const product_ids = changedItems.map(item => item.id).join(', ');
            return {
                status: 200,
                message: "Gán loại sản phẩm thành công",
                action: `Gán loại sản phẩm ${category_id} - ${category_name} cho các sản phẩm: ${product_ids}`
            }
        } catch (error) {
            await client.query("ROLLBACK");
            console.error("Error during DB updateRegion:", error);
            throw error;
        } finally {
            client.release();
        }
    },
    createOne: async (data, file) => {
        let cloud_avatar_img = null;
        if (file) {
            cloud_avatar_img = await uploadImage(file, 'product');
        }
        
        let {
            external_avatar_img,
            characteristic,
            description,
            isDisplayHomePage,
            price, // int
            productCategories,
            productName,
            technicalDetails,
            warranty // int
        } = data;

        const final_avatar_img = cloud_avatar_img || external_avatar_img || null;

        if (price == "") price = null;
        warranty = isNaN(parseInt(warranty)) ? null : parseInt(warranty);
        console.error(warranty);

        // 1. Get category_id
        const categoryRes = await pool.query(
            `SELECT id FROM product.product_categories WHERE name ILIKE $1`,
            [productCategories]
        );
        if (categoryRes.rowCount === 0) {
            throw new Error('Category not found');
        }
        const category_id = categoryRes.rows[0].id;

        // 2. Prepare features
        const parsed_characteristic = JSON.parse(characteristic) || [];
        const product_features = parsed_characteristic.map(c => c.value);
        const highlight_feature_ids = parsed_characteristic
            .map((c, index) => (c.isCheckbox ? index : -1))
            .filter(index => index !== -1);

        // 3. Insert into products
        const insertSql = `
            INSERT INTO product.products (
            name, description, product_img, category_id,
            product_specifications, warranty_period,
            product_features, highlight_features, is_featured
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id;
        `;

        const insertValues = [
            productName,
            description,
            final_avatar_img,
            category_id,
            technicalDetails,
            warranty,
            product_features,
            highlight_feature_ids,
            isDisplayHomePage
        ];

        const productInsertResult = await pool.query(insertSql, insertValues);

        // 4. Update product prices
        const product_id = productInsertResult.rows[0].id;
        await pool.query(
            `INSERT INTO product.product_prices (product_id, price) VALUES ($1, $2)`,
            [product_id, price]
        ); 

        // 5. Update item_count
        await pool.query(
            `UPDATE product.product_categories SET item_count = item_count + 1 WHERE id = $1`,
            [category_id]
        );

        return {
            status: 200,
            message: "Tạo sản phẩm thành công",
            action: `Tạo sản phẩm: ${product_id} - ${productName}`,
            id: product_id
        }
    },
    updateOne: async (data, file, id) => {
        const { 
            product_img: old_avatar_img,
            name: old_name
        } = (await pool.query('SELECT product_img, name FROM product.products WHERE id = $1', [id])).rows?.[0];
        if (!old_name) return {
            status: 404,
            message: "Không tìm thấy sản phẩm"
        }

        const local_avatar_img = file;
        
        let {
            external_avatar_img,
            characteristic,
            description,
            isDisplayHomePage,
            price,
            productCategories,
            productName,
            technicalDetails,
            warranty
        } = data;

        const final_avatar_img = await updateImage(
            old_avatar_img,
            local_avatar_img,
            external_avatar_img,
            'product'
        );

        if (price == "") price = null;
        warranty = isNaN(parseInt(warranty)) ? null : parseInt(warranty);

        // 1. Get category_id
        const categoryRes = await pool.query(
            `SELECT id FROM product.product_categories WHERE name ILIKE $1`,
            [productCategories]
        );
        if (categoryRes.rowCount === 0) {
            throw new Error('Category not found');
        }
        const category_id = categoryRes.rows[0].id;

        // 2. Prepare features
        const parsed_characteristic = JSON.parse(characteristic) || [];
        const product_features = parsed_characteristic.map(c => c.value);
        const highlight_feature_ids = parsed_characteristic
            .map((c, index) => (c.isCheckbox ? index : -1))
            .filter(index => index !== -1);

        // 3. Insert into products
        const insertSql = `
            UPDATE product.products 
            SET
                name = $1,
                description = $2,
                product_img = $3,
                category_id = $4,
                product_specifications = $5,
                warranty_period = $6,
                product_features = $7,
                highlight_features = $8,
                is_featured = $9
            WHERE id = $10
        `;

        const insertValues = [
            productName,
            description,
            final_avatar_img,
            category_id,
            technicalDetails,
            warranty,
            product_features,
            highlight_feature_ids,
            isDisplayHomePage,
            id
        ];

        const productInsertResult = await pool.query(insertSql, insertValues);

        // 4. Update product prices
        await pool.query(
            `
                UPDATE product.product_prices
                SET price = $2
                WHERE product_id = $1
            `,
            [id, price]
        );

        const note = (old_name != productName) ? ' (đã đổi tên)' : '';
        return {
            status: 200,
            message: "Cập nhật sản phẩm thành công",
            action: `Cập nhật sản phẩm${note}: ${id} - ${productName}`
        }
    },
    deleteOne: async (id) => {
        // 1. Kiểm tra tồn tại và lấy category + product_img
        const res = await pool.query(
            `SELECT category_id, product_img, name FROM product.products WHERE id = $1`,
            [id]
        );
        if (res.rowCount == 0) return {
            status: 404,
            message: "Không tìm thấy sản phẩm"
        };

        const { category_id, product_img, name } = res.rows[0];

        // 2. Xóa bảng product_prices trước (nếu có liên kết FK)
        await pool.query(
            `DELETE FROM product.product_prices WHERE product_id = $1`,
            [id]
        );

        // 3. Xóa sản phẩm chính, không cần RETURNING nữa vì đã có product_img
        await pool.query(
            `DELETE FROM product.products WHERE id = $1`,
            [id]
        );

        // 4. Cập nhật item_count của danh mục
        await pool.query(
            `UPDATE product.product_categories SET item_count = item_count - 1 WHERE id = $1`,
            [category_id]
        );

        // 5. Xóa ảnh nếu là ảnh từ Cloudinary
        if (isCloudinary(product_img)) {
            await deleteImage([product_img]);
        }

        return {
            status: 200,
            message: "Xóa sản phẩm thành công",
            action: `Xóa sản phẩm: ${id} - ${name}`
        };
    }

}

const product_categories = {
    // getAll: async () => {
    //     const product_categories = (await pool.query("SELECT * FROM product.product_categories")).rows;
    //     if(!product_categories){
    //         throw new Error("Can't get product_categories");
    //     }
    //     return product_categories
    // },
    getList: async (id, query) => {
        query = query.trim().replaceAll(`'`, ``); // clean
        id = id.trim().replace(/^['"]|['"]$/g, '');

        let where = [];
        let order = [];
        
        if (id) {
            where.push(`C.id = '${id}'`);
        }
        if (query != '') {
            where.push(
                `(unaccent(C.name::text) ILIKE '%' || unaccent('${query}'::text) || '%' OR
                similarity(unaccent(C.name::text), unaccent('${query}'::text)) > 0.1)`
            );
            
            order.push(
                `similarity(unaccent(C.name), unaccent('${query}')) DESC`
            );
        }

        // Chuẩn hóa từng thành phần truy vấn
        if (where.length != 0) where = 'WHERE ' + where.join(' AND '); else where = '';
        if (order.length != 0) order = 'ORDER BY ' + order.join(', '); else order = 'ORDER BY id';

        const product_categories = (await pool.query(`
            SELECT * 
            FROM product.product_categories C
            ${where}
            ${order}

        `)).rows;

        if(!product_categories){
            throw new Error("Can't get product_categories");
        }
        return product_categories
    },
    getOne: async (id) => {
        const product_category = (await pool.query(`SELECT * FROM product.product_categories WHERE id = $1`, [id])).rows[0];
        if(!product_category){
            throw new Error("Can't get product_categories");
        }
        return product_category
    },
    getAllFeatured: async () => {
        const featured_product_categories = (await pool.query(`
            SELECT pc.*
            FROM product.product_categories pc
            WHERE EXISTS (
                SELECT 1 
                FROM product.products prd
                WHERE prd.category_id = pc.id AND prd.is_featured = true
            )
            ORDER BY id
        `))?.rows;
        if (!featured_product_categories) {
            throw new Error("Can't get featured product_categories")
        }
        return featured_product_categories
    },    
    createOne: async (data) => {
        const { productNameCategories } = data;

        const result = await pool.query(
            `INSERT INTO product.product_categories (name, item_count) VALUES ($1, 0) RETURNING id`,
            [productNameCategories]
        );

        const { id } = result.rows[0];
        return {
            status: 200,
            message: "Tạo loại sản phẩm thành công",
            action: `Tạo loại sản phẩm: ${id} - ${productNameCategories}`
        }

    },
    updateOne: async (data, id) => {
        const old_name = (await pool.query('SELECT name FROM product.product_categories WHERE id = $1', [id])).rows?.[0]?.name;
        if (!old_name) return {
            status: 404,
            message: "Không tìm thấy loại sản phẩm"
        }

        const { productNameCategories } = data;
        await pool.query(
            `UPDATE product.product_categories
            SET name = $1
            WHERE id = $2`,
            [productNameCategories, id]
        );

        const note = (old_name != productNameCategories) ? ' (đã đổi tên)' : '';
        return {
            status: 200,
            message: "Cập nhật loại sản phẩm thành công",
            action: `Cập nhật loại sản phẩm${note}: ${id} - ${productNameCategories}`
        }
    },
    deleteOne: async (id) => {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            // 1. Lấy tất cả ảnh sản phẩm
            const productImagesRes = await client.query(
                `SELECT product_img FROM product.products WHERE category_id = $1`,
                [id]
            );
            const productImgs = productImagesRes.rows.map(row => row.product_img).filter(Boolean);

            // 2. Xóa product_prices
            await client.query(
                `DELETE FROM product.product_prices 
                WHERE product_id IN (
                    SELECT id FROM product.products WHERE category_id = $1
                )`,
                [id]
            );

            // 3. Xóa products
            await client.query(
                `DELETE FROM product.products WHERE category_id = $1 RETURNING name`,
                [id]
            );

            // 4. Xóa category
            const categoryDeleteRes = await client.query(
                `DELETE FROM product.product_categories WHERE id = $1 RETURNING name`,
                [id]
            );

            if (categoryDeleteRes.rowCount === 0) {
                await client.query('ROLLBACK');
                client.release();
                return { status: 404, message: "Không tìm thấy danh mục để xóa" };
            }

            const { name: categoryName } = categoryDeleteRes.rows[0];

            await client.query('COMMIT');
            client.release();

            // 5. Xử lý ảnh Cloudinary
            const cloudinaryImgs = productImgs.filter(isCloudinary);
            if (cloudinaryImgs.length > 0) {
                await deleteImage(cloudinaryImgs);
            }

            return {
                status: 200,
                message: "Xóa danh mục và toàn bộ sản phẩm thành công",
                action: `Xóa loại sản phẩm và toàn bộ sản phẩm thuộc loại: ${id} - ${categoryName}`,
                deletedImages: cloudinaryImgs
            };
        } catch (err) {
            await client.query('ROLLBACK');
            client.release();
            console.error("Lỗi khi xóa danh mục:", err);
            return { status: 500, message: "Đã xảy ra lỗi khi xóa danh mục" };
        }
    }
}


const getPricePage = async () => {
    const price_page = (await pool.query("SELECT * FROM product.price_page")).rows[0];
    if(!price_page){
        throw new Error("Can't get price_page");
    }
    return price_page || "";
}

const updatePricePage = async (data) => {
    const {
        title,
        description
    } = data;

    const result = await pool.query(`
        UPDATE product.price_page
        SET
            banner_title = $1,
            banner_description = $2
    `, [title, description]);

    return {
        status: 200,
        message: "Cập nhật Banner thành công",
        action: "Cập nhật Banner trang Bảng Giá"
    }
}
const updatePriceVisibility = async (data) => {
    const {
        visibility
    } = data;

    await pool.query(`
        UPDATE product.price_page
        SET
            is_visible = $1
    `, [visibility]);
    const visibility_state = visibility == true ? "Bật" : "Tắt";
    return {
        status: 200,
        message: `${visibility_state} chế độ hiển thị trang bảng giá thành công`,
        action: `${visibility_state} chế độ hiển thị trang bảng giá`
    }
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
            price: row.price !== null ? row.price : "",
            note: row.note ?? "",
            product: {
                id: row.product_id,
                name: row.product_name ?? "",
                description: row.description ?? "",
                product_img: row.product_img ?? "",
                warranty_period: row.warranty_period !== null ? row.warranty_period : "",
                product_features: row.product_features ?? [],
                highlight_features: row.highlight_features.map(index => row.product_features[index]) || [],
                highlight_feature_ids: row.highlight_features ?? [],
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
            price: row.price !== null ? row.price : "",
            note: row.note ?? "",
            product: {
                id: row.product_id,
                name: row.product_name ?? "",
                description: row.description ?? "",
                product_img: row.product_img ?? "",
                warranty_period: row.warranty_period !== null ? row.warranty_period : "",
                product_features: row.product_features ?? [],
                highlight_features: row.highlight_features.map(index => row.product_features[index]) ?? [],
                highlight_feature_ids: row.highlight_features ?? [],
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
            price: row.price !== null ? row.price : "",
            note: row.note || "",
            product: {
                id: row.product_id,
                name: row.product_name || "",
                description: row.description || "",
                product_img: row.product_img || "",
                warranty_period: row.warranty_period !== null ? row.warranty_period : "",
                product_features: row.product_features || [],
                highlight_features: row.highlight_features.map(index => row.product_features[index]) || [],
                highlight_feature_ids: row.highlight_features || [],
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
                prd_cate.name as category_name,

                (select is_visible from product.price_page) as is_visible
            from product.product_prices prd_pri
            join product.products prd on prd_pri.product_id = prd.id
            join product.product_categories prd_cate on prd.category_id = prd_cate.id
            where prd_pri.id = $1
        `
        const row = (await pool.query(query, [id])).rows[0];
        const product_price = {
            id: row.price_id,
            price: row.price !== null ? row.price : "",
            note: row.note || "",
            is_visible: row.is_visible, 
            product: {
                id: row.product_id,
                name: row.product_name || "",
                description: row.description || "",
                product_img: row.product_img || "",
                warranty_period: row.warranty_period !== null ? row.warranty_period : "",
                product_features: row.product_features || [],
                highlight_features: row.highlight_features.map(index => row.product_features[index]) || [],
                highlight_feature_ids: row.highlight_features || [],       
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
            name: row.product_name || "",
            product_img: row.product_img || "",
            description: row.description || "",
            price: row.price || "",
            product_specifications: JSON.parse(row.product_specifications || '{}'),
            warranty_period: row.warranty_period || "",
            product_features: row.product_features || [],
            highlight_features: row.highlight_features.map(index => row.product_features[index]) || [],
            highlight_feature_ids: row.highlight_features || [],
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

const getSearchSuggestions = async (query, filter, is_featured) => {
    query = query.trim().replaceAll(`'`, ``);
    filter = filter.trim().replaceAll(`'`, ``);
    const suggestions_limit = 5;

    let where = [];
    let order = [];
    const limit = 'LIMIT ' + suggestions_limit;

    if (query != '') {
        where.push(`(unaccent(P.name::text) ILIKE '%' || unaccent('${query})'::text) || '%' OR
            similarity(unaccent(P.name::text), unaccent('${query}'::text)) > 0)`);
        order.push(`similarity(unaccent(P.name::text), unaccent('${query}'::text)) DESC`);
    }
    if (filter != '') {
        where.push(`unaccent(C.name) ILIKE unaccent('${filter}')`);
    }
    if (is_featured == 'false' || is_featured == 'true') {
        where.push(`P.is_featured = ${is_featured}`);
    }

    // Chuẩn hóa các thành phần query
    if (where.length != 0) where = 'WHERE ' + where.join(' AND '); else where = '';
    if (order.length != 0) order = 'ORDER BY ' + order.join(', '); else order = '';
    
    const sql = `
        SELECT P.name, P.id, P.product_img
        FROM product.products P
        JOIN product.product_categories C ON P.category_id = C.id
        ${where}
        ${order}
        ${limit}
    `;

    try {
        const result = await pool.query(sql);
        return result.rows.map(row => ({
            query: row.name,
            id: row.id,
            img: row.product_img
        }));
    } catch (err) {
        throw new Error(`DB error: ${err.message}`);
    }
};

const getSearchCategoriesSuggestions = async (id, query) => {
    query = query.trim().replaceAll(`'`, ``);
    id = id.trim().replace(/^['"]|['"]$/g, '');

    const suggestions_limit = 5;
    let where = [];
    let order = [];
    const limit = 'LIMIT ' + suggestions_limit;

    if (id) {
        where.push(`P.id = '${id}'`);
    }
    if (query != '') {
        where.push(`(unaccent(P.name::text) ILIKE '%' || unaccent('${query})'::text) || '%' OR
            similarity(unaccent(P.name::text), unaccent('${query}'::text)) > 0)`);
        order.push(`similarity(unaccent(P.name::text), unaccent('${query}'::text)) DESC`);
    }

    // Chuẩn hóa các thành phần query
    if (where.length != 0) where = 'WHERE ' + where.join(' AND '); else where = '';
    if (order.length != 0) order = 'ORDER BY ' + order.join(', '); else order = '';
    
    const sql = `
        SELECT P.name, P.id
        FROM product.product_categories P
        ${where}
        ${order}
        ${limit}
    `;

    try {
        const result = await pool.query(sql);
        return result.rows.map(row => ({
            query: row.name,
            id: row.id
        }));
    } catch (err) {
        throw new Error(`DB error: ${err.message}`);
    }
};

const count = async () => {
    const product_count = (await pool.query(`
        SELECT COUNT(*)::int AS product_count
        FROM product.products
    `)).rows[0];
    if(!product_count){
        throw new Error("Can't get products");
    }

    const categories_count = (await pool.query(`
        SELECT COUNT(*)::int AS categories_count
        FROM product.product_categories
    `)).rows[0];
    if(!categories_count){
        throw new Error("Can't get product_categories");
    }

    return {
        ...product_count,
        ...categories_count
    };
}

export default { getAllTables, getProductPage, updateProductPage, products, product_categories, getPricePage, updatePricePage, product_prices, getHighlightProducts, getSearchSuggestions, getSearchCategoriesSuggestions, count, updateProductVisibility, updatePriceVisibility };