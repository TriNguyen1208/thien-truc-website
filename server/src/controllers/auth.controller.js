import authServices from '#@/services/auth.services.js';

// Hàm login
const login = async (req, res) => {
    try {
        const { status, message, token } = await authServices.login(req.body);
        res.status(status).json({ message: message, token });
    } catch (error) {
        console.log('Lỗi đăng nhập: ', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ'});
    }
};

const refreshTokenHandler = async (req, res) => {
    try {
        const { status, message, accessToken } = await authServices.refreshTokenHandler(req.body);
        res.status(status).json({ message: message, accessToken });
    } catch (error) {
        console.log('Lỗi đăng nhập: ', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ'});
    }
};

export default { login, refreshTokenHandler };
