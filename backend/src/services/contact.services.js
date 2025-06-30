import pool from '#@/config/db.js'
import sendMail from '#@/utils/mailer.js'

const getAllTables = async () => {
    const _contact_page = await getContactPage();
    const _company_info = await getCompanyInfo();
    const _support_agents = await support_agents.getAll();
    return {
        contact_page: _contact_page,
        company_info: _company_info,
        support_agents: _support_agents
    };
}

const getContactPage = async () => {
    const contact_page = (await pool.query("SELECT * FROM contact.contact_page")).rows[0];
    if(!contact_page){
        throw new Error("Can't get contact_page");
    }
    return contact_page;
}

const getCompanyInfo = async () => {
    const company_info = (await pool.query("SELECT * FROM contact.company_info")).rows[0];
    if(!company_info){
        throw new Error("Can't get company_info");
    }
    company_info.office_address = company_info.office_address.map(element => {
        return JSON.parse(element || '{}');
    });
    return company_info;
}

const support_agents = {
    getAll: async () => {
        const support_agents = (await pool.query("SELECT * FROM contact.support_agents")).rows;
        if (!support_agents){
            throw new Error("Can't get support_agents");
        }
        return support_agents
    },
    getOne: async (id) => {
        const support_agent_with_id = (await pool.query(`SELECT * FROM contact.support_agents WHERE id = ${id}`)).rows[0];
        if (!support_agent_with_id){
            throw new Error("Can't get support_agents");
        }
        return support_agent_with_id;
    }
}

const postContactMessage = async (applicationData) => {
    const { name, email, phone, title, content } = applicationData;
    //Send mail to company
    await sendMail({
        to: process.env.RECEIVER_EMAIL,
        subject: `Liên hệ từ ${name}`,
        html: `
        <h2>Thông tin liên hệ:</h2>
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
        to: applicationData.email,
        subject: "Xác nhận nhận đơn liên hệ",
        html: `
            <h2>Cảm ơn bạn đã liên hệ!</h2>
            <p>Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.</p>
            <hr>
            <small>Trân trọng, Bộ phận Nhân sự</small>
        `
    })

    return { success: true, message: "Ứng tuyển thành công" };
}
export default { getAllTables, getContactPage, getCompanyInfo, support_agents, postContactMessage };
