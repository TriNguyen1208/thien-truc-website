import pool from '#@/config/db.js'

const getAll = async () => {
    const news_page = (await pool.query("SELECT * FROM news.news_page")).rows;
    const news = (await pool.query(
        `SELECT news.*, cate.name
         From news.news as news, news.news_category as cate
         where news.category_id = cate.id`
    )).rows
    if(!news_page){
        throw new Error("Can't get news_page");
    }
    if(!news){
        throw new Error("Can't get news");
    }
    return {
        news_page: news_page,
        news: news
    };
}
const getId = async (id) => {
    const news = (await pool.query(
        `SELECT news.*, cate.name
         From news.news as news, news.news_category as cate
         where news.category_id = cate.id and news.id = $1`, [id]
    )).rows
    if(!news){
        throw new Error("Can't get news");
    }
    return {
        news: news
    };
}
export default {getAll, getId};