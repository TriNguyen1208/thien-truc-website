import pool from '#@/config/db.js'

const getAllTables = async () => {
    const about_us_page = await getAboutUsPage();
    const services = await company_services.getAll();
    const _why_choose_us = await why_choose_us.getAll();
    return {
        ...about_us_page,
        ...services,
        ..._why_choose_us
    };
}

const getAboutUsPage = async () => {
    const about_us_page = (await pool.query("SELECT * FROM about_us.about_us_page")).rows;
    if(!about_us_page){
        throw new Error("Can't get about_us_page");
    }
    return {
        about_us_page
    };   
}

const company_services = {
    getAll: async () => {
        const company_services = (await pool.query("SELECT * FROM about_us.company_services")).rows;
        if(!company_services){
            throw new Error("Can't get company_services");
        }
        return {
            company_services
        };   
    },
    getById: async (id) => {
        const company_service = (await pool.query(`SELECT * FROM about_us.company_services WHERE id = ${id}`)).rows;
        if(!company_service){
            throw new Error("Can't get company_services");
        }
        return {
            company_service
        };
    }
}

const why_choose_us = {
    getAll: async () => {
        const why_choose_us = (await pool.query("SELECT * FROM about_us.why_choose_us")).rows;
        if(!why_choose_us){
            throw new Error("Can't get why_choose_us");
        }
        return {
            why_choose_us
        }; 
    },
    getById: async (id) => {
        const why_choose_us = (await pool.query(`SELECT * FROM about_us.why_choose_us WHERE id = ${id}`)).rows;
        if(!why_choose_us){
            throw new Error("Can't get why_choose_us");
        }
        return {
            why_choose_us
        }; 
    }
}
export default { getAllTables, getAboutUsPage, company_services, why_choose_us };