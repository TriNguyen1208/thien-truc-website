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

export default { count };