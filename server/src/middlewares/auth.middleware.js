import jwt from 'jsonwebtoken';
const { ACCESS_SECRET } = process.env;

if (!ACCESS_SECRET) {
    throw new Error('ACCESS_SECRET chưa được thiết lập');
}

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

    if (!token) res.status(401).json({ message: 'Thiếu token' });

    jwt.verify(token, ACCESS_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token không hợp lệ hoặc đã hết hạn' }); // Token hết hạn hoặc sai

        console.log('Token hợp lệ:', user);
        req.user = user; // Gắn thông tin vào request
        next();
    });
};

const authorizeAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Bạn không có quyền truy cập' });
    }

    next(); // Cho phép tiếp tục nếu là admin
};

export default { authenticateToken, authorizeAdmin };