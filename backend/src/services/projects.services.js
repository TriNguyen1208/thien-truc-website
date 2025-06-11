import pool from '#@/config/db.js'
const getAll = async () => {
    const projects_page = (await pool.query("SELECT * FROM projects.projects_page")).rows;
    const projects = (await pool.query(
        `SELECT projects.*, region.name
         From projects.projects as projects, projects.projects_region as region
         where projects.region_id = region.id`
    )).rows
    if(!projects_page){
        throw new Error("Can't get projects_page");
    }
    if(!projects){
        throw new Error("Can't get projects");
    }
    return {
        projects_page: projects_page,
        projects: projects
    };
}
const getId = async (id) => {
    const projects = (await pool.query(
        `SELECT projects.*, region.name
         From projects.projects as projects, projects.projects_region as region
         where projects.region_id = region.id and projects.id = $1`, [id]
    )).rows
    if(!projects){
        throw new Error("Can't get projects");
    }
    return {
        projects: projects
    };
}
export default {getAll, getId};