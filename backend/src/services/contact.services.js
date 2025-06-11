import pool from '#@/config/db.js'
const getAll = async () => {
    const contact_page = (await pool.query("SELECT * FROM contact.contact_page")).rows;
    const support_agent = (await pool.query("SELECT * FROM contact.support_agent")).rows;
    const company_info = (await pool.query("SELECT * FROM contact.company_info")).rows;
    if(!contact_page){
        throw new Error("Can't get contact_page");
    }
    if(!support_agent){
        throw new Error("Can't get support_agent");
    }
    if(!company_info){
        throw new Error("Can't get company_info");
    }
    return {
        contact_page: contact_page,
        support_agent: support_agent,
        company_info: company_info
    };
    
}
export default {getAll};