import pool from '#@/config/db.js'
import { uploadImage, deleteImage, extractAllImages, isCloudinary } from '#@/utils/image.js';
const getAllTables = async () => {
    const _news_page = await getNewsPage();
    const _news = await news.getList();
    const _news_categories = await news_categories.getAll();
    const _news_contents = await news_contents.getAll();
    return {
        news_page: _news_page,
        news_contents: _news_contents,
        news: _news,
        news_categories: _news_categories
    };
}

const getNumPage = async (query, filter, is_published) => {
    let totalCount = 0;
    const hasQuery = query !== '';
    const hasFilter = filter !== '';
    let where = []
    if(hasQuery){
        where.push(`('${filter}' = '' OR unaccent(n_cate.name) ILIKE unaccent('${filter}'))`);
        where.push(`((unaccent(n.title) ILIKE '%' || unaccent('${query}') || '%' OR
                    similarity(unaccent(n.title), unaccent('${query}')) > 0.1))`);
    }
    if(!hasQuery && hasFilter){
        where.push(`unaccent(nc.name) ILIKE unaccent('${filter}')`);
    }

    if (is_published == 'true' || is_published == 'false') {
        where.push(`n.is_published = ${is_published}`);
    }
    if (where.length != 0) where = 'WHERE ' + where.join(' AND '); else where = '';
    // ✅ 1. Có query (search bar). Nếu có searchBar thì không dùng sort_by nữa
    if (hasQuery) {
        const sql = `
            SELECT COUNT(*) AS total
            FROM news.news n
            JOIN news.news_categories n_cate ON n.category_id = n_cate.id
            ${where}
        `;
        const result = await pool.query(sql);
        totalCount = parseInt(result.rows[0].total);
        return totalCount;
    }

    // ✅ 2. Không có query
    if (!hasFilter) {
        // Trả về tối đa 9 trang, sắp xếp theo sortBy
        const result = await pool.query(`SELECT COUNT(*) FROM news.news n ${where}`);
        totalCount = parseInt(result.rows[0].count);
        return totalCount;
    } else {
        // Có filter (theo category), phân trang theo sortBy
        const sql = `
            SELECT COUNT(*) AS total
            FROM news.news n
            JOIN news.news_categories nc on n.category_id = nc.id
            ${where}
        `;
        const results = await pool.query(sql);
        totalCount = parseInt(results.rows[0].total);
        return totalCount;
    }
}

const getNewsPage = async () => {
    const news_page = (await pool.query("SELECT * FROM news.news_page")).rows[0];
    if(!news_page){
        throw new Error("Can't get news_page");
    }
    return {
        ...news_page,
    }
}

const getHighlightNews = async () => {
    const sql = `
        SELECT n.id, n.title, n.main_img, n.main_content
        FROM news.news n
        ORDER BY n.num_readers DESC
        LIMIT 5
        `;
    const { rows } = await pool.query(sql);
    return rows.map(row => ({
        id: row.id,
        title: row.title,
        main_img: row.main_img,
        main_content: row.main_content
    }));
}

const updateNewsPage = async (data) => {
    const {
        title,
        description
    } = data;

    const result = await pool.query(`
        UPDATE news.news_page
        SET
            banner_title = $1,
            banner_description = $2
    `, [title, description]);

    return {
        status: 200,
        message: "Cập nhật Banner thành công",
        action: "Cập nhật Banner trang Tin Tức"
    };
}
const updateVisibility = async (data) => {
    const {
        visibility
    } = data;

    await pool.query(`
        UPDATE news.news_page
        SET
            is_visible = $1
    `, [visibility]);
    const visibility_state = visibility == true ? "Bật" : "Tắt";
    return {
        status: 200,
        message: `${visibility_state} chế độ hiển thị trang tin tức thành công`,
        action: `${visibility_state} chế độ hiển thị trang tin tức`
    }
}
const news = {
    getList: async (query = '', filter = '', sort_by = 'date_desc', page, is_published, item_limit) => {
        query = query.trim().replaceAll(`'`, ``); // clean
        filter = filter.trim().replaceAll(`'`, ``); // clean
        sort_by = sort_by.trim().replaceAll(`'`, ``); // clean
        const pageSize = item_limit || 9;
        const totalCount = await getNumPage(query, filter, is_published);
        let where = [];
        let order = [];
        let limit = '';

        let order_option = 'n.public_date DESC';
        if (sort_by == 'popular')
            order_option = 'n.num_readers DESC';
        order.push(order_option);

        if (query != '') {
            where.push(
                `(unaccent(n.title::text) ILIKE '%' || unaccent('${query}'::text) || '%' OR
                similarity(unaccent(n.title::text), unaccent('${query}'::text)) > 0.1)`
            );
            
            order.push(
                `similarity(unaccent(n.title), unaccent('${query}')) DESC`
            );
        }

        if (filter != '') {
            where.push(
                `unaccent(n_cate.name) ILIKE unaccent('${filter}')`
            );
        }

        if (is_published == 'true' || is_published == 'false') {
            where.push(`n.is_published = ${is_published}`);
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
                n.id AS news_id,
                n.title,
                n.public_date,
                n.measure_time,
                n.num_readers,
                n.main_img,
                n.main_content,
                n.is_published,

                n_cate.id AS category_id,
                n_cate.name,
                n_cate.rgb_color
            FROM news.news n
            JOIN news.news_categories n_cate ON n.category_id = n_cate.id
            ${where}
            ${order}
            ${limit}
        `;
        const { rows } = await pool.query(sql);

        const results = rows.map(row => ({
            id: row.news_id,
            title: row.title,
            is_published: row.is_published,
            public_date: row.public_date ? new Date(row.public_date).toLocaleDateString('vi-VN') : 'Chưa xuất bản',
            measure_time: row.measure_time,
            num_readers: row.num_readers,
            main_img: row.main_img,
            main_content: row.main_content,
            is_published: row.is_published,
            category: {
                id: row.category_id,
                name: row.name,
                rgb_color: row.rgb_color
            }
        }));
        
        if (page)
            return {
                totalCount: totalCount,
                page: page,
                pageSize: rows.length,
                results
            };
        else return [...results];
    },
    getListByCategory: async (query = '', filter = '', sort_by = 'date_desc', is_published, item_limit) => {
        query = query.trim().replaceAll(`'`, ``); // clean
        filter = filter.trim().replaceAll(`'`, ``); // clean
        sort_by = sort_by.trim().replaceAll(`'`, ``); // clean

        let where = [];
        let order = [];
        const limit = item_limit || 100;

        let order_option = 'n.public_date DESC';
        if (sort_by == 'popular')
            order_option = 'n.num_readers DESC';
        order.push(order_option);
        
        if (query != '') {
            where.push(
                `(unaccent(n.title::text) ILIKE '%' || unaccent('${query}'::text) || '%' OR
                similarity(unaccent(n.title::text), unaccent('${query}'::text)) > 0.1)`
            );
            
            order.push(
                `similarity(unaccent(n.title), unaccent('${query}')) DESC`
            );
        }

        if (filter != '') {
            where.push(
                `unaccent(n_cate.name) ILIKE unaccent('${filter}')`
            );
        }

        if (is_published == 'true' || is_published == 'false') {
            where.push(`n.is_published = ${is_published}`);
        }
        
        // Chuẩn hóa từng thành phần truy vấn
        if (where.length != 0) where = 'WHERE ' + where.join(' AND '); else where = '';
        if (order.length != 0) order = 'ORDER BY ' + order.join(', '); else order = '';

        const sql = `
            SELECT 
                n.id AS news_id,
                n.title,
                n.is_published,
                n.public_date,
                n.measure_time,
                n.num_readers,
                n.main_img,
                n.main_content,

                n_cate.id AS category_id,
                n_cate.name,
                n_cate.rgb_color
            FROM news.news n
            JOIN news.news_categories n_cate ON n.category_id = n_cate.id
            WHERE n.id IN (
                SELECT id FROM (
                    SELECT 
                        n.id,
                        ROW_NUMBER() OVER (PARTITION BY n.category_id ORDER BY n.title) AS rn
                    FROM news.news n   
                    ${where}
                    ${order}
                ) sub
                WHERE rn <= ${limit}
            )
            ORDER BY n_cate.id, n.public_date DESC
        `;
        const { rows } = await pool.query(sql);

        const groupedResults = {};
        for (const row of rows) {
            const categoryName = row.name;
            if (!groupedResults[categoryName]) {
                groupedResults[categoryName] = [];
            }

            groupedResults[categoryName].push({
                id: row.news_id,
                title: row.title,
                is_published: row.is_published,
                public_date: (new Date(row.public_date)).toLocaleDateString('vi-VN'),
                measure_time: row.measure_time,
                num_readers: row.num_readers,
                main_img: row.main_img,
                main_content: row.main_content,
                category: {
                    id: row.category_id,
                    name: row.name,
                    rgb_color: row.rgb_color
                }
            });
        }

        return groupedResults;
    },
    getOne: async (id) => {
        const query = `
            select 
                n.id,
                n.title,
                n.is_published,
                n.public_date,
                n.measure_time,
                n.num_readers,
                n.main_img,
                n.main_content,
                n.is_published,

                n_cate.id as category_id,
                n_cate.name,
                n_cate.rgb_color,

                (select is_visible from news.news_page) as is_visible
            from news.news n
            join news.news_categories n_cate on n_cate.id = n.category_id
            where n.id = $1
        `
        const row = (await pool.query(query, [id])).rows[0]
        const news = {
            id: row.id,
            title: row.title,
            is_published: row.is_published,
            public_date: row.public_date ? new Date(row.public_date).toLocaleDateString('vi-VN') : 'Chưa xuất bản',
            measure_time: row.measure_time,
            num_readers: row.num_readers,
            main_img: row.main_img,
            main_content: row.main_content,
            is_published: row.is_published,
            is_visible: row.is_visible,
            category: {
                id: row.category_id,
                name: row.name,
                rgb_color: row.rgb_color
        }};
        return news;
    },
    updateNumReaders: async (id) => {
        const query = `
            update news.news
            set num_readers = num_readers + 1
            where id = $1 
            returning id, num_readers
        `
        const row = (await pool.query(query, [id])).rows[0];
        const res = {
            id: row.id,
            num_readers: row.num_readers,
        }
        return res;
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
        const category_name = (await pool.query('SELECT name FROM news.news_categories WHERE id = $1', [category_id])).rows?.[0]?.name;
        if (!category_name) return {
            status: 404,
            message: "Không tìm loại tin tức"
        }

        const client = await pool.connect();
        try {
            await client.query("BEGIN");

            for (const item of changedItems) {
                const { id, category_id } = item;

                const result = await client.query(
                    `SELECT category_id FROM news.news WHERE id = $1`,
                    [id]
                );
                const oldCategoryId = result.rows[0]?.category_id;

                if (oldCategoryId !== category_id) {
                    await client.query(
                        `UPDATE news.news SET category_id = $1 WHERE id = $2`,
                        [category_id, id]
                    );

                    if (oldCategoryId) {
                        await client.query(
                            `UPDATE news.news_categories SET item_count = item_count - 1 WHERE id = $1`,
                            [oldCategoryId]
                        );
                    }

                    await client.query(
                        `UPDATE news.news_categories SET item_count = item_count + 1 WHERE id = $1`,
                        [category_id]
                    );
                }
            }

            await client.query("COMMIT");

            const news_ids = changedItems.map(item => item.id).join(', ');
            return {
                status: 200,
                message: "Gán loại tin tức thành công",
                action: `Gán loại tin tức ${category_id} - ${category_name} cho các tin tức: ${news_ids}`
            }
        } catch (error) {
            await client.query("ROLLBACK");
            console.error("Error during DB updateRegion:", error);
            throw error;
        } finally {
            client.release();
        }
    },
    deleteOne: async (id) => {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');
            //Xoa anh trong html tren cloudinary
            const sql = `
                select 
                    nc.content,
                    n.main_img
                from news.news_contents nc 
                join news.news n on nc.news_id = n.id
                where nc.news_id = $1
            `
            const row = (await pool.query(sql, [id])).rows[0]
            const content = row.content;
            const image = row.main_img;
            const cloudinary_images = extractAllImages(content);
            if(isCloudinary(image)){
                cloudinary_images.push(image);
            }
            await deleteImage(cloudinary_images);
            // Giảm item_count trong news_categories
            await client.query(`
            UPDATE news.news_categories
            SET item_count = item_count - 1
            WHERE id = (SELECT category_id FROM news.news WHERE id = $1)
            `, [id]);

            // Xoá nội dung dự án
            await client.query(`
            DELETE FROM news.news_contents
            WHERE news_id = $1
            `, [id]);
            await client.query(`
            DELETE FROM news.featured_news
            WHERE news_id = $1
            `, [id]);

            // Xoá dự án
            const result = await client.query(`
            DELETE FROM news.news
            WHERE id = $1
            RETURNING *
            `, [id]);

            await client.query('COMMIT');   
            if (result.rowCount > 0) return {
                status: 200,
                message: "Xóa tin tức thành công",
                action: `Xóa tin tức: ${id} - ${result?.rows?.[0]?.title}`
            }; else return {
                status: 404,
                message: "Không tìm thấy tin tức"
            }
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

}

const news_categories = {
    getAll: async () => {
        const news_categories = (await pool.query("SELECT * FROM news.news_categories ORDER BY id")).rows;
        if(!news_categories){
            throw new Error("Can't get news_categories");
        }
        return news_categories
    },
    getOne: async (id) => {
        const news_category = (await pool.query(`SELECT * FROM news.news_categories WHERE id = $1`, [id])).rows[0];
        if(!news_category){
            throw new Error("Can't get news_categories");
        }
        return news_category;
    },
    createOne: async(data) => {
        const {name, rgb_color} = data;

        const result = await pool.query(
            `INSERT INTO news.news_categories (name, rgb_color, item_count)
            VALUES($1, $2, 0)
            RETURNING id`,
            [name, rgb_color]
        );

        const id = result?.rows?.[0]?.id; 

        return {
            status: 200,
            message: "Thêm loại tin tức thành công",
            action: `Tạo loại tin tức: ${id} - ${name}`
        }
    },
    updateOne: async(data, id) => {
        const {name, rgb_color} = data;

        const old_name = (await pool.query(`SELECT name FROM news.news_categories WHERE id = $1`, [id])).rows?.[0]?.name;

        if (!old_name) return {
            status: 404,
            message: "Không tìm thấy loại tin tức"
        }

        await pool.query(
            `UPDATE news.news_categories
                SET name = $1, rgb_color = $2
                WHERE id = $3`,
                [name, rgb_color, id]
        );

        const note = (old_name != name) ? ' (đã đổi tên)' : '';

        return {
            status: 200,
            message: "Chỉnh sửa loại tin tức thành công",
            action: `Chỉnh sửa loại tin tức${note}: ${id} - ${name}`
        }
    },
    deleteOne: async (id) => {
        const client = await pool.connect();
        try {
            // Câu 1: Xoá news_contents
            try {
                await client.query(
                    'DELETE FROM news.news_contents WHERE news_id IN (SELECT id FROM news.news WHERE category_id = $1)',
                    [id]
                );
            } catch (err) {
                console.error("Lỗi xoá news_contents:", err.message);
            }

            try {
                await client.query(
                    'DELETE FROM news.featured_news WHERE news_id IN (SELECT id FROM news.news WHERE category_id = $1)',
                    [id]
                );
            } catch (err) {
                console.error("Lỗi xoá news_featured:", err.message);
            }

            // Câu 2: Xoá news
            try {
                await client.query(
                    'DELETE FROM news.news WHERE category_id = $1',
                    [id]
                );
            } catch (err) {
                console.error("Lỗi xoá news:", err.message);
            }

            // Câu 3: Xoá news_categories
            let result;
            try {
                result = await client.query(
                    'DELETE FROM news.news_categories WHERE id = $1 RETURNING *',
                    [id]
            );
            } catch (err) {
                console.error("Lỗi xoá news_categories:", err.message);
            }

            if (result.rowCount == 0) return {
                status: 404,
                message: "Không tìm thấy loại tin tức"
            }

            const { name } = result.rows[0];

            return {
                status: 200,
                message: "Xóa loại tin tức thành công",
                action: `Xóa loại tin tức và tất cả tin tức thuộc loại: ${id} - ${name}`
            }
        } finally {
            client.release();
        }
    }
}

const news_contents = {
    getAll: async () => {
        const query = `
            select 
                n_cont.news_id as content_id,
                n_cont.content,

                n.id as news_id,
                n.title,
                n.is_published,
                n.public_date,
                n.measure_time,
                n.num_readers,
                n.main_img,
                n.main_content,
                n.is_published,

                n_cate.id as category_id,
                n_cate.name,
                n_cate.rgb_color
            from news.news_contents n_cont
            join news.news n on n_cont.news_id = n.id
            join news.news_categories n_cate on n_cate.id = n.category_id
        `
        const { rows } = await pool.query(query);
        const news_contents = rows.map(row => ({
            id: row.content_id,
            content: row.content,
            news: {
              id: row.news_id,
              title: row.title,
              is_published: row.is_published,
              public_date: (new Date(row.public_date)).toLocaleDateString('vi-VN'),
              measure_time: row.measure_time,
              num_readers: row.num_readers,
              main_img: row.main_img,
              main_content: row.main_content,
              is_published: row.is_published,
              category: {
                id: row.category_id,
                name: row.name,
                rgb_color: row.rgb_color
              }
            }
          }));
          return news_contents
    },
    getOne: async (id) => {
        const query = `
            select 
                n_cont.news_id as content_id,
                n_cont.content,

                n.id as news_id,
                n.title,
                n.public_date,
                n.measure_time,
                n.num_readers,
                n.main_img,
                n.main_content,
                n.is_published,

                n_cate.id as category_id,
                n_cate.name,
                n_cate.rgb_color,
                (select is_visible from news.news_page) as is_visible

            from news.news_contents n_cont
            join news.news n on n_cont.news_id = n.id
            join news.news_categories n_cate on n_cate.id = n.category_id
            where n_cont.news_id = $1
        `

        const row = (await pool.query(query, [id])).rows[0]
        const news_content = {
            id: row.content_id,
            content: row.content,
            is_visible: row.is_visible,
            news: {
              id: row.news_id,
              title: row.title,
              is_published: row.is_published,
              public_date: row.public_date,
              measure_time: row.measure_time,
              num_readers: row.num_readers,
              main_img: row.main_img,
              main_content: row.main_content,
              is_published: row.is_published,
              category: {
                id: row.category_id,
                name: row.name,
                rgb_color: row.rgb_color
              }
            }
          };
          return news_content;
    },
    postOne: async (data, files) => {
        let contentHTML= data?.content;
        if(files?.images?.length){
            for(const img of files.images){
                const fakeName = img.originalname;
                const url = await uploadImage(img, 'news');
                contentHTML = contentHTML.replaceAll(fakeName, url);
            }
        }
        let cloud_avatar_img = null;
        if (files?.main_image?.[0]) {
            cloud_avatar_img = await uploadImage(files.main_image[0], 'news');
        }
        const {
            title,
            main_content,
            category_name,
            isPublished,
            countWord,
            main_image
        } = data;
        const final_main_image = cloud_avatar_img || main_image || null;

        //Get news_categories id
        const categoryRes = await pool.query(
            `SELECT id FROM news.news_categories WHERE name ILIKE $1`,
            [category_name]
        );
        const category_id = categoryRes.rows.length > 0 ? categoryRes.rows[0].id : null;
        //Insert news
        const insertNewsSql = `
            INSERT INTO news.news (
            category_id, title, is_published, public_date,
            measure_time, num_readers,
            main_img, main_content
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id, title;
        `;
        const measure_time = Math.ceil(countWord / 1000);

        const insertValues = [
            category_id,
            title,
            isPublished,
            new Date(),
            measure_time, // in case it's an object
            0,
            final_main_image,
            main_content
        ];
        const newsResult = await pool.query(insertNewsSql, insertValues);
        const news_id = newsResult.rows[0].id;
        if (news_id) {
            await pool.query(`
                UPDATE news.news_categories
                SET item_count = COALESCE(item_count, 0) + 1 
                WHERE id = $1
            `, [category_id]);
        }
        const news_title = newsResult.rows[0].title;
        const insertNewsContentSql = `
            INSERT INTO news.news_contents (news_id, content)
            values($1, $2)
        `
        const insertValuesNewsContent = [
            news_id,
            contentHTML
        ]
        await pool.query(insertNewsContentSql, insertValuesNewsContent);

        return {
            status: 200,
            message: "Tạo tin tức thành công",
            action: `Tạo tin tức: ${news_id} - ${news_title}`,
            id: news_id
        }
    },
    updateOne: async (id, data, files) => {
        const old_title = (await pool.query(`SELECT title FROM news.news WHERE id = $1`, [id])).rows?.[0]?.title;

        let contentHTML= data?.content;
        if(files?.images?.length){
            for(const img of files.images){
                const fakeName = img.originalname;
                const url = await uploadImage(img, 'news');
                contentHTML = contentHTML.replaceAll(fakeName, url);
            }
        }
        let imagesToDelete = data.delete_images;
        if (typeof imagesToDelete === 'string') {
            imagesToDelete = [imagesToDelete];
        }
        if (Array.isArray(imagesToDelete) && imagesToDelete.length > 0) {
            await deleteImage(imagesToDelete);
        }
        const {
            title,
            main_content,
            category_name,
            isPublished,
            countWord,
            main_image
        } = data;
        let cloud_avatar_img = null;
        if (files?.main_image?.[0]) {
            cloud_avatar_img = await uploadImage(files.main_image[0], 'news');
        }  
        const final_main_image = cloud_avatar_img || main_image || null;
        //Get news_categories id
        const categoryRes = await pool.query(
            `SELECT id FROM news.news_categories WHERE name ILIKE $1`,
            [category_name]
        );
        const category_id = categoryRes.rows.length > 0 ? categoryRes.rows[0].id : null;
        //Update news content
        const updateNewsContentSql = `
            UPDATE news.news_contents
            SET content = $1
            WHERE news_id = $2
        `;
        await pool.query(updateNewsContentSql, [contentHTML, id]);
        //Insert updateNews
        const updateNewsSql = `
            update news.news
            set 
                category_id = $1,
                title = $2, 
                is_published = $3,
                public_date = $4,
                measure_time = $5, 
                num_readers = $6, 
                main_img = $7, 
                main_content = $8
            where id = $9
        `
        const measure_time = Math.ceil(countWord / 1000);

        const updateValues = [
            category_id,
            title,
            isPublished,
            new Date(),
            measure_time,
            0,
            final_main_image,
            main_content,
            id
        ];
        await pool.query(updateNewsSql, updateValues);

        const note = (old_title != title) ? ' (đã đổi tên)' : '';
        return {
            status: 200,
            message: "Cập nhật tin tức thành công",
            action: `Cập nhật tin tức${note}: ${id} - ${title}`
        }        
    },
}
const getSearchCategoriesSuggestions = async (query) => {
    const cleanedQuery = query.trim().replaceAll(`'`, ``);
    const sql = `
        SELECT *
        FROM news.news_categories C
        WHERE similarity(unaccent(C.name::text), unaccent($1::text)) > 0
        ORDER BY similarity(unaccent(C.name::text), unaccent($1::text)) DESC
        LIMIT 5
    `;
    const values = [cleanedQuery];
    try {
        const result = await pool.query(sql, values);
        return result.rows.map(row => ({
            query: row.name,
            id: row.id,
            rgb_color: row.rgb_color,
            item_count: row.item_count || 0
        }));
    } catch (err) {
        throw new Error(`DB error: ${err.message}`);
    }
}

const getSearchSuggestions = async (query, filter, is_published) => {
    query = query.trim().replaceAll(`'`, ``);
    filter = filter.trim().replaceAll(`'`, ``);
    const suggestions_limit = 5;

    let where = [];
    let order = [];
    const limit = 'LIMIT ' + suggestions_limit;

    if (query != '') {
        where.push(`(unaccent(N.title::text) ILIKE '%' || unaccent('${query})'::text) || '%' OR
            similarity(unaccent(N.title::text), unaccent('${query}'::text)) > 0)`);
        order.push(`similarity(unaccent(N.title::text), unaccent('${query}')) DESC`);
    }
    if (filter != '') {
        where.push(`unaccent(C.name::text) ILIKE unaccent('${filter}')`);
    }
    if (is_published == 'false' || is_published == 'true') {
        where.push(`N.is_published = ${is_published}`);
    }

    // Chuẩn hóa các thành phần query
    if (where.length != 0) where = 'WHERE ' + where.join(' AND '); else where = '';
    if (order.length != 0) order = 'ORDER BY ' + order.join(', '); else order = '';

    const sql = `
        SELECT N.title, N.id, N.main_img
        FROM news.news N
        JOIN news.news_categories C ON N.category_id = C.id
        ${where}
        ${order}
        ${limit}
    `;

    try {
        const result = await pool.query(sql);
        return result.rows.map(row => ({
            query: row.title,
            id: row.id,
            img: row.main_img
        }));
    } catch (err) {
        throw new Error(`DB error: ${err.message}`);
    }
};

const count = async () => {
    const news_count = (await pool.query(`
        SELECT COUNT(*)::int AS news_count
        FROM news.news
    `)).rows[0];
    if(!news_count){
        throw new Error("Can't get news");
    }

    const categories_count = (await pool.query(`
        SELECT COUNT(*)::int AS categories_count
        FROM news.news_categories
    `)).rows[0];
    if(!categories_count){
        throw new Error("Can't get news_categories");
    }

    return {
        ...news_count,
        ...categories_count
    };
}

const featured_news = {
    getAll: async () => {
        const news_rows = (await pool.query(`
            SELECT
                FN.sort,
                FN.news_id,
                N.main_img,
                N.title,
                C.name,
                N.public_date
            FROM
                news.featured_news FN
                JOIN news.news N ON FN.news_id = N.id
                JOIN news.news_categories C ON N.category_id = C.id
            ORDER BY FN.sort ASC 
        `)).rows;
        
        const switch_time = (await pool.query(`
            SELECT news_switch_time
            FROM home.home_page    
        `)).rows[0].news_switch_time;

        const news = news_rows.map(row => ({
            sort: row.sort,
            id: row.news_id,
            img: row.main_img,
            main_content: row.main_content,
            title: row.title,
            name: row.name,
            date: (new Date(row.public_date)).toLocaleDateString('vi-VN')
        }));

        return {
            switch_time: switch_time,
            featured_news: [...news]
        };
    },
    updateAll: async (data) => {
        const {
            news_ids,
            switch_time
        } = data

        await pool.query('DELETE FROM news.featured_news');

        for (let sort = 1; sort <= news_ids.length; sort++) {
            await pool.query('INSERT INTO news.featured_news (news_id, sort) VALUES ($1, $2)', [news_ids[sort - 1], sort]);
        }
        
        await pool.query('UPDATE home.home_page SET news_switch_time = $1', [switch_time]);

        return {
            status: 200,
            message: "Cập nhật Tin Tức Nổi Bật thành công",
            action: `Cập nhật tin tức nổi bật`
        }
    }
}

export default { getAllTables, getNewsPage, getHighlightNews, updateNewsPage, news, news_categories, news_contents, getSearchSuggestions, count, getSearchCategoriesSuggestions, featured_news, updateVisibility};
