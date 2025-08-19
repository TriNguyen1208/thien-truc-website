import pool from '#@/config/db.js'
import authUtil from '#@/utils/auth.js'
import { hash } from 'bcrypt';

const count = async () => {
    const data = (await pool.query(`
        SELECT COUNT(*)::int AS manager_count
        FROM admin.accounts
        WHERE role = 'manager';
    `)).rows[0];

    if(!data){
        throw new Error("Can't get accounts");
    }

    return data;
}

const activity_logs = {
    getAll: async() => {
        const { rows } = (await pool.query(`
            SELECT log.content, log.username, log.time, acc.fullname
            FROM admin.activity_logs log
            JOIN admin.accounts acc ON log.username = acc.username
            ORDER BY log.time DESC
            LIMIT 50
        `));

        if(!rows){
            throw new Error("Can't get activity_logs or accounts");
        }
        
        const data = rows.map(row => {
            const d = new Date(row.time);
            return {
                content: row.content,
                username: row.username,
                fullname: row.fullname,
                date: d.toLocaleDateString('vi-VN'), // dd/mm/yyyy
                time: d.toLocaleTimeString('vi-VN', { hour12: false }) // hh:mm:...
            }
        });

        return [...data];
    }
}

const manager = {
    getAll: async() => {
        const data = (await pool.query(`
            SELECT *
            FROM admin.accounts
            WHERE role = 'manager'
            ORDER BY username ASC
        `)).rows;

        if (!data) {
            throw new Error("Can't get accounts");
        }

        return data;
    },
    getOne: async(username) => {
        const data = (await pool.query(`
            SELECT *
            FROM admin.accounts
            WHERE role = 'manager' AND username = $1
        `, [username])).rows[0];

        if (!data) {
            throw new Error("Can't get accounts");
        }

        return data;
    },
    createOne: async(data) => {
        const {
            username,
            password,
            fullname,
            phone,
            email,
            position,
            description
        } = data

        const checkUsernameResult = await pool.query('SELECT 1 FROM admin.accounts WHERE username = $1 LIMIT 1', [username]);
        if (checkUsernameResult.rowCount > 0) return {
            status: 409,
            message: "Username đã tồn tại"
        }

        const hashed_password = await authUtil.hashPassword(password);

        const result = await pool.query(`
            INSERT INTO admin.accounts (username, role, password, fullname, phone, email, position, description)
            VALUES ($1, 'manager', $2, $3, $4 ,$5, $6, $7);
        `, [username, hashed_password, fullname, phone, email, position, description]);

        return {
            status: 200,
            message: "Tạo Manager thành công",
            action: `Tạo Manager: ${username} - ${fullname}`
        }
    },
    updateOne: async(data, username) => {
        const old_fullname = (await pool.query('SELECT fullname FROM admin.accounts WHERE username = $1', [username])).rows?.[0]?.fullname;
        if (!old_fullname) return {
            status: 404,
            message: "Không tìm thấy Manager"
        }

        const {
            // username
            password,
            fullname,
            phone,
            email,
            position,
            description
        } = data

        await pool.query(`
            UPDATE admin.accounts
            SET
                fullname = $2,
                phone = $3,
                email = $4,
                position = $5,
                description = $6
            WHERE
                username = $1
        `,  [username, fullname, phone, email, position, description]);

        if (password != '') {
            const hashed_password = await authUtil.hashPassword(password);
            await pool.query(`
            UPDATE admin.accounts
            SET
                password = $2
            WHERE
                username = $1
        `,  [username, hashed_password]);
        }            

        const note = (old_fullname != fullname) ? ' (đã đổi tên)' : '';
        return {
            status: 200,
            message: "Cập nhật Manager thành công",
            action: `Cập nhật Manager${note}: ${username} - ${fullname}`
        }
        
    },
    deleteOne: async (username) => {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            // Xóa logs trước
            await client.query(
                `DELETE FROM admin.activity_logs WHERE username = $1`,
                [username]
            );

            // Xóa account và lấy fullname
            const deleteAccountRes = await client.query(
                `DELETE FROM admin.accounts WHERE username = $1 RETURNING fullname`,
                [username]
            );

            if (deleteAccountRes.rowCount === 0) {
                await client.query('ROLLBACK');
                return {
                    status: 404,
                    message: "Không tìm thấy Manager"
                };
            }

            await client.query('COMMIT');

            const { fullname } = deleteAccountRes.rows[0];
            return {
                status: 200,
                message: "Xóa Manager thành công",
                action: `Xóa Manager: ${username} - ${fullname}`
            };
        } catch (error) {
            await client.query('ROLLBACK');
            throw error; // hoặc return status: 500 nếu muốn xử lý thêm
        } finally {
            client.release();
        }
    }
}

export default { count, activity_logs, manager };