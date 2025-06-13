import pool from '#@/config/db.js'

const getAllTables = async () => {
    const project_page = await getProjectPage();
    const _projects = await projects.getAll();
    const _project_regions = await project_regions.getAll();
    return {
        ...project_page,
        ..._projects,
        ..._project_regions
    };
}

const getProjectPage = async () => {
    const project_page = (await pool.query("SELECT * FROM project.project_page")).rows;
    if(!project_page){
        throw new Error("Can't get project_page");
    }
    return {
        project_page
    };
}

const projects = {
    getAll: async () => {
        const projects = (await pool.query("SELECT * FROM project.projects")).rows;
        if(!projects){
            throw new Error("Can't get projects");
        }
        return {
            projects
        };
    },
    getById: async (id) => {
        const project = (await pool.query(`SELECT * FROM project.projects WHERE id = ${id}`)).rows;
        if(!project){
            throw new Error("Can't get projects");
        }
        return {
            project
        };
    }
}

const project_regions = {
    getAll: async () => {
        const project_regions = (await pool.query("SELECT * FROM project.project_regions")).rows;
        if(!project_regions){
            throw new Error("Can't get project_regions");
        }
        return {
            project_regions
        };
    },
    getById: async (id) => {
        const project_region = (await pool.query(`SELECT * FROM project.project_regions WHERE id = ${id}`)).rows;
        if(!project_region){
            throw new Error("Can't get project_regions");
        }
        return {
            project_region
        };
    }
}

export default { getAllTables, getProjectPage, projects, project_regions };