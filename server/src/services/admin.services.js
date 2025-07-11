import pool from '#@/config/db.js'

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
            LIMIT 10
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
        if (checkUsernameResult.rowCount > 0) {
            checkUsernameResult.rowCount = 0;
            return checkUsernameResult;
        }

        const result = await pool.query(`
            INSERT INTO admin.accounts (username, role, password, fullname, phone, email, position, description)
            VALUES ($1, 'manager', $2, $3, $4 ,$5, $6, $7);
        `, [username, password, fullname, phone, email, position, description]);

        return result;
    },
    updateOne: async(data, username) => {
        const {
            // username
            password,
            fullname,
            phone,
            email,
            position,
            description
        } = data

        const result = await pool.query(`
            UPDATE admin.accounts
            SET
                password = $2,
                fullname = $3,
                phone = $4,
                email = $5,
                position = $6,
                description = $7
            WHERE
                username = $1
        `,  [username, password, fullname, phone, email, position, description]);

        return result;
    },
    deleteOne: async(username) => {
        const result = await pool.query(`
            DELETE FROM admin.activity_logs WHERE username = '${username}';
            DELETE FROM admin.accounts WHERE username = '${username}';
        `);

        return result[1];
    }
}

export default { count, activity_logs, manager };