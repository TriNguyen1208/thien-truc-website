import pool from '#@/config/db.js'

const getAllTables = async (req, res) => {
    const recruitment = await getRecruitmentPage();
    return {
        ...recruitment
    };
}

const getRecruitmentPage = async (req, res) => {
    const recruitment_page = (await pool.query("SELECT * FROM recruitment.recruitment_page")).rows[0];
    if(!recruitment_page){
        throw new Error("Can't get recruitment_page");
    }
    return {
        recruitment_page
    };
}

export default { getAllTables, getRecruitmentPage };