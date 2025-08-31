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
        const sendToCompanyPromise = sendMail({
            to: company_email,//process.env.RECEIVER_EMAIL,
            subject: `Đơn ứng tuyển từ ${name}`,
            html: `
            <div style="font-family: Arial, sans-serif; background-color: #f0fff0; padding: 20px; color: #333333;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
                
                <div style="background-color: #4CAF50; color: #ffffff; padding: 20px; text-align: center;">
                    <h1 style="margin: 0; font-size: 24px;">Đơn ứng tuyển</h1>
                    <p style="margin: 5px 0 0; font-size: 14px;">Bạn có một đơn ứng tuyển mới từ website.</p>
                </div>
                
                <div style="padding: 20px;">
                
                    <h2 style="font-size: 18px; color: #4CAF50; margin: 0 0 10px; padding-bottom: 5px; border-bottom: 2px solid #e0e0e0;">Thông tin ứng viên</h2>
                    <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #4CAF50; border-radius: 4px;">
                        <p style="margin: 0 0 5px; font-size: 16px; color: #000000;"><strong>Họ tên:</strong> <strong style="color: #00796b;">${name}</strong></p>
                        <p style="margin: 0 0 5px; font-size: 16px; color: #000000;"><strong>Email:</strong> <strong style="color: #00796b;">${email}</strong></p>
                        <p style="margin: 0; font-size: 16px; color: #000000;"><strong>Điện thoại:</strong> <strong style="color: #00796b;">${phone || 'Không cung cấp'}</strong></p>
                    </div>
                    
                    <h2 style="font-size: 18px; color: #4CAF50; margin: 25px 0 10px; padding-bottom: 5px; border-bottom: 2px solid #e0e0e0;">Tiêu đề</h2>
                    <div style="background-color: #f9f9f9; padding: 15px; border: 1px dashed #4CAF50; border-radius: 4px; text-align: center;">
                        <h3 style="margin: 0; font-size: 20px; color: #000000;">${title}</h3>
                    </div>
                    
                    <h2 style="font-size: 18px; color: #4CAF50; margin: 25px 0 10px; padding-bottom: 5px; border-bottom: 2px solid #e0e0e0;">Nội dung</h2>
                    <div style="padding: 15px; background-color: #f9f9f9; border-left: 4px solid #4CAF50; line-height: 1.6; border-radius: 4px;">
                        <p style="margin: 0; font-size: 16px; color: #000000;">${content.replace(/\n/g, '<br>')}</p>
                    </div>
                </div>
                
                <div style="background-color: #e8f5e9; padding: 20px; text-align: center; font-size: 13px; color: #757575; border-top: 1px solid #c8e6c9; white-space: normal;">
                    Hệ thống gửi tự động từ website của bạn.
                </div>
                </div>
            </div>
            `
        })

        //Send mail to applicant
        const sendToApplicantPromise = sendMail({
            to: email,
            subject: "Bản sao đơn ứng tuyển",
            html: `
            <div style="font-family: Arial, sans-serif; background-color: #f0fff0; padding: 20px; color: #333333;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
                
                <div style="background-color: #4CAF50; color: #ffffff; padding: 20px; text-align: center;">
                    <h1 style="margin: 0; font-size: 24px;">Xác nhận nộp đơn thành công</h1>
                    <p style="margin: 5px 0 0; font-size: 14px;">Cảm ơn bạn đã quan tâm và ứng tuyển!</p>
                </div>
                
                <div style="padding: 20px;">
                    <p style="margin: 0 0 15px; font-size: 16px;">Chào <strong>${name}</strong>,</p>
                    <p style="margin: 0 0 15px; font-size: 16px; color: #000000;">Chúng tôi đã nhận được đơn ứng tuyển của bạn. Chúng tôi sẽ xem xét hồ sơ và phản hồi lại bạn trong thời gian sớm nhất.</p>
                    
                    <h2 style="font-size: 18px; color: #4CAF50; margin: 25px 0 10px; padding-bottom: 5px; border-bottom: 2px solid #e0e0e0;">Bản sao đơn ứng tuyển của bạn</h2>
                    <p style="margin: 0 0 10px; font-size: 14px; font-style: italic; color: #555555;">(Đây là bản sao các thông tin bạn đã gửi)</p>

                    <h3 style="font-size: 16px; color: #4CAF50; margin: 0 0 10px;">Thông tin cá nhân</h3>
                    <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #4CAF50; border-radius: 4px;">
                        <p style="margin: 0 0 5px; font-size: 16px;"><strong>Họ tên:</strong> <span style="color: #00796b;"><strong>${name}</strong></span></p>
                        <p style="margin: 0 0 5px; font-size: 16px;"><strong>Email:</strong> <span style="color: #00796b;"><strong>${email}</strong></span></p>
                        <p style="margin: 0; font-size: 16px;"><strong>Điện thoại:</strong> <span style="color: #00796b;"><strong>${phone || 'Không cung cấp'}</strong></span></p>
                    </div>
                    
                    <h3 style="font-size: 16px; color: #4CAF50; margin: 25px 0 10px;">Chủ đề ứng tuyển</h3>
                    <div style="background-color: #f9f9f9; padding: 15px; border: 1px dashed #4CAF50; border-radius: 4px; text-align: center;">
                        <p style="margin: 0; font-size: 16px; color: #000000;"><strong>${title}</strong></p>
                    </div>
                    
                    <h3 style="font-size: 16px; color: #4CAF50; margin: 25px 0 10px;">Nội dung chi tiết</h3>
                    <div style="padding: 15px; background-color: #f9f9f9; border-left: 4px solid #4CAF50; line-height: 1.6; border-radius: 4px;">
                        <p style="margin: 0; font-size: 16px; color: #000000;">${content.replace(/\n/g, '<br>')}</p>
                    </div>
                    
                </div>
                
                <div style="background-color: #e8f5e9; padding: 20px; text-align: center; font-size: 12px; color: #757575; border-top: 1px solid #c8e6c9;">
                    <p style="margin: 0;">Trân trọng,</p>
                    <p style="margin: 5px 0 0;">Thiên Trúc</p>
                </div>
            </div>
            </div>
            `
        })

        try {
            await Promise.all([sendToCompanyPromise, sendToApplicantPromise]);
        } catch (err) {
            console.error('Lỗi khi gửi đơn tuyển dụng: ', err)
            throw new Error('Lỗi khi gửi đơn tuyển dụng');
        }

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