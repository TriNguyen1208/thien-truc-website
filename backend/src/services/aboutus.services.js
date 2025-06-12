import pool from '#@/config/db.js'

const getAll = async () => {
    const about_us_page = (await pool.query("SELECT * FROM about_us.about_us_page")).rows;
    const company_service = (await pool.query("SELECT * FROM about_us.company_service")).rows;
    const why_choose_us = (await pool.query("SELECT * FROM about_us.why_choose_us")).rows;
    if(!about_us_page){
        throw new Error("Can't get about_us_page");
    }
    if(!company_service){
        throw new Error("Can't get company_service");
    }
    if(!why_choose_us){
        throw new Error("Can't get why_choose_us");
    }
    return {
        about_us_page: about_us_page,
        company_service: company_service,
        why_choose_us: why_choose_us
    };   
}
export default {getAll};