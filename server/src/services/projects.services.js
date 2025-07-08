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
    getList: async (query = '', filter = '', page, is_featured) => {
        query = query.trim().replaceAll(`'`, ``); // clean
        filter = filter.trim().replaceAll(`'`, ``); // clean
        const pageSize = 9;
        const totalCount = await getNumPage(query, filter);

        let where = [];
        let order = [];
        let limit = '';

        if (query != '') {
            where.push(
                `(unaccent(prj.title::text) ILIKE '%' || unaccent('${query}'::text) || '%' OR
                similarity(unaccent(prj.title::text), unaccent('${query}'::text)) > 0.1)`
            );
            
            order.push(
                `similarity(unaccent(prj.title), unaccent('${query}')) DESC`
            );
        }

        if (filter != '') {
            where.push(
                `unaccent(prj_reg.name) ILIKE unaccent('${filter}')`
            );
        }

        if (is_featured == 'true' || is_featured == 'false') {
            where.push(`prj.is_featured = ${is_featured}`);
        }

        if (page) {
            const offset = (page - 1) * pageSize;
            limit = `${pageSize} OFFSET ${offset}`;
        } else {
            limit = 'ALL';
        }
        
        // Chuẩn hóa từng thành phần truy vấn
        if (where.length != 0) where = 'WHERE ' + where.join(' AND '); else where = '';
        if (order.length != 0) order = 'ORDER BY ' + order.join(', '); else order = '';
        if (limit != '') limit = ` LIMIT ${limit} `;
        
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
            ${where}
            ${order}
            ${limit}
        `;
        
        const { rows } = await pool.query(sql);
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
        if (page)
            return {
                totalCount,
                page: page,
                pageSize: rows.length,
                results
            };
        else
            return [...results];
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
//  href = {companyInfoData.googlemaps_url}
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

const getHighlightProjects = async () => {
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

        FROM project.project_regions prj_reg,
            unnest(prj_reg.highlight_project_ids) AS highlighted_id
        JOIN project.projects prj ON prj.id = highlighted_id
    `;
    try {
        const { rows } = await pool.query(sql);
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
        return results;
    } catch (err) {
        throw new Error(`DB error: ${err.message}`);
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
            (unaccent(P.title::text) ILIKE '%' || unaccent($1::text) || '%' OR
            similarity(unaccent(P.title::text), unaccent($1::text)) > 0)
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

export default { getAllTables, getProjectPage, projects, project_regions, project_contents,getHighlightProjects, getSearchSuggestions};