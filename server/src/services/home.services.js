import pool from '#@/config/db.js'
import { uploadImage, deleteImage, updateImage, isCloudinary } from '#@/utils/image.js';



const getAllTables = async () => {
    const _home_page = await getHomePage();
    const _highlight_stats_about_us = await highlight_stats_about_us.getAll();

    return {
        home_page: _home_page,
        highlight_stats_about_us: _highlight_stats_about_us
    };
}

const getHomePage = async() => {
    const home_page = (await pool.query("SELECT * FROM home.home_page")).rows[0];

    if(!home_page) {
        throw new Error("Can't get home_page");
    }
    return home_page;
}

const updateHomePage = {
    banner: async(data) => {
        const title = data["Tiêu đề Banner"];
        const description = data["Mô tả Banner"];

        await pool.query(`
            UPDATE home.home_page
            SET
                banner_title = $1,
                banner_description = $2
        `, [title, description]);

        return {
            status: 200,
            message: "Cập nhật Banner thành công",
            action: "Cập nhật Banner trang Trang Chủ"
        }
    },
    bannerImages: async(data, files) => {
        
        let { image_urls, switch_time } = data;
        if(!Array.isArray(image_urls)){
            image_urls = [image_urls]
        }

        const old_images = (await pool.query('SELECT banner_images FROM home.home_page')).rows?.[0]?.banner_images;
        if (old_images == null) {
            throw new Error("Can not get banner_images from home.home_page");
        }
        const tasks = [];
        let file_index = 0;
        // Lần lượt cập nhật ảnh
        for (let i = 0; i < image_urls.length; i++) {
            if (i < old_images.length && old_images[i] != image_urls[i] && isCloudinary(old_images[i])) {
                tasks.push(deleteImage([old_images[i]]))
            }
            
            if (!image_urls[i] || image_urls[i] === "null") {
                if (!files[file_index]) {
                    throw new Error(`Can not get uploaded file at index ${i}`);
                }    
                tasks.push(uploadImage(files[file_index], 'home').then(url => image_urls[i] = url));
                file_index++;
            }
        }

        // Xóa các ảnh sau của dữ liệu cũ
        for (let i = image_urls.length; i < old_images.length; i++) {
            if (isCloudinary(old_images[i])) {
                tasks.push(deleteImage([old_images[i]]));
            }
        }

        await Promise.all(tasks);
        await pool.query(`
            UPDATE home.home_page SET banner_images = $1, banner_switch_time = $2    
        `, [image_urls, switch_time]);
        
        return {
            status: 200,
            message: "Cập nhật ảnh Banner của Trang chủ thành công",
            action: "Cập nhật ảnh Banner của Trang chủ"
        }
    },
    aboutUs: async (data) => {
        const content = data["Nội dung giới thiệu"];
        await pool.query(`
            UPDATE home.home_page
            SET
                aboutus_content = $1
        `, [content]);

        return {
            status: 200,
            message: "Cập nhật Giới Thiệu Về Công Ty thành công",
            action: "Cập nhật Giới Thiệu Về Công Ty trang Trang Chủ",
        }
    },
    imageAboutUs: async(data, file) => { 
        const old_avatar_img = (await pool.query('SELECT aboutus_img FROM home.home_page')).rows[0].aboutus_img;
        let local_avatar_img = file;
         const {
            aboutus_img,
        } = data

        const final_avatar_img = await updateImage(
            old_avatar_img,
            local_avatar_img,
            aboutus_img,
            'home'
        );
        await pool.query(`
            UPDATE home.home_page
            SET
                aboutus_img = $1
        `, [final_avatar_img])
        return {
            status: 200,
            message: "Cập nhật ảnh giới thiệu công ty Thiên Trúc thành công",
            action: "Cập nhật ảnh giới thiệu công ty Thiên Trúc trang Trang Chủ",
        }
    },
    visibility: async(data) => {
        const {
            visibility
        } = data;

        await pool.query(`
            UPDATE home.home_page
            SET
                is_visible = $1
        `, [visibility]);
        const visibility_state = visibility == true ? "Bật" : "Tắt";
        return {
            status: 200,
            message: `${visibility_state} chế độ hiển thị trang chủ thành công`,
            action: `${visibility_state} chế độ hiển thị trang chủ`
        }
    }
}

const highlight_stats_about_us = {
    getAll: async () => {
        const highlight_stats_about_us = (await pool.query("SELECT * FROM home.highlight_stats_about_us")).rows;

        if(!highlight_stats_about_us) {
            throw new Error("Can't get highlight_stats_about_us");
        }
        return highlight_stats_about_us
    },

    getOne: async (id) => {
        const highlight_stat_with_id = (await pool.query(`
            SELECT * FROM home.highlight_stats_about_us WHERE id = ${id}
        `)).rows[0];

        if(!highlight_stat_with_id) {
            throw new Error("Can't get highlight_stats_about_us");
        }    
        return highlight_stat_with_id;
    },

    createOne: async (data) => {
        const { figures, achievementName } = data;

        // Kiểm tra số lượng thông số có đủ 3 chưa (giới hạn 3)
        const rowCount = (await pool.query('SELECT count(*) FROM home.highlight_stats_about_us')).rows[0].count;
        if (rowCount == 3)
            return {
                status: 409,
                message: "Không thể thêm tạo Thông Số Nổi Bật vì đã đủ số lượng (3)"
            }
        
        await pool.query(`
            INSERT INTO home.highlight_stats_about_us (number_text, label)
            VALUES ($1, $2)    
        `, [figures, achievementName]);

        return {
            status: 200,
            message: 'Tạo Thông Số Nổi Bật thành công',
            action: `Tạo Thông Số Nổi Bật trang Trang Chủ: ${figures} ${achievementName}`
        }
    },

    updateOne: async (data, id) => {
        const old_label = (await pool.query('SELECT label FROM home.highlight_stats_about_us WHERE id = $1', [id])).rows?.[0]?.label;
        if (!old_label) return {
            status: 404,
            message: "Không tìm thấy Thông Số Nổi Bật"
        }

        const { figures, achievementName } = data;

        await pool.query(`
            UPDATE home.highlight_stats_about_us
            SET
                number_text = $1,
                label = $2
            WHERE
                id = $3
        `, [figures, achievementName, id]);
        
        const note = (old_label != achievementName) ? ' (đã đổi tên)' : '';
        return {
            status: 200,
            message: "Cập nhật Thông Số Nổi Bật thành công",
            action: `Cập nhật Thông Số Nổi Bật trang Trang Chủ${note}: ${figures} ${achievementName}`
        }
    },

    deleteOne: async (id) => {
        const result = await pool.query(`
            DELETE FROM home.highlight_stats_about_us WHERE id = $1 RETURNING number_text, label
        `, [id]);

        if (result.rowCount == 0) return {
            status: 404,
            message: "Không tìm thấy Thông Số Nổi Bật"
        }

        const { number_text, label } = result.rows[0];
        return {
            status: 200,
            message: "Xóa Thông Số Nổi Bật thành công",
            action: `Xóa Thông Số Nổi Bật trang Trang Chủ: ${number_text} ${label}`
        }
    }
}
export default { getAllTables, getHomePage, updateHomePage, highlight_stats_about_us };