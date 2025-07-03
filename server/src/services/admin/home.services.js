import pool from '#@/config/db.js'

const getHomePage = async() => {
    const home_page = (await pool.query("SELECT * FROM home.home_page")).rows[0];

    if(!home_page) {
        throw new Error("Can't get home_page");
    }
    return home_page;
}
export default {getHomePage};