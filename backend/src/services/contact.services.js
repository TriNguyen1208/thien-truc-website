import pool from '#@/config/db.js'

const getAllTables = async () => {
    const contact_page = await getContactPage();
    const company_info = await getCompanyInfo();
    const agents = await support_agents.getAll();
    return {
        ...contact_page,
        ...company_info,
        ...agents
    };
}

const getContactPage = async () => {
    const contact_page = (await pool.query("SELECT * FROM contact.contact_page")).rows[0];
    if(!contact_page){
        throw new Error("Can't get contact_page");
    }
    return {
        contact_page
    };
}

const getCompanyInfo = async () => {
    const company_info = (await pool.query("SELECT * FROM contact.company_info")).rows[0];
    if(!company_info){
        throw new Error("Can't get company_info");
    }
    return {
        company_info
    };
}

const support_agents = {
    getAll: async () => {
        const support_agents = (await pool.query("SELECT * FROM contact.support_agents")).rows;
        if (!support_agents){
            throw new Error("Can't get support_agents");
        }
        return {
            support_agents
        };
    },
    getOne: async (id) => {
        const support_agent_with_id = (await pool.query(`SELECT * FROM contact.support_agents WHERE id = ${id}`)).rows[0];
        if (!support_agent_with_id){
            throw new Error("Can't get support_agents");
        }
        return {
            support_agent_with_id
        };
    }
}

export default { getAllTables, getContactPage, getCompanyInfo, support_agents };