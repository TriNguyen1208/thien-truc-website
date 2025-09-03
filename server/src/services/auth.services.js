import pool from '#@/config/db.js'
import bcrypt from 'bcrypt';
import authUtil from '#@/utils/auth.js'
// import { query } from 'express-validator';
import sendMail from '#@/utils/mailer.js'
import jwt from 'jsonwebtoken';
const { ACCESS_SECRET, REFRESH_SECRET, RESET_SECRET } = process.env;

if (!ACCESS_SECRET || !REFRESH_SECRET) {
    throw new Error('Thiếu ACCESS_SECRET hoặc REFRESH_SECRET trong biến môi trường');
}

const isValidPassword = async (username, password) => {
    const user = await pool.query(`
        SELECT password as hashed_password
        FROM admin.accounts WHERE username = $1
    `, [username]);

    if (user.rowCount === 0) return false;

    const hashedPassword = user.rows[0].hashed_password;
    return await bcrypt.compare(password, hashedPassword);
}

// Hàm lấy user theo username
const getUserByUsername = async (username) => {
    const queryResult = await pool.query(
        `SELECT role, fullname, phone, email, position, description
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

    const isPasswordValid = await isValidPassword(username, password);
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
        user,
    }
};

const refreshToken = async (refreshToken) => {
    console.error('Gọi api refresh token thành công ', refreshToken)
    if (!refreshToken) {
        return {
            status: 401,
            message: 'Không có refresh token'
        };
    }

    try {
        const decodedUser = jwt.verify(refreshToken, REFRESH_SECRET);

        const accessToken = jwt.sign(
            { username: decodedUser.username, role: decodedUser.role },
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
    
    const isOldPasswordValid = await isValidPassword(user.username, old_password);
    if (!isOldPasswordValid) return {
        status: 409,
        message: "Mật khẩu cũ không đúng"
    }

    if (new_password != verify_password) return {
        status: 409,
        message: "Mật khẩu xác nhận chưa trùng khớp"
    }

    const hashed_new_password = await authUtil.hashPassword(new_password);

    await pool.query(`
        UPDATE admin.accounts
        SET
            password = $1
        WHERE
            username = $2    
    `, [hashed_new_password, user.username]);

    return {
        status: 200,
        message: "Cập nhật mật khẩu thành công",
        user
    }
}

const sendResetPassword = async (data) => {
    const { username = null, email = null } = data;
    if (!username || !email) return {
        status: 400,
        message: "Thiếu thông tin username hoặc email"
    }

    const result = await pool.query(`
        SELECT email
        FROM admin.accounts
        WHERE username = $1
    `, [username]);

    if (result.rowCount == 0) return {
        status: 404,
        message: "Username không tồn tại"
    }

    if (email != result.rows[0].email) return {
        status: 409,
        message: "Email không chính xác"
    }

    const token = jwt.sign(
        { username },
        RESET_SECRET,
        { expiresIn: '15m' }
    );

    const resetUrl = `${process.env.VITE_ADMIN_URL || 'http://localhost:3001'}/dang-nhap?token=${token}`;

    await sendMail({
        to: email,
        subject: 'Yêu cầu khôi phục mật khẩu',
        html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; color: #333333;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden; color: #000000">
            <div style="background-color: #4CAF50; color: #ffffff; padding: 25px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Khôi phục mật khẩu</h1>
            </div>
            
            <div style="padding: 25px;">
            <p style="font-size: 16px; margin: 0 0 15px; color: #000000">Xin chào <strong>${username}</strong>,</p>
            <p style="font-size: 16px; margin: 0 0 25px; color: #000000">Bạn đã yêu cầu khôi phục mật khẩu cho tài khoản của mình. Vui lòng nhấn vào nút dưới đây để tiếp tục:</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" style="background-color: #4CAF50; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold; border: 1px solid #0056b3;">Khôi phục mật khẩu</a>
            </div>
            
            <p style="font-size: 16px; margin: 0 0 10px; color: #000000">Nếu nút trên không hoạt động, bạn có thể sao chép và dán liên kết sau vào trình duyệt của mình:</p>
            <p style="font-size: 14px; color: #007bff; word-wrap: break-word;">${resetUrl}</p>
            
            <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 25px 0;">
            
            <p style="font-size: 14px; color: #777777; margin: 0;">Lưu ý: Liên kết này chỉ có hiệu lực trong <strong>15 phút</strong>. Nếu bạn không yêu cầu khôi phục mật khẩu, vui lòng bỏ qua email này.</p>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #999999; border-top: 1px solid #e2e6ea;">
            <p style="margin: 0;">Email này được gửi tự động từ hệ thống. Vui lòng không trả lời.</p>
            </div>
        </div>
        </div>
        `,
    });

    return {
        status: 200,
        message: 'Link khôi phục mật khẩu đã được gửi về email',
    };
}

const resetPassword = async (data) => {
    const { token, newPassword } = data;
    
    if (!token || !newPassword) {
        return {
            status: 400,
            message: "Thiếu token hoặc mật khẩu mới"
        }
    }

    // 1. Giải mã token
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.RESET_SECRET);
    } catch (err) {
        return {
            status: 401,
            message: 'Token không hợp lệ hoặc đã hết hạn'
        }
    }
    const { username } = decoded;

    // 2. Kiểm tra user có tồn tại
    const result = await pool.query(
      `SELECT username FROM admin.accounts WHERE username = $1`,
      [username]
    );

    if (result.rowCount === 0) {
        return {
            status: 404,
            message: "Tài khoản không tồn tại"
        }
    }

    // 3. Băm mật khẩu mới
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 4. Cập nhật mật khẩu
    await pool.query(
        `UPDATE admin.accounts SET password = $1 WHERE username = $2`,
        [hashedPassword, username]
    );

    return {
        status: 200,
        message: "Reset mật khẩu thành công"
    }
}

export default { isValidPassword, getUserByUsername, login, refreshToken, updateProfile, updatePassword, sendResetPassword, resetPassword };