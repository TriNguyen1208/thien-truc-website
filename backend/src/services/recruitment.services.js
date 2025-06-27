import pool from '#@/config/db.js'
import sendMail from '#@/utils/mailer.js'

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

    //Send mail to company
    await sendMail({
        to: process.env.RECEIVER_EMAIL,
        subject: `Dơn ứng tuyển từ ${name}`,
        html: `
        <h2>Thông tin ứng tuyển:</h2>
        <ul>
            <li><strong>Họ tên:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Điện thoại:</strong> ${phone}</li>
            <li><strong>Chủ đề:</strong> ${title || 'Không ghi rõ'}</li>
            <li><strong>Nội dung:</strong><br>${content}</li>
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
            <p>Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.</p>
            <hr>
            <small>Trân trọng, Bộ phận Tuyển dụng</small>
        `
    })

     return { success: true, message: "Ứng tuyển thành công" };
}
export default { getAllTables, getRecruitmentPage, postSubmitApplication};