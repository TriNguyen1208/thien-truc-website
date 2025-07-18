import pool from '#@/config/db.js'

const logActivity = async (username, action) => {
    const result = await pool.query(`
        INSERT INTO admin.activity_logs (content, username, time)
        VALUES ($1, $2, CURRENT_TIMESTAMP)
        RETURNING id
    `, [action, username]); // Đảm bảo đúng thứ tự: content, username

    const logId = result?.rows?.[0]?.id;

    return {
        status: 200,
        message: `Cập nhật activity log (id = ${logId ?? 'N/A'}) thành công`
    };
};

export default { logActivity };