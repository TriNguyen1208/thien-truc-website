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
const getNumPage = async (query, filter) => {
    let totalCount = 0;
    const hasQuery = query !== '';
    const hasFilter = filter !== '';
    // ✅ 1. Có query (search bar). Nếu có searchBar thì không dùng sort_by nữa
    if (hasQuery) {
        const sql = `
            SELECT COUNT(*) AS total
            FROM project.projects prj
            JOIN project.project_regions prj_reg ON prj.region_id = prj_reg.id
            WHERE
                ($2 = '' OR unaccent(prj_reg.name) ILIKE unaccent($2)) AND
                similarity(unaccent(prj.title::text), unaccent($1::text)) > 0.1
        `;
        const values = [query, filter];
        const result = await pool.query(sql, values);
        totalCount = parseInt(result.rows[0].total);
        return totalCount;
    }

    // ✅ 2. Không có query
    if (!hasFilter) {
        // Trả về tối đa 9 trang, sắp xếp theo sortBy
        const result = await pool.query(`SELECT COUNT(*) AS total FROM project.projects`);
        totalCount = parseInt(result.rows[0].total);
        return totalCount;
    } else {
        // Có filter (theo category), phân trang theo sortBy
        const sql = `
            SELECT COUNT(*) AS total
            FROM project.projects prj
            JOIN project.project_regions prj_reg ON prj.region_id = prj_reg.id
                WHERE unaccent(prj_reg.name) ILIKE unaccent($1)
        `;
        const results = await pool.query(sql, [filter]);
        totalCount = parseInt(results.rows[0].total);
        return totalCount;
    }
}
const getProjectPage = async () => {
    const project_page = (await pool.query("SELECT * FROM project.project_page")).rows[0];
    if(!project_page){
        throw new Error("Can't get project_page");
    }
    return {
        ...project_page,
    };
}

const projects = {
    getList: async (query = '', filter = '', page = 1) => {
        const cleanedQuery = query.trim().replaceAll(`'`, ``);
        const cleanedFilter = filter.trim().replaceAll(`'`, ``);
        const pageSize = 9;
        const offset = (page - 1) * pageSize;
        const totalCount = await getNumPage(cleanedQuery, cleanedFilter);
        const hasQuery = cleanedQuery !== '';
        const hasFilter = cleanedFilter !== '';
    
        // ✅ 1. Có query (tức dùng search bar)
        if (hasQuery) {
            const sql = `
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
                    similarity(unaccent(prj.title::text), unaccent($1::text)) > 0.1
                ORDER BY 
                    similarity(unaccent(prj.title::text), unaccent($1::text)) DESC,
                    prj.title
                LIMIT $3 OFFSET $4
            `;
            const values = [cleanedQuery, cleanedFilter, pageSize, offset];
            const { rows } = await pool.query(sql, values);
    
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
                totalCount,
                page,
                pageSize: rows.length,
                results
            };
        }
    
        // ✅ 2. Không có query
    
        if (!hasFilter) {
            // Trả về tối đa 9 trang (81 dự án)
            const sql = `
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
                ORDER BY prj.title
                LIMIT $1 OFFSET $2
            `;
            const values = [pageSize, offset]
            const { rows } = await pool.query(sql, values);
    
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
                totalCount,
                page: page,
                pageSize: rows.length,
                results
            };
        } else {
            // Có filter, không có query → lọc theo region + phân trang
            const sql = `
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
                    WHERE unaccent(prj_reg.name) ILIKE unaccent($1)
                ORDER BY prj.title
                LIMIT $2 OFFSET $3
            `;
            const values = [cleanedFilter, pageSize, offset];
            const { rows } = await pool.query(sql, values);
    
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
                totalCount,  
                page,
                pageSize: rows.length,
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
        SELECT P.title, P.id, P.main_img
        FROM project.projects P
        JOIN project.project_regions R ON P.region_id = R.id
        WHERE
            ($2 = '' OR unaccent(R.name) ILIKE unaccent($2)) AND
            ($1 = '' OR similarity(unaccent(P.title::text), unaccent($1::text)) > 0)
        ORDER BY
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