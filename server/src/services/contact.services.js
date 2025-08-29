import pool from '#@/config/db.js'
import { uploadImage, deleteImage, updateImage, isCloudinary } from '#@/utils/image.js';
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

const updateContactPage = {
    banner: async (data) => {
        const {
            title,
            description
        } = data;

        await pool.query(`
            UPDATE contact.contact_page
            SET
                banner_title = $1,
                banner_description = $2    
        `, [title, description]);

        return {
            status: 200,
            message: "Cập nhật Banner thành công",
            action: `Cập nhật Banner trang Liên Hệ`
        }
    },
    visibility: async (data) => {
        const {
            visibility
        } = data;

        await pool.query(`
            UPDATE contact.contact_page
            SET
                is_visible = $1
        `, [visibility]);
        const visibility_state = visibility == true ? "Bật" : "Tắt";
        return {
            status: 200,
            message: `${visibility_state} chế độ hiển thị trang liên hệ thành công`,
            action: `${visibility_state} chế độ hiển thị trang liên hệ`
        }
    }
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
        hotline,
        fanpage_url
    } = data

    // Tạo mapping từ id chưa chuẩn hóa (1, 4, 6, ...) sang id được chuẩn hóa (1, 2, 3, ...)
    const idMap = new Map();
    office_address = office_address.map((item, index) => {
        const newId = index + 1;
        idMap.set(item.id, newId);
        return { ...item, id: newId };
    });

    // Chuẩn hóa lại main_office_id theo id mới (4 -> 2)
    main_office_id = idMap.get(main_office_id);

    const office_address_json = office_address.map(item => JSON.stringify(item));

    await pool.query(`
        UPDATE contact.company_info
        SET
            office_address = $1,
            main_office_id = $2,
            googlemaps_embed_url = $3,
            working_hours = $4,
            company_email = $5,
            company_phone = $6,
            hotline = $7,
            fanpage_url = $8            
    `, [office_address_json, main_office_id, googlemaps_embed_url, working_hours, company_email, company_phone, hotline, fanpage_url]);

    return {
        status: 200,
        message: 'Cập nhật Thông Tin Công Ty thành công',
        action: `Cập nhật Thông Tin Công Ty`
    }
}

const support_agents = {
    getAll: async () => {
        const support_agents = (await pool.query("SELECT * FROM contact.support_agents ORDER BY id")).rows;
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
    createOne: async (data, file) => {
        let cloud_avatar_img = null;
        if (file) {
            cloud_avatar_img = await uploadImage(file, 'contact');
        }

        const {
            external_avatar_img,
            name,
            role,
            phone_number,
            facebook_url
        } = data

        const final_avatar_img = cloud_avatar_img || external_avatar_img || null;

        const result = await pool.query(`
            INSERT INTO contact.support_agents (avatar_img, name, role, phone_number, facebook_url)
            VALUES ($1, $2, $3, $4, $5);
        `, [final_avatar_img, name, role, phone_number, facebook_url]);

        if (result.rowCount == 0) return {
            status: 500,
            message: "Không thể tạo Người Liên Hệ"
        }; else if (result.rowCount > 0) return {
            status: 200,
            message: "Tạo Người Liên Hệ thành công",
            action: `Tạo Người Liên Hệ: ${name}`
        } 
    },
    updateOne: async (data, file, id) => {
        const old_name = (await pool.query('SELECT name FROM contact.support_agents WHERE id = $1', [id])).rows?.[0]?.name;
        if (!old_name) return {
            status: 404,
            message: "Không tìm thấy Người Liên Hệ"
        }
        
        const old_avatar_img = (await pool.query('SELECT avatar_img FROM contact.support_agents WHERE id = $1', [id])).rows[0].avatar_img;
        let local_avatar_img = file;
        
        const {
            external_avatar_img,
            name,
            role,
            phone_number,
            facebook_url
        } = data

        const final_avatar_img = await updateImage(
            old_avatar_img,
            local_avatar_img,
            external_avatar_img,
            'contact'
        );
        
        await pool.query(`
            UPDATE contact.support_agents
            SET 
                avatar_img = $1,
                name = $2,
                role = $3,
                phone_number = $4,
                facebook_url = $5
            WHERE
                id = $6
        `, [final_avatar_img, name, role, phone_number, facebook_url, id]);
        
        const note = (old_name != name) ? ' (đã đổi tên)' : '';
        return {
            status: 200,
            message: "Cập nhật Người Liên Hệ thành công",
            action: `Cập nhật Người Liên Hệ${note}: ${name}`
        } 
    },
    deleteOne: async (id) => {
        const result = await pool.query('DELETE FROM contact.support_agents WHERE id = $1 returning name, avatar_img', [id]);
        if (result.rowCount == 0) return {
            status: 404,
            message: "Không tìm thấy Người Liên Hệ"
        };

        const deleted_avatar_img = result.rows[0].avatar_img;
        if (isCloudinary(deleted_avatar_img)) {
            await deleteImage([deleted_avatar_img]);
        }

        const name = result.rows[0].name;
        return {
            status: 200,
            message: "Xóa Người Liên Hệ thành công",
            action: `Xóa Người Liên Hệ: ${name}`
        }
    }
    
}

const postContactMessage = async (applicationData) => {
    const { name, email, phone, title, content } = applicationData;
    
    const company_email = (await pool.query('SELECT company_email FROM contact.company_info')).rows?.[0]?.company_email;

    //Send mail to company
    await sendMail({
        to: company_email,//process.env.RECEIVER_EMAIL,
        subject: `Liên hệ từ ${name}`,
        html: `
        <h2>Thông tin liên hệ:</h2>
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
        to: applicationData.email,
        subject: "Xác nhận nhận đơn liên hệ",
        html: `
            <h2>Cảm ơn bạn đã liên hệ!</h2>
            <p>Chúng tôi đã nhận được thông tin liên hệ của bạn với thông tin sau:</p>
            <ul>
                <li><strong>Họ tên:</strong> ${name}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Điện thoại:</strong> ${phone || 'Không cung cấp'}</li>
                <li><strong>Chủ đề:</strong> ${title}</li>
                <li><strong>Nội dung:</strong><br>${content.replace(/\n/g, '<br>')}</li>
            </ul>
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
export default { getAllTables, getContactPage, getCompanyInfo, updateCompanyInfo, support_agents, postContactMessage, count, updateContactPage };
