import pool from '#@/config/db.js'

const getAllTables = async () => {
    const _about_us_page = await getAboutUsPage();
    const _company_services = await company_services.getAll();
    const _why_choose_us = await why_choose_us.getAll();
    return {
        about_us_page: _about_us_page,
        company_services: _company_services,
        why_choose_us: _why_choose_us
    };
}

const getAboutUsPage = async () => {
    const about_us_page = (await pool.query("SELECT * FROM about_us.about_us_page")).rows[0];
    if(!about_us_page){
        throw new Error("Can't get about_us_page");
    }
    return about_us_page;
}

const updateAboutUsPage = {
    banner: async (data) => {
        const {
            title,
            description
        } = data;

        await pool.query(`
            UPDATE about_us.about_us_page
            SET
                banner_title = $1,
                banner_description = $2    
        `, [title, description]);

        return {
            status: 200,
            message: "Cập nhật Banner thành công"
        }
    },
    ourStory: async (data) => {
        const {
            our_story_content
        } = data;

        await pool.query(`
            UPDATE about_us.about_us_page
            SET
                our_story_content = $1 
        `, [our_story_content]);

        return {
            status: 200,
            message: "Cập nhật Câu Chuyện Của Chúng Tôi thành công"
        }
    }
}

const company_services = {
    getAll: async () => {
        const company_services = (await pool.query("SELECT * FROM about_us.company_services ORDER BY id ASC")).rows;
        if(!company_services){
            throw new Error("Can't get company_services");
        }
        return company_services
    },
    getOne: async (id) => {
        const company_service = (await pool.query(`SELECT * FROM about_us.company_services WHERE id = ${id}`)).rows[0];
        if(!company_service){
            throw new Error("Can't get company_services");
        }
        return company_service;
    },
    createOne: async (data) => {
        const rowCount = (await pool.query(`SELECT COUNT(*)::int FROM about_us.company_services`)).rows[0].count;
        if (rowCount >= 4) return {
            status: 404,
            message: "Không thể tạo mới vì đã đủ số lượng tối đa (4)"
        }

        const { 
            title,
            description,
            details
        } = data;

        await pool.query(`
            INSERT INTO about_us.company_services (title, description, details)
            VALUES ($1, $2, $3)
        `, [title, description, details]);

        return {
            status: 200,
            message: "Tạo Nhiệm Vụ Và Trách Nhiệm thành công"
        }         
    },
    updateOne: async (data, id) => {
        const { 
            title,
            description,
            details
        } = data;

        const { rowCount } = await pool.query(`
            UPDATE about_us.company_services
            SET
                title = $1,
                description = $2,
                details = $3
            WHERE
                id = $4
        `, [title, description, details, id]);

        if (rowCount > 0) return {
            status: 200,
            message: "Cập nhật Nhiệm Vụ Và Trách Nhiệm thành công"
        }; else return {
            status: 404,
            message: "Không tìm thấy Nhiệm Vụ Và Trách Nhiệm"
        }
    },
    deleteOne: async (id) => {
        const { rowCount } = await pool.query(`
            DELETE FROM about_us.company_services WHERE id = ${id}
        `);

        if (rowCount > 0) return {
            status: 200,
            message: "Xóa Nhiệm Vụ Và Trách Nhiệm thành công"
        }; else return {
            status: 404,
            message: "Không tìm thấy Nhiệm Vụ Và Trách Nhiệm"
        }
    }
}

const why_choose_us = {
    getAll: async () => {
        const why_choose_us = (await pool.query("SELECT * FROM about_us.why_choose_us")).rows;
        if(!why_choose_us){
            throw new Error("Can't get why_choose_us");
        }
        return why_choose_us
    },
    getOne: async (id) => {
        const why_choose_us = (await pool.query(`SELECT * FROM about_us.why_choose_us WHERE id = ${id}`)).rows[0];
        if(!why_choose_us){
            throw new Error("Can't get why_choose_us");
        }
        return why_choose_us;
    },
    createOne: async (data) => {
        const rowCount = (await pool.query(`SELECT COUNT(*)::int FROM about_us.why_choose_us`)).rows[0].count;
        if (rowCount >= 4) return {
            status: 404,
            message: "Không thể tạo mới vì đã đủ số lượng tối đa (4)"
        }

        const { 
            title,
            description,
            details
        } = data;

        await pool.query(`
            INSERT INTO about_us.why_choose_us (title, description, details)
            VALUES ($1, $2, $3)
        `, [title, description, details]);

        return {
            status: 200,
            message: "Tạo Tại Sao Chọn Thiên Trúc thành công"
        }         
    },
    updateOne: async (data, id) => {
        const { 
            title,
            description,
            details
        } = data;

        const { rowCount } = await pool.query(`
            UPDATE about_us.why_choose_us
            SET
                title = $1,
                description = $2,
                details = $3
            WHERE
                id = $4
        `, [title, description, details, id]);

        if (rowCount > 0) return {
            status: 200,
            message: "Cập nhật Tại Sao Chọn Thiên Trúc thành công"
        }; else return {
            status: 404,
            message: "Không tìm thấy Tại Sao Chọn Thiên Trúc"
        }
    },
    deleteOne: async (id) => {
        const { rowCount } = await pool.query(`
            DELETE FROM about_us.why_choose_us WHERE id = ${id}
        `);

        if (rowCount > 0) return {
            status: 200,
            message: "Xóa Tại Sao Chọn Thiên Trúc thành công"
        }; else return {
            status: 404,
            message: "Không tìm thấy Tại Sao Chọn Thiên Trúc"
        }
    }
}
export default { getAllTables, getAboutUsPage, updateAboutUsPage, company_services, why_choose_us };