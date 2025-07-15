import pool from '#@/config/db.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const { ACCESS_SECRET, REFRESH_SECRET } = process.env;

if (!ACCESS_SECRET || !REFRESH_SECRET) {
    throw new Error('Thiếu ACCESS_SECRET hoặc REFRESH_SECRET trong biến môi trường');
}

// Hàm lấy user theo username
const getUserByUsername = async (username) => {
    const queryResult = await pool.query(
        `SELECT role, password as hashed_password, fullname, phone, email, position, description
        FROM admin.accounts WHERE username = $1`,
        [username]
    );

    if (queryResult.rowCount === 0) return null;

    const user = queryResult.rows[0];

    return { 
        username,
        ...user
    };
};

// Hàm login
const login = async (loginData) => {
    const { username, password } = loginData;
    const user = await getUserByUsername(username);

    if (!user) return {
        status: 404,
        message: 'Tài khoản không tồn tại'
    }

    console.log(user);

    const isPasswordValid = await bcrypt.compare(password, user.hashed_password);
    if (!isPasswordValid) return {
        status: 401,
        message: 'Sai thông tin đăng nhập'
    }

    // Tạo access token
    const accessToken = jwt.sign(
        { username: user.username, role: user.role },
        ACCESS_SECRET,
        { expiresIn: '15m' }
    );

    // Tạo refresh token
    const refreshToken = jwt.sign(
        { username: user.username, role: user.role },
        REFRESH_SECRET,
        { expiresIn: '7d' }
    );

    return {
        status: 200,
        message: 'Đăng nhập thành công',
        token: { accessToken, refreshToken },
        user: user
    }
};

const refreshToken = async (tokenData) => {
    const { refreshToken } = tokenData;

    if (!refreshToken) {
        return {
            status: 401,
            message: 'Không có refresh token'
        };
    }

    try {
        const decodedUser = jwt.verify(refreshToken, REFRESH_SECRET);

        const accessToken = jwt.sign(
            { role: decodedUser.role },
            ACCESS_SECRET,
            { expiresIn: '15m' }
        );

        return {
            status: 200,
            message: 'Refresh token thành công',
            accessToken
        };
    } catch (err) {
        return {
            status: 403,
            message: 'Token không hợp lệ hoặc đã hết hạn'
        };
    }
};


export default { getUserByUsername, login, refreshToken };