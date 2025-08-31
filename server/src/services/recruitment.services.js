import pool from '#@/config/db.js'
import sendMail from '#@/utils/mailer.js'
import { updateImage } from '#@/utils/image.js';

const getAllTables = async () => {
    const _recruitment_page = await getRecruitmentPage();
    return {
        recruitment_page: _recruitment_page
    };
}

const getRecruitmentPage = async () => {
    const recruitment_page = (await pool.query("SELECT * FROM recruitment.recruitment_page")).rows[0];
    if(!recruitment_page){
        throw new Error("Can't get recruitment_page");
    }
    return recruitment_page;
}

const submitApplication = async (applicationData) => {
    const { name, email, phone, title, content } = applicationData;

    const company_email = (await pool.query('SELECT company_email FROM contact.company_info')).rows?.[0]?.company_email;

    //Send mail to company
    await sendMail({
        to: company_email,//process.env.RECEIVER_EMAIL,
        subject: `Đơn ứng tuyển từ ${name}`,
        html: `
        <h2>Thông tin ứng tuyển:</h2>
        <ul>
            <li><strong>Họ tên:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Điện thoại:</strong> ${phone || 'Không cung cấp'}</li>
            <li><strong>Chủ đề:</strong> ${title}</li>
            <li><strong>Nội dung:</strong><br>${content.replace(/\n/g, '<br>')}</li>
        </ul>
        <hr>
        <small>Hệ thống gửi tự động từ website.</small>
    `
    })

    //Send mail to applicant
    await sendMail({
        to: email,
        subject: "Xác nhận ứng tuyển",
        html: `
            <h2>Cảm ơn bạn đã ứng tuyển!</h2>
            <p>Chúng tôi đã nhận được đơn ứng tuyển của bạn với thông tin sau:</p>
            <ul>
                <li><strong>Họ tên:</strong> ${name}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Điện thoại:</strong> ${phone || 'Không cung cấp'}</li>
                <li><strong>Chủ đề:</strong> ${title}</li>
                    <li><strong>Nội dung:</strong><br>${content.replace(/\n/g, '<br>')}</li>
            </ul>
            <p>Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.</p>
            <hr>
            <small>Trân trọng, Bộ phận Tuyển dụng</small>
        `
    })

    return { success: true, message: "Ứng tuyển thành công" };
}

const updateRecruitmentPage = {
    banner: async (data) => {
        const {
            banner_title,
            banner_description
        } = data;
        await pool.query(`
            UPDATE recruitment.recruitment_page
            SET 
                banner_title = $1,
                banner_description = $2
        `, [banner_title, banner_description]);

        return {
            status: 200,
            message: "Cập nhật Banner trang Tuyển dụng thành công",
            action: `Cập nhật Banner trang Tuyển dụng`
        };
    },
    visibility: async (data) => {
        const { visibility } = data;
        await pool.query(`
            UPDATE recruitment.recruitment_page
            SET
                is_visible = $1
        `, [visibility]);
        const visibility_state = visibility == true ? "Bật" : "Tắt";
        return {
            status: 200,
            message: `${visibility_state} chế độ hiển thị trang Tuyển dụng thành công`,
            action: `${visibility_state} chế độ hiển thị trang Tuyển dụng`
        }
    },
    culture: async (data) => {
        const { content } = data;
        await pool.query(`
            UPDATE recruitment.recruitment_page
            SET 
                culture_content = $1
        `, [content]);

        return {
            status: 200,
            message: "Cập nhật Văn hóa của chúng tôi trang Tuyển dụng thành công",
            action: `Cập nhật Văn hóa của chúng tôi trang Tuyển dụng`
        };
    },
    culture_images: async (data, files) => {
        const old_img = (await pool.query(`
            SELECT
                culture_img_1 img_1,
                culture_img_2 img_2,
                culture_img_3 img_3,
                culture_img_4 img_4
            FROM recruitment.recruitment_page
        `)).rows[0]; // <-- Lấy phần tử đầu tiên

        // Tạo danh sách promise upload song song
        const uploadTasks = Array.from({ length: 4 }, (_, i) => {
            const index = i + 1;
            const key = `culture_img_${index}`;
            const old = old_img[`img_${index}`];
            const local = files[key]?.[0] ?? null;
            const external = data[key] ?? null;

            // Trả về promise
            return updateImage(old, local, external, 'recruitment');
        });

        // Chạy song song tất cả updateImage
        const [
            final_culture_img_1,
            final_culture_img_2,
            final_culture_img_3,
            final_culture_img_4
        ] = await Promise.all(uploadTasks);

        await pool.query(`
            UPDATE recruitment.recruitment_page
            SET 
                culture_img_1 = $1, 
                culture_img_2 = $2,
                culture_img_3 = $3,
                culture_img_4 = $4
        `, [final_culture_img_1, final_culture_img_2, final_culture_img_3, final_culture_img_4]);

        return {
            status: 200,
            message: "Cập nhật Ảnh Văn hóa của chúng tôi trang Tuyển dụng thành công",
            action: `Cập nhật Ảnh Văn hóa của chúng tôi trang Tuyển dụng`
        };
    }
}

export default { getAllTables, getRecruitmentPage, submitApplication, updateRecruitmentPage};