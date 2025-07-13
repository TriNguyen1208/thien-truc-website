import pool from '#@/config/db.js'

const getAllTables = async () => {
    const _home_page = await getHomePage();
    const _highlight_stats_about_us = await highlight_stats_about_us.getAll();

    return {
        home_page: _home_page,
        highlight_stats_about_us: _highlight_stats_about_us
    };
}

const getHomePage = async() => {
    const home_page = (await pool.query("SELECT * FROM home.home_page")).rows[0];

    if(!home_page) {
        throw new Error("Can't get home_page");
    }
    return home_page;
}

const updateHomePage = {
    banner: async(data) => {
        const title = data["Tiêu đề Banner"];
        const description = data["Mô tả Banner"];

        await pool.query(`
            UPDATE home.home_page
            SET
                banner_title = $1,
                banner_description = $2
        `, [title, description]);
    },
    aboutUs: async (data) => {
        const content = data["Nội dung giới thiệu"];
        const image = data["Ảnh đại diện (URL)"];

        await pool.query(`
            UPDATE home.home_page
            SET
                aboutus_content = $1,
                aboutus_img = $2
        `, [content, image]);
    }
}

const highlight_stats_about_us = {
    getAll: async () => {
        const highlight_stats_about_us = (await pool.query("SELECT * FROM home.highlight_stats_about_us")).rows;

        if(!highlight_stats_about_us) {
            throw new Error("Can't get highlight_stats_about_us");
        }
        return highlight_stats_about_us
    },

    getOne: async (id) => {
        const highlight_stat_with_id = (await pool.query(`
            SELECT * FROM home.highlight_stats_about_us WHERE id = ${id}
        `)).rows[0];

        if(!highlight_stat_with_id) {
            throw new Error("Can't get highlight_stats_about_us");
        }    
        return highlight_stat_with_id;
    }
}
export default { getAllTables, getHomePage, updateHomePage, highlight_stats_about_us };