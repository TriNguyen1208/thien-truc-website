import express from 'express'
import { errorHandler } from '#@/middlewares/error.middleware.js';
import registerRoutes from '#@/routes/index.route.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { cookie } from 'express-validator';

const app = express();

const allowedOrigins = [
    'http://localhost:3001',
    'http://localhost:3002',
    'http://127.0.0.1:3001',
    'http://127.0.0.1:3002',
    'http://171.244.139.18:3001',
    'http://171.244.139.18:3002',
    // thêm domain khi deploy như:
    'https://thientruc.vn',
    'https://admin.thientruc.vn',
    'https://api.thientruc.vn',
    'http://115.73.3.162:3001',
    'http://115.73.3.162:3002'
];

app.use(cors({
origin: (origin, callback) => {
    // Cho phép gọi từ Postman hoặc SSR không có origin
    if (!origin || allowedOrigins.includes(origin)) {
    return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
},
credentials: true,
}));

app.use(express.json());
app.use(cookieParser())
registerRoutes(app);
app.use(errorHandler);

export default app;
