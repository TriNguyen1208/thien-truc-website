import pool from '#@/config/db.js'
import sendMail from '#@/utils/mailer.js'
import { updateImage } from '#@/utils/image.js';
const getAllTables = async (req, res) => {
    const _recruitment_page = await getRecruitmentPage();
    return {
        recruitment_page: _recruitment_page
    };
}

const getRecruitmentPage = async (req, res) => {
    const recruitment_page = (await pool.query("SELECT * FROM recruitment.recruitment_page")).rows[0];
    if(!recruitment_page){
        throw new Error("Can't get recruitment_page");
    }
    return recruitment_page;
}

    const postSubmitApplication = async (applicationData) => {
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
const patchRecruitment = async (data, files) => {
    const old_img = (await pool.query(`
        SELECT
            culture_img_1 img_1,
            culture_img_2 img_2,
            culture_img_3 img_3,
            culture_img_4 img_4
        FROM recruitment.recruitment_page
    `)).rows[0]; // <-- Lấy phần tử đầu tiên

    const updatedImages = [];
    for (let i = 1; i <= 4; i++) {
        const key = `culture_img_${i}`;
        const old = old_img[`img_${i}`];
        const local = files[key]?.[0] ?? null; // ảnh mới ở vị trí i, có thể undefined nếu không upload ảnh mới
        const external = data[key] ?? null;
        const updated = await updateImage(old, local, external, 'recruitment');
        updatedImages.push(updated);
    }
    // Sau khi update xong:
    const [
        final_culture_img_1,
        final_culture_img_2,
        final_culture_img_3,
        final_culture_img_4
    ] = updatedImages;
    const {
        banner_title,
        banner_description,
        culture_content,
    } = data;
    await pool.query(`
        UPDATE recruitment.recruitment_page
        SET 
            banner_title = $1,
            banner_description = $2,
            culture_content = $3,
            culture_img_1 = $4, 
            culture_img_2 = $5,
            culture_img_3 = $6,
            culture_img_4 = $7
    `, [banner_title, banner_description, culture_content, final_culture_img_1, final_culture_img_2, final_culture_img_3, final_culture_img_4]);

    return {
        status: 200,
        message: "Cập nhật trang Tuyển Dụng thành công",
        action: `Cập nhật trang Tuyển Dụng`
    };
}
const updateVisibility = async(data) => {
    const {
        visibility
    } = data;

    await pool.query(`
        UPDATE recruitment.recruitment_page
        SET
            is_visible = $1
    `, [visibility]);
    const visibility_state = visibility == true ? "Bật" : "Tắt";
    return {
        status: 200,
        message: `${visibility_state} chế độ hiển thị trang tuyển dụng thành công`,
        action: `${visibility_state} chế độ hiển thị trang tuyển dụng`
    }
}
export default { getAllTables, getRecruitmentPage, postSubmitApplication, patchRecruitment, updateVisibility};