import pool from '#@/config/db.js'

const getAllTables = async () => {
    const _news_page = await getNewsPage();
    const _news = await news.getAll();
    const _news_categories = await news_categories.getAll();
    const _news_contents = await news_contents.getAll();
    return {
        news_page: _news_page,
        news_contents: _news_contents,
        news: _news,
        news_categories: _news_categories
    };
}

const getNewsPage = async () => {
    const news_page = (await pool.query("SELECT * FROM news.news_page")).rows[0];
    if(!news_page){
        throw new Error("Can't get news_page");
    }
    return news_page;
}

const news = {
    getAll: async () => {
        const query = `
            select 
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
            from news.news n
            join news.news_categories n_cate on n_cate.id = n.category_id
        `
        const { rows } = await pool.query(query);
        const news = rows.map(row => ({
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
        return news;
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
    }
}

const getSearchSuggestions = async (query, filter) => {
    const cleanedQuery = query.trim().replaceAll(`'`, ``);
    const cleanedFilter = filter.trim().replaceAll(`'`, ``);

    const sql = `
        SELECT DISTINCT ON (N.title) N.title as name, N.main_img
        FROM news.news N
        JOIN news.news_categories C ON N.category_id = C.id
        WHERE 
            ($2 = '' OR unaccent(C.name) ILIKE unaccent($2)) AND
            ($1 = '' OR similarity(unaccent(N.title::text), unaccent($1::text)) > 0)
        ORDER BY
            N.title,
            N.main_img,
            similarity(unaccent(N.title::text), unaccent($1::text)) DESC
        LIMIT 5
    `;
    const values = [cleanedQuery, cleanedFilter];
    try {
        const result = await pool.query(sql, values);
        return result.rows.map(({ main_img, ...rest}) => ({
            ...rest,
            img: main_img
        }))
    } catch (err) {
        throw new Error(`DB error: ${err.message}`);
    }
};

const getAllByFilter = async ({limit, sortBy, filter}) => {
    let orderBy = 'n.public_date DESC';
    if (sortBy == 'popular')
        orderBy = 'n.num_readers DESC';
    
    const query = `
        select 
            n.id as news_id,
            n.category_id,
            n.title,
            n.public_date,
            n.measure_time,
            n.num_readers,
            n.main_img,
            n.main_content,

            nc.id as category_id,
            nc.name,
            nc.rgb_color

            from news.news n
            join news.news_categories nc on nc.id = n.category_id
            where ($1 = '' or nc.name ILIKE '%' || $1 || '%')
            order by ${orderBy}
            limit $2
        `
    const { rows } = await pool.query(query, [filter, limit]);
    const news = rows.map(row => ({
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
    return news;
}

export default { getAllTables, getNewsPage, news, news_categories, news_contents, getSearchSuggestions, getAllByFilter};