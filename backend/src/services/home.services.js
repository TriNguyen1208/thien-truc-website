import pool from '#@/config/db.js'

const getAllTables = async () => {
    const home_page = await getHomePage();
    const highlight_stats = await highlight_stats_about_us.getAll();

    return {
        ...home_page,
        ...highlight_stats
    };
}

const getHomePage = async() => {
    const home_page = (await pool.query("SELECT * FROM home.home_page")).rows[0];

    if(!home_page) {
        throw new Error("Can't get home_page");
    }
    return { 
        home_page
    };
}

const highlight_stats_about_us = {
    getAll: async () => {
        const highlight_stats_about_us = (await pool.query("SELECT * FROM home.highlight_stats_about_us")).rows;

        if(!highlight_stats_about_us) {
            throw new Error("Can't get highlight_stats_about_us");
        }
        return {
            highlight_stats_about_us
        };
    },

    getOne: async (id) => {
        const highlight_stat_with_id = (await pool.query(`
            SELECT * FROM home.highlight_stats_about_us WHERE id = ${id}
        `)).rows[0];

        if(!highlight_stat_with_id) {
            throw new Error("Can't get highlight_stats_about_us");
        }    
        return {
            highlight_stat_with_id
        };
    }
}
export default { getAllTables, getHomePage, highlight_stats_about_us };