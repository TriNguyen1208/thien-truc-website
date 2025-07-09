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

export default { count, activity_logs };