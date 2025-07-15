import jwt from 'jsonwebtoken';
const { ACCESS_SECRET } = process.env;

if (!ACCESS_SECRET) {
    throw new Error('ACCESS_SECRET chưa được thiết lập');
}

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

    if (!token) return res.sendStatus(401);

    jwt.verify(token, ACCESS_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Token hết hạn hoặc sai

        req.user = user; // Gắn thông tin vào request
        next();
    });
};

export default { authenticateToken };