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
    if (!about_us_page) {
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
            message: "Cập nhật Banner thành công",
            action: "Cập nhật Banner trang Về chúng tôi"
        }
    },
    ourStory: async (data) => {
        const { content } = data;
        await pool.query(`
            UPDATE about_us.about_us_page
            SET
                our_story_content = $1 
        `, [content]);

        return {
            status: 200,
            message: "Cập nhật Câu chuyện của chúng tôi thành công",
            action: "Cập nhật Câu chuyện của chúng tôi trang Về chúng tôi"
        }
    },
    visibility: async (data) => {
        const { visibility } = data;
        await pool.query(`
            UPDATE about_us.about_us_page
            SET
                is_visible = $1
        `, [visibility]);

        const visibility_state = visibility == true ? "Bật" : "Tắt";
        return {
            status: 200,
            message: `${visibility_state} chế độ hiển thị trang Về chúng tôi thành công`,
            action: `${visibility_state} chế độ hiển thị trang Về chúng tôi`
        }
    }
}

const company_services = {
    getAll: async () => {
        const company_services = (await pool.query("SELECT * FROM about_us.company_services ORDER BY id ASC")).rows;
        if (!company_services) {
            throw new Error("Can't get company_services");
        }
        return company_services
    },
    getOne: async (id) => {
        const company_service = (await pool.query(`SELECT * FROM about_us.company_services WHERE id = ${id}`)).rows[0];
        if(!company_service) {
            throw new Error("Can't get company_services");
        }
        return company_service;
    },
    createOne: async (data) => {
        const { 
            title,
            description,
            details
        } = data;

        await pool.query(`
            INSERT INTO about_us.company_services (title, description, details)
            VALUES ($1, $2, $3)
            RETURNING id
        `, [title, description, details]);

        return {
            status: 200,
            message: "Tạo Nhiệm vụ và Trách nhiệm thành công",
            action: `Tạo Nhiệm vụ và Trách nhiệm trang Về chúng tôi: ${title}`
        }         
    },
    updateOne: async (data, id) => {
        const old_title = (await pool.query(`SELECT title FROM about_us.company_services WHERE id = $1`, [id])).rows?.[0]?.title;
        if (!old_title) return {
            status: 404,
            message: "Không tìm thấy Nhiệm vụ và Trách nhiệm",
        }

        const { 
            title,
            description,
            details
        } = data;

        await pool.query(`
            UPDATE about_us.company_services
            SET
                title = $1,
                description = $2,
                details = $3
            WHERE
                id = $4
        `, [title, description, details, id]);

        const note = (old_title != title) ? ' (đã đổi tên)' : '';
        return {
            status: 200,
            message: "Cập nhật Nhiệm vụ Và Trách nhiệm thành công",
            action: `Cập nhật Nhiệm vụ Và Trách nhiệm trang Về chúng tôi${note}: ${title}`
        }
    },
    deleteOne: async (id) => {
        const result = await pool.query(`
            DELETE FROM about_us.company_services WHERE id = ${id} RETURNING title
        `);

        if (result.rowCount == 0) return {
            status: 404,
            message: "Không tìm thấy Nhiệm Vụ Và Trách Nhiệm"
        }; 

        const { title } = result.rows[0];
        return {
            status: 200,
            message: "Xóa Nhiệm vụ Và Trách nhiệm thành công",
            action: `Xóa Nhiệm vụ Và Trách nhiệm trang Vê chúng tôi: ${title}`
        }
    }
}

const why_choose_us = {
    getAll: async () => {
        const why_choose_us = (await pool.query("SELECT * FROM about_us.why_choose_us")).rows;
        if(!why_choose_us) {
            throw new Error("Can't get why_choose_us");
        }
        return why_choose_us
    },
    getOne: async (id) => {
        const why_choose_us = (await pool.query(`SELECT * FROM about_us.why_choose_us WHERE id = ${id}`)).rows[0];
        if(!why_choose_us) {
            throw new Error("Can't get why_choose_us");
        }
        return why_choose_us;
    },
    createOne: async (data) => {
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
            message: "Tạo Tại sao chọn Thiên Trúc thành công",
            action: `Tạo Tại sao chọn Thiên trúc trang Về chúng tôi: ${title}`
        }         
    },
    updateOne: async (data, id) => {        
        const old_title = (await pool.query(`SELECT title FROM about_us.why_choose_us WHERE id = $1`, [id])).rows?.[0]?.title;
        if (!old_title) return {
            status: 404,
            message: "Không tìm thấy Tại sao chọn Thiên Trúc"
        }

        const { 
            title,
            description,
            details
        } = data;

        await pool.query(`
            UPDATE about_us.why_choose_us
            SET
                title = $1,
                description = $2,
                details = $3
            WHERE
                id = $4
        `, [title, description, details, id]);

        const note = (old_title != title) ? ' (đã đổi tên)' : ''
        return {
            status: 200,
            message: "Cập nhật Tại sao chọn Thiên Trúc thành công",
            action: `Cập nhật Tại sao chọn Thiên Trúc trang Về chúng tôi${note}: ${title}`
        }
    },
    deleteOne: async (id) => {
        const result = await pool.query(`
            DELETE FROM about_us.why_choose_us WHERE id = ${id} RETURNING title
        `);

        if (result.rowCount == 0) return {
            status: 404,
            message: "Không tìm thấy Tại sao chọn Thiên Trúc"
        }

        const { title } = result.rows[0];
        return {
            status: 200,
            message: "Xóa Tại sao chọn Thiên Trúc thành công",
            action: `Xóa Tại sao chọn Thiên Trúc trang Về chúng tôi: ${title}`
        }
    }
}
export default { getAllTables, getAboutUsPage, updateAboutUsPage, company_services, why_choose_us };