import pool from '#@/config/db.js'
import bcrypt from 'bcrypt';
import authUtil from '#@/utils/auth.js'
import { query } from 'express-validator';
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

const updateManagerProfile = async (data, user) => {
    const {
        fullname,
        phone,
        email
    } = data;

    await pool.query(`
        UPDATE admin.accounts
        SET
            fullname = $1,
            phone = $2,
            email = $3
        WHERE
            username = $4
    `, [fullname, phone, email, user.username]);

    user.fullname = fullname;
    user.phone = phone;
    user.email = email;

    return user;
} 

const updateUserProfile = async (data, user) => {
    const {
        fullname,
    } = data;

    await pool.query(`
        UPDATE admin.accounts
        SET
            fullname = $1,
        WHERE
            username = $2
    `, [fullname, user.username]);

    user.fullname = fullname;

    return user;
} 

const updateProfile = async (data, user) => {
    if (user.role == 'manager') {
        const updatedUser = await updateManagerProfile(data, user);
        return {
            status: 200,
            message: 'Cập nhật thông tin Manager thành công',
            user: updatedUser
        }
    } else if (user.role == 'admin') {
        const updatedUser = await updateManagerProfile(data, user);
        return {
            status: 200,
            message: 'Cập nhật thông tin Admin thành công',
            user: updatedUser
        }
    } else {
        return {
            status: 409,
            message: 'Role tài khoản không hợp lệ',
            user: updatedUser
        }
    }
}

const updatePassword = async (data, user) => {
    const {
        old_password,
        new_password,
        verify_password
    } = data;
    
    const isOldPasswordValid = await bcrypt.compare(old_password, user.hashed_password);
    if (!isOldPasswordValid) return {
        status: 409,
        message: "Mật khẩu cũ không đúng"
    }

    if (new_password != verify_password) return {
        status: 409,
        message: "Mật khẩu xác nhận chưa trùng khớp"
    }

    const hashed_new_password = authUtil.hashPassword(new_password);

    await pool.query(`
        UPDATE admin.accounts
        SET
            password = $1
        WHERE
            username = $2    
    `, [hashed_new_password, user.username]);

    user.hashed_password = hashed_new_password;

    return {
        status: 200,
        message: "Cập nhật mật khẩu thành công",
        user
    }
}

export default { getUserByUsername, login, refreshToken, updateProfile, updatePassword };