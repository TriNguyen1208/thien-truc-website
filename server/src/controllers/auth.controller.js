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

const refreshToken = async (req, res) => {
    try {
        const { status, message, accessToken } = await authServices.refreshToken(req.body);
        res.status(status).json({ message: message, accessToken });
    } catch (error) {
        console.log('Lỗi đăng nhập: ', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ'});
    }
};

const getLoginResult = async (req, res) => {
    try {
        const user = await authServices.getUserByUsername(username);
        res.status(200).json({
            message: 'Đăng nhập thành công', 
            user
        });
    } catch (error) {
        console.log('Lỗi lấy thông tin user: ', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ'});        
    }    
}

const updateProfile = async (req, res) => {
    try {
        const { status, message, user } = await authServices.updateProfile(req.body, req.user.user);
        res.status(status).json({
            message,
            user
        });
    } catch (error) {
        console.log('Lỗi lấy thông tin tài khoản: ', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ'});              
    }
}

export default { login, refreshToken, getLoginResult, updateProfile };
