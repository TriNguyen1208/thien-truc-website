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
    await pool.query(`
        INSERT INTO recruitment.applications_data (name, email, phone, title, content)
        VALUES ($1, $2, $3, $4, $5)
    `, [
        applicationData.name,
        applicationData.email,
        applicationData.phone,
        applicationData.title,
        applicationData.content,
    ]);

    await sendMail({
        to: applicationData.email,
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