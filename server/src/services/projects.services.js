import pool from '#@/config/db.js'
import { uploadImage, deleteImage, extractAllImages, isCloudinary } from '#@/utils/image.js';

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
    return project_page;
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

    return {
        status: 200,
        message: "Cập nhật Banner thành công",
        action: "Cập nhật Banner trang Dự Án"
    };
}
const updateVisibility = async (data) => {
    const {
        visibility
    } = data;

    await pool.query(`
        UPDATE project.project_page
        SET
            is_visible = $1
    `, [visibility]);
    const visibility_state = visibility == true ? "Bật" : "Tắt";
    return {
        status: 200,
        message: `${visibility_state} chế độ hiển thị trang dự án thành công`,
        action: `${visibility_state} chế độ hiển thị trang dự án`
    }
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
        
        order.push('prj.complete_time DESC')

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
        
        order.push('prj.complete_time DESC')

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
            ORDER BY prj.complete_time DESC
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
                prj_reg.rgb_color,
                
                (select is_visible from project.project_page) as is_visible
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
            is_visible: row.is_visible,
            region: {
                id: row.reg_id,
                name: row.name,
                rgb_color: row.rgb_color
            },
            is_featured: row.is_featured
        };
        return project;
    },
    updateFeatureOne: async (id, project_status) => {
        const query = `
            UPDATE project.projects SET is_featured = $1 WHERE id = $2 RETURNING title;
        `
        const result = await pool.query(query, [project_status, id]);

        if (result.rowCount == 0) return {
            status: 404,
            message: "Không tìm thấy dự án"
        }

        const { title } = result.rows[0];
        const update = (project_status == 'true') ? 'Trưng bày' : 'Bỏ trưng bày'
        return {
            status: 200,
            message: `${update} dự án thành công`,
            action: `${update} dự án: ${id} - ${title}`
        }
    },
    updateRegion: async (changedItems) => {
        if (!Array.isArray(changedItems)) {
            throw new Error("Invalid input");
        }

        if (changedItems.length == 0) return {
            status: 400, // bad request
            message: "Không có dữ liệu cần cập nhật"
        }

        const region_id = changedItems[0].category_id;
        const region_name = (await pool.query('SELECT name FROM project.project_regions WHERE id = $1', [region_id])).rows?.[0]?.name;
        if (!region_name) return {
            status: 404,
            message: "Không tìm thấy khu vực dự án"
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

            const project_ids = changedItems.map(item => item.id).join(', ');
            return {
                status: 200,
                message: "Gán khu vực dự án thành công",
                action: `Gán khu vực ${region_id} - ${region_name} cho các dự án: ${project_ids}`
            }
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
            //Xoa anh trong html tren cloudinary
            const sql = `
                select 
                    pc.content,
                    p.main_img
                from project.project_contents pc
                join project.projects p on pc.project_id = p.id
                where pc.project_id = $1
            `
            const row = (await pool.query(sql, [id])).rows[0]
            const content = row.content;
            const image = row.main_img;
            const cloudinary_images = extractAllImages(content);
            if(isCloudinary(image)){
                cloudinary_images.push(image);
            }
            await deleteImage(cloudinary_images);

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
            
            if (result.rowCount == 0) return {
                status: 404,
                message: "Không tìm thấy dự án"
            }
            
            const { title } = result.rows[0];
            return {
                status: 200,
                message: "Xóa dự án thành công",
                action: `Xóa dự án: ${id} - ${title}`
            }
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
        const project_regions = (await pool.query("SELECT * FROM project.project_regions ORDER BY id")).rows;
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
    getAllFeatured: async () => {
        const featured_project_regions = (await pool.query(`
            SELECT prj_reg.*
            FROM project.project_regions prj_reg
            WHERE EXISTS (
                SELECT 1 
                FROM project.projects prj
                WHERE prj.region_id = prj_reg.id AND prj.is_featured = true
            )
            ORDER BY id
        `))?.rows;
        if (!featured_project_regions) {
            throw new Error("Can't get featured project_regions")
        }
        return featured_project_regions
    },
    createOne: async(data) => {
        const { name, rgb_color } = data;
        const result = await pool.query(
            `INSERT INTO project.project_regions (name, rgb_color, item_count)
            VALUES($1, $2, 0)
            RETURNING id`,
            [name, rgb_color]
        );

        const { id } = result.rows[0];

        return {
            status: 200,
            message: "Tạo khu vực dự án thành công",
            action: `Tạo khu vực dự án: ${id} - ${name}`
        }
    },
    updateOne: async(data, id) => {
        const old_name = (await pool.query('SELECT name FROM project.project_regions WHERE id = $1', [id])).rows?.[0]?.name;
        if (!old_name) return {
            status: 404,
            message: "Không tìm thấy khu vực dự án"
        }

        const { name, rgb_color } = data;
        await pool.query(
            `UPDATE project.project_regions
             SET name = $1, rgb_color = $2
             WHERE id = $3`,
             [name, rgb_color, id]
        );

        const note = (old_name != name) ? ' (đã đổi tên)' : '';
        return {
            status: 200,
            message: "Cập nhật khu vực dự án thành công",
            action: `Cập nhật khu vực dự án${note}: ${id} - ${name}`
        }
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

            if (result.rowCount == 0) return {
                status: 404,
                message: "Không tìm thấy loại dự án",
            }

            const { name } = result.rows[0];
            return {
                status: 200,
                message: "Xóa khu vực dự án thành công",
                action: `Xóa khu vực dự án và tất cả dự án thuộc loại: ${id} - ${name}`
            }
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
                prj_reg.rgb_color,

                (select is_visible from project.project_page) as is_visible
            from project.project_contents prj_cont
            join project.projects prj on prj_cont.project_id = prj.id
            join project.project_regions prj_reg on prj.region_id = prj_reg.id
            where prj_cont.project_id = $1
        `
        const row = (await pool.query(query, [id])).rows[0]
        const project_content = {
            id: row.cont_id,
            content: row.content,
            is_visible: row.is_visible,
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
                is_featured: row.is_featured,
            }};
        return project_content;
    },
    postOne: async (data, files) => {
        let contentHTML= data?.content;
        if(files?.images?.length){
            for(const img of files.images){
                const fakeName = img.originalname;
                const url = await uploadImage(img, 'project');
                contentHTML = contentHTML.replaceAll(fakeName, url);
            }
        }
        const {
            title,
            main_content,
            region_name,
            isFeatured,
            main_image,
            province,
            completeTime
        } = data;
        let cloud_avatar_img = null;
        if (files?.main_image?.[0]) {
            cloud_avatar_img = await uploadImage(files.main_image[0], 'project');
        }  
        const final_main_image = main_image || cloud_avatar_img || null;
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
        const insertValues = [
            region_id,
            title,
            province,
            new Date(JSON.parse(completeTime)),
            final_main_image,
            main_content,
            isFeatured
        ];
        const projectResult = await pool.query(insertProjectSql, insertValues);
        const project_id = projectResult.rows[0].id;
        if (region_id) {
            await pool.query(`
                UPDATE project.project_regions 
                SET item_count = COALESCE(item_count, 0) + 1 
                WHERE id = $1
            `, [region_id]);
        }
        const insertProjectContentSql = `
            INSERT INTO project.project_contents (project_id, content)
            values($1, $2)
        `
        const insertValuesProjectContent = [
            project_id,
            contentHTML
        ]
        await pool.query(insertProjectContentSql, insertValuesProjectContent);

        return {
            status: 200,
            message: "Tạo dự án thành công",
            action: `Tạo dự án: ${project_id} - ${title}`,
            id: project_id
        }
    },
    updateOne: async (id, data, files) => {
        let contentHTML= data?.content;
        if(files?.images?.length){
            for(const img of files.images){
                const fakeName = img.originalname;
                const url = await uploadImage(img, 'project');
                contentHTML = contentHTML.replaceAll(fakeName, url);
            }
        }

        let imagesToDelete = data.delete_images;
        if (typeof imagesToDelete === 'string') {
            imagesToDelete = [imagesToDelete];
        }
        if (Array.isArray(imagesToDelete) && imagesToDelete.length > 0) {
            await deleteImage(imagesToDelete);
        }
        
        const old_title = (await pool.query('SELECT title FROM project.projects WHERE id = $1', [id])).rows?.[0]?.title;
        if (!old_title) return {
            status: 404,
            message: "Không tìm thấy dự án"
        }

        const {
            title,
            main_content,
            region_name,
            isFeatured,
            main_image,
            province,
            completeTime
        } = data;
        let cloud_avatar_img = null;
        if (files?.main_image?.[0]) {
            cloud_avatar_img = await uploadImage(files.main_image[0], 'project');
        }  
        const final_main_image = cloud_avatar_img || main_image || null;

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

        const updateValues = [
            region_id,
            title,
            province,
            new Date(completeTime.startsWith('"') ? JSON.parse(completeTime) : completeTime),
            final_main_image,
            main_content,
            isFeatured,
            id
        ];
        await pool.query(updateProjectSql, updateValues);
        
        const note = (old_title != title) ? ' (đã đổi tên)' : '';
        return {
            status: 200,
            message: "Cập nhật dự án thành công",
            action: `Cập nhật dự án${note}: ${id} - ${title}`
        }
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


export default { getAllTables, getProjectPage, updateProjectPage, projects, project_regions, project_contents,getHighlightProjects, getSearchSuggestions, getSearchCategoriesSuggestions, count, updateVisibility};