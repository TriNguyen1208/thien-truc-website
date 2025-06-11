import pool from '#@/config/db.js'
const getAll = async () => {
    const recruitment_page = (await pool.query("SELECT * FROM recruitment.recruitment_page")).rows;
    if(!recruitment_page){
        throw new Error("Can't get recruitment_page");
    }
    return {
        recruitment_page: recruitment_page,
    };
    
}
export default {getAll};