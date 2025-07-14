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
    let company_info = (await pool.query("SELECT * FROM contact.company_info")).rows[0];
    if(!company_info){
        throw new Error("Can't get company_info");
    }

    let { main_office_id, office_address, googlemaps_embed_url, ...rest } = company_info;
    office_address = office_address.map(element => JSON.parse(element || '{}'));
    const main_office = office_address[main_office_id - 1] || '{}';
    company_info = {
        ...rest,
        office_address : office_address,
        main_office : main_office,
        googlemaps_embed_url : googlemaps_embed_url
    }

    return company_info;
}

const updateCompanyInfo = async (data) => {
    let {
        office_address,
        main_office_id,
        googlemaps_embed_url,
        working_hours,
        company_email,
        company_phone,
        fanpage_url
    } = data
    
    office_address = office_address.map(element => JSON.stringify(element));

    await pool.query(`
        UPDATE contact.company_info
        SET
            office_address = $1,
            main_office_id = $2,
            googlemaps_embed_url = $3,
            working_hours = $4,
            company_email = $5,
            company_phone = $6,
            fanpage_url = $7            
    `, [office_address, main_office_id, googlemaps_embed_url, working_hours, company_email, company_phone, fanpage_url]);

    return {
        status: 200,
        message: 'Cập nhật Thông Tin Công Ty thành công'
    }
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
    },
    createOne: async (data) => {
        const {
            avatar_img,
            name,
            role,
            phone_number,
            facebook_url
        } = data

        const result = await pool.query(`
            INSERT INTO contact.support_agents (avatar_img, name, role, phone_number, facebook_url)
            VALUES ($1, $2, $3, $4, $5);
        `, [avatar_img, name, role, phone_number, facebook_url]);

        if (result.rowCount == 0) return {
            status: 500,
            message: "Không thể tạo Người Liên Hệ"
        }; else if (result.rowCount > 0) return {
            status: 200,
            message: "Tạo Người Liên Hệ thành công"
        } 
    },
    updateOne: async (data, id) => {
        const idCount = (await pool.query('SELECT COUNT(*)::int FROM contact.support_agents WHERE id = $1', [id])).rows[0].count;
        if (idCount == 0) return {
            status: 404,
            message: "Không tìm thấy Người Liên Hệ"
        }

        const {
            avatar_img,
            name,
            role,
            phone_number,
            facebook_url
        } = data

        const result = await pool.query(`
            UPDATE contact.support_agents
            SET 
                avatar_img = $1,
                name = $2,
                role = $3,
                phone_number = $4,
                facebook_url = $5
            WHERE
                id = $6
        `, [avatar_img, name, role, phone_number, facebook_url, id]);

        if (result.rowCount == 0) return {
            status: 500,
            message: "Không thể cập nhật Người Liên Hệ"
        }; else if (result.rowCount > 0) return {
            status: 200,
            message: "Cập nhật Người Liên Hệ thành công"
        } 
    },
    deleteOne: async (id) => {
        const result = await pool.query('DELETE FROM contact.support_agents WHERE id = $1', [id]);

        if (result.rowCount == 0) return {
            status: 500,
            message: "Không tìm thấy Người Liên Hệ"
        }; else if (result.rowCount > 0) return {
            status: 200,
            message: "Xóa Người Liên Hệ thành công"
        } 
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

const count = async () => {
    const data = (await pool.query(`
        SELECT COUNT(*)::int AS agent_count
        FROM contact.support_agents
    `)).rows[0];

    if(!data){
        throw new Error("Can't get support_agents");
    }

    return data;
}
export default { getAllTables, getContactPage, getCompanyInfo, updateCompanyInfo, support_agents, postContactMessage, count };
