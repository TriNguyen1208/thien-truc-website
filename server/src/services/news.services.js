import pool from '#@/config/db.js'
import upload from '#@/middlewares/upload.middleware.js';
import uploadImage from '#@/utils/uploadImage.js';
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

const getNumPage = async (query, filter) => {
    let totalCount = 0;
    const hasQuery = query !== '';
    const hasFilter = filter !== '';
    // ✅ 1. Có query (search bar). Nếu có searchBar thì không dùng sort_by nữa
    if (hasQuery) {
        const sql = `
            SELECT COUNT(*) AS total
            FROM news.news n
            JOIN news.news_categories n_cate ON n.category_id = n_cate.id
            WHERE 
                $2 = '' OR unaccent(n_cate.name) ILIKE unaccent($2) AND
                (unaccent(n.title) ILIKE '%' || unaccent($1) || '%' OR
                similarity(unaccent(n.title), unaccent($1)) > 0.1)
        `;
        const values = [query, filter];
        const result = await pool.query(sql, values);
        totalCount = parseInt(result.rows[0].total);
        return totalCount;
    }

    // ✅ 2. Không có query
    if (!hasFilter) {
        // Trả về tối đa 9 trang, sắp xếp theo sortBy
        const result = await pool.query("SELECT COUNT(*) FROM news.news");
        totalCount = parseInt(result.rows[0].count);
        return totalCount;
    } else {
        // Có filter (theo category), phân trang theo sortBy
        const sql = `
            SELECT COUNT(*) AS total
            FROM news.news n
            JOIN news.news_categories nc on n.category_id = nc.id
            WHERE unaccent(nc.name) ILIKE unaccent($1)
        `;
        const results = await pool.query(sql, [filter]);
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

const news = {
    getList: async (query = '', filter = '', sort_by = 'date_desc', page, is_published, item_limit) => {
        query = query.trim().replaceAll(`'`, ``); // clean
        filter = filter.trim().replaceAll(`'`, ``); // clean
        const pageSize = item_limit || 9;
        const totalCount = await getNumPage(query, filter);

        let where = [];
        let order = [];
        let limit = '';

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
            
            let order_option = 'n.public_date DESC';
            if (sort_by == 'popular')
                order_option = 'n.num_readers DESC';
            order.push(order_option);
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
            public_date: row.public_date,
            measure_time: row.measure_time,
            num_readers: row.num_readers,
            main_img: row.main_img,
            main_content: row.main_content,
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

        let where = [];
        let order = [];
        const limit = item_limit || 100;

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
            
            let order_option = 'n.public_date DESC';
            if (sort_by == 'popular')
                order_option = 'n.num_readers DESC';
            order.push(order_option);
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
                public_date: row.public_date,
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
                n.public_date,
                n.measure_time,
                n.num_readers,
                n.main_img,
                n.main_content,

                n_cate.id as category_id,
                n_cate.name,
                n_cate.rgb_color
            from news.news n
            join news.news_categories n_cate on n_cate.id = n.category_id
            where n.id = ${id}
        `
        const row = (await pool.query(query)).rows[0]
        const news = {
            id: row.id,
            title: row.title,
            public_date: row.public_date,
            measure_time: row.measure_time,
            num_readers: row.num_readers,
            main_img: row.main_img,
            main_content: row.main_content,
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
    }
}

const news_categories = {
    getAll: async () => {
        const news_categories = (await pool.query("SELECT * FROM news.news_categories")).rows;
        if(!news_categories){
            throw new Error("Can't get news_categories");
        }
        return news_categories
    },
    getOne: async (id) => {
        const news_category = (await pool.query(`SELECT * FROM news.news_categories WHERE id = ${id}`)).rows[0];
        if(!news_category){
            throw new Error("Can't get news_categories");
        }
        return news_category;
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
                n.public_date,
                n.measure_time,
                n.num_readers,
                n.main_img,
                n.main_content,

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
              public_date: row.public_date,
              measure_time: row.measure_time,
              num_readers: row.num_readers,
              main_img: row.main_img,
              main_content: row.main_content,
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

                n_cate.id as category_id,
                n_cate.name,
                n_cate.rgb_color
            from news.news_contents n_cont
            join news.news n on n_cont.news_id = n.id
            join news.news_categories n_cate on n_cate.id = n.category_id
            where n_cont.news_id = ${id}
        `
        const row = (await pool.query(query)).rows[0]
        const news_content = {
            id: row.content_id,
            content: row.content,
            news: {
              id: row.news_id,
              title: row.title,
              public_date: row.public_date,
              measure_time: row.measure_time,
              num_readers: row.num_readers,
              main_img: row.main_img,
              main_content: row.main_content,
              category: {
                id: row.category_id,
                name: row.name,
                rgb_color: row.rgb_color
              }
            }
          };
          return news_content;
    },
    postOne: async (body, files) => {
        const result = {};
        if(files?.main_image?.[0]){
            console.log("huhu");
            const mainImageUrl = await uploadImage(files.main_image[0], 'news');
            result.main_image = mainImageUrl
        }
        let imageUrls = [];
        if(files?.images?.length){
            for(const img of files.images){
                const url = await uploadImage(img, 'news');
                imageUrls.push(url);
            }
            result.imageUrls = imageUrls;
        }
        
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

export default { getAllTables, getNewsPage, news, news_categories, news_contents, getSearchSuggestions, count};
