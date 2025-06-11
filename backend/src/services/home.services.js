import pool from '#@/config/db.js'
const getAll = async () => {
    const home_page = (await pool.query("SELECT * FROM home.home_page")).rows;
    const highlight_stats_about_us= (await pool.query("SELECT * FROM home.highlight_stats_about_us")).rows;
    if(!home_page){
        throw new Error("Can't get home_page");
    }
    if(!highlight_stats_about_us){
        throw new Error("Can't get highlight_stats_about_us");
    }
    return {
        home_page: home_page,
        highlight_stats_about_us: highlight_stats_about_us
    };
    
}
export default {getAll};