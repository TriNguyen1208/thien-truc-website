import authServices from '#@/services/auth.services.js';

// Hàm login
const login = async (req, res) => {
    try {
        const { status, message, token = null, user = null } = await authServices.login(req.body);
        
        if (token) {
            const { accessToken, refreshToken } = token;
            // Gửi token qua HttpOnly cookie
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // chỉ gửi qua HTTPS (tắt nếu đang dev)
                sameSite: 'Strict',      // bảo vệ CSRF
                path: '/',
                maxAge: 15 * 60 * 1000   // 15 phút
            });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                path: '/',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 ngày
            });
        }

        res.status(status).json({ message: message, user });
    } catch (error) {
        console.error('Lỗi đăng nhập: ', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ'});
    }
};

const refreshToken = async (req, res) => {
    try {
        const { refreshToken: _refreshToken } = req.cookies
        const { status, message, accessToken } = await authServices.refreshToken(_refreshToken);
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // chỉ gửi qua HTTPS (tắt nếu đang dev)
            sameSite: 'Strict',      // bảo vệ CSRF
            path: '/',
            maxAge: 15 * 60 * 1000   // 15 phút
        });
        res.status(status).json({ message: message, accessToken });
    } catch (error) {
        console.error('Lỗi đăng nhập: ', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ'});
    }
};

const getLoginResult = async (req, res) => {
    try {
        const user = await authServices.getUserByUsername(req.user.username);
        res.status(200).json({
            message: 'Đăng nhập thành công', 
            user
        });
    } catch (error) {
        console.error('Lỗi lấy thông tin user: ', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ'});        
    }    
}

const updateProfile = async (req, res) => {
    try {
        const { status, message, user = null } = await authServices.updateProfile(req.body, req.user);
        res.status(status).json({
            message,
            user
        });
    } catch (error) {
        console.error('Lỗi lấy thông tin tài khoản: ', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ'});              
    }
}

const updatePassword = async (req, res) => {
    try {
        const { status, message, user = null } = await authServices.updatePassword(req.body, req.user);
        res.status(status).json({
            message,
            user
        });
    } catch (error) {
        console.error('Lỗi cập nhật mật khẩu: ', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
    }
}

const sendResetPassword = async(req, res) => {
    try {
        const { status, message } = await authServices.sendResetPassword(req.body);
        res.status(status).json({ message });
    } catch (error) {
        console.error('Lỗi gửi reset mật khẩu: ', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
    }
}

const logout = async (req, res) => {
    try {
        // Xóa cookies ở phía client bằng cách gửi lại với maxAge = 0
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            path: '/'
        });

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            path: '/'
        });
        res.status(200).json({ message: "Đăng xuất thành công" });
    } catch (error) {
        console.error('Lỗi khi logout: ', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { status, message } = await authServices.resetPassword(req.body);
        res.status(status).json({ message });
    } catch (error) {
        console.error('Lỗi reset mật khẩu: ', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
    }
}

export default { login, refreshToken, getLoginResult, updateProfile, updatePassword, sendResetPassword, logout, resetPassword };
