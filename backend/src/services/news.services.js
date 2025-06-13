import pool from '#@/config/db.js'

const getAllTables = async () => {
    const news_page = await getNewsPage();
    const _news = await news.getAll();
    const _news_categories = await news_categories.getAll();
    return {
        ...news_page,
        ..._news,
        ..._news_categories
    };
}

const getNewsPage = async () => {
    const news_page = (await pool.query("SELECT * FROM news.news_page")).rows;
    if(!news_page){
        throw new Error("Can't get news_page");
    }
    return {
        news_page
    };
}

const news = {
    getAll: async () => {
        const news = (await pool.query("SELECT * FROM news.news")).rows;
        if(!news){
            throw new Error("Can't get news");
        }
        return {
            news
        };
    },
    getById: async (id) => {
        const news = (await pool.query(`SELECT * FROM news.news WHERE id = ${id}`)).rows;
        if(!news){
            throw new Error("Can't get news");
        }
        return {
            news
        };
    }
}

const news_categories = {
    getAll: async () => {
        const news_categories = (await pool.query("SELECT * FROM news.news_categories")).rows;
        if(!news_categories){
            throw new Error("Can't get news_categories");
        }
        return {
            news_categories
        };
    },
    getById: async (id) => {
        const news_category = (await pool.query(`SELECT * FROM news.news_categories WHERE id = ${id}`)).rows;
        if(!news_category){
            throw new Error("Can't get news_categories");
        }
        return {
            news_category
        };
    }
}

export default { getAllTables, getNewsPage, news, news_categories };