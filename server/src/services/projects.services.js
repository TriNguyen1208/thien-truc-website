import pool from '#@/config/db.js'
import { uploadImage, deleteImage } from '#@/utils/image.js';

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

const updateProjectPage = async (data) => {
    const {
        title,
        description
    } = data;

    const result = await pool.query(`
        UPDATE project.project_page
        SET
            banner_title = $1,
            banner_description = $2
    `, [title, description]);

    return result;
}

const projects = {
    getList: async (query = '', filter = '', page, is_featured, item_limit) => {
        query = query.trim().replaceAll(`'`, ``); // clean
        filter = filter.trim().replaceAll(`'`, ``); // clean
        const pageSize = item_limit || 9;
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
                prj.is_featured,
                
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
            is_featured: row.is_featured,
            region: {
                id: row.reg_id,
                name: row.name,
                rgb_color: row.rgb_color
            },
            is_featured: row.is_featured
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
    getListByRegion: async (query = '', filter = '', is_featured, item_limit) => {
        query = query.trim().replaceAll(`'`, ``); // clean
        filter = filter.trim().replaceAll(`'`, ``); // clean

        let where = [];
        let order = [];
        let limit = item_limit || 100;

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
        
        // Chuẩn hóa từng thành phần truy vấn
        if (where.length != 0) where = 'WHERE ' + where.join(' AND '); else where = '';
        if (order.length != 0) order = 'ORDER BY ' + order.join(', '); else order = '';
        
        const sql = `
            SELECT 
                prj.id AS prj_id,
                prj.title,
                prj.province,
                prj.complete_time,
                prj.main_img,
                prj.main_content,
                prj.is_featured,

                prj_reg.id AS reg_id,
                prj_reg.name,
                prj_reg.rgb_color,
            FROM project.projects prj
            JOIN project.project_regions prj_reg ON prj.region_id = prj_reg.id
            WHERE prj.id IN (
                SELECT id FROM (
                    SELECT 
                        prj.id,
                        ROW_NUMBER() OVER (PARTITION BY prj.region_id ORDER BY prj.title) AS rn
                    FROM project.projects prj 
                    ${where}
                    ${order}
                ) sub
                WHERE rn <= ${limit}
            )
        `;
        
        const { rows } = await pool.query(sql);
        const groupedResults = {};
        for (const row of rows) {
            const regionName = row.name;
            if (!groupedResults[regionName]) {
                groupedResults[regionName] = [];
            }

            groupedResults[regionName].push({
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
                },
                is_featured: row.is_featured
            });
        }

        return groupedResults;
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
                prj.is_featured,

                prj_reg.id as reg_id,
                prj_reg.name,
                prj_reg.rgb_color
            from project.projects prj
            join project.project_regions prj_reg on prj.region_id = prj_reg.id
            where prj.id = $1
        `
        const row = (await pool.query(query, [id])).rows[0]
        const project = {
            id: row.prj_id,
            title: row.title,
            province: row.province,
            complete_time: row.complete_time,
            is_featured: row.is_featured,
            main_img: row.main_img,
            main_content: row.main_content,
            region: {
                id: row.reg_id,
                name: row.name,
                rgb_color: row.rgb_color
            },
            is_featured: row.is_featured
        };
        return project;
    },
    updateFeatureOne: async(is_featured, id) => {
        await pool.query(
            `UPDATE project.projects
             SET is_featured = $1
             WHERE id = $2`,
             [is_featured, id]
        );
    },
    updateRegion: async (changedItems) => {
        if (!Array.isArray(changedItems)) {
            throw new Error("Invalid input");
        }

        const client = await pool.connect();
        try {
            await client.query("BEGIN");

            for (const item of changedItems) {
                const { id, category_id } = item;

                const result = await client.query(
                    `SELECT region_id FROM project.projects WHERE id = $1`,
                    [id]
                );
                const oldRegionId = result.rows[0]?.region_id;

                if (oldRegionId !== category_id) {
                    await client.query(
                        `UPDATE project.projects SET region_id = $1 WHERE id = $2`,
                        [category_id, id]
                    );

                    if (oldRegionId) {
                        await client.query(
                            `UPDATE project.project_regions SET item_count = item_count - 1 WHERE id = $1`,
                            [oldRegionId]
                        );
                    }

                    await client.query(
                        `UPDATE project.project_regions SET item_count = item_count + 1 WHERE id = $1`,
                        [category_id]
                    );
                }
            }

            await client.query("COMMIT");
        } catch (error) {
            await client.query("ROLLBACK");
            console.error("Error during DB updateRegion:", error);
            throw error;
        } finally {
            client.release();
        }
    },

    deleteOne: async (id) => {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            // Giảm item_count trong project_regions
            await client.query(`
            UPDATE project.project_regions
            SET item_count = item_count - 1
            WHERE id = (SELECT region_id FROM project.projects WHERE id = $1)
            `, [id]);

            // Xoá nội dung dự án
            await client.query(`
            DELETE FROM project.project_contents
            WHERE project_id = $1
            `, [id]);

            // Xoá dự án
            const result = await client.query(`
            DELETE FROM project.projects
            WHERE id = $1
            RETURNING *
            `, [id]);

            await client.query('COMMIT');
            return result;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
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
        const project_region = (await pool.query(`SELECT * FROM project.project_regions WHERE id = $1`, [id])).rows[0];
        if(!project_region){
            throw new Error("Can't get project_regions");
        }
        return project_region
    },
    createOne: async(data) => {
        const {name, rgb_color} = data;
        await pool.query(
            `INSERT INTO project.project_regions (name, rgb_color, item_count)
             VALUES($1, $2, 0)`,
             [name, rgb_color]
        );
    },
    updateOne: async(data, id) => {
        const {name, rgb_color} = data;
        await pool.query(
            `UPDATE project.project_regions
             SET name = $1, rgb_color = $2
             WHERE id = $3`,
             [name, rgb_color, id]
        );
    },
    deleteOne: async (id) => {
        const client = await pool.connect();
        try {
            // Câu 1: Xoá project_contents
            try {
            await client.query(
                'DELETE FROM project.project_contents WHERE project_id IN (SELECT id FROM project.projects WHERE region_id = $1)',
                [id]
            );
            } catch (err) {
            console.error("Lỗi xoá project_contents:", err.message);
            }

            // Câu 2: Xoá projects
            try {
            await client.query(
                'DELETE FROM project.projects WHERE region_id = $1',
                [id]
            );
            } catch (err) {
            console.error("Lỗi xoá projects:", err.message);
            }

            // Câu 3: Xoá project_regions
            let result;
            try {
            result = await client.query(
                'DELETE FROM project.project_regions WHERE id = $1 RETURNING *',
                [id]
            );
            } catch (err) {
            console.error("Lỗi xoá project_regions:", err.message);
            }

            return result?.rows?.[0] || null;
        } finally {
            client.release();
        }
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
                prj.is_featured,

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
                },
                is_featured: row.is_featured
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
                prj.is_featured,

                prj_reg.id as reg_id,
                prj_reg.name,
                prj_reg.rgb_color
            from project.project_contents prj_cont
            join project.projects prj on prj_cont.project_id = prj.id
            join project.project_regions prj_reg on prj.region_id = prj_reg.id
            where prj_cont.project_id = $1
        `
        const row = (await pool.query(query, [id])).rows[0]
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
                },
                is_featured: row.is_featured
            }};
        return project_content;
    },
    postOne: async (data, files) => {
        const result = {};
        if(files?.main_image?.[0]){
            const mainImageUrl = await uploadImage(files.main_image[0], 'project');
            result.main_image = mainImageUrl
        }
        let imageUrls = [];
        let contentHTML= data?.content;
        if(files?.images?.length){
            for(const img of files.images){
                const fakeName = img.originalname;
                const url = await uploadImage(img, 'project');
                imageUrls.push(url);

                contentHTML = contentHTML.replaceAll(fakeName, url);
            }
            result.imageUrls = imageUrls;
        }
        const {
            title,
            main_content,
            region_name,
            isFeatured,
            link_image,
            province,
            completeTime
        } = data;

        //Get news_categories id
        const regionRes = await pool.query(
            `SELECT id FROM project.project_regions WHERE name ILIKE $1`,
            [region_name]
        );
        const region_id = regionRes.rows.length > 0 ? regionRes.rows[0].id : null;

        //Insert news
        const insertProjectSql = `
            INSERT INTO project.projects (
            region_id, title, province, complete_time,
            main_img, main_content, is_featured
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id;
        `;
        let main_image = "";
        if(result.main_image){
            main_image = result.main_image;
        }
        else if(link_image){
            main_image = link_image;
        }
        const insertValues = [
            region_id,
            title,
            province,
            new Date(completeTime).getFullYear(),
            main_image,
            main_content,
            isFeatured
        ];
        
        const projectResult = await pool.query(insertProjectSql, insertValues);
        const project_id = projectResult.rows[0].id;
        const insertProjectContentSql = `
            INSERT INTO project.project_contents (project_id, content)
            values($1, $2)
        `
        const insertValuesProjectContent = [
            project_id,
            contentHTML
        ]
        await pool.query(insertProjectContentSql, insertValuesProjectContent);
    },
    updateOne: async (id, data, files) => {
        const result = {};
        if(files?.main_image?.[0]){
            const mainImageUrl = await uploadImage(files.main_image[0], 'project');
            result.main_image = mainImageUrl
        }
        let imageUrls = [];
        let contentHTML= data?.content;
        if(files?.images?.length){
            for(const img of files.images){
                const fakeName = img.originalname;
                const url = await uploadImage(img, 'project');
                imageUrls.push(url);

                contentHTML = contentHTML.replaceAll(fakeName, url);
            }
            result.imageUrls = imageUrls;
        }

        let imagesToDelete = data.delete_images;
        if (typeof imagesToDelete === 'string') {
            imagesToDelete = [imagesToDelete];
        }
        if (Array.isArray(imagesToDelete) && imagesToDelete.length > 0) {
            await deleteImage(imagesToDelete);
        }
        
        const {
            title,
            main_content,
            region_name,
            isFeatured,
            link_image,
            province,
            completeTime
        } = data;

        //Get news_categories id
        const regionRes = await pool.query(
            `SELECT id FROM project.project_regions WHERE name ILIKE $1`,
            [region_name]
        );
        const region_id = regionRes.rows.length > 0 ? regionRes.rows[0].id : null;

        //Update project content
        const updateProjectContentSql = `
            update project.project_contents
            set 
                content = $1
            where project_id = $2
        `
        await pool.query(updateProjectContentSql, [contentHTML, id]);
        
        //Insert updateNews
        const updateProjectSql = `
            update project.projects
            set 
                region_id = $1,
                title = $2, 
                province = $3,
                complete_time = $4,
                main_img = $5, 
                main_content = $6, 
                is_featured = $7
            where id = $8
        `
        let main_image = "";
        if(result.main_image){
            main_image = result.main_image;
        }
        else if(link_image){
            main_image = link_image;
        }

        const updateValues = [
            region_id,
            title,
            province,
            new Date(completeTime).getFullYear(),
            main_image,
            main_content,
            isFeatured,
            id
        ];
        await pool.query(updateProjectSql, updateValues);
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

const getSearchSuggestions = async (query, filter, is_featured) => {
    query = query.trim().replaceAll(`'`, ``);
    filter = filter.trim().replaceAll(`'`, ``);
    const suggestions_limit = 5;

    let where = [];
    let order = [];
    const limit = 'LIMIT ' + suggestions_limit;

    if (query != '') {
        where.push(`(unaccent(P.title::text) ILIKE '%' || unaccent('${query})'::text) || '%' OR
            similarity(unaccent(P.title::text), unaccent('${query}'::text)) > 0)`);
        order.push(`similarity(unaccent(P.title::text), unaccent('${query}'::text)) DESC`);
    }
    if (filter != '') {
        where.push(`unaccent(R.name) ILIKE unaccent('${filter}')`);
    }
    if (is_featured == 'false' || is_featured == 'true') {
        where.push(`P.is_featured = ${is_featured}`);
    }

    // Chuẩn hóa các thành phần query
    if (where.length != 0) where = 'WHERE ' + where.join(' AND '); else where = '';
    if (order.length != 0) order = 'ORDER BY ' + order.join(', '); else order = '';
    

    const sql = `
        SELECT P.title, P.id, P.main_img
        FROM project.projects P
        JOIN project.project_regions R ON P.region_id = R.id
        ${where}
        ${order}
        ${limit}
    `;
    try {
        const result = await pool.query(sql);
        return result.rows.map(row => ({
            query: row.title,
            id: row.id,
            img: row.main_img
        }));
    } catch (err) {
        throw new Error(`DB error: ${err.message}`);
    }
};

const getSearchCategoriesSuggestions = async (query) => {
    query = query.trim().replaceAll(`'`, ``);
    const sql = `
        SELECT * 
        FROM project.project_regions R
        WHERE similarity(unaccent(R.name::text), unaccent($1::text)) > 0
        ORDER BY similarity(unaccent(R.name::text), unaccent($1::text)) DESC
        LIMIT 5
    `;
    const values = [query];
    try {
        const result = await pool.query(sql, values);
        return result.rows.map(row => ({
            query: row.name,
            id: row.id,
            rgb_color: row.rgb_color,
            item_count: row.item_count || 0
        }));
    } catch (err) {
        throw new Error(`DB error: ${err.message}`);
    }
}

const count = async () => {
    const project_count = (await pool.query(`
        SELECT COUNT(*)::int AS project_count
        FROM project.projects
    `)).rows[0];
    if(!project_count){
        throw new Error("Can't get project");
    }

    const regions_count = (await pool.query(`
        SELECT COUNT(*)::int AS regions_count
        FROM project.project_regions
    `)).rows[0];
    if(!regions_count){
        throw new Error("Can't get project_regions");
    }

    return {
        ...project_count,
        ...regions_count
    };
}


export default { getAllTables, getProjectPage, updateProjectPage, projects, project_regions, project_contents,getHighlightProjects, getSearchSuggestions, getSearchCategoriesSuggestions, count};