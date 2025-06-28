import pool from '#@/config/db.js'

const getAllTables = async (filter = '') => {
    const _project_page = await getProjectPage();
    const _projects = await projects.getList();
    const _project_regions = await project_regions.getAll();
    const _project_contents = await project_contents.getAll();
    return {
        project_page: _project_page,
        project_contents: _project_contents,
        projects: _projects,
        project_regions: _project_regions
    };
}

const getProjectPage = async (filter = '') => {
    const project_page = (await pool.query("SELECT * FROM project.project_page")).rows[0];
    if(!project_page){
        throw new Error("Can't get project_page");
    }

    const cleanedFilter = filter.trim().replaceAll(`'`, ``);
    let totalCount = 0;

    if (cleanedFilter === '') {
        const result = await pool.query(`SELECT COUNT(*) AS total FROM project.projects`);
        totalCount = parseInt(result.rows[0].total);
    }
    else {
        const countQuery = `
            SELECT COUNT(*) AS total
            FROM project.projects prj
            JOIN project.project_regions prj_reg ON prj.region_id = prj_reg.id
            WHERE unaccent(prj_reg.name) ILIKE unaccent($1)
        `;
        const result = await pool.query(countQuery, [cleanedFilter]);
        totalCount = parseInt(result.rows[0].total);
    }
    return {
        ...project_page,
        totalCount
    };
}

const projects = {
    getList: async (query = '', filter = '', page = 1) => {
        const cleanedQuery = query.trim().replaceAll(`'`, ``);
        const cleanedFilter = filter.trim().replaceAll(`'`, ``);
        const pageSize = 9;
        const offset = (page - 1) * pageSize;

        const hasQuery = cleanedQuery !== '';
        const hasFilter = cleanedFilter !== '';
        const isPaged = page !== 1;

        if (!hasQuery && !hasFilter && !isPaged) {
            const query = `
                select 
                    prj.id as prj_id,
                    prj.title,
                    prj.province,
                    prj.complete_time,
                    prj.main_img,
                    prj.main_content,

                    prj_reg.id as reg_id,
                    prj_reg.name,
                    prj_reg.rgb_color
                from project.projects prj
                join project.project_regions prj_reg on prj.region_id = prj_reg.id
            `;
            const { rows } = await pool.query(query);
            const results = rows.map(row => ({
                id: row.prj_id,
                title: row.title,
                province: row.province,
                complete_time: row.complete_time,
                main_img: row.main_img,
                main_content: row.main_content,
                region: {
                    id: row.reg_id,
                    name: row.name,
                    rgb_color: row.rgb_color
                }
            }));

            return {
                page: 1,
                pageSize: results.length,
                results
            };
        } 
        
        if (hasQuery) {
            const query = `
                SELECT 
                    prj.id AS prj_id,
                    prj.title,
                    prj.province,
                    prj.complete_time,
                    prj.main_img,
                    prj.main_content,
                    prj_reg.id AS reg_id,
                    prj_reg.name,
                    prj_reg.rgb_color
                FROM project.projects prj
                JOIN project.project_regions prj_reg ON prj.region_id = prj_reg.id
                WHERE
                    ($2 = '' OR unaccent(prj_reg.name) ILIKE unaccent($2)) AND
                    similarity(unaccent(prj.title::text), unaccent($1::text)) > 0
                ORDER BY prj.title, similarity(unaccent(prj.title::text), unaccent($1::text)) DESC
                LIMIT $3 OFFSET $4
            `;
            const dataValues = [cleanedQuery, cleanedFilter, pageSize, offset];
            const { rows } = await pool.query(query, dataValues);

            const results = rows.map(row => ({
                id: row.prj_id,
                title: row.title,
                province: row.province,
                complete_time: row.complete_time,
                main_img: row.main_img,
                main_content: row.main_content,
                region: {
                    id: row.reg_id,
                    name: row.name,
                    rgb_color: row.rgb_color
                }
            }));

            return {
                page,
                pageSize,
                results
            };
     } else {
        const query = `
            SELECT 
                prj.id AS prj_id,
                prj.title,
                prj.province,
                prj.complete_time,
                prj.main_img,
                prj.main_content,
                prj_reg.id AS reg_id,
                prj_reg.name,
                prj_reg.rgb_color
            FROM project.projects prj
            JOIN project.project_regions prj_reg ON prj.region_id = prj_reg.id
            WHERE
                ($1 = '' OR unaccent(prj_reg.name) ILIKE unaccent($1))
            ORDER BY prj.title
            LIMIT $2 OFFSET $3
            `;
        const dataValues = [cleanedFilter, pageSize, offset];
        const { rows } = await pool.query(query, dataValues);

        const results = rows.map(row => ({
            id: row.prj_id,
            title: row.title,
            province: row.province,
            complete_time: row.complete_time,
            main_img: row.main_img,
            main_content: row.main_content,
            region: {
                id: row.reg_id,
                name: row.name,
                rgb_color: row.rgb_color
            }
            }));

        return {
            page,
            pageSize,
            results
        };
     }
    },
    getOne: async (id) => {
        const query = `
            select 
                prj.id as prj_id,
                prj.title,
                prj.province,
                prj.complete_time,
                prj.main_img,
                prj.main_content,

                prj_reg.id as reg_id,
                prj_reg.name,
                prj_reg.rgb_color
            from project.projects prj
            join project.project_regions prj_reg on prj.region_id = prj_reg.id
            where prj.id = ${id}
        `
        const row = (await pool.query(query)).rows[0]
        const project = {
            id: row.prj_id,
            title: row.title,
            province: row.province,
            complete_time: row.complete_time,
            main_img: row.main_img,
            main_content: row.main_content,
            region: {
                id: row.reg_id,
                name: row.name,
                rgb_color: row.rgb_color
            }
        };
        return project;
    }
}

const project_regions = {
    getAll: async () => {
        const project_regions = (await pool.query("SELECT * FROM project.project_regions")).rows;
        if(!project_regions){
            throw new Error("Can't get project_regions");
        }
        return project_regions
    },
    getOne: async (id) => {
        const project_region = (await pool.query(`SELECT * FROM project.project_regions WHERE id = ${id}`)).rows[0];
        if(!project_region){
            throw new Error("Can't get project_regions");
        }
        return project_region
    }
}

const project_contents = {
    getAll: async () => {
        const query = `
            select 
                prj_cont.project_id as cont_id,
                prj_cont.content,

                prj.id as prj_id,
                prj.title,
                prj.province,
                prj.complete_time,
                prj.main_img,
                prj.main_content,

                prj_reg.id as reg_id,
                prj_reg.name,
                prj_reg.rgb_color
            from project.project_contents prj_cont
            join project.projects prj on prj_cont.project_id = prj.id
            join project.project_regions prj_reg on prj.region_id = prj_reg.id
        `
        const { rows } = await pool.query(query);
        const project_contents = rows.map(row => ({
            id: row.cont_id,
            content: row.content,
            project:{
                id: row.prj_id,
                title: row.title,
                province: row.province,
                complete_time: row.complete_time,
                main_img: row.main_img,
                main_content: row.main_content,
                region: {
                    id: row.reg_id,
                    name: row.name,
                    rgb_color: row.rgb_color
                }
            }}));
        return project_contents
    },
    getOne: async (id) => {
        const query = `
            select 
                prj_cont.project_id as cont_id,
                prj_cont.content,

                prj.id as prj_id,
                prj.title,
                prj.province,
                prj.complete_time,
                prj.main_img,
                prj.main_content,

                prj_reg.id as reg_id,
                prj_reg.name,
                prj_reg.rgb_color
            from project.project_contents prj_cont
            join project.projects prj on prj_cont.project_id = prj.id
            join project.project_regions prj_reg on prj.region_id = prj_reg.id
            where prj_cont.project_id = ${id}
        `
        const row = (await pool.query(query)).rows[0]
        const project_content = {
            id: row.cont_id,
            content: row.content,
            project:{
                id: row.prj_id,
                title: row.title,
                province: row.province,
                complete_time: row.complete_time,
                main_img: row.main_img,
                main_content: row.main_content,
                region: {
                    id: row.reg_id,
                    name: row.name,
                    rgb_color: row.rgb_color
                }
            }};
        return project_content;
    }
}

const getSearchSuggestions = async (query, filter) => {
    const cleanedQuery = query.trim().replaceAll(`'`, ``);
    const cleanedFilter = filter.trim().replaceAll(`'`, ``);

    const sql = `
        SELECT DISTINCT ON (P.title) P.title, P.id, P.main_img
        FROM project.projects P
        JOIN project.project_regions R ON P.region_id = R.id
        WHERE
            ($2 = '' OR unaccent(R.name) ILIKE unaccent($2)) AND
            similarity(unaccent(P.title::text), unaccent($1::text)) > 0
        ORDER BY
            P.title, 
            similarity(unaccent(P.title::text), unaccent($1::text)) DESC
        LIMIT 5
    `;
    const values = [cleanedQuery, cleanedFilter];
    try {
        const result = await pool.query(sql, values);
        return result.rows.map(row => ({
            query: row.title,
            id: row.id,
            img: row.main_img
        }));
    } catch (err) {
        throw new Error(`DB error: ${err.message}`);
    }
};

export default { getAllTables, getProjectPage, projects, project_regions, project_contents, getSearchSuggestions};